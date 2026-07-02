-- rls_auto_enable() is a SECURITY DEFINER event-trigger helper; it must not be
-- callable through the public RPC surface.
revoke execute on function public.rls_auto_enable() from anon, authenticated, public;
