// app/api/discord/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  try {
    // Fetch member data for the specific guild
    const memberResponse = await fetch(
      `https://discord.com/api/v10/guilds/${
        process.env.GUILD_ID
      }/members/${JSON.parse(id)}`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );

    if (!memberResponse.ok) {
      throw new Error(`HTTP error! status1: ${memberResponse.status}`);
    }

    const memberData = await memberResponse.json();

    // Fetch guild roles
    const rolesResponse = await fetch(
      `https://discord.com/api/v10/guilds/${process.env.GUILD_ID}/roles`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );

    if (!rolesResponse.ok) {
      throw new Error(`HTTP error! status2: ${rolesResponse.status}`);
    }

    const rolesData = await rolesResponse.json();

    // Match member roles with guild roles
    const userRoles = memberData.roles
      .map((roleId: string) => {
        const role = rolesData.find((r: any) => r.id === roleId);
        return role ? { id: role.id, name: role.name } : null;
      })
      .filter((role: string) => role !== null);

    // Check if "Holder" role exists
    const isHolder = userRoles.some((role: any) => role.name === "Holder");

    return NextResponse.json(
      {
        isHolder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data from Discord" },
      { status: 401 }
    );
  }
}
