"use client";

import Link from "next/link";
import { useCopy } from "@/lib/i18n/useCopy";
import { globalCopy } from "@/lib/i18n/marketing/global";
import LanguageToggle from "@/components/LanguageToggle";
import { CreditLockup } from "@/components/cds/EndorsementMark";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
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
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const { footer } = useCopy(globalCopy);

  return (
    <footer className="site-footer" style={{ background: "var(--surface-1)", borderTop: "1px solid var(--border)", color: "var(--text)" }}>
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
          <FooterColumn title={footer.columns.company.title} links={footer.columns.company.links} />
        </div>

        {/* Newsletter block removed: the form had no backend (it faked a success
            state and dropped the address). Copy is retained in global.ts for
            when a real subscribe endpoint exists. */}

        {/* The shared family credit lockup — same component as the hero. */}
        <div className="mb-14">
          <CreditLockup />
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
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
