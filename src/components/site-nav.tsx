"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useCopy } from "@/lib/i18n/useCopy";
import { globalCopy } from "@/lib/i18n/marketing/global";
import { resourceNavCopy } from "@/lib/i18n/marketing/resourceNav";
import LanguageToggle from "@/components/LanguageToggle";
import { openLiveDemo } from "@/components/cds/liveDemoEvents";
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

export function SiteNav({ appearance = "dark" }: { appearance?: "dark" | "light" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [resourcesActive, setResourcesActive] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { nav } = useCopy(globalCopy);
  const resourceNav = useCopy(resourceNavCopy);
  const demo = useCopy(liveDemoCopy);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const resourcesButtonRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);
  const scrollFrame = useRef<number | null>(null);
  const light = appearance === "light";

  /* A route transition can reuse this client component. Always reveal the
     masthead for the new page instead of carrying over the previous page's
     scroll-hidden state. */
  useEffect(() => {
    const reveal = window.setTimeout(() => {
      setHidden(false);
      setOpen(false);
      setMobileResourcesOpen(false);
      setResourcesActive(false);
      if (
        document.activeElement instanceof HTMLElement &&
        resourcesRef.current?.contains(document.activeElement)
      ) {
        document.activeElement.blur();
      }
      lastY.current = window.scrollY;
    }, 0);
    /* Next restores scroll just after a client-side route commits. Reconcile
       once more after that restoration so an old hidden state cannot leave a
       sliver of the previous masthead on a new page. */
    const settle = window.setTimeout(() => {
      if (window.scrollY < 120) setHidden(false);
      lastY.current = window.scrollY;
    }, 240);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(settle);
    };
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      if (scrollFrame.current !== null) return;
      scrollFrame.current = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 60) {
          setHidden(false);
        } else if (y > lastY.current) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastY.current = y;
        scrollFrame.current = null;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current);
    };
  }, []);

  useEffect(() => {
    if (!resourcesActive) return;

    function onPointerDown(event: PointerEvent) {
      if (!resourcesRef.current?.contains(event.target as Node)) setResourcesActive(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setResourcesActive(false);
      resourcesButtonRef.current?.focus();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [resourcesActive]);

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
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-transform duration-300 ease-in-out ${light ? "site-nav-light" : ""} ${
        hidden && !open && !resourcesActive && !light ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{
        background: light ? "rgba(242,233,220,0.93)" : "rgba(16,14,12,0.92)",
        borderBottom: light ? "1px solid rgba(36,28,23,.12)" : "1px solid var(--border)",
      }}
    >
      <div className="site-nav-inner max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="site-wordmark font-sans whitespace-nowrap flex-shrink-0"
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
          {NAV_LINKS.map((l) =>
            l.key === "resources" ? (
              <div
                key={l.href}
                ref={resourcesRef}
                className={`site-resource-nav ${resourcesActive ? "is-open" : ""}`}
                onMouseEnter={() => {
                  setResourcesActive(true);
                  setHidden(false);
                }}
                onMouseLeave={() => {
                  if (!resourcesRef.current?.contains(document.activeElement)) {
                    setResourcesActive(false);
                  }
                }}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setResourcesActive(false);
                  }
                }}
              >
                <button
                  ref={resourcesButtonRef}
                  type="button"
                  className={`site-resource-trigger font-sans whitespace-nowrap ${
                    light ? "site-resource-trigger-light" : ""
                  }`}
                  aria-haspopup="true"
                  aria-expanded={resourcesActive}
                  aria-controls="desktop-resources-panel"
                  onClick={() => {
                    setResourcesActive((active) => !active);
                    setHidden(false);
                  }}
                >
                  {nav[l.key]}
                  <ChevronDown className="site-resource-trigger-icon" aria-hidden="true" size={14} strokeWidth={1.7} />
                </button>

                {resourcesActive && <div id="desktop-resources-panel" className="site-resource-panel" aria-label={resourceNav.ariaLabel}>
                  {resourceNav.groups.map((group) => (
                    <section className="site-resource-group" key={group.label}>
                      <p className="site-resource-group-label">{group.label}</p>
                      <ul>
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link className="site-resource-link" href={link.href}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                  <Link className="site-resource-all" href="/resources">
                    {resourceNav.viewAll}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>}
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className={`font-sans transition-colors whitespace-nowrap ${light ? "hover:text-[#241C17]" : "hover:text-[#F7F6F1]"}`}
                style={{ fontSize: "15px", color: light ? "rgba(36,28,23,.66)" : "var(--text-dim)" }}
              >
                {nav[l.key]}
              </Link>
            )
          )}
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
          {/* Language sits LEFT of the CTA (RC nav order): the CTA is the last
              thing in the bar, so nothing competes with it for the end position. */}
          <LanguageToggle />
          <Link
            href="/demo"
            className="btn-primary whitespace-nowrap flex-shrink-0"
            style={{ minHeight: "44px", fontSize: "14px" }}
          >
            {nav.bookDemo}
          </Link>
        </div>

        {/* Mobile: the language switcher lives inside the drawer, leaving a
            calm masthead with enough room for the full wordmark. */}
        <div className="site-nav-mobile-controls flex items-center gap-3 lg:hidden">
          <button
            ref={toggleRef}
            className="site-nav-menu-button p-2.5"
            style={{ color: light ? "#241C17" : "#E8E3DC", minWidth: "44px", minHeight: "44px" }}
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
          className="site-mobile-drawer lg:hidden px-6 py-5 flex flex-col gap-1 overflow-y-auto"
          style={{
            background: light ? "rgba(242,233,220,0.99)" : "rgba(16,14,12,0.98)",
            borderTop: light ? "1px solid rgba(36,28,23,.12)" : "1px solid var(--border)",
          }}
        >
          <div className="site-mobile-language">
            <LanguageToggle />
          </div>
          {NAV_LINKS.map((l) =>
            l.key === "resources" ? (
              <div
                key={l.href}
                className={`site-mobile-resources ${mobileResourcesOpen ? "is-open" : ""}`}
                style={{ borderBottom: light ? "1px solid rgba(36,28,23,.12)" : "1px solid var(--border)" }}
              >
                <div className="site-mobile-resources-row">
                  <Link
                    href={l.href}
                    className="font-sans text-base py-3 flex-1"
                    style={{ color: light ? "rgba(36,28,23,.72)" : "var(--text-dim)", minHeight: "44px" }}
                    onClick={close}
                  >
                    {nav[l.key]}
                  </Link>
                  <button
                    type="button"
                    className="site-mobile-resources-toggle"
                    style={{ color: light ? "#241C17" : "#E8E3DC" }}
                    aria-label={`${mobileResourcesOpen ? nav.closeMenu : nav.openMenu}: ${resourceNav.label}`}
                    aria-expanded={mobileResourcesOpen}
                    aria-controls="mobile-resources-panel"
                    onClick={() => setMobileResourcesOpen((value) => !value)}
                  >
                    <ChevronDown aria-hidden="true" size={18} strokeWidth={1.6} />
                  </button>
                </div>

                {mobileResourcesOpen && (
                  <div id="mobile-resources-panel" className="site-mobile-resources-panel">
                    {resourceNav.groups.map((group) => (
                      <section className="site-mobile-resource-group" key={group.label}>
                        <p className="site-resource-group-label">{group.label}</p>
                        <ul>
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link href={link.href} onClick={close}>
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                    <Link className="site-resource-all" href="/resources" onClick={close}>
                      {resourceNav.viewAll}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans text-base py-3"
                style={{
                  color: light ? "rgba(36,28,23,.72)" : "var(--text-dim)",
                  borderBottom: light ? "1px solid rgba(36,28,23,.12)" : "1px solid var(--border)",
                  minHeight: "44px",
                }}
                onClick={close}
              >
                {nav[l.key]}
              </Link>
            )
          )}
          <div className="flex flex-col gap-3 mt-auto pt-6 pb-4">
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
