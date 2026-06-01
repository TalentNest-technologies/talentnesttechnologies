export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          adults: number | null
          booking_source: string | null
          business_id: string
          check_in_date: string
          check_out_date: string
          children: number | null
          created_at: string
          guest_email: string | null
          guest_name: string
          guest_phone: string | null
          id: string
          metadata: Json | null
          paid_amount: number | null
          room_id: string | null
          special_requests: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          adults?: number | null
          booking_source?: string | null
          business_id: string
          check_in_date: string
          check_out_date: string
          children?: number | null
          created_at?: string
          guest_email?: string | null
          guest_name: string
          guest_phone?: string | null
          id?: string
          metadata?: Json | null
          paid_amount?: number | null
          room_id?: string | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          adults?: number | null
          booking_source?: string | null
          business_id?: string
          check_in_date?: string
          check_out_date?: string
          children?: number | null
          created_at?: string
          guest_email?: string | null
          guest_name?: string
          guest_phone?: string | null
          id?: string
          metadata?: Json | null
          paid_amount?: number | null
          room_id?: string | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          address: string | null
          business_type: Database["public"]["Enums"]["business_type"]
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          google_business_id: string | null
          id: string
          is_active: boolean | null
          name: string
          owner_id: string
          phone: string | null
          pms_api_key: string | null
          pms_api_key_encrypted: string | null
          pms_credentials: Json | null
          pms_credentials_encrypted: string | null
          pms_system: Database["public"]["Enums"]["pms_system"] | null
          settings: Json | null
          state: string | null
          updated_at: string
          website: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          business_type?: Database["public"]["Enums"]["business_type"]
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          google_business_id?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          owner_id: string
          phone?: string | null
          pms_api_key?: string | null
          pms_api_key_encrypted?: string | null
          pms_credentials?: Json | null
          pms_credentials_encrypted?: string | null
          pms_system?: Database["public"]["Enums"]["pms_system"] | null
          settings?: Json | null
          state?: string | null
          updated_at?: string
          website?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          business_type?: Database["public"]["Enums"]["business_type"]
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          google_business_id?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          owner_id?: string
          phone?: string | null
          pms_api_key?: string | null
          pms_api_key_encrypted?: string | null
          pms_credentials?: Json | null
          pms_credentials_encrypted?: string | null
          pms_system?: Database["public"]["Enums"]["pms_system"] | null
          settings?: Json | null
          state?: string | null
          updated_at?: string
          website?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      competitor_rates: {
        Row: {
          availability: string | null
          business_id: string
          competitor_name: string
          competitor_url: string | null
          created_at: string
          date: string
          id: string
          metadata: Json | null
          rate: number | null
          room_type: string | null
        }
        Insert: {
          availability?: string | null
          business_id: string
          competitor_name: string
          competitor_url?: string | null
          created_at?: string
          date: string
          id?: string
          metadata?: Json | null
          rate?: number | null
          room_type?: string | null
        }
        Update: {
          availability?: string | null
          business_id?: string
          competitor_name?: string
          competitor_url?: string | null
          created_at?: string
          date?: string
          id?: string
          metadata?: Json | null
          rate?: number | null
          room_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "competitor_rates_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      google_reviews: {
        Row: {
          ai_reply: string | null
          business_id: string
          created_at: string
          id: string
          rating: number | null
          reply_posted: boolean | null
          reply_posted_at: string | null
          review_date: string | null
          review_id: string | null
          review_text: string | null
          reviewer_name: string | null
          sentiment: string | null
          updated_at: string
        }
        Insert: {
          ai_reply?: string | null
          business_id: string
          created_at?: string
          id?: string
          rating?: number | null
          reply_posted?: boolean | null
          reply_posted_at?: string | null
          review_date?: string | null
          review_id?: string | null
          review_text?: string | null
          reviewer_name?: string | null
          sentiment?: string | null
          updated_at?: string
        }
        Update: {
          ai_reply?: string | null
          business_id?: string
          created_at?: string
          id?: string
          rating?: number | null
          reply_posted?: boolean | null
          reply_posted_at?: string | null
          review_date?: string | null
          review_id?: string | null
          review_text?: string | null
          reviewer_name?: string | null
          sentiment?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "google_reviews_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      housekeeping_tasks: {
        Row: {
          assigned_to: string | null
          business_id: string
          completed_at: string | null
          created_at: string
          id: string
          notes: string | null
          priority: string | null
          room_id: string
          status: string | null
          task_type: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          business_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          priority?: string | null
          room_id: string
          status?: string | null
          task_type: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          business_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          priority?: string | null
          room_id?: string
          status?: string | null
          task_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "housekeeping_tasks_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "housekeeping_tasks_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      revenue_records: {
        Row: {
          adr: number | null
          booking_id: string | null
          business_id: string
          created_at: string
          date: string
          food_beverage_revenue: number | null
          id: string
          occupancy_rate: number | null
          other_revenue: number | null
          revpar: number | null
          room_revenue: number | null
          rooms_available: number | null
          rooms_sold: number | null
          total_revenue: number | null
          updated_at: string
        }
        Insert: {
          adr?: number | null
          booking_id?: string | null
          business_id: string
          created_at?: string
          date: string
          food_beverage_revenue?: number | null
          id?: string
          occupancy_rate?: number | null
          other_revenue?: number | null
          revpar?: number | null
          room_revenue?: number | null
          rooms_available?: number | null
          rooms_sold?: number | null
          total_revenue?: number | null
          updated_at?: string
        }
        Update: {
          adr?: number | null
          booking_id?: string | null
          business_id?: string
          created_at?: string
          date?: string
          food_beverage_revenue?: number | null
          id?: string
          occupancy_rate?: number | null
          other_revenue?: number | null
          revpar?: number | null
          room_revenue?: number | null
          rooms_available?: number | null
          rooms_sold?: number | null
          total_revenue?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "revenue_records_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "revenue_records_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          amenities: Json | null
          base_price: number | null
          business_id: string
          created_at: string
          floor: number | null
          id: string
          max_occupancy: number | null
          notes: string | null
          room_number: string
          room_type: string
          status: Database["public"]["Enums"]["room_status"] | null
          updated_at: string
        }
        Insert: {
          amenities?: Json | null
          base_price?: number | null
          business_id: string
          created_at?: string
          floor?: number | null
          id?: string
          max_occupancy?: number | null
          notes?: string | null
          room_number: string
          room_type: string
          status?: Database["public"]["Enums"]["room_status"] | null
          updated_at?: string
        }
        Update: {
          amenities?: Json | null
          base_price?: number | null
          business_id?: string
          created_at?: string
          floor?: number | null
          id?: string
          max_occupancy?: number | null
          notes?: string | null
          room_number?: string
          room_type?: string
          status?: Database["public"]["Enums"]["room_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_audit_logs: {
        Row: {
          action: string
          created_at: string
          device_info: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          new_value: Json | null
          old_value: Json | null
          staffing_org_id: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          device_info?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          new_value?: Json | null
          old_value?: Json | null
          staffing_org_id?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          device_info?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          new_value?: Json | null
          old_value?: Json | null
          staffing_org_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sw_audit_logs_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_break_entries: {
        Row: {
          created_at: string
          end_at: string | null
          id: string
          minutes: number | null
          start_at: string
          time_entry_id: string
        }
        Insert: {
          created_at?: string
          end_at?: string | null
          id?: string
          minutes?: number | null
          start_at: string
          time_entry_id: string
        }
        Update: {
          created_at?: string
          end_at?: string | null
          id?: string
          minutes?: number | null
          start_at?: string
          time_entry_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_break_entries_time_entry_id_fkey"
            columns: ["time_entry_id"]
            isOneToOne: false
            referencedRelation: "sw_time_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_clients: {
        Row: {
          address: string | null
          billing_email: string | null
          city: string | null
          client_org_id: string | null
          company_name: string
          contact_person: string | null
          created_at: string
          id: string
          is_active: boolean | null
          payment_terms: string | null
          phone: string | null
          staffing_org_id: string
          state: string | null
          stripe_customer_id: string | null
          updated_at: string
          zip: string | null
        }
        Insert: {
          address?: string | null
          billing_email?: string | null
          city?: string | null
          client_org_id?: string | null
          company_name: string
          contact_person?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          payment_terms?: string | null
          phone?: string | null
          staffing_org_id: string
          state?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
          zip?: string | null
        }
        Update: {
          address?: string | null
          billing_email?: string | null
          city?: string | null
          client_org_id?: string | null
          company_name?: string
          contact_person?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          payment_terms?: string | null
          phone?: string | null
          staffing_org_id?: string
          state?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sw_clients_client_org_id_fkey"
            columns: ["client_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_clients_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_comments: {
        Row: {
          body: string
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          staffing_org_id: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          staffing_org_id: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          staffing_org_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_comments_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_departments: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string
          staffing_org_id: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name: string
          staffing_org_id: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string
          staffing_org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_departments_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_hour_disputes: {
        Row: {
          created_at: string
          disputed_by: string
          disputed_minutes: number
          id: string
          reason: string
          resolution_note: string | null
          resolved_at: string | null
          resolved_by: string | null
          staffing_org_id: string
          status: Database["public"]["Enums"]["sw_dispute_status"]
          time_entry_id: string
        }
        Insert: {
          created_at?: string
          disputed_by: string
          disputed_minutes: number
          id?: string
          reason: string
          resolution_note?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          staffing_org_id: string
          status?: Database["public"]["Enums"]["sw_dispute_status"]
          time_entry_id: string
        }
        Update: {
          created_at?: string
          disputed_by?: string
          disputed_minutes?: number
          id?: string
          reason?: string
          resolution_note?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          staffing_org_id?: string
          status?: Database["public"]["Enums"]["sw_dispute_status"]
          time_entry_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_hour_disputes_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_hour_disputes_time_entry_id_fkey"
            columns: ["time_entry_id"]
            isOneToOne: false
            referencedRelation: "sw_time_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_invoice_line_items: {
        Row: {
          actual_minutes: number
          bill_rate: number
          billable_minutes: number
          clock_in_at: string | null
          clock_out_at: string | null
          created_at: string
          department: string | null
          disputed_minutes: number
          id: string
          invoice_id: string
          line_total: number
          role_code: string | null
          shift_date: string | null
          time_entry_id: string | null
          worker_name: string | null
        }
        Insert: {
          actual_minutes?: number
          bill_rate?: number
          billable_minutes?: number
          clock_in_at?: string | null
          clock_out_at?: string | null
          created_at?: string
          department?: string | null
          disputed_minutes?: number
          id?: string
          invoice_id: string
          line_total?: number
          role_code?: string | null
          shift_date?: string | null
          time_entry_id?: string | null
          worker_name?: string | null
        }
        Update: {
          actual_minutes?: number
          bill_rate?: number
          billable_minutes?: number
          clock_in_at?: string | null
          clock_out_at?: string | null
          created_at?: string
          department?: string | null
          disputed_minutes?: number
          id?: string
          invoice_id?: string
          line_total?: number
          role_code?: string | null
          shift_date?: string | null
          time_entry_id?: string | null
          worker_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sw_invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "sw_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_invoice_line_items_time_entry_id_fkey"
            columns: ["time_entry_id"]
            isOneToOne: false
            referencedRelation: "sw_time_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_invoices: {
        Row: {
          amount_paid: number
          approved_at: string | null
          client_id: string
          created_at: string
          created_by: string | null
          id: string
          invoice_number: string
          notes: string | null
          paid_at: string | null
          period_end: string
          period_start: string
          property_id: string | null
          staffing_org_id: string
          status: Database["public"]["Enums"]["sw_invoice_status"]
          stripe_invoice_id: string | null
          stripe_payment_intent_id: string | null
          submitted_at: string | null
          subtotal: number
          tax: number
          total: number
          updated_at: string
        }
        Insert: {
          amount_paid?: number
          approved_at?: string | null
          client_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          invoice_number: string
          notes?: string | null
          paid_at?: string | null
          period_end: string
          period_start: string
          property_id?: string | null
          staffing_org_id: string
          status?: Database["public"]["Enums"]["sw_invoice_status"]
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          submitted_at?: string | null
          subtotal?: number
          tax?: number
          total?: number
          updated_at?: string
        }
        Update: {
          amount_paid?: number
          approved_at?: string | null
          client_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          invoice_number?: string
          notes?: string | null
          paid_at?: string | null
          period_end?: string
          period_start?: string
          property_id?: string | null
          staffing_org_id?: string
          status?: Database["public"]["Enums"]["sw_invoice_status"]
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          submitted_at?: string | null
          subtotal?: number
          tax?: number
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "sw_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_invoices_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "sw_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_invoices_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_ledger_accounts: {
        Row: {
          account_type: string
          code: string
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          staffing_org_id: string
        }
        Insert: {
          account_type: string
          code: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          staffing_org_id: string
        }
        Update: {
          account_type?: string
          code?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          staffing_org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_ledger_accounts_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_ledger_entries: {
        Row: {
          amount: number
          client_id: string | null
          created_at: string
          created_by: string | null
          credit_account_id: string | null
          debit_account_id: string | null
          description: string | null
          entry_date: string
          id: string
          property_id: string | null
          reference_id: string | null
          reference_type: string | null
          staffing_org_id: string
          transaction_type: string
        }
        Insert: {
          amount: number
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          credit_account_id?: string | null
          debit_account_id?: string | null
          description?: string | null
          entry_date: string
          id?: string
          property_id?: string | null
          reference_id?: string | null
          reference_type?: string | null
          staffing_org_id: string
          transaction_type: string
        }
        Update: {
          amount?: number
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          credit_account_id?: string | null
          debit_account_id?: string | null
          description?: string | null
          entry_date?: string
          id?: string
          property_id?: string | null
          reference_id?: string | null
          reference_type?: string | null
          staffing_org_id?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_ledger_entries_credit_account_id_fkey"
            columns: ["credit_account_id"]
            isOneToOne: false
            referencedRelation: "sw_ledger_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_ledger_entries_debit_account_id_fkey"
            columns: ["debit_account_id"]
            isOneToOne: false
            referencedRelation: "sw_ledger_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_ledger_entries_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_notifications: {
        Row: {
          body: string | null
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          is_read: boolean | null
          staffing_org_id: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          is_read?: boolean | null
          staffing_org_id: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          is_read?: boolean | null
          staffing_org_id?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_notifications_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_org_memberships: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          org_id: string
          property_id: string | null
          role: Database["public"]["Enums"]["sw_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          org_id: string
          property_id?: string | null
          role: Database["public"]["Enums"]["sw_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          org_id?: string
          property_id?: string | null
          role?: Database["public"]["Enums"]["sw_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_org_memberships_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_organizations: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          created_by: string | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          org_type: Database["public"]["Enums"]["sw_org_type"]
          parent_org_id: string | null
          payment_terms: string | null
          phone: string | null
          settings: Json | null
          state: string | null
          stripe_customer_id: string | null
          updated_at: string
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          org_type: Database["public"]["Enums"]["sw_org_type"]
          parent_org_id?: string | null
          payment_terms?: string | null
          phone?: string | null
          settings?: Json | null
          state?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          org_type?: Database["public"]["Enums"]["sw_org_type"]
          parent_org_id?: string | null
          payment_terms?: string | null
          phone?: string | null
          settings?: Json | null
          state?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sw_org_parent_fk"
            columns: ["parent_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          invoice_id: string
          metadata: Json | null
          paid_at: string | null
          staffing_org_id: string
          status: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          invoice_id: string
          metadata?: Json | null
          paid_at?: string | null
          staffing_org_id: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          invoice_id?: string
          metadata?: Json | null
          paid_at?: string | null
          staffing_org_id?: string
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sw_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "sw_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_payments_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_properties: {
        Row: {
          address: string | null
          billing_contact: string | null
          city: string | null
          client_id: string | null
          clock_in_radius_meters: number | null
          created_at: string
          franchise_brand: string | null
          gps_latitude: number | null
          gps_longitude: number | null
          id: string
          is_active: boolean | null
          name: string
          property_manager_user_id: string | null
          staffing_org_id: string
          state: string | null
          updated_at: string
          zip: string | null
        }
        Insert: {
          address?: string | null
          billing_contact?: string | null
          city?: string | null
          client_id?: string | null
          clock_in_radius_meters?: number | null
          created_at?: string
          franchise_brand?: string | null
          gps_latitude?: number | null
          gps_longitude?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          property_manager_user_id?: string | null
          staffing_org_id: string
          state?: string | null
          updated_at?: string
          zip?: string | null
        }
        Update: {
          address?: string | null
          billing_contact?: string | null
          city?: string | null
          client_id?: string | null
          clock_in_radius_meters?: number | null
          created_at?: string
          franchise_brand?: string | null
          gps_latitude?: number | null
          gps_longitude?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          property_manager_user_id?: string | null
          staffing_org_id?: string
          state?: string | null
          updated_at?: string
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sw_properties_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "sw_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_properties_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_role_codes: {
        Row: {
          created_at: string
          default_bill_rate: number | null
          default_pay_rate: number | null
          department_id: string | null
          id: string
          is_active: boolean | null
          role_code: string
          role_name: string
          staffing_org_id: string
        }
        Insert: {
          created_at?: string
          default_bill_rate?: number | null
          default_pay_rate?: number | null
          department_id?: string | null
          id?: string
          is_active?: boolean | null
          role_code: string
          role_name: string
          staffing_org_id: string
        }
        Update: {
          created_at?: string
          default_bill_rate?: number | null
          default_pay_rate?: number | null
          department_id?: string | null
          id?: string
          is_active?: boolean | null
          role_code?: string
          role_name?: string
          staffing_org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_role_codes_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "sw_departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_role_codes_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_schedule_shifts: {
        Row: {
          created_at: string
          end_time: string
          id: string
          is_uncovered: boolean | null
          override_reason: string | null
          property_id: string
          role_code_id: string | null
          schedule_id: string
          shift_date: string
          start_time: string
          worker_id: string | null
        }
        Insert: {
          created_at?: string
          end_time: string
          id?: string
          is_uncovered?: boolean | null
          override_reason?: string | null
          property_id: string
          role_code_id?: string | null
          schedule_id: string
          shift_date: string
          start_time: string
          worker_id?: string | null
        }
        Update: {
          created_at?: string
          end_time?: string
          id?: string
          is_uncovered?: boolean | null
          override_reason?: string | null
          property_id?: string
          role_code_id?: string | null
          schedule_id?: string
          shift_date?: string
          start_time?: string
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sw_schedule_shifts_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "sw_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_schedule_shifts_role_code_id_fkey"
            columns: ["role_code_id"]
            isOneToOne: false
            referencedRelation: "sw_role_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_schedule_shifts_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "sw_schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_schedule_shifts_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "sw_workers"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_schedules: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          notes: string | null
          property_id: string | null
          published_at: string | null
          staffing_org_id: string
          status: Database["public"]["Enums"]["sw_schedule_status"]
          updated_at: string
          week_start_date: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          property_id?: string | null
          published_at?: string | null
          staffing_org_id: string
          status?: Database["public"]["Enums"]["sw_schedule_status"]
          updated_at?: string
          week_start_date: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          property_id?: string | null
          published_at?: string | null
          staffing_org_id?: string
          status?: Database["public"]["Enums"]["sw_schedule_status"]
          updated_at?: string
          week_start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_schedules_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "sw_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_schedules_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_shift_acceptance: {
        Row: {
          created_at: string
          id: string
          responded_at: string | null
          response_note: string | null
          shift_id: string
          status: Database["public"]["Enums"]["sw_shift_acceptance_status"]
          worker_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          responded_at?: string | null
          response_note?: string | null
          shift_id: string
          status?: Database["public"]["Enums"]["sw_shift_acceptance_status"]
          worker_id: string
        }
        Update: {
          created_at?: string
          id?: string
          responded_at?: string | null
          response_note?: string | null
          shift_id?: string
          status?: Database["public"]["Enums"]["sw_shift_acceptance_status"]
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_shift_acceptance_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "sw_schedule_shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_shift_acceptance_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "sw_workers"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_shift_requirements: {
        Row: {
          client_id: string | null
          created_at: string
          days_of_week: number[]
          department_id: string | null
          effective_end_date: string | null
          effective_start_date: string
          id: string
          is_active: boolean | null
          priority: number | null
          property_id: string
          required_employees: number | null
          required_weekly_hours: number | null
          role_code_id: string | null
          shift_end_time: string
          shift_start_time: string
          staffing_org_id: string
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          days_of_week: number[]
          department_id?: string | null
          effective_end_date?: string | null
          effective_start_date: string
          id?: string
          is_active?: boolean | null
          priority?: number | null
          property_id: string
          required_employees?: number | null
          required_weekly_hours?: number | null
          role_code_id?: string | null
          shift_end_time: string
          shift_start_time: string
          staffing_org_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          days_of_week?: number[]
          department_id?: string | null
          effective_end_date?: string | null
          effective_start_date?: string
          id?: string
          is_active?: boolean | null
          priority?: number | null
          property_id?: string
          required_employees?: number | null
          required_weekly_hours?: number | null
          role_code_id?: string | null
          shift_end_time?: string
          shift_start_time?: string
          staffing_org_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_shift_requirements_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "sw_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_shift_requirements_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "sw_departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_shift_requirements_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "sw_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_shift_requirements_role_code_id_fkey"
            columns: ["role_code_id"]
            isOneToOne: false
            referencedRelation: "sw_role_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_shift_requirements_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_time_correction_requests: {
        Row: {
          created_at: string
          id: string
          proposed_clock_in: string | null
          proposed_clock_out: string | null
          reason: string
          requested_by: string
          review_note: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          time_entry_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          proposed_clock_in?: string | null
          proposed_clock_out?: string | null
          reason: string
          requested_by: string
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          time_entry_id: string
        }
        Update: {
          created_at?: string
          id?: string
          proposed_clock_in?: string | null
          proposed_clock_out?: string | null
          reason?: string
          requested_by?: string
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          time_entry_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_time_correction_requests_time_entry_id_fkey"
            columns: ["time_entry_id"]
            isOneToOne: false
            referencedRelation: "sw_time_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_time_entries: {
        Row: {
          break_minutes: number | null
          clock_in_at: string
          clock_in_lat: number | null
          clock_in_lng: number | null
          clock_out_at: string | null
          clock_out_lat: number | null
          clock_out_lng: number | null
          created_at: string
          device_info: Json | null
          id: string
          ip_address: string | null
          notes: string | null
          overtime_minutes: number | null
          property_id: string
          role_code_id: string | null
          shift_id: string | null
          staffing_org_id: string
          status: Database["public"]["Enums"]["sw_time_entry_status"]
          total_worked_minutes: number | null
          updated_at: string
          worker_id: string
        }
        Insert: {
          break_minutes?: number | null
          clock_in_at: string
          clock_in_lat?: number | null
          clock_in_lng?: number | null
          clock_out_at?: string | null
          clock_out_lat?: number | null
          clock_out_lng?: number | null
          created_at?: string
          device_info?: Json | null
          id?: string
          ip_address?: string | null
          notes?: string | null
          overtime_minutes?: number | null
          property_id: string
          role_code_id?: string | null
          shift_id?: string | null
          staffing_org_id: string
          status?: Database["public"]["Enums"]["sw_time_entry_status"]
          total_worked_minutes?: number | null
          updated_at?: string
          worker_id: string
        }
        Update: {
          break_minutes?: number | null
          clock_in_at?: string
          clock_in_lat?: number | null
          clock_in_lng?: number | null
          clock_out_at?: string | null
          clock_out_lat?: number | null
          clock_out_lng?: number | null
          created_at?: string
          device_info?: Json | null
          id?: string
          ip_address?: string | null
          notes?: string | null
          overtime_minutes?: number | null
          property_id?: string
          role_code_id?: string | null
          shift_id?: string | null
          staffing_org_id?: string
          status?: Database["public"]["Enums"]["sw_time_entry_status"]
          total_worked_minutes?: number | null
          updated_at?: string
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_time_entries_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "sw_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_time_entries_role_code_id_fkey"
            columns: ["role_code_id"]
            isOneToOne: false
            referencedRelation: "sw_role_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_time_entries_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "sw_schedule_shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_time_entries_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_time_entries_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "sw_workers"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_worker_availability: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          max_hours_per_day: number | null
          notes: string | null
          preferred_property_id: string | null
          start_time: string
          worker_id: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          max_hours_per_day?: number | null
          notes?: string | null
          preferred_property_id?: string | null
          start_time: string
          worker_id: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          max_hours_per_day?: number | null
          notes?: string | null
          preferred_property_id?: string | null
          start_time?: string
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_worker_availability_preferred_property_id_fkey"
            columns: ["preferred_property_id"]
            isOneToOne: false
            referencedRelation: "sw_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_worker_availability_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "sw_workers"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_worker_property_assignments: {
        Row: {
          created_at: string
          id: string
          is_preferred: boolean | null
          property_id: string
          worker_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_preferred?: boolean | null
          property_id: string
          worker_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_preferred?: boolean | null
          property_id?: string
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sw_worker_property_assignments_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "sw_properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_worker_property_assignments_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "sw_workers"
            referencedColumns: ["id"]
          },
        ]
      }
      sw_workers: {
        Row: {
          client_bill_rate: number | null
          created_at: string
          department_id: string | null
          email: string | null
          emergency_contact: Json | null
          employment_type: string | null
          full_name: string
          hourly_pay_rate: number | null
          id: string
          is_active: boolean | null
          max_weekly_hours: number | null
          phone: string | null
          role_code_id: string | null
          skills: Json | null
          staffing_org_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          client_bill_rate?: number | null
          created_at?: string
          department_id?: string | null
          email?: string | null
          emergency_contact?: Json | null
          employment_type?: string | null
          full_name: string
          hourly_pay_rate?: number | null
          id?: string
          is_active?: boolean | null
          max_weekly_hours?: number | null
          phone?: string | null
          role_code_id?: string | null
          skills?: Json | null
          staffing_org_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          client_bill_rate?: number | null
          created_at?: string
          department_id?: string | null
          email?: string | null
          emergency_contact?: Json | null
          employment_type?: string | null
          full_name?: string
          hourly_pay_rate?: number | null
          id?: string
          is_active?: boolean | null
          max_weekly_hours?: number | null
          phone?: string | null
          role_code_id?: string | null
          skills?: Json | null
          staffing_org_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sw_workers_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "sw_departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_workers_role_code_id_fkey"
            columns: ["role_code_id"]
            isOneToOne: false
            referencedRelation: "sw_role_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sw_workers_staffing_org_id_fkey"
            columns: ["staffing_org_id"]
            isOneToOne: false
            referencedRelation: "sw_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          business_id: string | null
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          business_id?: string | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          business_id?: string | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrypt_pms_data: {
        Args: { encrypted_data: string; encryption_key: string }
        Returns: string
      }
      encrypt_pms_data: {
        Args: { data: string; encryption_key: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      sw_has_org_role: {
        Args: {
          _org_id: string
          _roles: Database["public"]["Enums"]["sw_role"][]
          _user_id: string
        }
        Returns: boolean
      }
      sw_is_org_member: {
        Args: { _org_id: string; _user_id: string }
        Returns: boolean
      }
      sw_is_super_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "owner"
        | "manager"
        | "front_desk"
        | "housekeeping"
        | "auditor"
      booking_status:
        | "confirmed"
        | "checked_in"
        | "checked_out"
        | "cancelled"
        | "no_show"
      business_type: "hotel" | "restaurant" | "store" | "other"
      pms_system: "opera" | "cloudbeds" | "choice_advantage" | "custom" | "none"
      room_status:
        | "available"
        | "occupied"
        | "dirty"
        | "clean"
        | "maintenance"
        | "out_of_order"
      sw_dispute_status:
        | "open"
        | "resolved_in_favor_of_worker"
        | "resolved_in_favor_of_client"
        | "withdrawn"
      sw_invoice_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "approved"
        | "disputed"
        | "partially_paid"
        | "paid"
        | "void"
      sw_org_type:
        | "staffing_company"
        | "client_corporate"
        | "hotel_property"
        | "admin"
      sw_role:
        | "super_admin"
        | "staffing_owner"
        | "staffing_admin"
        | "staffing_scheduler"
        | "staffing_payroll"
        | "staffing_recruiter"
        | "staffing_accountant"
        | "client_corp_admin"
        | "client_billing"
        | "client_regional"
        | "property_manager"
        | "dept_supervisor"
        | "employee"
      sw_schedule_status:
        | "draft"
        | "sent_to_employees"
        | "employee_review"
        | "staffing_reviewed"
        | "sent_to_pm"
        | "pm_approved"
        | "corp_approved"
        | "published"
      sw_shift_acceptance_status:
        | "pending"
        | "accepted"
        | "change_requested"
        | "declined"
      sw_time_entry_status:
        | "clocked_in"
        | "on_break"
        | "clocked_out"
        | "missed_clockout"
        | "corrected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "super_admin",
        "owner",
        "manager",
        "front_desk",
        "housekeeping",
        "auditor",
      ],
      booking_status: [
        "confirmed",
        "checked_in",
        "checked_out",
        "cancelled",
        "no_show",
      ],
      business_type: ["hotel", "restaurant", "store", "other"],
      pms_system: ["opera", "cloudbeds", "choice_advantage", "custom", "none"],
      room_status: [
        "available",
        "occupied",
        "dirty",
        "clean",
        "maintenance",
        "out_of_order",
      ],
      sw_dispute_status: [
        "open",
        "resolved_in_favor_of_worker",
        "resolved_in_favor_of_client",
        "withdrawn",
      ],
      sw_invoice_status: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "disputed",
        "partially_paid",
        "paid",
        "void",
      ],
      sw_org_type: [
        "staffing_company",
        "client_corporate",
        "hotel_property",
        "admin",
      ],
      sw_role: [
        "super_admin",
        "staffing_owner",
        "staffing_admin",
        "staffing_scheduler",
        "staffing_payroll",
        "staffing_recruiter",
        "staffing_accountant",
        "client_corp_admin",
        "client_billing",
        "client_regional",
        "property_manager",
        "dept_supervisor",
        "employee",
      ],
      sw_schedule_status: [
        "draft",
        "sent_to_employees",
        "employee_review",
        "staffing_reviewed",
        "sent_to_pm",
        "pm_approved",
        "corp_approved",
        "published",
      ],
      sw_shift_acceptance_status: [
        "pending",
        "accepted",
        "change_requested",
        "declined",
      ],
      sw_time_entry_status: [
        "clocked_in",
        "on_break",
        "clocked_out",
        "missed_clockout",
        "corrected",
      ],
    },
  },
} as const
