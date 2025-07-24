import type { CollectionConfig } from 'payload'
import { ReviewStatus, ReviewStatusOptions } from '@/constants/enum'
import { siteSelection } from '@/constants/fields'
export const Review: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'reviewerName',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => false,
    delete: () => false,
  },
  timestamps: true,
  fields: [
    {
      name: 'tour',
      type: 'relationship',
      relationTo: 'tours', // link review to a tour
      required: true,
    },
    {
      name: 'reviewerName',
      type: 'text',
      required: true,
    },
    {
      name: 'reviewerEmail',
      type: 'email',
      required: false,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'reviewText',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ReviewStatusOptions,
      defaultValue: ReviewStatus.Pending,
      required: true,
    },
    siteSelection,
  ],
}
