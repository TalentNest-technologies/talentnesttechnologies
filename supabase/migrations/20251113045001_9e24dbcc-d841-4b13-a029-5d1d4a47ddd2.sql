-- Fix search_path for encrypt_pms_data function
CREATE OR REPLACE FUNCTION public.encrypt_pms_data(data text, encryption_key text)
RETURNS bytea
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN pgp_sym_encrypt(data, encryption_key);
END;
$$;

-- Fix search_path for decrypt_pms_data function
CREATE OR REPLACE FUNCTION public.decrypt_pms_data(encrypted_data bytea, encryption_key text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN pgp_sym_decrypt(encrypted_data, encryption_key);
END;
$$;
