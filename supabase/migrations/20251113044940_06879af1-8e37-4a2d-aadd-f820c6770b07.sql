-- Add encrypted storage for PMS credentials using pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Add encrypted columns for PMS credentials
ALTER TABLE public.businesses 
  ADD COLUMN IF NOT EXISTS pms_api_key_encrypted bytea,
  ADD COLUMN IF NOT EXISTS pms_credentials_encrypted bytea;

-- Create function to encrypt PMS data
CREATE OR REPLACE FUNCTION public.encrypt_pms_data(data text, encryption_key text)
RETURNS bytea
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN pgp_sym_encrypt(data, encryption_key);
END;
$$;

-- Create function to decrypt PMS data  
CREATE OR REPLACE FUNCTION public.decrypt_pms_data(encrypted_data bytea, encryption_key text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN pgp_sym_decrypt(encrypted_data, encryption_key);
END;
$$;

-- Add comment explaining the encryption
COMMENT ON COLUMN public.businesses.pms_api_key_encrypted IS 'Encrypted PMS API key using pgcrypto';
COMMENT ON COLUMN public.businesses.pms_credentials_encrypted IS 'Encrypted PMS credentials (username/password) using pgcrypto';
