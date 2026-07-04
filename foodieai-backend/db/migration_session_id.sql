-- Run this in the Supabase SQL Editor
alter table orders add column if not exists session_id text;
