-- Tighten bookings SELECT: exclude housekeeping from guest PII access
DROP POLICY IF EXISTS "Users can view bookings for accessible businesses" ON public.bookings;

CREATE POLICY "Authorized staff can view bookings"
ON public.bookings
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.business_id = bookings.business_id
      AND user_roles.role = ANY (ARRAY['owner'::app_role, 'manager'::app_role, 'front_desk'::app_role, 'auditor'::app_role, 'super_admin'::app_role])
  )
  OR EXISTS (
    SELECT 1 FROM public.businesses
    WHERE businesses.id = bookings.business_id
      AND businesses.owner_id = auth.uid()
  )
);

-- Tighten revenue_records SELECT: restrict financial data to owners/managers/auditors only
DROP POLICY IF EXISTS "Users can view revenue for accessible businesses" ON public.revenue_records;

CREATE POLICY "Financial staff can view revenue records"
ON public.revenue_records
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = auth.uid()
      AND user_roles.business_id = revenue_records.business_id
      AND user_roles.role = ANY (ARRAY['owner'::app_role, 'manager'::app_role, 'auditor'::app_role, 'super_admin'::app_role])
  )
  OR EXISTS (
    SELECT 1 FROM public.businesses
    WHERE businesses.id = revenue_records.business_id
      AND businesses.owner_id = auth.uid()
  )
);