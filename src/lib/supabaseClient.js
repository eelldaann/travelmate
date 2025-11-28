import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lcmksgaovrksescxiezf.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjbWtzZ2FvdnJrc2VzY3hpZXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNTk3ODIsImV4cCI6MjA3OTgzNTc4Mn0.Be4jFV8xqqqTJ-9lwRfDnspJfEgHoZg4GXL_fjVST1U"

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase env vars are missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
