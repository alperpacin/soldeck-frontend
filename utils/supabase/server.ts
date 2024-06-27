import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

let supabase: ReturnType<typeof createServerClient> | null = null;

export function getSupabase() {
  if (supabase) return supabase;

  const cookieStore = cookies();

  supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => {
          const cookieList = cookieStore.getAll();
          return cookieList.map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        setAll: (cookieList) => {
          cookieList.map(({ name, value, ...options }) => {
            cookieStore.set({ name, value, ...(options as CookieOptions) });
          });
        },
      },
    }
  );

  return supabase;
}
