export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return new Response(JSON.stringify({ error: "Missing env vars" }), { status: 500 });
  }

  try {
    const body = await req.json();
    const username = body?.username?.trim();

    if (!username) {
      return new Response(JSON.stringify({ error: "No username" }), { status: 400 });
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
      return new Response(JSON.stringify({ error: "Supabase update failed" }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
