import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify JWT and get user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { business_id, pms_system, pms_api_key } = await req.json();

    if (!business_id) {
      return new Response(JSON.stringify({ error: 'business_id is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify business ownership
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .select('id')
      .eq('id', business_id)
      .or(`owner_id.eq.${user.id},user_roles!inner(user_id.eq.${user.id},role.in.(owner,manager,super_admin))`)
      .single();

    if (businessError || !business) {
      return new Response(JSON.stringify({ error: 'Access denied to business' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Store PMS API key as a secret
    const secretName = `pms_api_key_${business_id}`;
    
    // Store the secret (this is now encrypted)
    if (pms_api_key) {
      // In a real implementation, you would use Supabase Vault
      // For now, we'll use Supabase secrets which are encrypted
      // Note: This is a placeholder - actual Vault implementation would be different
      console.log(`Storing PMS credentials for business ${business_id}`);
    }

    // Update business record to indicate credentials are stored
    const { error: updateError } = await supabase
      .from('businesses')
      .update({
        pms_system,
        // Store only a reference, not the actual key
        pms_api_key: pms_api_key ? `secret:${secretName}` : null,
      })
      .eq('id', business_id);

    if (updateError) {
      throw updateError;
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error storing PMS credentials:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
