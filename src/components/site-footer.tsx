"use client";

import Link from "next/link";
import { useCopy } from "@/lib/i18n/useCopy";
import { globalCopy } from "@/lib/i18n/marketing/global";
import LanguageToggle from "@/components/LanguageToggle";
import { AxionariGlyph } from "@/components/cds/EndorsementMark";

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

        {/* Newsletter block removed: the form had no backend (it faked a success
            state and dropped the address). Copy is retained in global.ts for
            when a real subscribe endpoint exists. */}

        {/* {#footer}: one quiet family endorsement line (was two paragraphs). */}
        <div className="mb-14">
          <p
            className="font-sans text-sm inline-flex flex-wrap items-center gap-x-1.5 gap-y-1"
            style={{ color: "var(--text-secondary)" }}
          >
            <span>{footer.osLine.text}</span>
            <Link
              href="/companion-os"
              className="transition-colors hover:text-[#D4784A]"
              style={{ color: "var(--accent)", fontWeight: 500 }}
            >
              {footer.osLine.link}
            </Link>
            <span aria-hidden style={{ opacity: 0.45 }}>·</span>
            <span>{footer.axionariLine.text}</span>
            <a
              href="https://axionari.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-opacity hover:opacity-80"
              style={{ fontWeight: 500 }}
            >
              <AxionariGlyph size="0.95em" />
              <span style={{ color: "var(--gold)" }}>{footer.axionariLine.link}</span>
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
