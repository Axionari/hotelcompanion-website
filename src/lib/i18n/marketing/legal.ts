import type { LegalDoc } from '@/components/cds/LegalLayout'
import type { Localized } from '../useCopy'
import { privacyEs, termsEs, cookiesEs, securityEs, responsibleAiEs, trustEs } from './legal.es'

/* Copy source: HotelCompanion__Site_Copy.md {#privacy} {#terms} {#cookies}
   {#security} {#responsible-ai} {#trust-center}. Verbatim.
   Counsel review before public launch is standard and is not a build blocker. */

export const LAST_UPDATED = 'Last Updated: July 2026'

const privacyEn: LegalDoc = {
  eyebrow: 'LEGAL · PRIVACY',
  title: 'Privacy Policy',
  lastUpdated: LAST_UPDATED,
  intro: [
    'Your guests trust you with their experience.',
    'You should be able to trust us with your data.',
    'At Hotel Companion, privacy, security, and responsible AI are foundational principles—not features added later. This Privacy Policy explains what information we collect, how we use it, and how we protect it.',
    'By using Hotel Companion, you agree to the practices described below.',
  ],
  blocks: [
    { type: 'h2', text: 'Information We Collect' },
    {
      type: 'p',
      text: 'Depending on how Hotel Companion is deployed, we may collect information necessary to provide our services. This may include:',
    },
    { type: 'term', label: 'Account Information', text: 'Name; Business email; Company; Role; Contact information.' },
    {
      type: 'term',
      label: 'Organization Information',
      text: 'Hotel information; Property configuration; Knowledge base content; Operational procedures; Amenities; Destination information; Business settings.',
    },
    {
      type: 'term',
      label: 'Guest Interactions',
      text: 'Depending on your organization’s implementation, Hotel Companion may process: Guest questions; Guest requests; Service interactions; Voice conversations; Chat conversations; Feedback; Operational requests. Guest interaction data is processed to improve service delivery and generate organizational intelligence.',
    },
    {
      type: 'term',
      label: 'Technical Information',
      text: 'Device information; Browser type; IP address; Log data; Performance metrics; Diagnostic information. This information helps us maintain platform reliability and security.',
    },

    { type: 'h2', text: 'How We Use Information' },
    {
      type: 'p',
      text: 'We use information to: Provide Hotel Companion services. Respond to guest requests. Coordinate operational workflows. Generate Guest Intelligence. Improve product performance. Maintain platform security. Provide customer support. Develop new capabilities. Comply with legal obligations.',
    },
    { type: 'p', text: 'We do not sell personal information.' },

    { type: 'h2', text: 'Artificial Intelligence' },
    {
      type: 'p',
      text: 'Hotel Companion uses artificial intelligence to help organizations understand guest needs, coordinate operations, and improve hospitality.',
    },
    {
      type: 'p',
      text: 'AI-generated responses may assist employees but should not replace human judgment in situations requiring professional discretion or emergency response.',
    },
    { type: 'p', text: 'Organizations remain responsible for decisions made using our platform.' },

    { type: 'h2', text: 'Organizational Knowledge' },
    { type: 'p', text: 'One of Hotel Companion’s core capabilities is preserving organizational knowledge.' },
    { type: 'p', text: 'Knowledge contributed by your organization remains your organization’s intellectual property.' },
    {
      type: 'p',
      text: 'Hotel Companion processes this information solely to provide and improve the services you authorize.',
    },

    { type: 'h2', text: 'Data Security' },
    { type: 'p', text: 'Security is a foundational design principle of Companion OS.' },
    {
      type: 'p',
      text: 'We employ industry-standard administrative, technical, and organizational safeguards designed to protect customer information. These safeguards include: Encryption in transit; Encryption at rest; Role-based access controls; Authentication; Audit logging; Infrastructure monitoring; Continuous security improvements.',
    },
    {
      type: 'p',
      text: 'No security system is perfect, but protecting customer information remains one of our highest priorities.',
    },

    { type: 'h2', text: 'Data Retention' },
    {
      type: 'p',
      text: 'Information is retained only as long as necessary to provide services, comply with contractual obligations, resolve disputes, and satisfy applicable legal requirements.',
    },
    {
      type: 'p',
      text: 'Organizations may request deletion of their data in accordance with applicable law and contractual agreements.',
    },

    { type: 'h2', text: 'Third-Party Services' },
    { type: 'p', text: 'Hotel Companion integrates with third-party services selected by our customers.' },
    {
      type: 'p',
      text: 'These may include hospitality systems, cloud infrastructure providers, analytics services, authentication providers, and communication platforms.',
    },
    { type: 'p', text: 'Each third-party provider maintains its own privacy practices.' },

    { type: 'h2', text: 'International Data Processing' },
    { type: 'p', text: 'Hotel Companion serves organizations globally.' },
    {
      type: 'p',
      text: 'Information may be processed in jurisdictions outside your country where our infrastructure or service providers operate.',
    },
    { type: 'p', text: 'Where required, appropriate safeguards are implemented for international data transfers.' },

    { type: 'h2', text: 'Cookies' },
    {
      type: 'p',
      text: 'We use cookies and similar technologies to: Maintain secure sessions; Remember preferences; Measure website performance; Improve user experience; Analyze platform usage.',
    },
    { type: 'p', text: 'You may manage cookie preferences through your browser settings.' },
    { type: 'link', label: 'Read our Cookie Policy', href: '/cookies' },

    { type: 'h2', text: 'Your Rights' },
    {
      type: 'p',
      text: 'Depending on your jurisdiction, you may have rights regarding your personal information, including: Access; Correction; Deletion; Restriction; Objection; Data portability; Withdrawal of consent where applicable.',
    },
    { type: 'p', text: 'Requests may be submitted using the contact information below.' },

    { type: 'h2', text: 'Children’s Privacy' },
    { type: 'p', text: 'Hotel Companion is intended for hospitality organizations and business users.' },
    { type: 'p', text: 'It is not designed for direct use by children.' },

    { type: 'h2', text: 'Policy Updates' },
    { type: 'p', text: 'We may update this Privacy Policy from time to time as our products evolve.' },
    { type: 'p', text: 'Material changes will be reflected by updating the “Last Updated” date.' },

    { type: 'h2', text: 'Contact' },
    { type: 'p', text: 'Questions regarding this Privacy Policy may be directed to: privacy@hotelcompanion.ai' },
    { type: 'p', text: 'Hotel Companion — Powered by Axionari — Mexico City, Mexico' },

    { type: 'h2', text: 'Our Commitment' },
    { type: 'p', text: 'Hospitality is built on trust.' },
    { type: 'p', text: 'Technology should strengthen that trust—not compromise it.' },
    {
      type: 'p',
      text: 'We are committed to building intelligent systems that respect privacy, protect information, and help organizations create exceptional experiences responsibly.',
    },
  ],
}

