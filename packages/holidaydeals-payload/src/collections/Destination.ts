import type { CollectionConfig } from 'payload'
import { seoGroup, siteSelection, tagField } from '@/constants/fields'

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
      label: 'Name',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
      required: true,
    },
    {
      name: 'region',
      type: 'text',
      required: true,
    },
    {
      name: 'coordinates',
      label: 'Coordinates',
      type: 'group',
      fields: [
        {
          name: 'lat',
          type: 'number',
          required: true,
          label: 'Latitude',
        },
        {
          name: 'lng',
          type: 'number',
          required: true,
          label: 'Longitude',
        },
      ],
    },
    {
      name: 'gallery',
      label: 'Gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: false,
      admin: {
        description: 'Upload multiple images to display as a gallery',
      },
    },
    {
      name: 'attractions',
      type: 'array',
      label: 'Attractions',
      fields: [
        {
          name: 'attraction',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'bestTimeToVisit',
      type: 'text',
      label: 'Best Time To Visit',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Is Featured?',
      defaultValue: false,
    },
    siteSelection,
    seoGroup,
  ],
}
