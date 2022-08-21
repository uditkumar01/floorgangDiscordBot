import { createClient } from "@supabase/supabase-js";
import envs from "../constants";

const { DB_URL, DB_API_KEY } = envs;

export const supabaseClient = createClient(DB_URL, DB_API_KEY);
