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
    },
  },
} as const