const termsEn: LegalDoc = {
  eyebrow: 'LEGAL · TERMS',
  title: 'Terms of Service',
  lastUpdated: LAST_UPDATED,
  intro: [
    'Welcome to Hotel Companion.',
    'These Terms of Service govern your access to and use of Hotel Companion, Companion OS, our websites, applications, APIs, and related services.',
    'By accessing or using our services, you agree to these Terms.',
    'If you are using Hotel Companion on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.',
  ],
  blocks: [
    { type: 'h2', text: 'Definitions' },
    { type: 'term', label: 'Hotel Companion', text: 'The hospitality intelligence platform provided by Axionari, built on Companion OS.' },
    {
      type: 'term',
      label: 'Companion OS',
      text: 'The underlying Organizational Intelligence Platform that powers Hotel Companion.',
    },
    { type: 'term', label: 'Customer', text: 'The organization subscribing to or using Hotel Companion.' },
    {
      type: 'term',
      label: 'Users',
      text: 'Authorized employees, administrators, contractors, or representatives of the Customer.',
    },
    { type: 'term', label: 'Guest', text: 'Any individual interacting with Hotel Companion on behalf of the Customer.' },

    { type: 'h2', text: 'Use of the Service' },
    {
      type: 'p',
      text: 'Hotel Companion is designed to help hospitality organizations improve guest experiences, coordinate operations, and generate organizational intelligence.',
    },
    {
      type: 'p',
      text: 'You agree to use the service only for lawful business purposes and in accordance with these Terms.',
    },
    {
      type: 'p',
      text: 'You may not: Use the platform for unlawful activities. Attempt unauthorized access to systems or data. Interfere with platform availability or security. Reverse engineer the platform except where permitted by applicable law. Use the platform to generate harmful, abusive, or fraudulent content. Circumvent usage limitations or security controls.',
    },

    { type: 'h2', text: 'Customer Responsibilities' },
    {
      type: 'p',
      text: 'Customers are responsible for: Maintaining accurate account information. Managing authorized users. Protecting login credentials. Ensuring compliance with applicable privacy laws. Obtaining any required consents from guests. Reviewing AI-generated recommendations before relying on them in situations requiring human judgment.',
    },
    { type: 'p', text: 'The Customer remains responsible for decisions made using the platform.' },

    { type: 'h2', text: 'Artificial Intelligence' },
    {
      type: 'p',
      text: 'Hotel Companion uses artificial intelligence to assist with communication, recommendations, workflow coordination, and organizational intelligence.',
    },
    { type: 'p', text: 'AI-generated responses are intended to support—not replace—professional judgment.' },
    {
      type: 'p',
      text: 'Customers acknowledge that AI outputs may occasionally contain inaccuracies and should be reviewed where appropriate.',
    },

    { type: 'h2', text: 'Customer Data' },
    {
      type: 'p',
      text: 'Customers retain ownership of all data they provide to Hotel Companion. This includes: Knowledge bases; Operational documentation; Policies; Guest interactions; Uploaded content; Business information.',
    },
    {
      type: 'p',
      text: 'Hotel Companion receives only the rights necessary to process this information for providing the contracted services.',
    },
    { type: 'p', text: 'We do not acquire ownership of Customer Data.' },

    { type: 'h2', text: 'Intellectual Property' },
    {
      type: 'p',
      text: 'Hotel Companion, Companion OS, software, designs, documentation, trademarks, branding, and related intellectual property remain the exclusive property of Axionari or its licensors.',
    },
    { type: 'p', text: 'These Terms do not transfer ownership of our intellectual property.' },

    { type: 'h2', text: 'Confidentiality' },
    { type: 'p', text: 'Each party agrees to protect confidential information received from the other.' },
    {
      type: 'p',
      text: 'Confidential information includes non-public business, operational, technical, financial, and strategic information disclosed during the relationship.',
    },
    {
      type: 'p',
      text: 'Confidential information may not be disclosed except as required by law or with prior written authorization.',
    },

    { type: 'h2', text: 'Availability' },
    { type: 'p', text: 'We strive to provide reliable and continuously available services.' },
    {
      type: 'p',
      text: 'However, availability may occasionally be affected by: Scheduled maintenance; Security updates; Infrastructure failures; Third-party service interruptions; Force majeure events.',
    },
    { type: 'p', text: 'We do not guarantee uninterrupted availability.' },

    { type: 'h2', text: 'Integrations' },
    { type: 'p', text: 'Hotel Companion may integrate with third-party hospitality systems and external platforms.' },
    {
      type: 'p',
      text: 'The availability and functionality of those integrations may depend on third-party providers.',
    },
    { type: 'p', text: 'We are not responsible for changes, outages, or discontinuation of third-party services.' },

    { type: 'h2', text: 'Subscription and Fees' },
    {
      type: 'p',
      text: 'Commercial terms, subscription pricing, implementation services, and payment schedules are governed by your Order Form, Master Services Agreement, or other commercial agreement.',
    },
    { type: 'p', text: 'Failure to pay applicable fees may result in suspension or termination of service.' },

    { type: 'h2', text: 'Acceptable Use' },
    {
      type: 'p',
      text: 'You may not use Hotel Companion to: Violate applicable laws. Infringe intellectual property rights. Distribute malware. Attempt unauthorized access. Interfere with platform operation. Generate illegal or fraudulent content. Impersonate another person or organization. Use the platform in ways that threaten platform security or reliability.',
    },

    { type: 'h2', text: 'Suspension' },
    {
      type: 'p',
      text: 'We may suspend access to the platform if necessary to: Protect platform security. Prevent abuse. Respond to legal requirements. Address material violations of these Terms.',
    },
    { type: 'p', text: 'Where practical, we will provide reasonable notice before suspension.' },

    { type: 'h2', text: 'Termination' },
    { type: 'p', text: 'Either party may terminate services in accordance with applicable contractual agreements.' },
    {
      type: 'p',
      text: 'Upon termination: Customer access will cease. Customer data will be handled according to contractual obligations and applicable law. Certain legal obligations survive termination, including confidentiality and intellectual property provisions.',
    },

    { type: 'h2', text: 'Disclaimer' },
    { type: 'p', text: 'Hotel Companion is provided on an “as available” and “as is” basis.' },
    {
      type: 'p',
      text: 'While we strive for accuracy and reliability, we do not guarantee that the platform will be uninterrupted, error-free, or suitable for every particular purpose.',
    },
    { type: 'p', text: 'Customers remain responsible for operational decisions made using the platform.' },

    { type: 'h2', text: 'Limitation of Liability' },
    {
      type: 'p',
      text: 'To the maximum extent permitted by applicable law, Axionari shall not be liable for indirect, incidental, consequential, special, punitive, or exemplary damages, including lost profits, business interruption, loss of goodwill, or loss of data.',
    },
    {
      type: 'p',
      text: 'Our aggregate liability shall not exceed the amounts paid by the Customer under the applicable agreement during the twelve months preceding the event giving rise to the claim, unless otherwise required by law.',
    },

    { type: 'h2', text: 'Indemnification' },
    {
      type: 'p',
      text: 'Customers agree to indemnify and hold harmless Axionari from claims arising from: Customer misuse of the platform. Violation of these Terms. Violation of applicable law. Customer-provided content. Unauthorized use of the services.',
    },

    { type: 'h2', text: 'Governing Law' },
    {
      type: 'p',
      text: 'These Terms shall be governed by the laws specified in the applicable commercial agreement between the parties.',
    },
    {
      type: 'p',
      text: 'Any disputes shall be resolved in the agreed jurisdiction unless otherwise required by applicable law.',
    },

    { type: 'h2', text: 'Changes to These Terms' },
    {
      type: 'p',
      text: 'We may update these Terms periodically to reflect changes in our services or legal requirements.',
    },
    { type: 'p', text: 'The latest version will always be available on our website.' },
    {
      type: 'p',
      text: 'Continued use of the services after changes become effective constitutes acceptance of the updated Terms.',
    },

    { type: 'h2', text: 'Contact' },
    { type: 'p', text: 'Questions regarding these Terms may be directed to: legal@hotelcompanion.ai' },
    { type: 'p', text: 'Hotel Companion — Powered by Axionari — Mexico City, Mexico' },

    { type: 'h2', text: 'Final Statement' },
    { type: 'p', text: 'Hospitality is built on trust.' },
    {
      type: 'p',
      text: 'These Terms are designed to establish a clear, transparent relationship between Hotel Companion and the organizations we serve.',
    },
    {
      type: 'p',
      text: 'Our goal is simple: build technology that helps hospitality organizations understand their guests, preserve their knowledge, and create exceptional experiences responsibly.',
    },
  ],
}

