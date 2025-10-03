// Supabase Database Type Definitions
export interface Database {
  public: {
    Tables: {
      pollen_records: {
        Row: {
          id: number;
          city: string;
          date: string;
          period: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: never;
          city: string;
          date: string;
          period: string;
          created_at?: never;
          updated_at?: never;
        };
        Update: {
          id?: never;
          city?: string;
          date?: string;
          period?: string;
          created_at?: never;
          updated_at?: never;
        };
        Relationships: [];
      };
      pollen_levels: {
        Row: {
          id: number;
          pollen_record_id: number;
          type: string;
          level: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: never;
          pollen_record_id: number;
          type: string;
          level: string;
          description?: string | null;
          created_at?: never;
        };
        Update: {
          id?: never;
          pollen_record_id?: number;
          type?: string;
          level?: string;
          description?: string | null;
          created_at?: never;
        };
        Relationships: [
          {
            foreignKeyName: "pollen_levels_pollen_record_id_fkey";
            columns: ["pollen_record_id"];
            isOneToOne: false;
            referencedRelation: "pollen_records";
            referencedColumns: ["id"];
          }
        ];
      };
      pollen_forecasts: {
        Row: {
          id: number;
          pollen_record_id: number;
          forecast_text: string;
          created_at: string;
        };
        Insert: {
          id?: never;
          pollen_record_id: number;
          forecast_text: string;
          created_at?: never;
        };
        Update: {
          id?: never;
          pollen_record_id?: number;
          forecast_text?: string;
          created_at?: never;
        };
        Relationships: [
          {
            foreignKeyName: "pollen_forecasts_pollen_record_id_fkey";
            columns: ["pollen_record_id"];
            isOneToOne: false;
            referencedRelation: "pollen_records";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Utility types for easier usage
export type PollenRecord = Database['public']['Tables']['pollen_records']['Row'];
export type PollenRecordInsert = Database['public']['Tables']['pollen_records']['Insert'];
export type PollenRecordUpdate = Database['public']['Tables']['pollen_records']['Update'];

export type PollenLevel = Database['public']['Tables']['pollen_levels']['Row'];
export type PollenLevelInsert = Database['public']['Tables']['pollen_levels']['Insert'];
export type PollenLevelUpdate = Database['public']['Tables']['pollen_levels']['Update'];

export type PollenForecast = Database['public']['Tables']['pollen_forecasts']['Row'];
export type PollenForecastInsert = Database['public']['Tables']['pollen_forecasts']['Insert'];
export type PollenForecastUpdate = Database['public']['Tables']['pollen_forecasts']['Update'];

// Extended types for queries with relationships
export type PollenRecordWithRelations = PollenRecord & {
  pollen_levels: PollenLevel[];
  pollen_forecasts: PollenForecast[];
};

// Supabase Client Type
export type SupabaseClient = import('@supabase/supabase-js').SupabaseClient<Database>;