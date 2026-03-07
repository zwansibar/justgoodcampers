-- ============================================================
-- JustGoodCampers — Supabase Schema
-- Run this in the Supabase SQL Editor (supabase.com → your project → SQL Editor → New query)
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ============================================================
-- CAMPERS
-- ============================================================
create table if not exists campers (
  id                    uuid primary key default gen_random_uuid(),
  name                  text not null,
  slug                  text not null unique,
  description           text,
  sleeps                integer,
  price_low_season      integer not null, -- NZD cents per day
  price_shoulder_season integer not null,
  price_high_season     integer not null,
  created_at            timestamptz default now()
);

-- Insert the two campers
-- Low: May-Sep | Shoulder: Oct-Nov, Mar-Apr | High: Dec-Feb
insert into campers (name, slug, description, sleeps, price_low_season, price_shoulder_season, price_high_season)
values
  (
    '2-Berth Compact',
    '2-berth',
    'Self-contained compact campervan for couples and solo travellers. Sleeps 2, automatic, onboard toilet and shower, solar panel, heater.',
    2,
    17900,  -- NZ$179/day
    21900,  -- NZ$219/day
    25900   -- NZ$259/day
  ),
  (
    '4-Berth Family',
    '4-berth',
    'Spacious self-contained family motorhome. Sleeps up to 4, full kitchen, large compressor fridge, onboard toilet and shower, solar panel, heater.',
    4,
    22900,  -- NZ$229/day
    26900,  -- NZ$269/day
    31900   -- NZ$319/day
  )
on conflict (slug) do nothing;

-- ============================================================
-- BOOKINGS
-- ============================================================
create table if not exists bookings (
  id             uuid primary key default gen_random_uuid(),
  camper_id      uuid references campers(id) on delete restrict,
  customer_name  text not null,
  customer_email text not null,
  customer_phone text not null,
  pickup_date    date not null,
  dropoff_date   date not null,
  num_days       integer not null,
  total_price    integer not null, -- NZD cents
  addons         jsonb default '[]'::jsonb,
  status         text not null default 'pending' check (status in ('confirmed', 'pending', 'cancelled')),
  booking_type   text not null default 'direct' check (booking_type in ('direct', 'enquiry')),
  notes          text,
  flight_number  text,
  created_at     timestamptz default now()
);

-- ============================================================
-- BLOCKED DATES
-- ============================================================
create table if not exists blocked_dates (
  id         uuid primary key default gen_random_uuid(),
  camper_id  uuid references campers(id) on delete cascade,
  start_date date not null,
  end_date   date not null,
  reason     text check (reason in ('maintenance', 'personal', 'other')),
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table campers       enable row level security;
alter table bookings      enable row level security;
alter table blocked_dates enable row level security;

-- campers: public can read
create policy "campers_select_anon" on campers
  for select to anon using (true);

-- bookings: anon can insert (public booking form)
create policy "bookings_insert_anon" on bookings
  for insert to anon with check (true);

-- bookings: only authenticated users can read/update/delete (admin)
create policy "bookings_select_auth" on bookings
  for select to authenticated using (true);

create policy "bookings_update_auth" on bookings
  for update to authenticated using (true);

create policy "bookings_delete_auth" on bookings
  for delete to authenticated using (true);

-- blocked_dates: anon can read (to show unavailability in calendar)
create policy "blocked_dates_select_anon" on blocked_dates
  for select to anon using (true);

-- blocked_dates: only authenticated users can manage
create policy "blocked_dates_insert_auth" on blocked_dates
  for insert to authenticated with check (true);

create policy "blocked_dates_update_auth" on blocked_dates
  for update to authenticated using (true);

create policy "blocked_dates_delete_auth" on blocked_dates
  for delete to authenticated using (true);
