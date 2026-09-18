import { NextResponse } from "next/server";
import { addMinutes, parseISO } from "date-fns";
import { appointmentTypes } from "@/lib/content";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const fallbackRules: Record<number, { start: string; end: string } | null> = { 0: null, 1: { start: "09:00", end: "16:00" }, 2: { start: "09:00", end: "16:00" }, 3: { start: "09:00", end: "16:00" }, 4: { start: "09:00", end: "16:00" }, 5: { start: "09:00", end: "14:00" }, 6: null };
const toKampala = (date: string, time: string) => new Date(`${date}T${time}:00+03:00`);

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const date = params.get("date"); const typeSlug = params.get("type");
  const type = appointmentTypes.find((item) => item.slug === typeSlug) ?? appointmentTypes[0];
  if (!date || !type) return NextResponse.json({ slots: [] });
  const parsedDate = parseISO(date); if (Number.isNaN(parsedDate.getTime())) return NextResponse.json({ slots: [] });
  const supabase = await createSupabaseServerClient();
  let rule = fallbackRules[parsedDate.getDay()]; let blackout = false; let booked: string[] = [];
  if (supabase) {
    const { data: dbType } = await supabase.from("appointment_types").select("duration_minutes").eq("slug", typeSlug).eq("active", true).maybeSingle();
    if (dbType) type.durationMinutes = Number(dbType.duration_minutes);
    const { data: dbRule } = await supabase.from("availability_rules").select("start_time,end_time").eq("day_of_week", parsedDate.getDay()).eq("active", true).maybeSingle();
    if (dbRule) rule = { start: String(dbRule.start_time).slice(0, 5), end: String(dbRule.end_time).slice(0, 5) };
    const { data: closed } = await supabase.from("blackout_dates").select("id").eq("date", date).maybeSingle(); blackout = Boolean(closed);
    const start = toKampala(date, "00:00").toISOString(); const end = toKampala(date, "23:59").toISOString();
    const { data: requests } = await supabase.from("appointment_requests").select("starts_at").gte("starts_at", start).lte("starts_at", end).in("status", ["pending", "approved"]); booked = (requests ?? []).map((item) => String(item.starts_at));
  }
  if (!rule || blackout) return NextResponse.json({ slots: [] });
  const slots: Array<{ value: string; label: string }> = []; let cursor = toKampala(date, rule.start); const closing = toKampala(date, rule.end);
  while (addMinutes(cursor, type.durationMinutes) <= closing) { const value = cursor.toISOString(); const overlaps = booked.some((item) => Math.abs(new Date(item).getTime() - cursor.getTime()) < (type.durationMinutes + 15) * 60_000); if (!overlaps && cursor.getTime() > Date.now() + 24 * 60 * 60 * 1000) slots.push({ value, label: new Intl.DateTimeFormat("en-UG", { hour: "numeric", minute: "2-digit", timeZone: "Africa/Kampala" }).format(cursor) }); cursor = addMinutes(cursor, type.durationMinutes + 15); }
  return NextResponse.json({ slots });
}
