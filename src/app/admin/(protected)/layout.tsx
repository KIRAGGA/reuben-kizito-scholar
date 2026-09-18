import Link from "next/link";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProtectedAdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!isSupabaseConfigured()) return <main className="admin-shell"><div class="container narrow"><p className="eyebrow">Admin studio</p><h1>Connect Supabase to activate the backend.</h1><p class="lead-small muted">The public site is running on seeded content. Add the Supabase URL and publishable key, apply the migration, then create the first admin user to manage the live content.</p><Link class="button" href="/">Return to site</Link></div></main>;
  const supabase = await createSupabaseServerClient(); const { data: { user } } = supabase ? await supabase.auth.getUser() : { data: { user: null } }; if (!user) redirect("/admin/login");
  return <main className="admin-shell"><div className="container"><div className="admin-nav"><div><p className="eyebrow">Content studio</p><strong>Reuben David Kizito</strong></div><nav><Link href="/admin">Dashboard</Link><Link href="/admin/publications">Publications</Link><Link href="/admin/appointments">Appointments</Link><Link href="/admin/settings">Content</Link><Link href="/">View site ↗</Link></nav></div>{children}</div></main>;
}
