"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { useCopy } from "@/lib/i18n/useCopy";
import { globalCopy } from "@/lib/i18n/marketing/global";
import LanguageToggle from "@/components/LanguageToggle";
import { openLiveDemo } from "@/components/cds/LiveDemoModal";
import { liveDemoCopy } from "@/lib/i18n/marketing/liveDemo";
import { LIVE_DEMO_ENABLED } from "@/lib/flags";

/* v3 G5: the Companion OS nav item is removed — the platform story lives in
   the section-08 band and on axionari.com. The /companion-os page remains. */
/* Companion OS sits after Enterprise: the product pages come first, then the
   engine underneath them, then the softer pages. */
const NAV_LINKS: Array<{
  key: "platform" | "solutions" | "enterprise" | "companionOs" | "resources" | "company";
  href: string;
}> = [
  { key: "platform", href: "/platform" },
  { key: "solutions", href: "/solutions" },
  { key: "enterprise", href: "/enterprise" },
  { key: "companionOs", href: "/companion-os" },
  { key: "resources", href: "/resources" },
  { key: "company", href: "/company" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { nav } = useCopy(globalCopy);
  const demo = useCopy(liveDemoCopy);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      if (y < 60) {
        setHidden(false);
      } else if (y > lastY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Drawer: scroll lock + Esc + focus trap
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === toggleRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    drawerRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-transform duration-300 ease-in-out ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ background: "rgba(16,14,12,0.92)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-sans whitespace-nowrap flex-shrink-0"
          style={{
            color: "var(--text)",
            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "0.09em",
            textTransform: "uppercase",
          }}
        >
          {nav.wordmark}
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-sans transition-colors hover:text-[#F7F6F1] whitespace-nowrap"
              style={{ fontSize: "15px", color: "var(--text-dim)" }}
            >
              {nav[l.key]}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          {/* The product itself, one click from every page (disabled for now) */}
          {LIVE_DEMO_ENABLED && (
            <button
              type="button"
              onClick={openLiveDemo}
              className="hidden xl:inline-flex font-sans transition-colors hover:text-[#F7F6F1] whitespace-nowrap"
              style={{ fontSize: "15px", color: "var(--accent)", minHeight: "44px" }}
            >
              {demo.open}
            </button>
          )}
          <Link
            href="/demo"
            className="btn-primary whitespace-nowrap flex-shrink-0"
            style={{ minHeight: "44px", fontSize: "14px" }}
          >
            {nav.bookDemo}
          </Link>
          <LanguageToggle />
        </div>

        {/* Mobile: language toggle + hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageToggle />
          <button
            ref={toggleRef}
            className="p-2.5"
            style={{ color: "#E8E3DC", minWidth: "44px", minHeight: "44px" }}
            onClick={() => (open ? close() : setOpen(true))}
            aria-label={open ? nav.closeMenu : nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-drawer"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-drawer"
          ref={drawerRef}
          className="lg:hidden px-6 py-4 flex flex-col gap-1 overflow-y-auto"
          style={{
            background: "rgba(16,14,12,0.98)",
            borderTop: "1px solid var(--border)",
            maxHeight: "calc(100dvh - 64px)",
          }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-sans text-base py-3"
              style={{ color: "var(--text-dim)", borderBottom: "1px solid var(--border)", minHeight: "44px" }}
              onClick={close}
            >
              {nav[l.key]}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4 pb-4">
            {LIVE_DEMO_ENABLED && (
              <button
                type="button"
                onClick={() => {
                  close();
                  openLiveDemo();
                }}
                className="btn-secondary w-full"
              >
                {demo.open}
              </button>
            )}
            <Link
              href="/demo"
              onClick={close}
              className="btn-primary w-full"
            >
              {nav.bookDemo}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
