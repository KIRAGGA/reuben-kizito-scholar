import { appointmentTypes, profileContent, publications, type AppointmentType, type ProfileContent, type Publication } from "@/lib/content";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function mapPublication(row: Record<string, unknown>): Publication {
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    authors: Array.isArray(row.authors) ? row.authors.map(String) : [],
    year: Number(row.year),
    venue: String(row.venue ?? ""),
    publicationType: row.publication_type as Publication["publicationType"],
    status: row.status as Publication["status"],
    abstract: typeof row.abstract === "string" ? row.abstract : undefined,
    doi: typeof row.doi === "string" ? row.doi : undefined,
    isbn: typeof row.isbn === "string" ? row.isbn : undefined,
    externalUrl: typeof row.external_url === "string" ? row.external_url : undefined,
    featured: Boolean(row.featured),
  };
}

export async function getPublicProfile(): Promise<ProfileContent> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return profileContent;
  const { data } = await supabase.from("site_profile").select("content").eq("id", 1).maybeSingle();
  return data?.content ? ({ ...profileContent, ...(data.content as Partial<ProfileContent>) } as ProfileContent) : profileContent;
}

export async function getPublications(): Promise<Publication[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return publications;
  const { data, error } = await supabase.from("publications").select("*").eq("status", "published").order("year", { ascending: false }).order("created_at", { ascending: false });
  return !error && data?.length ? data.map((row) => mapPublication(row as Record<string, unknown>)) : publications;
}

export async function getAllPublications(): Promise<Publication[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return publications;
  const { data, error } = await supabase.from("publications").select("*").order("year", { ascending: false });
  return !error && data?.length ? data.map((row) => mapPublication(row as Record<string, unknown>)) : publications;
}

export async function getPublicAppointmentTypes(): Promise<AppointmentType[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return appointmentTypes;
  const { data, error } = await supabase.from("appointment_types").select("*").eq("active", true).order("sort_order");
  return !error && data?.length
    ? data.map((row) => ({ id: String(row.id), slug: String(row.slug), name: String(row.name), description: String(row.description ?? ""), durationMinutes: Number(row.duration_minutes), active: Boolean(row.active) }))
    : appointmentTypes;
}
