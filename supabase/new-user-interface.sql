-- Only future registrations. Existing approvals, roles and permissions are preserved.
begin;
create or replace function public.cx_create_profile() returns trigger language plpgsql security definer set search_path=public,pg_temp as $$
begin
 insert into public.cx_profiles(id,email,name,role,permissions,approved,active)
 values(new.id,new.email,coalesce(nullif(new.raw_user_meta_data->>'name',''),nullif(new.raw_user_meta_data->>'full_name',''),split_part(new.email,'@',1)),
 'agent','{}'::jsonb,true,true)
 on conflict(id) do nothing;
 return new;
end;
$$;
commit;
