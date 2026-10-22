-- Run this in Supabase SQL Editor. Review before production use.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user')
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  summary text not null default '',
  problem text not null default '',
  solution text not null default '',
  features text[] not null default '{}',
  image_url text not null default '',
  status text not null default 'concept' check (status in ('concept','client','personal')),
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  role_label text not null default 'Sample placeholder',
  review_text text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  published boolean not null default true,
  sort_order integer not null default 0
);

create table if not exists public.work_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  services text[] not null default '{}',
  budget text not null default '',
  deadline text not null default '',
  details text not null default '',
  status text not null default 'new' check (status in ('new','reviewing','contacted','closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  page_path text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.reviews enable row level security;
alter table public.services enable row level security;
alter table public.work_requests enable row level security;
alter table public.page_views enable row level security;

-- Users can read only their own profile row; role changes should be done by a trusted project owner.
drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile" on public.profiles for select using (id = (select auth.uid()));

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin');
$$;

-- Public can read published portfolio content; only admins can change it.
drop policy if exists "Public reads published projects" on public.projects;
create policy "Public reads published projects" on public.projects for select using (published = true or public.is_admin());
drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects" on public.projects for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public reads published reviews" on public.reviews;
create policy "Public reads published reviews" on public.reviews for select using (published = true or public.is_admin());
drop policy if exists "Admins manage reviews" on public.reviews;
create policy "Admins manage reviews" on public.reviews for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public reads published services" on public.services;
create policy "Public reads published services" on public.services for select using (published = true or public.is_admin());
drop policy if exists "Admins manage services" on public.services;
create policy "Admins manage services" on public.services for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins read requests" on public.work_requests;
create policy "Admins read requests" on public.work_requests for select using (public.is_admin());
drop policy if exists "Admins update requests" on public.work_requests;
create policy "Admins update requests" on public.work_requests for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Public submits work requests" on public.work_requests;
create policy "Public submits work requests" on public.work_requests for insert with check (length(name) between 1 and 100 and length(contact) between 3 and 200 and length(details) <= 5000);

drop policy if exists "Public can record page views" on public.page_views;
create policy "Public can record page views" on public.page_views for insert with check (length(page_path) between 1 and 300);
drop policy if exists "Admins read page views" on public.page_views;
create policy "Admins read page views" on public.page_views for select using (public.is_admin());

-- After creating your user in Authentication > Users, replace the email below and run:
-- insert into public.profiles (id, email, role)
-- select id, email, 'admin' from auth.users where lower(email) = lower('ADMIN_EMAIL_HERE')
-- on conflict (id) do update set role = 'admin', email = excluded.email;
