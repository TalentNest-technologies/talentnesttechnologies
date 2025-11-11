-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE public.app_role AS ENUM ('super_admin', 'owner', 'manager', 'front_desk', 'housekeeping', 'auditor');
CREATE TYPE public.business_type AS ENUM ('hotel', 'restaurant', 'store', 'other');
CREATE TYPE public.pms_system AS ENUM ('opera', 'cloudbeds', 'choice_advantage', 'custom', 'none');
CREATE TYPE public.booking_status AS ENUM ('confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show');
CREATE TYPE public.room_status AS ENUM ('available', 'occupied', 'dirty', 'clean', 'maintenance', 'out_of_order');

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- User roles table (separate for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'front_desk',
  business_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role, business_id)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Businesses table
CREATE TABLE public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  business_type business_type NOT NULL DEFAULT 'hotel',
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  country TEXT DEFAULT 'USA',
  phone TEXT,
  email TEXT,
  website TEXT,
  pms_system pms_system DEFAULT 'none',
  pms_api_key TEXT,
  pms_credentials JSONB,
  google_business_id TEXT,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Rooms table
CREATE TABLE public.rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  room_number TEXT NOT NULL,
  room_type TEXT NOT NULL,
  floor INTEGER,
  status room_status DEFAULT 'available',
  base_price DECIMAL(10,2),
  max_occupancy INTEGER DEFAULT 2,
  amenities JSONB DEFAULT '[]',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(business_id, room_number)
);

ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- Bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT,
  guest_phone TEXT,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  adults INTEGER DEFAULT 1,
  children INTEGER DEFAULT 0,
  status booking_status DEFAULT 'confirmed',
  booking_source TEXT,
  total_amount DECIMAL(10,2),
  paid_amount DECIMAL(10,2) DEFAULT 0,
  special_requests TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Revenue records table
CREATE TABLE public.revenue_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  room_revenue DECIMAL(10,2) DEFAULT 0,
  food_beverage_revenue DECIMAL(10,2) DEFAULT 0,
  other_revenue DECIMAL(10,2) DEFAULT 0,
  total_revenue DECIMAL(10,2) GENERATED ALWAYS AS (room_revenue + food_beverage_revenue + other_revenue) STORED,
  rooms_sold INTEGER DEFAULT 0,
  rooms_available INTEGER DEFAULT 0,
  adr DECIMAL(10,2),
  occupancy_rate DECIMAL(5,2),
  revpar DECIMAL(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(business_id, date)
);

ALTER TABLE public.revenue_records ENABLE ROW LEVEL SECURITY;

-- Google reviews table
CREATE TABLE public.google_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  review_id TEXT UNIQUE,
  reviewer_name TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  review_date TIMESTAMPTZ,
  sentiment TEXT,
  ai_reply TEXT,
  reply_posted BOOLEAN DEFAULT false,
  reply_posted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.google_reviews ENABLE ROW LEVEL SECURITY;

-- Competitor rates table
CREATE TABLE public.competitor_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  competitor_name TEXT NOT NULL,
  competitor_url TEXT,
  date DATE NOT NULL,
  room_type TEXT,
  rate DECIMAL(10,2),
  availability TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(business_id, competitor_name, date, room_type)
);

ALTER TABLE public.competitor_rates ENABLE ROW LEVEL SECURITY;

-- Housekeeping tasks table
CREATE TABLE public.housekeeping_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  task_type TEXT NOT NULL,
  priority TEXT DEFAULT 'normal',
  status TEXT DEFAULT 'pending',
  notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.housekeeping_tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Owners and admins can manage roles" ON public.user_roles
  FOR ALL USING (
    public.has_role(auth.uid(), 'super_admin') OR 
    public.has_role(auth.uid(), 'owner')
  );

-- RLS Policies for businesses
CREATE POLICY "Users can view businesses they have access to" ON public.businesses
  FOR SELECT USING (
    auth.uid() = owner_id OR
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.business_id = businesses.id
    )
  );

CREATE POLICY "Owners can insert businesses" ON public.businesses
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own businesses" ON public.businesses
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete own businesses" ON public.businesses
  FOR DELETE USING (auth.uid() = owner_id);

-- RLS Policies for rooms
CREATE POLICY "Users can view rooms for accessible businesses" ON public.rooms
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.businesses
      WHERE businesses.id = rooms.business_id
      AND (
        businesses.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
          AND user_roles.business_id = businesses.id
        )
      )
    )
  );

CREATE POLICY "Managers can manage rooms" ON public.rooms
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.business_id = rooms.business_id
      AND user_roles.role IN ('owner', 'manager', 'super_admin')
    )
  );

-- RLS Policies for bookings
CREATE POLICY "Users can view bookings for accessible businesses" ON public.bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.businesses
      WHERE businesses.id = bookings.business_id
      AND (
        businesses.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
          AND user_roles.business_id = businesses.id
        )
      )
    )
  );

CREATE POLICY "Staff can manage bookings" ON public.bookings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.business_id = bookings.business_id
      AND user_roles.role IN ('owner', 'manager', 'front_desk', 'super_admin')
    )
  );

-- RLS Policies for revenue_records
CREATE POLICY "Users can view revenue for accessible businesses" ON public.revenue_records
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.businesses
      WHERE businesses.id = revenue_records.business_id
      AND (
        businesses.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
          AND user_roles.business_id = businesses.id
        )
      )
    )
  );

CREATE POLICY "Managers can manage revenue records" ON public.revenue_records
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.business_id = revenue_records.business_id
      AND user_roles.role IN ('owner', 'manager', 'auditor', 'super_admin')
    )
  );

-- RLS Policies for google_reviews
CREATE POLICY "Users can view reviews for accessible businesses" ON public.google_reviews
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.businesses
      WHERE businesses.id = google_reviews.business_id
      AND (
        businesses.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
          AND user_roles.business_id = businesses.id
        )
      )
    )
  );

CREATE POLICY "System can manage reviews" ON public.google_reviews
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.business_id = google_reviews.business_id
      AND user_roles.role IN ('owner', 'manager', 'super_admin')
    )
  );

-- RLS Policies for competitor_rates
CREATE POLICY "Users can view competitor rates for accessible businesses" ON public.competitor_rates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.businesses
      WHERE businesses.id = competitor_rates.business_id
      AND (
        businesses.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
          AND user_roles.business_id = businesses.id
        )
      )
    )
  );

CREATE POLICY "Managers can manage competitor rates" ON public.competitor_rates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.business_id = competitor_rates.business_id
      AND user_roles.role IN ('owner', 'manager', 'super_admin')
    )
  );

-- RLS Policies for housekeeping_tasks
CREATE POLICY "Users can view housekeeping tasks for accessible businesses" ON public.housekeeping_tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.businesses
      WHERE businesses.id = housekeeping_tasks.business_id
      AND (
        businesses.owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_roles.user_id = auth.uid()
          AND user_roles.business_id = businesses.id
        )
      )
    )
  );

CREATE POLICY "Staff can manage housekeeping tasks" ON public.housekeeping_tasks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.business_id = housekeeping_tasks.business_id
      AND user_roles.role IN ('owner', 'manager', 'housekeeping', 'super_admin')
    )
  );

-- Trigger function to auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON public.businesses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON public.rooms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_revenue_records_updated_at BEFORE UPDATE ON public.revenue_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_google_reviews_updated_at BEFORE UPDATE ON public.google_reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_housekeeping_tasks_updated_at BEFORE UPDATE ON public.housekeeping_tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  
  -- Give new users front_desk role by default
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'front_desk');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();