"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLoginForm() {
  const router = useRouter(); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [status, setStatus] = useState(""); const [pending, setPending] = useState(false);
  async function submit(event: React.FormEvent) { event.preventDefault(); const client = createSupabaseBrowserClient(); if (!client) return setStatus("Supabase is not configured. Add the environment variables before using the admin studio."); setPending(true); const { error } = await client.auth.signInWithPassword({ email, password }); setPending(false); if (error) return setStatus("The email or password was not accepted."); router.push("/admin"); router.refresh(); }
  return <form className="form-card" onSubmit={submit}><label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label><button className="button" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>{status && <p className="form-status">{status}</p>}</form>;
}
