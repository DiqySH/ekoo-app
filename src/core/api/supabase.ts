import { createClient } from "@supabase/supabase-js";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;
const DATABASE_KEY = import.meta.env.VITE_DATABASE_KEY;

const database = createClient(DATABASE_URL, DATABASE_KEY);

export { database };
