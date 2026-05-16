import { NextApiRequest, NextApiResponse } from "next";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const username = req.body?.username?.trim();
  if (!username) return res.status(400).json({ error: "No username" });

  try {
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

    if (!response.ok) return res.status(500).json({ error: "Supabase update failed" });
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}
