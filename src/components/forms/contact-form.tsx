"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<string>("");
  const [pending, setPending] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setPending(true); setStatus("");
    const form = event.currentTarget;
    const response = await fetch("/api/contact", { method: "POST", body: JSON.stringify(Object.fromEntries(new FormData(form))), headers: { "Content-Type": "application/json" } });
    const result = await response.json();
    setPending(false); setStatus(result.message ?? "Something went wrong.");
    if (response.ok) form.reset();
  }
  return <form className="form-card" onSubmit={submit}>
    <div className="form-row"><label>Full name<input name="name" required /></label><label>Email address<input type="email" name="email" required /></label></div>
    <label>Subject<input name="subject" required /></label>
    <label>Message<textarea name="message" rows={6} required /></label>
    <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
    <button className="button" disabled={pending}>{pending ? "Sending…" : "Send message"}</button>
    {status && <p className="form-status" role="status">{status}</p>}
  </form>;
}
