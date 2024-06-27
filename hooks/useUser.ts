import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

export const useUser = () => {
  return useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
  });
};
