import { createServiceClient } from '@/lib/supabase/service'
import { notFound } from 'next/navigation'
import AssistantClient from './AssistantClient'

export default async function AssistantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createServiceClient()

  // Deliberately excludes system_prompt: this page is public and everything
  // selected here is serialized into the client payload.
  const { data: property } = await supabase
    .from('properties')
    .select('id, hotel_name, location, extracted_data, is_active')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (!property) notFound()

  return <AssistantClient property={property} />
}
