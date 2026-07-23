import { redirect } from 'next/navigation'

/* PRODUCT_ARCHITECTURE §10 (FAQ doctrine): the site's only FAQ is the
   hesitation accordion under the demo form. Definitional questions are
   answered by the site itself — a standalone FAQ page would mean the
   website failed. This route survives only as a redirect. */
export default function FaqPage() {
  redirect('/demo#faq')
}
