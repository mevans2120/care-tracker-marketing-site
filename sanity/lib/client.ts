import { createClient } from 'next-sanity'

// Hardcoded values to ensure build works on Vercel
// These values are public (NEXT_PUBLIC_*) so it's safe to hardcode
export const client = createClient({
  projectId: 'vtck6b2g',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  stega: {
    studioUrl: '/studio',
  },
})
