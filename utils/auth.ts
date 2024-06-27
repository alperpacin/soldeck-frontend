import { getSupabase } from "./supabase/server";

export async function getUser() {
  const supabase = getSupabase();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
