-- Security hardening (2026-07-01).
--
-- 1. Anonymous REST access could read every column of any active property
--    (system_prompt, alert_email, Stripe ids) via "Public can view active
--    properties". The public guest page and assistant API now read properties
--    server-side with the service role, so no anonymous SELECT is needed.
-- 2. Anonymous users could insert/update conversations and insert messages
--    into any property. Guest chat writes now go through the assistant API
--    route using the service role, so the open policies are dropped.
-- 3. The five "Service role full access" policies were attached to the public
--    role with using(true), granting anonymous users full read/write on
--    issue_logs, api_cost_logs, error_logs, agent_memory_logs and
--    ambassador_referrals. service_role bypasses RLS, so these policies only
--    ever widened anonymous access. Dropped with no replacement.
-- 4. Dashboard owners resolve issues client-side, which previously worked only
--    through the open issue_logs policy; an owner-scoped UPDATE policy
--    replaces it.

drop policy "Public can view active properties" on public.properties;

drop policy "Public can insert conversations" on public.conversations;
drop policy "Public can update conversations" on public.conversations;

drop policy "Public can insert messages" on public.messages;

drop policy "Service role full access to issue_logs" on public.issue_logs;
drop policy "Service role full access to api_cost_logs" on public.api_cost_logs;
drop policy "Service role full access to error_logs" on public.error_logs;
drop policy "Service role full access to agent_memory_logs" on public.agent_memory_logs;
drop policy "Service role full access to ambassador_referrals" on public.ambassador_referrals;

create policy "Users can update their own property issues"
  on public.issue_logs for update using (
    property_id in (select id from public.properties where user_id = auth.uid())
  );
