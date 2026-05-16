export const config = { runtime: "edge" };

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return new Response(JSON.stringify({ error: "Missing env vars" }), {
      status: 500, headers: corsHeaders,
    });
  }

  try {
    const body = await req.json();
    const username = body?.username?.trim();

    if (!username) {
      return new Response(JSON.stringify({ error: "No username" }), {
        status: 400, headers: corsHeaders,
      });
    }

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/players?username=eq.${encodeURIComponent(username)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_SERVICE_KEY,
          "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({ is_pro: true }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return new Response(JSON.stringify({ error: "Supabase failed", detail: text }), {
        status: 500, headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: corsHeaders,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: corsHeaders,
    });
  }
}
