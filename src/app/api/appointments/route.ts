import { NextResponse } from "next/server";
import { z } from "zod";
import { isEmailConfigured, isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const schema = z.object({ name: z.string().trim().min(2).max(120), email: z.string().email().max(200), organization: z.string().trim().max(160).optional(), format: z.string().trim().max(40).optional(), message: z.string().trim().min(10).max(5000), appointmentType: z.string().min(2), startsAt: z.string().datetime(), website: z.string().optional() });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ message: "Please choose a valid time and complete the form." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ message: "Request received." });
  if (!isSupabaseConfigured()) return NextResponse.json({ message: "Scheduling is not connected yet. Add the Supabase settings before launch." }, { status: 503 });
  const supabase = await createSupabaseServerClient(); if (!supabase) return NextResponse.json({ message: "Scheduling is unavailable." }, { status: 503 });
  const { data, error } = await supabase.rpc("create_appointment_request", { p_name: parsed.data.name, p_email: parsed.data.email, p_organization: parsed.data.organization ?? null, p_format: parsed.data.format ?? "Online", p_message: parsed.data.message, p_appointment_type: parsed.data.appointmentType, p_starts_at: parsed.data.startsAt });
  if (error) return NextResponse.json({ message: error.message.includes("already") ? "That time has just been taken. Please choose another slot." : "We could not create the request. Please try again." }, { status: 409 });
  if (isEmailConfigured()) { const resend = new Resend(process.env.RESEND_API_KEY); await resend.emails.send({ from: process.env.RESEND_FROM_EMAIL ?? "Website <onboarding@resend.dev>", to: process.env.CONTACT_EMAIL!, replyTo: parsed.data.email, subject: `Appointment request from ${parsed.data.name}`, text: `${parsed.data.name} requested ${parsed.data.appointmentType} at ${parsed.data.startsAt}.\n\n${parsed.data.message}` }); }
  return NextResponse.json({ message: "Your request has been received. You will receive a confirmation after review.", request: data });
}
