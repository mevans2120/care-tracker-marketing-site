import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "vtck6b2g",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
  stega: { studioUrl: "/studio" },
});

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN,
  }),
});
