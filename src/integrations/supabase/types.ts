export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audit_trail: {
        Row: {
          action: string
          audit_id: string
          category: string | null
          details: Json | null
          project_id: string | null
          timestamp: string | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          action: string
          audit_id?: string
          category?: string | null
          details?: Json | null
          project_id?: string | null
          timestamp?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          action?: string
          audit_id?: string
          category?: string | null
          details?: Json | null
          project_id?: string | null
          timestamp?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_trail_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "audit_trail_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_addresses: {
        Row: {
          address_id: string
          address_type: string
          business_id: string | null
          city: string | null
          country: string | null
          created_at: string | null
          state: string | null
          street: string | null
          zip_code: string | null
        }
        Insert: {
          address_id?: string
          address_type: string
          business_id?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          state?: string | null
          street?: string | null
          zip_code?: string | null
        }
        Update: {
          address_id?: string
          address_type?: string
          business_id?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          state?: string | null
          street?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_addresses_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["business_id"]
          },
        ]
      }
      business_existing_debt: {
        Row: {
          business_id: string | null
          collateral: string | null
          created_at: string | null
          current_balance: number
          debt_id: string
          guarantors: string | null
          lender: string
          maturity_date: string | null
          original_amount: number
          payment: number
          rate: number
          status: string | null
        }
        Insert: {
          business_id?: string | null
          collateral?: string | null
          created_at?: string | null
          current_balance: number
          debt_id?: string
          guarantors?: string | null
          lender: string
          maturity_date?: string | null
          original_amount: number
          payment: number
          rate: number
          status?: string | null
        }
        Update: {
          business_id?: string | null
          collateral?: string | null
          created_at?: string | null
          current_balance?: number
          debt_id?: string
          guarantors?: string | null
          lender?: string
          maturity_date?: string | null
          original_amount?: number
          payment?: number
          rate?: number
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_existing_debt_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["business_id"]
          },
        ]
      }
      business_financial_data: {
        Row: {
          business_id: string | null
          cogs: number | null
          created_at: string | null
          data_id: string
          gross_profit: number | null
          nom_percentage: number | null
          other_expenses: number | null
          revenue: number | null
          total_noi: number | null
          wages: number | null
          year: number
        }
        Insert: {
          business_id?: string | null
          cogs?: number | null
          created_at?: string | null
          data_id?: string
          gross_profit?: number | null
          nom_percentage?: number | null
          other_expenses?: number | null
          revenue?: number | null
          total_noi?: number | null
          wages?: number | null
          year: number
        }
        Update: {
          business_id?: string | null
          cogs?: number | null
          created_at?: string | null
          data_id?: string
          gross_profit?: number | null
          nom_percentage?: number | null
          other_expenses?: number | null
          revenue?: number | null
          total_noi?: number | null
          wages?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "business_financial_data_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["business_id"]
          },
        ]
      }
      business_tax_returns: {
        Row: {
          business_id: string | null
          created_at: string | null
          depreciation: number | null
          gross_receipts: number | null
          officers_compensation: number | null
          return_id: string
          tax_paid: number | null
          tax_year: number
          taxable_income: number | null
          total_deductions: number | null
          total_income: number | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          depreciation?: number | null
          gross_receipts?: number | null
          officers_compensation?: number | null
          return_id?: string
          tax_paid?: number | null
          tax_year: number
          taxable_income?: number | null
          total_deductions?: number | null
          total_income?: number | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          depreciation?: number | null
          gross_receipts?: number | null
          officers_compensation?: number | null
          return_id?: string
          tax_paid?: number | null
          tax_year?: number
          taxable_income?: number | null
          total_deductions?: number | null
          total_income?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "business_tax_returns_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["business_id"]
          },
        ]
      }
      businesses: {
        Row: {
          business_id: string
          created_at: string | null
          current_year_sales: number | null
          description: string | null
          ein: string | null
          email: string | null
          employee_count: number | null
          entity_type: Database["public"]["Enums"]["entity_type"]
          founding_date: string | null
          has_previous_sba_loan: boolean | null
          industry: string | null
          is_startup: boolean | null
          months_in_business: number | null
          naics_code: string | null
          name: string
          phone: string | null
          previous_sba_loan_details: string | null
          primary_contact_email: string | null
          primary_contact_name: string | null
          prior_year_sales: number | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          business_id?: string
          created_at?: string | null
          current_year_sales?: number | null
          description?: string | null
          ein?: string | null
          email?: string | null
          employee_count?: number | null
          entity_type: Database["public"]["Enums"]["entity_type"]
          founding_date?: string | null
          has_previous_sba_loan?: boolean | null
          industry?: string | null
          is_startup?: boolean | null
          months_in_business?: number | null
          naics_code?: string | null
          name: string
          phone?: string | null
          previous_sba_loan_details?: string | null
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          prior_year_sales?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          current_year_sales?: number | null
          description?: string | null
          ein?: string | null
          email?: string | null
          employee_count?: number | null
          entity_type?: Database["public"]["Enums"]["entity_type"]
          founding_date?: string | null
          has_previous_sba_loan?: boolean | null
          industry?: string | null
          is_startup?: boolean | null
          months_in_business?: number | null
          naics_code?: string | null
          name?: string
          phone?: string | null
          previous_sba_loan_details?: string | null
          primary_contact_email?: string | null
          primary_contact_name?: string | null
          prior_year_sales?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          business_id: string | null
          description: string | null
          document_id: string
          file_path: string | null
          file_size: number | null
          mime_type: string | null
          name: string
          participant_id: string | null
          project_id: string | null
          status: Database["public"]["Enums"]["document_status"] | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          business_id?: string | null
          description?: string | null
          document_id?: string
          file_path?: string | null
          file_size?: number | null
          mime_type?: string | null
          name: string
          participant_id?: string | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          business_id?: string | null
          description?: string | null
          document_id?: string
          file_path?: string | null
          file_size?: number | null
          mime_type?: string | null
          name?: string
          participant_id?: string | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "documents_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "project_participants"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dropdown_configurations: {
        Row: {
          config_id: string
          created_at: string | null
          customization_level: string | null
          description: string | null
          field_id: string
          initial_values: Json | null
          label: string
          module: string | null
        }
        Insert: {
          config_id?: string
          created_at?: string | null
          customization_level?: string | null
          description?: string | null
          field_id: string
          initial_values?: Json | null
          label: string
          module?: string | null
        }
        Update: {
          config_id?: string
          created_at?: string | null
          customization_level?: string | null
          description?: string | null
          field_id?: string
          initial_values?: Json | null
          label?: string
          module?: string | null
        }
        Relationships: []
      }
      form_assignments: {
        Row: {
          assigned_at: string | null
          assignment_id: string
          business_id: string | null
          completed_at: string | null
          form_data: Json | null
          form_id: string | null
          participant_id: string | null
          project_id: string | null
          status: Database["public"]["Enums"]["form_status"] | null
        }
        Insert: {
          assigned_at?: string | null
          assignment_id?: string
          business_id?: string | null
          completed_at?: string | null
          form_data?: Json | null
          form_id?: string | null
          participant_id?: string | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["form_status"] | null
        }
        Update: {
          assigned_at?: string | null
          assignment_id?: string
          business_id?: string | null
          completed_at?: string | null
          form_data?: Json | null
          form_id?: string | null
          participant_id?: string | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["form_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "form_assignments_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "form_assignments_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["form_id"]
          },
          {
            foreignKeyName: "form_assignments_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "project_participants"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "form_assignments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      forms: {
        Row: {
          created_at: string | null
          description: string | null
          entity_type: Database["public"]["Enums"]["entity_type"] | null
          form_id: string
          is_template: boolean | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          entity_type?: Database["public"]["Enums"]["entity_type"] | null
          form_id?: string
          is_template?: boolean | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          entity_type?: Database["public"]["Enums"]["entity_type"] | null
          form_id?: string
          is_template?: boolean | null
          name?: string
        }
        Relationships: []
      }
      individual_tax_returns: {
        Row: {
          agi: number | null
          business_income: number | null
          created_at: string | null
          federal_tax: number | null
          other_income: number | null
          participant_id: string | null
          rental_income: number | null
          return_id: string
          state_tax: number | null
          tax_year: number
          total_income: number | null
          wages: number | null
        }
        Insert: {
          agi?: number | null
          business_income?: number | null
          created_at?: string | null
          federal_tax?: number | null
          other_income?: number | null
          participant_id?: string | null
          rental_income?: number | null
          return_id?: string
          state_tax?: number | null
          tax_year: number
          total_income?: number | null
          wages?: number | null
        }
        Update: {
          agi?: number | null
          business_income?: number | null
          created_at?: string | null
          federal_tax?: number | null
          other_income?: number | null
          participant_id?: string | null
          rental_income?: number | null
          return_id?: string
          state_tax?: number | null
          tax_year?: number
          total_income?: number | null
          wages?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "individual_tax_returns_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "project_participants"
            referencedColumns: ["participant_id"]
          },
        ]
      }
      lender_settings: {
        Row: {
          created_at: string | null
          description: string | null
          setting_id: string
          setting_key: string
          setting_value: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          setting_id?: string
          setting_key: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          setting_id?: string
          setting_key?: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      loans: {
        Row: {
          amount: number
          business_id: string | null
          created_at: string | null
          description: string | null
          loan_id: string
          loan_type: string
          payment: number | null
          project_id: string | null
          rate: number | null
          status: Database["public"]["Enums"]["loan_status"] | null
          term: number | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          business_id?: string | null
          created_at?: string | null
          description?: string | null
          loan_id?: string
          loan_type: string
          payment?: number | null
          project_id?: string | null
          rate?: number | null
          status?: Database["public"]["Enums"]["loan_status"] | null
          term?: number | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          business_id?: string | null
          created_at?: string | null
          description?: string | null
          loan_id?: string
          loan_type?: string
          payment?: number | null
          project_id?: string | null
          rate?: number | null
          status?: Database["public"]["Enums"]["loan_status"] | null
          term?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loans_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "loans_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      owner_addresses: {
        Row: {
          address_id: string
          city: string | null
          country: string | null
          created_at: string | null
          owner_id: string | null
          state: string | null
          street: string | null
          zip_code: string | null
        }
        Insert: {
          address_id?: string
          city?: string | null
          country?: string | null
          created_at?: string | null
          owner_id?: string | null
          state?: string | null
          street?: string | null
          zip_code?: string | null
        }
        Update: {
          address_id?: string
          city?: string | null
          country?: string | null
          created_at?: string | null
          owner_id?: string | null
          state?: string | null
          street?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "owner_addresses_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["owner_id"]
          },
        ]
      }
      owners: {
        Row: {
          business_id: string | null
          created_at: string | null
          email: string | null
          name: string
          owner_id: string
          ownership_percentage: number
          phone: string | null
          project_id: string | null
          role: string | null
          type: Database["public"]["Enums"]["owner_type"]
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          email?: string | null
          name: string
          owner_id?: string
          ownership_percentage: number
          phone?: string | null
          project_id?: string | null
          role?: string | null
          type: Database["public"]["Enums"]["owner_type"]
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          email?: string | null
          name?: string
          owner_id?: string
          ownership_percentage?: number
          phone?: string | null
          project_id?: string | null
          role?: string | null
          type?: Database["public"]["Enums"]["owner_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "owners_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "owners_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "owners_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_participants: {
        Row: {
          created_at: string | null
          email: string | null
          name: string
          participant_id: string
          participant_type: string | null
          project_id: string | null
          role: Database["public"]["Enums"]["participant_role"]
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          name: string
          participant_id?: string
          participant_type?: string | null
          project_id?: string | null
          role: Database["public"]["Enums"]["participant_role"]
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          name?: string
          participant_id?: string
          participant_type?: string | null
          project_id?: string | null
          role?: Database["public"]["Enums"]["participant_role"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_participants_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: string | null
          city: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          loan_amount: number
          location: string | null
          project_id: string
          project_name: string
          project_type: string
          state: string | null
          status: Database["public"]["Enums"]["project_status"] | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          loan_amount?: number
          location?: string | null
          project_id?: string
          project_name: string
          project_type: string
          state?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          loan_amount?: number
          location?: string | null
          project_id?: string
          project_name?: string
          project_type?: string
          state?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_fees: {
        Row: {
          created_at: string | null
          fee_amount: number | null
          fee_percentage: number | null
          fee_type: string
          notes: string | null
          project_id: string | null
          referral_id: string
          referral_source: string
        }
        Insert: {
          created_at?: string | null
          fee_amount?: number | null
          fee_percentage?: number | null
          fee_type: string
          notes?: string | null
          project_id?: string | null
          referral_id?: string
          referral_source: string
        }
        Update: {
          created_at?: string | null
          fee_amount?: number | null
          fee_percentage?: number | null
          fee_type?: string
          notes?: string | null
          project_id?: string | null
          referral_id?: string
          referral_source?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_fees_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
      sellers: {
        Row: {
          business_id: string | null
          created_at: string | null
          email: string | null
          name: string
          project_id: string | null
          seller_id: string
          type: Database["public"]["Enums"]["owner_type"]
          user_id: string | null
        }
        Insert: {
          business_id?: string | null
          created_at?: string | null
          email?: string | null
          name: string
          project_id?: string | null
          seller_id?: string
          type: Database["public"]["Enums"]["owner_type"]
          user_id?: string | null
        }
        Update: {
          business_id?: string | null
          created_at?: string | null
          email?: string | null
          name?: string
          project_id?: string | null
          seller_id?: string
          type?: Database["public"]["Enums"]["owner_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sellers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "sellers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "sellers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      use_of_proceeds: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          description: string | null
          loan_assignment: Json | null
          notes: string | null
          proceeds_id: string
          project_id: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          description?: string | null
          loan_assignment?: Json | null
          notes?: string | null
          proceeds_id?: string
          project_id?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          description?: string | null
          loan_assignment?: Json | null
          notes?: string | null
          proceeds_id?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "use_of_proceeds_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      document_status: "pending" | "uploaded" | "approved" | "rejected"
      entity_type:
        | "LLC"
        | "Corporation"
        | "S-Corp"
        | "C-Corp"
        | "Partnership"
        | "Sole Proprietorship"
        | "Professional Corporation"
      form_status: "pending" | "submitted" | "approved" | "rejected"
      loan_status: "active" | "pending" | "approved" | "declined" | "funded"
      owner_type: "individual" | "business"
      participant_role:
        | "Primary Borrower"
        | "Co-Borrower"
        | "Guarantor"
        | "Seller"
        | "Bank Officer"
        | "Loan Specialist"
      project_status: "active" | "pending" | "completed" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      document_status: ["pending", "uploaded", "approved", "rejected"],
      entity_type: [
        "LLC",
        "Corporation",
        "S-Corp",
        "C-Corp",
        "Partnership",
        "Sole Proprietorship",
        "Professional Corporation",
      ],
      form_status: ["pending", "submitted", "approved", "rejected"],
      loan_status: ["active", "pending", "approved", "declined", "funded"],
      owner_type: ["individual", "business"],
      participant_role: [
        "Primary Borrower",
        "Co-Borrower",
        "Guarantor",
        "Seller",
        "Bank Officer",
        "Loan Specialist",
      ],
      project_status: ["active", "pending", "completed", "cancelled"],
    },
  },
} as const
