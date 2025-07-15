import { createClient } from "@supabase/supabase-js";

// Replace these with your actual values from Supabase → Project Settings → API
const supabaseUrl = "https://ytchekpjuhvnvjgrcgpw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Y2hla3BqdWh2bnZqZ3JjZ3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNTQ3NDksImV4cCI6MjA2NzkzMDc0OX0.EtGvVuNLj8wNVDoXOeNgG2aSXI5k3CZd6AujgsXUQhE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
