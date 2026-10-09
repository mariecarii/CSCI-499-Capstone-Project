-- Run once: Supabase dashboard -> SQL Editor -> New query -> paste -> Run

-- One row per saved workout
create table if not exists public.workouts (
  id               uuid primary key default gen_random_uuid(),
  -- auth.uid() = the id of the signed-in user making the request.
  -- "on delete cascade" = if the user is deleted, their workouts are deleted too.
  user_id          uuid not null default auth.uid() references auth.users (id) on delete cascade,
  exercise         text not null,                 -- slug from lib/exercises.ts, e.g. 'pull-ups'
  reps             integer not null default 0 check (reps >= 0),
  duration_seconds integer not null default 0 check (duration_seconds >= 0),
  created_at       timestamptz not null default now()
);

create index if not exists workouts_user_created_idx on public.workouts (user_id, created_at desc);

-- Row Level Security: without a matching policy, nobody can read or write any row.
alter table public.workouts enable row level security;

drop policy if exists "read own workouts" on public.workouts;
create policy "read own workouts" on public.workouts
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "insert own workouts" on public.workouts;
create policy "insert own workouts" on public.workouts
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "delete own workouts" on public.workouts;
create policy "delete own workouts" on public.workouts
  for delete to authenticated using ((select auth.uid()) = user_id);

-- Lets a signed-in user delete their OWN account (and nothing else).
-- "security definer" runs it with the owner's permissions so it can reach auth.users.
create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'not signed in';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke execute on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;
