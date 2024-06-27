// app/oauth-redirect/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const OAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        router.push("/"); // Redirect to home page or error page
        return;
      }

      if (data.session?.user) {
        localStorage.setItem(
          "id",
          JSON.stringify(data.session.user.user_metadata.provider_id)
        );
        router.push("/?success=true");
        return;
      }

      // No session, handle the OAuth code
      const code = new URL(window.location.href).searchParams.get("code");
      if (code) {
        router.push(`/?code=${code}`);
      } else {
        console.error("No code found in URL");
        router.push("/"); // Redirect to home page or error page
      }
    };

    handleAuthRedirect();
  }, [router]);

  return <div>Authenticating...</div>;
};

export default OAuthRedirect;
