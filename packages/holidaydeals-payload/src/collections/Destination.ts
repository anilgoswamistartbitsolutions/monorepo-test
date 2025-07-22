import type { CollectionConfig } from 'payload';

export const Destination: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  timestamps: true,
  fields: [
    {
      name: 'title',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'count',
      type: 'number',
      required: true,
      label: 'Number of Destinations',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Hiking', value: 'hiking' },
        { label: 'Outdoor', value: 'outdoor' },
        { label: 'Beach', value: 'beach' },
        { label: 'Pilgrimage', value: 'pilgrimage' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured on homepage',
      defaultValue: false,
    },
    {
      name: 'description',
      type: 'textarea',
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
        { label: 'Travel', value: 'travel' },
      ],
      admin: {
        description: 'Select which website(s) this tour should appear on',
      },
    },
  ],
};
