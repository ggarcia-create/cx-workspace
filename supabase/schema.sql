begin;
create table if not exists public.cx_profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 email text not null,
 name text not null,
 role text not null default 'agent' check(role in ('admin','agent','technician','intake','quality','viewer')),
 permissions jsonb not null default '{}'::jsonb,
 approved boolean not null default false,
 active boolean not null default true,
 updated_at timestamptz not null default now()
);
alter table public.cx_profiles enable row level security;
revoke all on public.cx_profiles from anon,authenticated;
grant select on public.cx_profiles to authenticated;
create policy cx_self_profile on public.cx_profiles for select to authenticated using(id=auth.uid());
create table if not exists public.cx_workspace (
 id integer primary key check(id=1),
 version bigint not null default 0,
 state jsonb not null default '{"records":[],"users":[],"audit":[],"notifications":[],"monthlySales":[],"nextNumber":1,"migrated":false}'::jsonb
);
alter table public.cx_workspace enable row level security;
revoke all on public.cx_workspace from anon,authenticated;
insert into public.cx_workspace(id) values(1) on conflict do nothing;
create or replace function public.cx_create_profile() returns trigger language plpgsql security definer set search_path=public,pg_temp as $$
begin
 insert into public.cx_profiles(id,email,name,role,permissions,approved,active)
 values(new.id,new.email,coalesce(nullif(new.raw_user_meta_data->>'name',''),nullif(new.raw_user_meta_data->>'full_name',''),split_part(new.email,'@',1)),
 'agent','{"dashboard":{"view":true,"edit":false},"registros":{"view":true,"edit":false},"devoluciones":{"view":true,"edit":false},"reparacion":{"view":true,"edit":false},"calidad":{"view":true,"edit":false},"facturacion":{"view":true,"edit":false},"configuracion":{"view":true,"edit":false}}'::jsonb,true,true)
 on conflict(id) do nothing;
 return new;
end;
$$;
create trigger cx_on_auth_user_created after insert on auth.users for each row execute function public.cx_create_profile();
create or replace function public.cx_commit_state(expected_version bigint,next_state jsonb,actor_id uuid,expected_profile_updated timestamptz) returns boolean language plpgsql set search_path=public,pg_temp as $$
begin
 perform 1 from public.cx_profiles where id=actor_id and approved and active and updated_at=expected_profile_updated for share;
 if not found then return false;end if;
 update public.cx_workspace set state=next_state,version=version+1 where id=1 and version=expected_version;
 return found;
end;
$$;
revoke all on function public.cx_commit_state(bigint,jsonb,uuid,timestamptz) from public,anon,authenticated;
grant execute on function public.cx_commit_state(bigint,jsonb,uuid,timestamptz) to service_role;
revoke all on function public.cx_create_profile() from public,anon,authenticated;
grant all on public.cx_profiles,public.cx_workspace to service_role;
commit;