const cookiesEn: LegalDoc = {
  eyebrow: 'LEGAL · COOKIES',
  title: 'Cookie Policy',
  lastUpdated: LAST_UPDATED,
  intro: [
    'This Cookie Policy explains how Hotel Companion uses cookies and similar technologies on our website and services.',
    'Cookies help us provide a secure, reliable, and more useful experience while respecting your privacy and giving you control over your preferences.',
  ],
  blocks: [
    { type: 'h2', text: 'What Are Cookies?' },
    { type: 'p', text: 'Cookies are small text files stored on your device when you visit a website.' },
    {
      type: 'p',
      text: 'They help websites remember information about your visit, improve performance, maintain secure sessions, and understand how services are being used.',
    },
    {
      type: 'p',
      text: 'Cookies do not typically identify you directly, but they can be associated with information that helps improve your experience.',
    },

    { type: 'h2', text: 'Why We Use Cookies' },
    {
      type: 'p',
      text: 'We use cookies to: Maintain secure sessions. Remember your preferences. Protect against fraud and unauthorized access. Improve website performance. Understand how visitors use our website. Measure the effectiveness of our content. Provide a consistent experience across devices. Support website functionality.',
    },
    { type: 'p', text: 'We do not use cookies to sell your personal information.' },

    { type: 'h2', text: 'Types of Cookies We Use' },
    {
      type: 'term',
      label: 'Essential Cookies',
      text: 'Necessary for the operation of our website. They enable core functionality such as: Secure login; Session management; Authentication; Security protections; Load balancing; Form submissions. Without these cookies, the website cannot function properly. These cookies cannot be disabled.',
    },
    {
      type: 'term',
      label: 'Performance Cookies',
      text: 'Help us understand how visitors interact with our website. They allow us to improve: Page performance; Navigation; Content quality; Website reliability; User experience. The information collected is aggregated whenever possible and is not used to identify individual visitors.',
    },
    {
      type: 'term',
      label: 'Analytics Cookies',
      text: 'Help us understand: Which pages are most useful; How visitors navigate the website; Where users encounter friction; Which content receives the most engagement. These insights help us improve the Hotel Companion experience.',
    },
    {
      type: 'term',
      label: 'Functional Cookies',
      text: 'Remember choices you make, such as: Language preferences; Region; Accessibility settings; Display preferences; Previously completed forms. These cookies make future visits more convenient.',
    },
    {
      type: 'term',
      label: 'Marketing Cookies',
      text: 'From time to time, we may use cookies that help measure the effectiveness of marketing campaigns. These cookies help us understand how visitors discover Hotel Companion and which educational resources are most valuable. We do not use advertising cookies to sell personal information or create profiles for unrelated advertising purposes.',
    },

    { type: 'h2', text: 'Third-Party Cookies' },
    { type: 'p', text: 'Some parts of our website may rely on trusted third-party providers.' },
    {
      type: 'p',
      text: 'Examples may include: Analytics providers; Scheduling platforms; Embedded videos; Customer support tools; Maps; Payment providers.',
    },
    {
      type: 'p',
      text: 'Each third-party provider maintains its own privacy and cookie practices. We encourage you to review their respective privacy policies.',
    },

    { type: 'h2', text: 'Managing Cookies' },
    {
      type: 'p',
      text: 'Most web browsers allow you to: View stored cookies. Delete cookies. Block cookies. Restrict third-party cookies. Receive notifications before cookies are stored.',
    },
    {
      type: 'p',
      text: 'Please note that disabling certain cookies may affect website functionality and your overall experience.',
    },
    { type: 'manage-cookies' },

    { type: 'h2', text: 'Cookie Consent' },
    {
      type: 'p',
      text: 'Where required by applicable law, we will request your consent before placing non-essential cookies on your device.',
    },
    { type: 'p', text: 'You may update or withdraw your consent at any time through our cookie preferences.' },

    { type: 'h2', text: 'Do Not Track' },
    { type: 'p', text: 'Some browsers offer a “Do Not Track” setting.' },
    {
      type: 'p',
      text: 'Because there is currently no universal industry standard governing these signals, our website may not respond consistently to all Do Not Track requests.',
    },

    { type: 'h2', text: 'Changes to This Policy' },
    {
      type: 'p',
      text: 'As our services evolve, we may update this Cookie Policy to reflect changes in technology, legal requirements, or our use of cookies.',
    },
    { type: 'p', text: 'The latest version will always be available on this page.' },

    { type: 'h2', text: 'Contact' },
    { type: 'p', text: 'Questions about this Cookie Policy may be directed to: privacy@hotelcompanion.ai' },
    { type: 'p', text: 'Hotel Companion — Powered by Axionari — Mexico City, Mexico' },

    { type: 'h2', text: 'Transparency by Design' },
    { type: 'p', text: 'Hospitality is built on trust.' },
    { type: 'p', text: 'That principle extends beyond our platform to how we operate our website.' },
    {
      type: 'p',
      text: 'We believe you should always understand what information is collected, why it is collected, and how it helps us deliver a better experience.',
    },
  ],
}

