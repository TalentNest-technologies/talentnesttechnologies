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

    const { business_id, pms_system, pms_api_key, pms_credentials } = await req.json();

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

    // Get encryption key from environment
    const encryptionKey = Deno.env.get('PMS_ENCRYPTION_KEY');
    if (!encryptionKey) {
      console.error('PMS_ENCRYPTION_KEY not configured');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Encrypt credentials using database function
    let encryptedApiKey = null;
    let encryptedCredentials = null;

    if (pms_api_key) {
      const { data: encrypted, error: encryptError } = await supabase
        .rpc('encrypt_pms_data', {
          data: pms_api_key,
          encryption_key: encryptionKey
        });
      
      if (encryptError) {
        console.error('Error encrypting API key:', encryptError);
        throw encryptError;
      }
      encryptedApiKey = encrypted;
    }

    if (pms_credentials && Object.keys(pms_credentials).length > 0) {
      const { data: encrypted, error: encryptError } = await supabase
        .rpc('encrypt_pms_data', {
          data: JSON.stringify(pms_credentials),
          encryption_key: encryptionKey
        });
      
      if (encryptError) {
        console.error('Error encrypting credentials:', encryptError);
        throw encryptError;
      }
      encryptedCredentials = encrypted;
    }

    console.log(`Storing encrypted PMS credentials for business ${business_id}`);

    // Store encrypted data and clear plain text columns
    const { error: updateError } = await supabase
      .from('businesses')
      .update({
        pms_system,
        pms_api_key_encrypted: encryptedApiKey,
        pms_credentials_encrypted: encryptedCredentials,
        pms_api_key: null,
        pms_credentials: null,
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
