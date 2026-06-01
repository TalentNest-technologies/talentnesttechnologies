
-- =====================================================
-- STAFFING WORKFORCE MANAGEMENT - FOUNDATION SCHEMA
-- Dedicated sw_role enum (separate from hotel-ai app_role)
-- =====================================================

DO $$ BEGIN
  CREATE TYPE sw_role AS ENUM (
    'super_admin','staffing_owner','staffing_admin','staffing_scheduler',
    'staffing_payroll','staffing_recruiter','staffing_accountant',
    'client_corp_admin','client_billing','client_regional',
    'property_manager','dept_supervisor','employee'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE sw_org_type AS ENUM ('staffing_company','client_corporate','hotel_property','admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE sw_schedule_status AS ENUM ('draft','sent_to_employees','employee_review','staffing_reviewed','sent_to_pm','pm_approved','corp_approved','published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE sw_shift_acceptance_status AS ENUM ('pending','accepted','change_requested','declined');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE sw_time_entry_status AS ENUM ('clocked_in','on_break','clocked_out','missed_clockout','corrected');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE sw_invoice_status AS ENUM ('draft','submitted','under_review','approved','disputed','partially_paid','paid','void');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE sw_dispute_status AS ENUM ('open','resolved_in_favor_of_worker','resolved_in_favor_of_client','withdrawn');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 1. ORGANIZATIONS & MEMBERSHIP
CREATE TABLE public.sw_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  org_type sw_org_type NOT NULL,
  parent_org_id UUID,
  email TEXT, phone TEXT, address TEXT, city TEXT, state TEXT, zip TEXT, country TEXT DEFAULT 'USA',
  stripe_customer_id TEXT,
  payment_terms TEXT DEFAULT 'Net 30',
  settings JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.sw_organizations ADD CONSTRAINT sw_org_parent_fk FOREIGN KEY (parent_org_id) REFERENCES public.sw_organizations(id) ON DELETE SET NULL;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_organizations TO authenticated;
GRANT ALL ON public.sw_organizations TO service_role;
ALTER TABLE public.sw_organizations ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.sw_org_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role sw_role NOT NULL,
  property_id UUID,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (org_id, user_id, role)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_org_memberships TO authenticated;
GRANT ALL ON public.sw_org_memberships TO service_role;
ALTER TABLE public.sw_org_memberships ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_sw_memberships_user ON public.sw_org_memberships(user_id);
CREATE INDEX idx_sw_memberships_org ON public.sw_org_memberships(org_id);

CREATE OR REPLACE FUNCTION public.sw_is_org_member(_user_id UUID, _org_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.sw_org_memberships
    WHERE user_id = _user_id AND org_id = _org_id AND is_active = true);
$$;

CREATE OR REPLACE FUNCTION public.sw_has_org_role(_user_id UUID, _org_id UUID, _roles sw_role[])
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.sw_org_memberships
    WHERE user_id = _user_id AND org_id = _org_id AND role = ANY(_roles) AND is_active = true);
$$;

CREATE OR REPLACE FUNCTION public.sw_is_super_admin(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.sw_org_memberships
    WHERE user_id = _user_id AND role = 'super_admin' AND is_active = true);
$$;

CREATE POLICY sw_org_select ON public.sw_organizations FOR SELECT TO authenticated
  USING (public.sw_is_org_member(auth.uid(), id) OR public.sw_is_super_admin(auth.uid()));
CREATE POLICY sw_org_insert ON public.sw_organizations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY sw_org_update ON public.sw_organizations FOR UPDATE TO authenticated
  USING (public.sw_has_org_role(auth.uid(), id, ARRAY['staffing_owner','staffing_admin','client_corp_admin','super_admin']::sw_role[]));
CREATE POLICY sw_org_delete ON public.sw_organizations FOR DELETE TO authenticated
  USING (public.sw_has_org_role(auth.uid(), id, ARRAY['staffing_owner','super_admin']::sw_role[]));

CREATE POLICY sw_mem_select ON public.sw_org_memberships FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.sw_has_org_role(auth.uid(), org_id, ARRAY['staffing_owner','staffing_admin','client_corp_admin','super_admin']::sw_role[]));
CREATE POLICY sw_mem_insert ON public.sw_org_memberships FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() OR public.sw_has_org_role(auth.uid(), org_id, ARRAY['staffing_owner','staffing_admin','client_corp_admin','super_admin']::sw_role[]));
CREATE POLICY sw_mem_update ON public.sw_org_memberships FOR UPDATE TO authenticated
  USING (public.sw_has_org_role(auth.uid(), org_id, ARRAY['staffing_owner','staffing_admin','client_corp_admin','super_admin']::sw_role[]));
