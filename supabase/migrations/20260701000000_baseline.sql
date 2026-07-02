-- Baseline: exact schema of production project fhrgapgrxmbkjwearixc as of 2026-07-01,
-- captured before the security_hardening_rls migration. Policies shown here are the
-- pre-hardening state; 20260701000001_security_hardening_rls.sql corrects them.

create extension if not exists "uuid-ossp" with schema extensions;

-- Properties
create table public.properties (
  id uuid default extensions.uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  hotel_name text not null,
  location text,
  room_count text,
  extracted_data jsonb not null,
  system_prompt text not null,
  is_active boolean default true,
  trial_started_at timestamptz default now(),
  trial_ends_at timestamptz default (now() + interval '14 days'),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text default 'trial',
  subscription_price_id text,
  conversational_style text default 'warm_local',
  alert_email text
);

-- Conversations
create table public.conversations (
  id uuid default extensions.uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) on delete cascade not null,
  guest_session_id text not null,
  language_detected text default 'en',
  started_at timestamptz default now(),
  last_message_at timestamptz default now(),
  message_count integer default 0
);

-- Messages
create table public.messages (
  id uuid default extensions.uuid_generate_v4() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  property_id uuid references public.properties(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  revenue_signal text,
  created_at timestamptz default now()
);

-- Issue logs
create table public.issue_logs (
  id uuid default gen_random_uuid() primary key,
  property_id uuid references public.properties(id),
  guest_message text not null,
  room_number text,
  status text default 'open',
  created_at timestamptz default now(),
  resolved_at timestamptz,
  resolved_by text
);

-- API cost logs
create table public.api_cost_logs (
  id uuid default gen_random_uuid() primary key,
  property_id uuid references public.properties(id),
  request_type text not null,
  model text not null,
  input_tokens integer default 0,
  output_tokens integer default 0,
  cost_usd numeric default 0,
  created_at timestamptz default now()
);

-- Error logs
create table public.error_logs (
  id uuid default gen_random_uuid() primary key,
  property_id uuid references public.properties(id),
  error_type text not null,
  error_message text,
  route text,
  resolved boolean default false,
  created_at timestamptz default now()
);

-- Agent memory logs
create table public.agent_memory_logs (
  id uuid default gen_random_uuid() primary key,
  property_id text not null,
  session_id text not null,
  query_text text not null,
  response_text text not null,
  route_type text not null,
  tools_used text[],
  user_re_asked boolean default false,
  user_abandoned boolean default false,
  critic_score integer,
  critic_critique text,
  critic_suggestion text,
  created_at timestamptz default now()
);

-- Ambassador referrals
create table public.ambassador_referrals (
  id uuid default gen_random_uuid() primary key,
  ambassador_ref text not null,
  user_id uuid references auth.users(id),
  user_email text,
  hotel_name text,
  plan text,
  signed_up_at timestamptz default now(),
  first_payment_at timestamptz,
  status text default 'trial',
  monthly_revenue numeric default 0,
  commission_rate numeric default 0.30,
  notes text
);

-- RLS
alter table public.properties enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.issue_logs enable row level security;
alter table public.api_cost_logs enable row level security;
alter table public.error_logs enable row level security;
alter table public.agent_memory_logs enable row level security;
alter table public.ambassador_referrals enable row level security;

-- Properties policies
create policy "Users can view own properties"
  on public.properties for select using (auth.uid() = user_id);
create policy "Users can insert own properties"
  on public.properties for insert with check (auth.uid() = user_id);
create policy "Users can update own properties"
  on public.properties for update using (auth.uid() = user_id);
create policy "Users can delete own properties"
  on public.properties for delete using (auth.uid() = user_id);
create policy "Public can view active properties"
  on public.properties for select using (is_active = true);

-- Conversations policies
create policy "Users can view own conversations"
  on public.conversations for select using (
    exists (select 1 from public.properties
      where properties.id = conversations.property_id
      and properties.user_id = auth.uid())
  );
create policy "Public can insert conversations"
  on public.conversations for insert with check (true);
create policy "Public can update conversations"
  on public.conversations for update using (true);

-- Messages policies
create policy "Users can view own messages"
  on public.messages for select using (
    exists (select 1 from public.properties
      where properties.id = messages.property_id
      and properties.user_id = auth.uid())
  );
create policy "Public can insert messages"
  on public.messages for insert with check (true);

-- Issue logs policies
create policy "Users can view their own property issues"
  on public.issue_logs for select using (
    property_id in (select id from public.properties where user_id = auth.uid())
  );
create policy "Service role full access to issue_logs"
  on public.issue_logs for all using (true);

-- Open "service role" policies (note: these actually applied to role public;
-- removed by the hardening migration because service_role bypasses RLS entirely)
create policy "Service role full access to api_cost_logs"
  on public.api_cost_logs for all using (true);
create policy "Service role full access to error_logs"
  on public.error_logs for all using (true);
create policy "Service role full access to agent_memory_logs"
  on public.agent_memory_logs for all using (true);
create policy "Service role full access to ambassador_referrals"
  on public.ambassador_referrals for all using (true);
