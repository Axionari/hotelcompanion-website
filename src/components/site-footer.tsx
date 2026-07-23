"use client";

import Link from "next/link";
import { useState } from "react";
import { useCopy } from "@/lib/i18n/useCopy";
import { globalCopy } from "@/lib/i18n/marketing/global";
import LanguageToggle from "@/components/LanguageToggle";

function FooterColumn({
  title,
  links,
  comingSoon,
  comingSoonSuffix,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
  comingSoon?: ReadonlyArray<string>;
  comingSoonSuffix?: string;
}) {
  return (
    <div>
      <div className="eyebrow mb-4">{title}</div>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="font-sans text-sm transition-colors hover:text-[#E8E3DC]"
              style={{ color: "var(--text-muted)" }}
            >
              {l.label}
            </Link>
          </li>
        ))}
        {comingSoon?.map((label) => (
          <li key={label}>
            <span className="font-sans text-sm" style={{ color: "var(--text-muted)", opacity: 0.55 }}>
              {label} <span style={{ fontSize: "11px" }}>({comingSoonSuffix})</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const { footer } = useCopy(globalCopy);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer style={{ background: "var(--surface-1)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
        {/* Brand block — just the wordmark. The page's own closing band carries
            the crescendo + CTA (RC ends the page once, not twice). */}
        <div className="mb-14">
          <div className="eyebrow">{footer.brand.name}</div>
        </div>

        {/* Link columns — v3: four (Company+Legal merged) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 mb-14">
          <FooterColumn title={footer.columns.product.title} links={footer.columns.product.links} />
          <FooterColumn title={footer.columns.solutions.title} links={footer.columns.solutions.links} />
          <FooterColumn title={footer.columns.resources.title} links={footer.columns.resources.links} />
          <FooterColumn
            title={footer.columns.company.title}
            links={footer.columns.company.links}
            comingSoon={footer.columns.company.comingSoon}
            comingSoonSuffix={footer.columns.company.comingSoonSuffix}
          />
        </div>

        {/* Newsletter */}
        <div className="mb-14 max-w-md">
          <div className="eyebrow mb-3">{footer.newsletter.title}</div>
          <p className="font-sans text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            {footer.newsletter.body}
          </p>
          {subscribed ? (
            <p className="font-sans text-sm" style={{ color: "var(--green)" }}>
              {footer.newsletter.success}
            </p>
          ) : (
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setSubscribed(true);
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={footer.newsletter.placeholder}
                aria-label={footer.newsletter.placeholder}
                className="font-sans flex-1 text-sm px-4"
                style={{
                  background: "var(--surface-3)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  height: "44px",
                  color: "var(--text)",
                }}
              />
              <button
                type="submit"
                className="font-sans text-sm px-5 transition-colors hover:border-[rgba(201,106,58,0.5)]"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  height: "44px",
                  color: "var(--text-secondary)",
                  background: "transparent",
                }}
              >
                {footer.newsletter.submit}
              </button>
            </form>
          )}
        </div>

        {/* v3 {#footer}: the two mini-essays are now one line each */}
        <div className="mb-14 flex flex-col gap-2.5">
          <p className="font-sans text-sm" style={{ color: "var(--text-secondary)" }}>
            {footer.osLine.text}{" "}
            <Link
              href="/companion-os"
              className="transition-colors hover:text-[#D4784A]"
              style={{ color: "var(--accent)", fontWeight: 500 }}
            >
              {footer.osLine.link}
            </Link>
          </p>
          <p className="font-sans text-sm" style={{ color: "var(--text-secondary)" }}>
            {footer.axionariLine.text}{" "}
            <a
              href="https://axionari.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#D4784A]"
              style={{ color: "var(--accent)", fontWeight: 500 }}
            >
              {footer.axionariLine.link}
            </a>
          </p>
        </div>

        {/* Legal line — v3: POWERED BY AXIONARI mark above the copyright */}
        <div
          className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="flex flex-col gap-2">
            <p className="font-sans text-sm" style={{ color: "var(--text-muted)" }}>
              {footer.legalLine}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/auth/login"
              className="font-sans text-sm transition-colors hover:text-[#A8A099]"
              style={{ color: "var(--text-muted)" }}
            >
              {footer.signIn}
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
