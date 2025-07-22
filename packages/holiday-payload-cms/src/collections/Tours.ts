import type { CollectionConfig } from 'payload';

export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  timestamps: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'text', // You could also use type: 'number' if you want to store price numerically
      required: true,
    },
    {
      name: 'review',
      type: 'text',
    },
    {
      name: 'no_review',
      type: 'number',
      label: 'Number of Reviews',
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      step: 0.1,
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'seoTitle',
      type: 'text',
    },
    {
      name: 'seoDescription',
      type: 'textarea',
    },
    {
      name: 'sites',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['all'],
      options: [
        { label: 'Holiday Deals', value: 'holiday-deals' },
        { label: 'Travel', value: 'travel' }
      ],
      admin: {
        description: 'Select which website(s) this tour should appear on',
      },
    },
  ],

};
