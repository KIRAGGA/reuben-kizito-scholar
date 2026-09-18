"use client";

import { useEffect, useState } from "react";
import type { AppointmentType } from "@/lib/content";

export function AppointmentForm({ appointmentTypes }: { appointmentTypes: AppointmentType[] }) {
  const [type, setType] = useState(appointmentTypes[0]?.slug ?? "");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<Array<{ value: string; label: string }>>([]);
  const [slot, setSlot] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!date || !type) return;
    let active = true;
    fetch(`/api/appointments/availability?date=${encodeURIComponent(date)}&type=${encodeURIComponent(type)}`).then((response) => response.json()).then((result) => { if (active) setSlots(result.slots ?? []); }).catch(() => { if (active) setSlots([]); });
    return () => { active = false; };
  }, [date, type]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setStatus("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const response = await fetch("/api/appointments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, appointmentType: type, startsAt: slot }) });
    const result = await response.json(); setPending(false); setStatus(result.message ?? "Something went wrong.");
    if (response.ok) { form.reset(); setSlot(""); setDate(""); }
  }

  return <form className="form-card appointment-form" onSubmit={submit}>
    <div className="form-row"><label>Conversation type<select value={type} onChange={(event) => { setType(event.target.value); setSlot(""); }}>{appointmentTypes.map((item) => <option key={item.slug} value={item.slug}>{item.name} · {item.durationMinutes} min</option>)}</select></label><label>Preferred date<input type="date" name="date" value={date} onChange={(event) => { setDate(event.target.value); setSlot(""); }} required /></label></div>
    <label>Available time<select name="startsAt" value={slot} onChange={(event) => setSlot(event.target.value)} required disabled={!date || !slots.length}><option value="">{!date ? "Choose a date first" : slots.length ? "Choose a time" : "No open times"}</option>{slots.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
    <div className="form-row"><label>Full name<input name="name" required /></label><label>Email address<input type="email" name="email" required /></label></div>
    <div className="form-row"><label>Organisation or university<input name="organization" /></label><label>Format<select name="format"><option>Online</option><option>In person</option><option>Either</option></select></label></div>
    <label>What would you like to discuss?<textarea name="message" rows={5} required /></label>
    <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
    <p className="form-help">Requests are reviewed before they are confirmed. Times are shown in East Africa Time (Africa/Kampala).</p>
    <button className="button" disabled={pending || !slot}>{pending ? "Submitting…" : "Request appointment"}</button>
    {status && <p className="form-status" role="status">{status}</p>}
  </form>;
}
