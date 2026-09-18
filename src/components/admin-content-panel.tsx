"use client";

import { useState } from "react";
import type { ProfileContent } from "@/lib/content";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminContentPanel({ initial }: { initial: ProfileContent }) {
  const [form, setForm] = useState(initial); const [message, setMessage] = useState(""); const client = createSupabaseBrowserClient();
  function set(key: keyof ProfileContent, value: string) { setForm((current) => ({ ...current, [key]: value })); }
  function setList(key: "researchInterests" | "teaching" | "consultancy" | "community", value: string) { setForm((current) => ({ ...current, [key]: value.split("\n").map((item) => item.trim()).filter(Boolean) })); }
  async function save(event: React.FormEvent) { event.preventDefault(); if (!client) return setMessage("Connect Supabase before saving live content."); const { error } = await client.from("site_profile").upsert({ id: 1, content: form }, { onConflict: "id" }); setMessage(error ? error.message : "Profile content saved."); }
  const listField = (key: "researchInterests" | "teaching" | "consultancy" | "community", label: string) => <label>{label}<textarea className="admin-input" value={form[key].join("\n")} onChange={(e) => setList(key, e.target.value)} /><span className="form-help">One item per line.</span></label>;
  return <form className="admin-form" onSubmit={save}><h2>Public profile</h2><label>Name<input className="admin-input" value={form.name} onChange={(e) => set("name", e.target.value)} /></label><label>Professional title<input className="admin-input" value={form.title} onChange={(e) => set("title", e.target.value)} /></label><label>Tagline<input className="admin-input" value={form.tagline} onChange={(e) => set("tagline", e.target.value)} /></label><label>Introduction<textarea className="admin-input" value={form.intro} onChange={(e) => set("intro", e.target.value)} /></label><label>Hero quote<textarea className="admin-input" value={form.heroQuote} onChange={(e) => set("heroQuote", e.target.value)} /></label><label>Location<input className="admin-input" value={form.location} onChange={(e) => set("location", e.target.value)} /></label>{listField("researchInterests", "Research interests")}{listField("teaching", "Teaching subjects")}{listField("consultancy", "Consultancy areas")}{listField("community", "Community work")}<button className="button" type="submit">Save profile</button>{message && <p className="form-status">{message}</p>}</form>;
}
