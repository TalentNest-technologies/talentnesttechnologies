import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CompetitorRate {
  competitor_name: string;
  competitor_url: string;
  room_type?: string;
  rate?: number;
  availability?: string;
  date: string;
  metadata?: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { business_id, competitors } = await req.json();

    if (!business_id || !competitors || !Array.isArray(competitors)) {
      return new Response(
        JSON.stringify({ error: 'business_id and competitors array are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!FIRECRAWL_API_KEY) {
      throw new Error('FIRECRAWL_API_KEY not configured');
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase configuration missing');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const results: any[] = [];
    const currentDate = new Date().toISOString().split('T')[0];

    console.log(`Scraping ${competitors.length} competitor URLs for business ${business_id}`);

    for (const competitor of competitors) {
      try {
        const { name, url } = competitor;
        
        if (!name || !url) {
          console.error('Invalid competitor data:', competitor);
          continue;
        }

        console.log(`Scraping ${name} at ${url}`);

        // Scrape the website using Firecrawl
        const firecrawlResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: url,
            formats: ['markdown', 'html'],
            onlyMainContent: true,
          }),
        });

        if (!firecrawlResponse.ok) {
          const errorText = await firecrawlResponse.text();
          console.error(`Firecrawl error for ${name}:`, errorText);
          results.push({
            competitor: name,
            success: false,
            error: `Firecrawl API error: ${firecrawlResponse.status}`,
          });
          continue;
        }

        const firecrawlData = await firecrawlResponse.json();
        const scrapedContent = firecrawlData.data?.markdown || firecrawlData.data?.html || '';

        if (!scrapedContent) {
          console.error(`No content scraped for ${name}`);
          results.push({
            competitor: name,
            success: false,
            error: 'No content extracted',
          });
          continue;
        }

        console.log(`Scraped ${scrapedContent.length} characters from ${name}`);

        // Use Lovable AI to extract pricing information
        let extractedRates: CompetitorRate[] = [];

        if (LOVABLE_API_KEY) {
          try {
            const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${LOVABLE_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model: 'google/gemini-2.5-flash',
                messages: [
                  {
                    role: 'system',
                    content: `You are a hotel pricing data extraction expert. Extract room rates, room types, and availability from scraped hotel/OTA website content. Return structured JSON data with room_type, rate (numeric value only), and availability status.`,
                  },
                  {
                    role: 'user',
                    content: `Extract hotel room pricing data from this content:\n\n${scrapedContent.substring(0, 4000)}\n\nReturn only valid JSON array with format: [{"room_type": "string", "rate": number, "availability": "available|sold_out"}]`,
                  },
                ],
                tools: [
                  {
                    type: 'function',
                    function: {
                      name: 'extract_rates',
                      description: 'Extract room rates and availability from hotel content',
                      parameters: {
                        type: 'object',
                        properties: {
                          rates: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                room_type: { type: 'string' },
                                rate: { type: 'number' },
                                availability: { 
                                  type: 'string',
                                  enum: ['available', 'sold_out', 'limited']
                                },
                              },
                              required: ['room_type', 'rate', 'availability'],
                            },
                          },
                        },
                        required: ['rates'],
                      },
                    },
                  },
                ],
                tool_choice: { type: 'function', function: { name: 'extract_rates' } },
              }),
            });

            if (aiResponse.ok) {
              const aiData = await aiResponse.json();
              const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
              
              if (toolCall?.function?.arguments) {
                const parsed = JSON.parse(toolCall.function.arguments);
                const rates = parsed.rates || [];
                
                extractedRates = rates.map((rate: any) => ({
                  competitor_name: name,
                  competitor_url: url,
                  room_type: rate.room_type,
                  rate: rate.rate,
                  availability: rate.availability,
                  date: currentDate,
                  metadata: {
                    scraped_at: new Date().toISOString(),
                    source: 'firecrawl',
                  },
                }));

                console.log(`Extracted ${extractedRates.length} rates for ${name} using AI`);
              }
            } else {
              console.error(`AI extraction failed for ${name}:`, await aiResponse.text());
            }
          } catch (aiError) {
            console.error(`AI extraction error for ${name}:`, aiError);
          }
        }

        // Fallback: Store raw scraped data if AI extraction fails
        if (extractedRates.length === 0) {
          extractedRates = [{
            competitor_name: name,
            competitor_url: url,
            date: currentDate,
            metadata: {
              scraped_at: new Date().toISOString(),
              source: 'firecrawl',
              raw_content_length: scrapedContent.length,
              note: 'Manual review needed - AI extraction unsuccessful',
            },
          }];
        }

        // Insert into database
        const { data: insertedData, error: insertError } = await supabase
          .from('competitor_rates')
          .insert(
            extractedRates.map(rate => ({
              ...rate,
              business_id,
            }))
          )
          .select();

        if (insertError) {
          console.error(`Database insert error for ${name}:`, insertError);
          results.push({
            competitor: name,
            success: false,
            error: insertError.message,
          });
        } else {
          console.log(`Successfully stored ${insertedData.length} rates for ${name}`);
          results.push({
            competitor: name,
            success: true,
            rates_found: extractedRates.length,
            data: insertedData,
          });
        }

      } catch (competitorError: any) {
        console.error(`Error processing competitor ${competitor.name}:`, competitorError);
        results.push({
          competitor: competitor.name,
          success: false,
          error: competitorError.message,
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${competitors.length} competitors`,
        results,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in scrape-competitor-rates function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