const securityEn: LegalDoc = {
  eyebrow: 'TRUST · SECURITY',
  title: 'Enterprise-grade security for enterprise hospitality.',
  intro: [
    'Hotel Companion is built on Companion OS, an intelligence platform designed with security, privacy, and operational resilience as foundational principles—not afterthoughts.',
    'As organizations increasingly rely on AI to support guest experiences and operations, protecting customer data and organizational knowledge becomes essential to earning trust.',
  ],
  blocks: [
    { type: 'h2', text: 'Our Security Principles' },
    {
      type: 'term',
      label: 'Security by Design',
      text: 'Security is integrated throughout the platform—from architecture and infrastructure to application development and operations. Every new capability is evaluated with security, privacy, and resilience in mind.',
    },
    {
      type: 'term',
      label: 'Customer Data Ownership',
      text: 'Your organization’s knowledge belongs to you. Hotel Companion processes your information solely to deliver the services you authorize. We never sell customer data. We never claim ownership of your organizational knowledge.',
    },
    {
      type: 'term',
      label: 'Defense in Depth',
      text: 'We employ multiple layers of technical and organizational safeguards designed to reduce risk and protect customer information. Security is not a single feature—it is a continuous system.',
    },

    { type: 'h2', text: 'Platform Security' },
    {
      type: 'term',
      label: 'Encryption',
      text: 'Customer data is protected using industry-standard encryption: Encryption in transit; Encryption at rest; Secure communication protocols; Encrypted backups.',
    },
    {
      type: 'term',
      label: 'Authentication',
      text: 'Access to Hotel Companion is protected through modern authentication mechanisms: Secure authentication; Multi-factor authentication (where supported); Session protection; Password security; Identity verification.',
    },
    {
      type: 'term',
      label: 'Access Control',
      text: 'Organizations maintain control over who can access information: Role-based permissions; Administrative controls; User management; Principle of least privilege; Permission segregation.',
    },
    {
      type: 'term',
      label: 'Infrastructure',
      text: 'Hotel Companion is hosted on modern cloud infrastructure designed for high availability, resilience, and security: Continuous monitoring; Automated backups; Infrastructure redundancy; Network security; Secure deployment practices.',
    },

    { type: 'h2', text: 'Secure Development' },
    {
      type: 'p',
      text: 'Security is integrated into our software development lifecycle. Our engineering practices include: Code reviews; Dependency management; Continuous testing; Security monitoring; Vulnerability remediation; Secure deployment pipelines.',
    },

    { type: 'h2', text: 'Artificial Intelligence Security' },
    { type: 'p', text: 'AI introduces new opportunities—and new responsibilities.' },
    {
      type: 'p',
      text: 'Hotel Companion is designed to use AI responsibly while protecting organizational knowledge and customer trust. Our approach includes: Controlled access to organizational knowledge; Human oversight for operational decisions; Responsible prompt management; Data minimization; Continuous platform improvements.',
    },
    { type: 'p', text: 'AI assists people. People remain responsible for decisions.' },

    { type: 'h2', text: 'Organizational Knowledge Protection' },
    {
      type: 'p',
      text: 'One of Hotel Companion’s unique responsibilities is protecting institutional knowledge.',
    },
    {
      type: 'p',
      text: 'Knowledge bases, operational procedures, internal documentation, and organizational expertise are treated as protected business assets.',
    },
    { type: 'p', text: 'Organizations maintain ownership and control over their information.' },

    { type: 'h2', text: 'Privacy' },
    { type: 'p', text: 'Privacy and security work together.' },
    {
      type: 'p',
      text: 'Hotel Companion is designed to support organizations in protecting guest information while enabling exceptional hospitality experiences.',
    },
    { type: 'link', label: 'Read our Privacy Policy', href: '/privacy' },

    { type: 'h2', text: 'Responsible Disclosure' },
    {
      type: 'p',
      text: 'If you believe you have identified a security vulnerability, we encourage responsible disclosure. Please contact: security@hotelcompanion.ai',
    },
    {
      type: 'p',
      text: 'We appreciate responsible reporting and will investigate all legitimate security concerns promptly.',
    },

    { type: 'h2', text: 'Compliance Roadmap' },
    {
      type: 'p',
      text: 'As Hotel Companion grows, we are committed to aligning with recognized security and privacy standards appropriate for enterprise customers.',
    },
    {
      type: 'p',
      text: 'Our roadmap includes support for widely adopted security frameworks and best practices as customer requirements evolve.',
    },

    { type: 'h2', text: 'Security Is Never Finished' },
    { type: 'p', text: 'Security is not a milestone.' },
    {
      type: 'p',
      text: 'It is an ongoing commitment to protecting our customers, their guests, and the organizational intelligence that powers exceptional hospitality.',
    },

    { type: 'h2', text: 'Questions?' },
    { type: 'p', text: 'For security-related inquiries, contact: security@hotelcompanion.ai' },
  ],
}

