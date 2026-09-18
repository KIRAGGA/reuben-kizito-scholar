import { NextResponse } from "next/server";
import { z } from "zod";
import { isEmailConfigured, isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const schema = z.object({ name: z.string().trim().min(2).max(120), email: z.string().email().max(200), subject: z.string().trim().min(2).max(160), message: z.string().trim().min(10).max(5000), website: z.string().optional() });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ message: "Please check the form and try again." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ message: "Message received." });
  const supabase = await createSupabaseServerClient();
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase.from("contact_messages").insert({ name: parsed.data.name, email: parsed.data.email, subject: parsed.data.subject, message: parsed.data.message });
    if (error) return NextResponse.json({ message: "The message could not be saved. Please try again." }, { status: 500 });
  } else if (!isEmailConfigured()) return NextResponse.json({ message: "The contact system is not configured yet. Add the Supabase and email settings before launch." }, { status: 503 });
  if (isEmailConfigured()) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({ from: process.env.RESEND_FROM_EMAIL ?? "Website <onboarding@resend.dev>", to: process.env.CONTACT_EMAIL!, subject: `Website message: ${parsed.data.subject}`, replyTo: parsed.data.email, text: `${parsed.data.name} (${parsed.data.email})\n\n${parsed.data.message}` });
  }
  return NextResponse.json({ message: "Thank you. Your message has been sent." });
}
