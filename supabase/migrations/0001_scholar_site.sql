create extension if not exists pgcrypto;

create type public.publication_status as enum ('published', 'under_review');
create type public.publication_type as enum ('journal_article', 'book', 'manuscript');
create type public.appointment_status as enum ('pending', 'approved', 'declined', 'cancelled', 'no_show');

create table public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = auth.uid() and role in ('admin', 'editor'));
$$;

create table public.site_profile (
  id integer primary key check (id = 1),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.publications (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  authors jsonb not null default '[]'::jsonb,
  year integer not null,
  venue text not null default '',
  publication_type public.publication_type not null default 'journal_article',
  status public.publication_status not null default 'published',
  abstract text,
  doi text,
  isbn text,
  external_url text,
  featured boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.appointment_types (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  duration_minutes integer not null check (duration_minutes between 15 and 180),
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.availability_rules (
  id uuid primary key default gen_random_uuid(),
  day_of_week integer not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  timezone text not null default 'Africa/Kampala',
  active boolean not null default true,
  unique(day_of_week)
);

create table public.blackout_dates (
  id uuid primary key default gen_random_uuid(),
  date date not null unique,
  reason text,
  created_at timestamptz not null default now()
);

create table public.appointment_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  organization text,
  format text not null default 'Online',
  message text not null,
  appointment_type text not null,
  starts_at timestamptz not null,
  status public.appointment_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index appointment_active_slot_idx on public.appointment_requests(starts_at) where status in ('pending', 'approved');

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'unread' check (status in ('unread', 'read', 'archived')),
  created_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  alt_text text not null default '',
  created_at timestamptz not null default now()
);

create table public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  resource text not null,
  resource_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.site_profile enable row level security;
alter table public.publications enable row level security;
alter table public.appointment_types enable row level security;
alter table public.availability_rules enable row level security;
alter table public.blackout_dates enable row level security;
alter table public.appointment_requests enable row level security;
alter table public.contact_messages enable row level security;
alter table public.media_assets enable row level security;
alter table public.admin_audit_log enable row level security;
alter table public.user_roles enable row level security;

create policy "public can read profile" on public.site_profile for select using (true);
create policy "admins manage profile" on public.site_profile for all using (public.is_admin()) with check (public.is_admin());
create policy "public can read published publications" on public.publications for select using (status = 'published');
create policy "admins read all publications" on public.publications for select using (public.is_admin());
create policy "admins manage publications" on public.publications for all using (public.is_admin()) with check (public.is_admin());
create policy "public can read active appointment types" on public.appointment_types for select using (active = true);
create policy "admins manage appointment types" on public.appointment_types for all using (public.is_admin()) with check (public.is_admin());
create policy "public can read active availability" on public.availability_rules for select using (active = true);
create policy "admins manage availability" on public.availability_rules for all using (public.is_admin()) with check (public.is_admin());
create policy "public can read blackout dates" on public.blackout_dates for select using (true);
create policy "admins manage blackout dates" on public.blackout_dates for all using (public.is_admin()) with check (public.is_admin());
create policy "public can create appointments" on public.appointment_requests for insert with check (char_length(name) between 2 and 120 and char_length(message) between 10 and 5000);
create policy "admins manage appointments" on public.appointment_requests for all using (public.is_admin()) with check (public.is_admin());
create policy "public can create contact messages" on public.contact_messages for insert with check (char_length(message) between 10 and 5000);
create policy "admins manage contact messages" on public.contact_messages for all using (public.is_admin()) with check (public.is_admin());
create policy "public can read media" on public.media_assets for select using (true);
create policy "admins manage media" on public.media_assets for all using (public.is_admin()) with check (public.is_admin());
create policy "admins read audit log" on public.admin_audit_log for select using (public.is_admin());
create policy "admins create audit log" on public.admin_audit_log for insert with check (public.is_admin());
create policy "users read own role" on public.user_roles for select using (auth.uid() = user_id);

create or replace function public.create_appointment_request(
  p_name text, p_email text, p_organization text, p_format text, p_message text, p_appointment_type text, p_starts_at timestamptz
) returns public.appointment_requests language plpgsql security definer set search_path = public as $$
declare result public.appointment_requests;
begin
  if p_starts_at <= now() then raise exception 'Please choose a future time'; end if;
  if exists (select 1 from public.appointment_requests where starts_at = p_starts_at and status in ('pending', 'approved')) then raise exception 'That time is already taken'; end if;
  if exists (select 1 from public.blackout_dates where date = (p_starts_at at time zone 'Africa/Kampala')::date) then raise exception 'That date is unavailable'; end if;
  insert into public.appointment_requests(name, email, organization, format, message, appointment_type, starts_at)
  values (p_name, p_email, p_organization, p_format, p_message, p_appointment_type, p_starts_at) returning * into result;
  return result;
end;
$$;
grant execute on function public.create_appointment_request(text, text, text, text, text, text, timestamptz) to anon, authenticated;

insert into public.site_profile(id, content) values (1, '{"name":"Reuben David Kizito"}'::jsonb) on conflict (id) do nothing;
insert into public.appointment_types(slug, name, description, duration_minutes, sort_order) values
 ('research-discussion', 'Research discussion', 'Discuss a research question, emerging idea or academic collaboration.', 45, 1),
 ('academic-consultation', 'Academic consultation', 'A focused conversation about entrepreneurship, management or business research.', 45, 2),
 ('entrepreneurship-consultation', 'Entrepreneurship consultation', 'Practical guidance for founders, family businesses and social enterprises.', 60, 3),
 ('speaking-teaching-engagement', 'Speaking or teaching engagement', 'Explore a lecture, workshop, keynote or teaching collaboration.', 30, 4)
on conflict (slug) do nothing;
insert into public.availability_rules(day_of_week, start_time, end_time) values
 (1, '09:00', '16:00'), (2, '09:00', '16:00'), (3, '09:00', '16:00'), (4, '09:00', '16:00'), (5, '09:00', '14:00')
on conflict (day_of_week) do nothing;
