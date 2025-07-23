import type { CollectionConfig } from 'payload'
import { BlogStatus, BlogStatusOptions } from '@/constants/enum'
import { seoGroup, siteSelection, tagField } from '@/constants/fields'
export const Blog: CollectionConfig = {
  slug: 'blogs',
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
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },

    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories', // slug of your categories collection
      hasMany: true, // allow selecting multiple categories
      required: true,
      admin: {
        description: 'Select one or more categories for this blog post',
      },
    },
    tagField,
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: BlogStatusOptions,
      defaultValue: BlogStatus.Draft,
      required: true,
    },
    siteSelection,
    seoGroup,
  ],
}
