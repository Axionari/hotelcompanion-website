# Hotel Companion marketing release — 24 October 2026

The approved Figma visual system now spans the English and Spanish marketing site, with distinct page layouts, feature navigation, product demonstrations from the sales interface, and responsive typography.

## Commercial and editorial changes

- Preserve “Smarter offers. More revenue.” and introduce the smart companion in the hero.
- Explain the initial setup and integration fee, minimum monthly platform fee, and success fee tied to verified additional contribution. Individual pricing remains part of client discovery.
- Include hotel and destination knowledge in the initial 1–3 week launch scope; system connections follow in stages.
- Place the compact, non-linked startup program logos above the final copyright, Axionari and accessibility row.
- Correct the Spanish homepage title and bilingual search descriptions.

## Release verification

- 58 content pages reviewed in English and Spanish at desktop and phone widths.
- Static checks: one H1 per page, metadata, canonical URLs, internal routes and anchors, duplicate IDs, local assets and superseded commercial copy. No findings.
- Browser checks: horizontal overflow, heading bounds, navigation, language switching with feature anchors, product replay, resource filtering, and localized empty-form validation.
- 59 automated tests passed; production build passed with Webpack.
- ESLint: no errors, 24 existing advisory warnings in the wider codebase.
- Next.js and compatible dependencies updated. Production dependency audit: zero vulnerabilities. Three audit findings remain in the development-only Vitest toolchain; resolving those requires a separate major-version upgrade.
- Local Turbopack cannot bind its subprocess port in the execution environment; the production host runs its normal build separately.

## Scope

Marketing deployment only: `hotelcompanion-website` on Vercel. Hotel-product and sales-demo services, credentials, data stores and backend source are unchanged. No live inquiry or transaction was submitted during verification.

Deployment packaging excludes local review reports and documentation. Existing checkouts with unrelated work were preserved.
