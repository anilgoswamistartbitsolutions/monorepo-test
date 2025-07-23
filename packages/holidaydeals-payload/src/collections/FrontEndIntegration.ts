import type { CollectionConfig } from 'payload'

// adminUsers.ts
export const FrontEndIntegration: CollectionConfig = {
  slug: 'front-end-integration',
  auth: {
    useAPIKey: true,
  }, // Email/password login

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Site Name',
    },
  ],
}
