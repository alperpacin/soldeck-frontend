"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import DiscordLogoIcon from "@/public/icons/discord-icon.svg";
import Image from "next/image";

export default function Home() {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const success = new URL(window.location.href).searchParams.get("success");

    if (success === "true") {
      const id = localStorage.getItem("id");

      id && fetchUserData(id);
    }
  }, []);

  async function fetchUserData(id: string) {
    try {
      const response = await fetch("/api/discord/get-user-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const result = await response.json();
      console.log(result);
      setUserData(result);
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      setError(error);
    }
  }

  async function signInWithDiscord() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/oauth-redirect`,
        scopes: "identify email guilds",
      },
    });

    if (error) {
      setError(error.message);
    } else if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <main>
      <section>
        <h1>Sol Deck</h1>
        <h3>Not the explorer we need, but the explorer we want.</h3>
      </section>
      <Button onClick={signInWithDiscord}>
        <Image
          src={DiscordLogoIcon}
          alt="Discord Logo"
          width={24}
          height={24}
          className="mr-2"
        />
        <span className="text-background">Login with Discord</span>
      </Button>
      {userData && (
        <div>
          <h2>
            Welcome, <br />
            Holder status: {userData.isHolder ? "Holder" : "Not a holder"}
          </h2>
        </div>
      )}
      {error && <p>Error: {JSON.stringify(error, null, 2)}</p>}
    </main>
  );
}