CREATE POLICY sw_mem_delete ON public.sw_org_memberships FOR DELETE TO authenticated
  USING (public.sw_has_org_role(auth.uid(), org_id, ARRAY['staffing_owner','staffing_admin','client_corp_admin','super_admin']::sw_role[]));

-- 2. CLIENTS & PROPERTIES
CREATE TABLE public.sw_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  client_org_id UUID REFERENCES public.sw_organizations(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  contact_person TEXT, billing_email TEXT, phone TEXT,
  address TEXT, city TEXT, state TEXT, zip TEXT,
  payment_terms TEXT DEFAULT 'Net 30',
  stripe_customer_id TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_clients TO authenticated;
GRANT ALL ON public.sw_clients TO service_role;
ALTER TABLE public.sw_clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_clients_select ON public.sw_clients FOR SELECT TO authenticated
  USING (public.sw_is_org_member(auth.uid(), staffing_org_id)
      OR (client_org_id IS NOT NULL AND public.sw_is_org_member(auth.uid(), client_org_id))
      OR public.sw_is_super_admin(auth.uid()));
CREATE POLICY sw_clients_manage ON public.sw_clients FOR ALL TO authenticated
  USING (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','super_admin']::sw_role[]))
  WITH CHECK (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','super_admin']::sw_role[]));

CREATE TABLE public.sw_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.sw_clients(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  franchise_brand TEXT,
  address TEXT, city TEXT, state TEXT, zip TEXT,
  property_manager_user_id UUID,
  billing_contact TEXT,
  gps_latitude NUMERIC, gps_longitude NUMERIC,
  clock_in_radius_meters INTEGER DEFAULT 200,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_properties TO authenticated;
GRANT ALL ON public.sw_properties TO service_role;
ALTER TABLE public.sw_properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_props_select ON public.sw_properties FOR SELECT TO authenticated
  USING (public.sw_is_org_member(auth.uid(), staffing_org_id) OR public.sw_is_super_admin(auth.uid()));
CREATE POLICY sw_props_manage ON public.sw_properties FOR ALL TO authenticated
  USING (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','super_admin']::sw_role[]))
  WITH CHECK (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','super_admin']::sw_role[]));

-- 3. DEPARTMENTS & ROLE CODES
CREATE TABLE public.sw_departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL, code TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(staffing_org_id, code)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_departments TO authenticated;
GRANT ALL ON public.sw_departments TO service_role;
ALTER TABLE public.sw_departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_dept_select ON public.sw_departments FOR SELECT TO authenticated
  USING (public.sw_is_org_member(auth.uid(), staffing_org_id));
CREATE POLICY sw_dept_manage ON public.sw_departments FOR ALL TO authenticated
  USING (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','super_admin']::sw_role[]))
  WITH CHECK (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','super_admin']::sw_role[]));

CREATE TABLE public.sw_role_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  department_id UUID REFERENCES public.sw_departments(id) ON DELETE SET NULL,
  role_name TEXT NOT NULL, role_code TEXT NOT NULL,
  default_bill_rate NUMERIC, default_pay_rate NUMERIC,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(staffing_org_id, role_code)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_role_codes TO authenticated;
GRANT ALL ON public.sw_role_codes TO service_role;
ALTER TABLE public.sw_role_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_rc_select ON public.sw_role_codes FOR SELECT TO authenticated
  USING (public.sw_is_org_member(auth.uid(), staffing_org_id));
CREATE POLICY sw_rc_manage ON public.sw_role_codes FOR ALL TO authenticated
  USING (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','super_admin']::sw_role[]))
  WITH CHECK (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','super_admin']::sw_role[]));

-- 4. WORKERS
CREATE TABLE public.sw_workers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  user_id UUID,
  full_name TEXT NOT NULL, email TEXT, phone TEXT,
  department_id UUID REFERENCES public.sw_departments(id) ON DELETE SET NULL,
  role_code_id UUID REFERENCES public.sw_role_codes(id) ON DELETE SET NULL,
  employment_type TEXT DEFAULT 'hourly',
  hourly_pay_rate NUMERIC, client_bill_rate NUMERIC,
  max_weekly_hours INTEGER DEFAULT 40,
  skills JSONB DEFAULT '[]'::jsonb,
  emergency_contact JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_workers TO authenticated;
GRANT ALL ON public.sw_workers TO service_role;
ALTER TABLE public.sw_workers ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_workers_select ON public.sw_workers FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.sw_is_org_member(auth.uid(), staffing_org_id));
CREATE POLICY sw_workers_manage ON public.sw_workers FOR ALL TO authenticated
  USING (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','staffing_recruiter','staffing_scheduler','super_admin']::sw_role[]))
  WITH CHECK (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','staffing_recruiter','staffing_scheduler','super_admin']::sw_role[]));

CREATE TABLE public.sw_worker_property_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES public.sw_workers(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES public.sw_properties(id) ON DELETE CASCADE,
  is_preferred BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(worker_id, property_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_worker_property_assignments TO authenticated;
GRANT ALL ON public.sw_worker_property_assignments TO service_role;
ALTER TABLE public.sw_worker_property_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_wpa_all ON public.sw_worker_property_assignments FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.sw_workers w WHERE w.id = worker_id AND public.sw_is_org_member(auth.uid(), w.staffing_org_id)))
  WITH CHECK (EXISTS (SELECT 1 FROM public.sw_workers w WHERE w.id = worker_id AND public.sw_is_org_member(auth.uid(), w.staffing_org_id)));

CREATE TABLE public.sw_worker_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID NOT NULL REFERENCES public.sw_workers(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL, end_time TIME NOT NULL,
  preferred_property_id UUID REFERENCES public.sw_properties(id) ON DELETE SET NULL,
  max_hours_per_day INTEGER DEFAULT 12,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_worker_availability TO authenticated;
GRANT ALL ON public.sw_worker_availability TO service_role;
ALTER TABLE public.sw_worker_availability ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_wa_all ON public.sw_worker_availability FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.sw_workers w WHERE w.id = worker_id AND (w.user_id = auth.uid() OR public.sw_is_org_member(auth.uid(), w.staffing_org_id))))
  WITH CHECK (EXISTS (SELECT 1 FROM public.sw_workers w WHERE w.id = worker_id AND (w.user_id = auth.uid() OR public.sw_is_org_member(auth.uid(), w.staffing_org_id))));

-- 5. SHIFT REQUIREMENTS
CREATE TABLE public.sw_shift_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.sw_clients(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES public.sw_properties(id) ON DELETE CASCADE,
  department_id UUID REFERENCES public.sw_departments(id) ON DELETE SET NULL,
  role_code_id UUID REFERENCES public.sw_role_codes(id) ON DELETE SET NULL,
  shift_start_time TIME NOT NULL, shift_end_time TIME NOT NULL,
  days_of_week INTEGER[] NOT NULL,
  required_employees INTEGER DEFAULT 1,
  required_weekly_hours NUMERIC,
  effective_start_date DATE NOT NULL, effective_end_date DATE,
  priority INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_shift_requirements TO authenticated;
GRANT ALL ON public.sw_shift_requirements TO service_role;
ALTER TABLE public.sw_shift_requirements ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_req_select ON public.sw_shift_requirements FOR SELECT TO authenticated
  USING (public.sw_is_org_member(auth.uid(), staffing_org_id));
CREATE POLICY sw_req_manage ON public.sw_shift_requirements FOR ALL TO authenticated
  USING (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','staffing_scheduler','client_corp_admin','super_admin']::sw_role[]))
  WITH CHECK (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','staffing_scheduler','client_corp_admin','super_admin']::sw_role[]));

-- 6. SCHEDULES & SHIFTS
CREATE TABLE public.sw_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.sw_properties(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  status sw_schedule_status NOT NULL DEFAULT 'draft',
  notes TEXT,
  created_by UUID,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_schedules TO authenticated;
GRANT ALL ON public.sw_schedules TO service_role;
ALTER TABLE public.sw_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_sched_select ON public.sw_schedules FOR SELECT TO authenticated
  USING (public.sw_is_org_member(auth.uid(), staffing_org_id));
CREATE POLICY sw_sched_manage ON public.sw_schedules FOR ALL TO authenticated
  USING (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','staffing_scheduler','property_manager','super_admin']::sw_role[]))
  WITH CHECK (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','staffing_scheduler','property_manager','super_admin']::sw_role[]));

CREATE TABLE public.sw_schedule_shifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID NOT NULL REFERENCES public.sw_schedules(id) ON DELETE CASCADE,
  worker_id UUID REFERENCES public.sw_workers(id) ON DELETE SET NULL,
  property_id UUID NOT NULL REFERENCES public.sw_properties(id) ON DELETE CASCADE,
  role_code_id UUID REFERENCES public.sw_role_codes(id) ON DELETE SET NULL,
  shift_date DATE NOT NULL,
  start_time TIME NOT NULL, end_time TIME NOT NULL,
  is_uncovered BOOLEAN DEFAULT false,
  override_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_schedule_shifts TO authenticated;
GRANT ALL ON public.sw_schedule_shifts TO service_role;
ALTER TABLE public.sw_schedule_shifts ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_ss_all ON public.sw_schedule_shifts FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.sw_schedules s WHERE s.id = schedule_id AND public.sw_is_org_member(auth.uid(), s.staffing_org_id)))
  WITH CHECK (EXISTS (SELECT 1 FROM public.sw_schedules s WHERE s.id = schedule_id AND public.sw_is_org_member(auth.uid(), s.staffing_org_id)));

CREATE TABLE public.sw_shift_acceptance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shift_id UUID NOT NULL REFERENCES public.sw_schedule_shifts(id) ON DELETE CASCADE,
  worker_id UUID NOT NULL REFERENCES public.sw_workers(id) ON DELETE CASCADE,
  status sw_shift_acceptance_status NOT NULL DEFAULT 'pending',
  response_note TEXT,
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_shift_acceptance TO authenticated;
GRANT ALL ON public.sw_shift_acceptance TO service_role;
ALTER TABLE public.sw_shift_acceptance ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_sa_all ON public.sw_shift_acceptance FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.sw_workers w WHERE w.id = worker_id AND (w.user_id = auth.uid() OR public.sw_is_org_member(auth.uid(), w.staffing_org_id))))
  WITH CHECK (EXISTS (SELECT 1 FROM public.sw_workers w WHERE w.id = worker_id AND (w.user_id = auth.uid() OR public.sw_is_org_member(auth.uid(), w.staffing_org_id))));

-- 7. TIME ENTRIES, BREAKS, CORRECTIONS, DISPUTES
CREATE TABLE public.sw_time_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  worker_id UUID NOT NULL REFERENCES public.sw_workers(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES public.sw_properties(id) ON DELETE CASCADE,
  shift_id UUID REFERENCES public.sw_schedule_shifts(id) ON DELETE SET NULL,
  role_code_id UUID REFERENCES public.sw_role_codes(id) ON DELETE SET NULL,
  clock_in_at TIMESTAMPTZ NOT NULL,
  clock_out_at TIMESTAMPTZ,
  clock_in_lat NUMERIC, clock_in_lng NUMERIC,
  clock_out_lat NUMERIC, clock_out_lng NUMERIC,
  device_info JSONB, ip_address TEXT,
  total_worked_minutes INTEGER, break_minutes INTEGER DEFAULT 0,
  overtime_minutes INTEGER DEFAULT 0,
  status sw_time_entry_status NOT NULL DEFAULT 'clocked_in',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_time_entries TO authenticated;
GRANT ALL ON public.sw_time_entries TO service_role;
ALTER TABLE public.sw_time_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_te_select ON public.sw_time_entries FOR SELECT TO authenticated
  USING (public.sw_is_org_member(auth.uid(), staffing_org_id)
    OR EXISTS (SELECT 1 FROM public.sw_workers w WHERE w.id = worker_id AND w.user_id = auth.uid()));
CREATE POLICY sw_te_insert ON public.sw_time_entries FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.sw_workers w WHERE w.id = worker_id AND w.user_id = auth.uid())
    OR public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','staffing_scheduler','property_manager','super_admin']::sw_role[]));
CREATE POLICY sw_te_update ON public.sw_time_entries FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.sw_workers w WHERE w.id = worker_id AND w.user_id = auth.uid())
    OR public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','staffing_scheduler','property_manager','super_admin']::sw_role[]));
CREATE POLICY sw_te_delete ON public.sw_time_entries FOR DELETE TO authenticated
  USING (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','super_admin']::sw_role[]));

CREATE TABLE public.sw_break_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  time_entry_id UUID NOT NULL REFERENCES public.sw_time_entries(id) ON DELETE CASCADE,
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ,
  minutes INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_break_entries TO authenticated;
GRANT ALL ON public.sw_break_entries TO service_role;
ALTER TABLE public.sw_break_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_be_all ON public.sw_break_entries FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.sw_time_entries t WHERE t.id = time_entry_id
    AND (public.sw_is_org_member(auth.uid(), t.staffing_org_id)
         OR EXISTS (SELECT 1 FROM public.sw_workers w WHERE w.id = t.worker_id AND w.user_id = auth.uid()))))
  WITH CHECK (EXISTS (SELECT 1 FROM public.sw_time_entries t WHERE t.id = time_entry_id
    AND (public.sw_is_org_member(auth.uid(), t.staffing_org_id)
         OR EXISTS (SELECT 1 FROM public.sw_workers w WHERE w.id = t.worker_id AND w.user_id = auth.uid()))));

CREATE TABLE public.sw_time_correction_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  time_entry_id UUID NOT NULL REFERENCES public.sw_time_entries(id) ON DELETE CASCADE,
  requested_by UUID NOT NULL,
  proposed_clock_in TIMESTAMPTZ, proposed_clock_out TIMESTAMPTZ,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  reviewed_by UUID, reviewed_at TIMESTAMPTZ, review_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_time_correction_requests TO authenticated;
GRANT ALL ON public.sw_time_correction_requests TO service_role;
ALTER TABLE public.sw_time_correction_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_tcr_all ON public.sw_time_correction_requests FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.sw_time_entries t WHERE t.id = time_entry_id
    AND (public.sw_is_org_member(auth.uid(), t.staffing_org_id)
         OR EXISTS (SELECT 1 FROM public.sw_workers w WHERE w.id = t.worker_id AND w.user_id = auth.uid()))))
  WITH CHECK (EXISTS (SELECT 1 FROM public.sw_time_entries t WHERE t.id = time_entry_id
    AND (public.sw_is_org_member(auth.uid(), t.staffing_org_id)
         OR EXISTS (SELECT 1 FROM public.sw_workers w WHERE w.id = t.worker_id AND w.user_id = auth.uid()))));

CREATE TABLE public.sw_hour_disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  time_entry_id UUID NOT NULL REFERENCES public.sw_time_entries(id) ON DELETE CASCADE,
  disputed_by UUID NOT NULL,
  disputed_minutes INTEGER NOT NULL,
  reason TEXT NOT NULL,
  status sw_dispute_status NOT NULL DEFAULT 'open',
  resolution_note TEXT, resolved_by UUID, resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_hour_disputes TO authenticated;
GRANT ALL ON public.sw_hour_disputes TO service_role;
ALTER TABLE public.sw_hour_disputes ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_hd_select ON public.sw_hour_disputes FOR SELECT TO authenticated
  USING (public.sw_is_org_member(auth.uid(), staffing_org_id)
    OR EXISTS (SELECT 1 FROM public.sw_time_entries t JOIN public.sw_workers w ON w.id = t.worker_id WHERE t.id = time_entry_id AND w.user_id = auth.uid()));
CREATE POLICY sw_hd_manage ON public.sw_hour_disputes FOR ALL TO authenticated
  USING (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','property_manager','client_corp_admin','client_billing','super_admin']::sw_role[]))
  WITH CHECK (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','property_manager','client_corp_admin','client_billing','super_admin']::sw_role[]));

-- 8. INVOICES & PAYMENTS
CREATE TABLE public.sw_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.sw_clients(id) ON DELETE RESTRICT,
  property_id UUID REFERENCES public.sw_properties(id) ON DELETE SET NULL,
  invoice_number TEXT NOT NULL,
  period_start DATE NOT NULL, period_end DATE NOT NULL,
  subtotal NUMERIC NOT NULL DEFAULT 0,
  tax NUMERIC NOT NULL DEFAULT 0,
  total NUMERIC NOT NULL DEFAULT 0,
  amount_paid NUMERIC NOT NULL DEFAULT 0,
  status sw_invoice_status NOT NULL DEFAULT 'draft',
  stripe_invoice_id TEXT, stripe_payment_intent_id TEXT,
  submitted_at TIMESTAMPTZ, approved_at TIMESTAMPTZ, paid_at TIMESTAMPTZ,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(staffing_org_id, invoice_number)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_invoices TO authenticated;
GRANT ALL ON public.sw_invoices TO service_role;
ALTER TABLE public.sw_invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_inv_select ON public.sw_invoices FOR SELECT TO authenticated
  USING (public.sw_is_org_member(auth.uid(), staffing_org_id)
    OR EXISTS (SELECT 1 FROM public.sw_clients c WHERE c.id = client_id AND c.client_org_id IS NOT NULL AND public.sw_is_org_member(auth.uid(), c.client_org_id)));
CREATE POLICY sw_inv_manage ON public.sw_invoices FOR ALL TO authenticated
  USING (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','staffing_accountant','staffing_payroll','super_admin']::sw_role[]))
  WITH CHECK (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','staffing_accountant','staffing_payroll','super_admin']::sw_role[]));

CREATE TABLE public.sw_invoice_line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES public.sw_invoices(id) ON DELETE CASCADE,
  time_entry_id UUID REFERENCES public.sw_time_entries(id) ON DELETE SET NULL,
  worker_name TEXT, role_code TEXT, department TEXT,
  shift_date DATE,
  clock_in_at TIMESTAMPTZ, clock_out_at TIMESTAMPTZ,
  actual_minutes INTEGER NOT NULL DEFAULT 0,
  disputed_minutes INTEGER NOT NULL DEFAULT 0,
  billable_minutes INTEGER NOT NULL DEFAULT 0,
  bill_rate NUMERIC NOT NULL DEFAULT 0,
  line_total NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_invoice_line_items TO authenticated;
GRANT ALL ON public.sw_invoice_line_items TO service_role;
ALTER TABLE public.sw_invoice_line_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_ili_all ON public.sw_invoice_line_items FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.sw_invoices i WHERE i.id = invoice_id AND public.sw_is_org_member(auth.uid(), i.staffing_org_id)))
  WITH CHECK (EXISTS (SELECT 1 FROM public.sw_invoices i WHERE i.id = invoice_id AND public.sw_is_org_member(auth.uid(), i.staffing_org_id)));

CREATE TABLE public.sw_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  invoice_id UUID NOT NULL REFERENCES public.sw_invoices(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  stripe_session_id TEXT, stripe_payment_intent_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_payments TO authenticated;
GRANT ALL ON public.sw_payments TO service_role;
ALTER TABLE public.sw_payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_pay_select ON public.sw_payments FOR SELECT TO authenticated
  USING (public.sw_is_org_member(auth.uid(), staffing_org_id));
CREATE POLICY sw_pay_insert ON public.sw_payments FOR INSERT TO authenticated
  WITH CHECK (public.sw_is_org_member(auth.uid(), staffing_org_id));
CREATE POLICY sw_pay_update ON public.sw_payments FOR UPDATE TO authenticated
  USING (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','staffing_accountant','super_admin']::sw_role[]));

-- 9. LEDGER
CREATE TABLE public.sw_ledger_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  code TEXT NOT NULL, name TEXT NOT NULL,
  account_type TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(staffing_org_id, code)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_ledger_accounts TO authenticated;
GRANT ALL ON public.sw_ledger_accounts TO service_role;
ALTER TABLE public.sw_ledger_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_la_select ON public.sw_ledger_accounts FOR SELECT TO authenticated
  USING (public.sw_is_org_member(auth.uid(), staffing_org_id));
CREATE POLICY sw_la_manage ON public.sw_ledger_accounts FOR ALL TO authenticated
  USING (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','staffing_accountant','super_admin']::sw_role[]))
  WITH CHECK (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','staffing_accountant','super_admin']::sw_role[]));

CREATE TABLE public.sw_ledger_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  entry_date DATE NOT NULL,
  transaction_type TEXT NOT NULL,
  reference_type TEXT, reference_id UUID,
  debit_account_id UUID REFERENCES public.sw_ledger_accounts(id) ON DELETE SET NULL,
  credit_account_id UUID REFERENCES public.sw_ledger_accounts(id) ON DELETE SET NULL,
  amount NUMERIC NOT NULL,
  client_id UUID, property_id UUID,
  description TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_ledger_entries TO authenticated;
GRANT ALL ON public.sw_ledger_entries TO service_role;
ALTER TABLE public.sw_ledger_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_le_select ON public.sw_ledger_entries FOR SELECT TO authenticated
  USING (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','staffing_accountant','staffing_payroll','super_admin']::sw_role[]));
CREATE POLICY sw_le_insert ON public.sw_ledger_entries FOR INSERT TO authenticated
  WITH CHECK (public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','staffing_accountant','super_admin']::sw_role[]));

-- 10. COMMENTS, NOTIFICATIONS, AUDIT
CREATE TABLE public.sw_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL, entity_id UUID NOT NULL,
  user_id UUID NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_comments TO authenticated;
GRANT ALL ON public.sw_comments TO service_role;
ALTER TABLE public.sw_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_cm_select ON public.sw_comments FOR SELECT TO authenticated
  USING (public.sw_is_org_member(auth.uid(), staffing_org_id));
CREATE POLICY sw_cm_insert ON public.sw_comments FOR INSERT TO authenticated
  WITH CHECK (public.sw_is_org_member(auth.uid(), staffing_org_id) AND user_id = auth.uid());
CREATE POLICY sw_cm_update ON public.sw_comments FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY sw_cm_delete ON public.sw_comments FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.sw_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID NOT NULL REFERENCES public.sw_organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL, body TEXT,
  entity_type TEXT, entity_id UUID,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sw_notifications TO authenticated;
GRANT ALL ON public.sw_notifications TO service_role;
ALTER TABLE public.sw_notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_nt_select ON public.sw_notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY sw_nt_update ON public.sw_notifications FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY sw_nt_insert ON public.sw_notifications FOR INSERT TO authenticated
  WITH CHECK (public.sw_is_org_member(auth.uid(), staffing_org_id));

CREATE TABLE public.sw_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staffing_org_id UUID REFERENCES public.sw_organizations(id) ON DELETE SET NULL,
  user_id UUID,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL, entity_id UUID,
  old_value JSONB, new_value JSONB,
  ip_address TEXT, device_info JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.sw_audit_logs TO authenticated;
GRANT ALL ON public.sw_audit_logs TO service_role;
ALTER TABLE public.sw_audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY sw_al_select ON public.sw_audit_logs FOR SELECT TO authenticated
  USING ((staffing_org_id IS NULL AND public.sw_is_super_admin(auth.uid()))
    OR (staffing_org_id IS NOT NULL AND public.sw_has_org_role(auth.uid(), staffing_org_id, ARRAY['staffing_owner','staffing_admin','super_admin']::sw_role[])));
CREATE POLICY sw_al_insert ON public.sw_audit_logs FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- TIMESTAMP TRIGGERS
CREATE TRIGGER sw_orgs_upd BEFORE UPDATE ON public.sw_organizations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER sw_clients_upd BEFORE UPDATE ON public.sw_clients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER sw_props_upd BEFORE UPDATE ON public.sw_properties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER sw_workers_upd BEFORE UPDATE ON public.sw_workers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER sw_reqs_upd BEFORE UPDATE ON public.sw_shift_requirements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER sw_sched_upd BEFORE UPDATE ON public.sw_schedules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER sw_time_upd BEFORE UPDATE ON public.sw_time_entries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER sw_inv_upd BEFORE UPDATE ON public.sw_invoices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