const responsibleAiEn: LegalDoc = {
  eyebrow: 'TRUST · RESPONSIBLE AI',
  title: 'Artificial intelligence should make hospitality more human—not less.',
  intro: [
    'At Hotel Companion, AI exists to help organizations understand guests, preserve knowledge, coordinate operations, and support better decisions.',
    'Our philosophy is simple: AI should augment people, not replace them.',
  ],
  blocks: [
    { type: 'h2', text: 'Our Principles' },
    {
      type: 'term',
      label: 'Hospitality First',
      text: 'Hospitality has always been about people. AI should enhance warmth, responsiveness, and consistency—not replace genuine human relationships. Technology succeeds when guests remember the experience, not the software.',
    },
    {
      type: 'term',
      label: 'Human Oversight',
      text: 'Hotel Companion assists decision-making. It does not replace professional judgment. Critical operational, financial, legal, or safety decisions should always involve appropriate human review. People remain accountable for outcomes.',
    },
    {
      type: 'term',
      label: 'Transparency',
      text: 'Guests and employees should understand when they are interacting with AI-assisted systems. We believe trust begins with clarity. Organizations should deploy AI in ways that are open, honest, and respectful of user expectations.',
    },
    {
      type: 'term',
      label: 'Organizational Intelligence',
      text: 'Hotel Companion is designed to help organizations learn—not to make decisions on their behalf. Every conversation contributes to a deeper understanding of guest needs, operational patterns, and organizational knowledge. The objective is continuous improvement, not automation for its own sake.',
    },
    {
      type: 'term',
      label: 'Privacy by Design',
      text: 'Responsible AI begins with responsible data practices. We minimize data collection, protect customer information, and process organizational knowledge only for authorized purposes. Customer data remains under customer control.',
    },
    {
      type: 'term',
      label: 'Accuracy',
      text: 'AI systems are probabilistic. While Hotel Companion is designed to provide helpful, relevant, and context-aware responses, AI-generated content may occasionally be incomplete or inaccurate. Organizations should review important outputs before acting on them.',
    },
    {
      type: 'term',
      label: 'Fairness',
      text: 'We strive to design systems that provide consistent and respectful experiences for all guests. As AI technology evolves, we continuously evaluate our systems to improve quality, reduce unintended bias, and strengthen reliability.',
    },
    {
      type: 'term',
      label: 'Continuous Improvement',
      text: 'Responsible AI is an ongoing practice. We regularly improve our platform based on customer feedback, operational experience, technological advances, and emerging best practices.',
    },

    { type: 'h2', text: 'How We Use AI' },
    {
      type: 'p',
      text: 'Hotel Companion uses AI to support: Guest conversations; Knowledge retrieval; Operational coordination; Recommendation generation; Workflow automation; Organizational learning; Hospitality intelligence.',
    },
    { type: 'p', text: 'The platform is designed to assist—not autonomously operate—hospitality organizations.' },

    { type: 'h2', text: 'What We Don’t Do' },
    { type: 'p', text: 'We do not build AI intended to replace hospitality professionals.' },
    { type: 'p', text: 'We do not sell customer data.' },
    { type: 'p', text: 'We do not claim ownership of organizational knowledge.' },
    { type: 'p', text: 'We do not use customer knowledge for unrelated commercial purposes.' },
    { type: 'p', text: 'We do not promise that AI is infallible.' },

    { type: 'h2', text: 'The Role of People' },
    { type: 'p', text: 'Exceptional hospitality depends on empathy, judgment, creativity, and care.' },
    { type: 'p', text: 'These qualities remain uniquely human.' },
    {
      type: 'p',
      text: 'Hotel Companion handles routine interactions, surfaces relevant knowledge, and supports better decisions so teams can spend more time creating memorable guest experiences.',
    },

    { type: 'h2', text: 'Building Trust' },
    { type: 'p', text: 'Responsible AI is ultimately about trust.' },
    {
      type: 'p',
      text: 'Trust is earned through transparency, accountability, privacy, security, and thoughtful design—not through claims about intelligence alone.',
    },
    {
      type: 'p',
      text: 'We are committed to building AI systems that organizations can confidently adopt and guests can comfortably interact with.',
    },

    { type: 'h2', text: 'Our Commitment' },
    { type: 'p', text: 'We believe the future of hospitality is not artificial.' },
    {
      type: 'p',
      text: 'It is more human than ever—supported by intelligence that helps every person perform at their best.',
    },
  ],
}

