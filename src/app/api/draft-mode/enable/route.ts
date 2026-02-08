import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { createClient } from "next-sanity";

// Force dynamic - never pre-render this route
export const dynamic = "force-dynamic";

const client = createClient({
  projectId: "vtck6b2g",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  stega: { studioUrl: "/studio" },
});

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN,
  }),
});