const trustEn: LegalDoc = {
  eyebrow: 'TRUST CENTER',
  title: 'Trust is the foundation of every great hospitality experience.',
  intro: [
    'It is also the foundation of every great technology platform.',
    'This Trust Center provides an overview of the principles, policies, and practices that guide how Hotel Companion protects customer information, builds AI responsibly, and operates with transparency.',
  ],
  blocks: [
    {
      type: 'term',
      label: 'Security',
      text: 'We protect customer data through modern security practices, layered safeguards, secure infrastructure, and continuous monitoring.',
    },
    { type: 'link', label: 'Learn about Security', href: '/security' },
    {
      type: 'term',
      label: 'Privacy',
      text: 'We are committed to responsible data handling, customer ownership of organizational knowledge, and transparent privacy practices.',
    },
    { type: 'link', label: 'Read our Privacy Policy', href: '/privacy' },
    {
      type: 'term',
      label: 'Responsible AI',
      text: 'Our AI is designed to augment hospitality professionals, preserve organizational knowledge, and support better decisions while keeping humans in control.',
    },
    { type: 'link', label: 'Learn about Responsible AI', href: '/responsible-ai' },
    {
      type: 'term',
      label: 'Terms of Service',
      text: 'Our Terms define the relationship between Hotel Companion and the organizations we serve.',
    },
    { type: 'link', label: 'View Terms of Service', href: '/terms' },
    {
      type: 'term',
      label: 'Cookie Policy',
      text: 'Learn how we use cookies and similar technologies to provide a secure, reliable, and high-quality experience.',
    },
    { type: 'link', label: 'Read Cookie Policy', href: '/cookies' },

    { type: 'h2', text: 'Responsible Disclosure' },
    {
      type: 'p',
      text: 'If you believe you have identified a security vulnerability, please contact: security@hotelcompanion.ai',
    },
    { type: 'p', text: 'We investigate all legitimate reports responsibly and appreciate coordinated disclosure.' },

    { type: 'h2', text: 'Contact' },
    {
      type: 'p',
      text: 'Questions regarding security, privacy, compliance, or responsible AI can be directed to: security@hotelcompanion.ai · privacy@hotelcompanion.ai · legal@hotelcompanion.ai',
    },

    { type: 'h2', text: 'Our Commitment' },
    { type: 'p', text: 'Trust is not a feature.' },
    {
      type: 'p',
      text: 'It is the result of consistently protecting information, respecting privacy, designing AI responsibly, and operating with transparency.',
    },
    { type: 'p', text: 'That commitment is built into Hotel Companion, Companion OS, and everything we create.' },
  ],
}

/* Bilingual pairs. ES falls back to EN only if a document has not been wired yet. */
export const privacyDoc: Localized<LegalDoc> = { en: privacyEn, es: privacyEs ?? privacyEn }
export const termsDoc: Localized<LegalDoc> = { en: termsEn, es: termsEs ?? termsEn }
export const cookiesDoc: Localized<LegalDoc> = { en: cookiesEn, es: cookiesEs ?? cookiesEn }
export const securityDoc: Localized<LegalDoc> = { en: securityEn, es: securityEs ?? securityEn }
export const responsibleAiDoc: Localized<LegalDoc> = { en: responsibleAiEn, es: responsibleAiEs ?? responsibleAiEn }
export const trustDoc: Localized<LegalDoc> = { en: trustEn, es: trustEs ?? trustEn }
