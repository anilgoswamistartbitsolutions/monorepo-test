import type { CollectionConfig } from 'payload'
import { seoGroup, siteSelection, tagField } from '@/constants/fields'
import { getAverageRating } from '@/endpoints/tours/getAvgRatings'
export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  timestamps: true,
  endpoints: [
    {
      path: '/:id/average-rating',
      method: 'get',
      handler: getAverageRating,
    },
  ],
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
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
      name: 'featured',
      type: 'checkbox',
      label: 'Is Featured?',
      defaultValue: false,
      // removed admin.hidden
    },

    {
      name: 'pricing',
      label: 'Pricing',
      type: 'group',
      fields: [
        {
          name: 'basePrice',
          type: 'number',
          required: true,
          label: 'Base Price',
        },
        {
          name: 'currency',
          type: 'text',
          required: true,
          label: 'Currency (e.g., USD)',
        },
        {
          name: 'priceIncludes',
          type: 'array',
          label: 'Price Includes',
          fields: [
            {
              name: 'item',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'priceExcludes',
          type: 'array',
          label: 'Price Excludes',
          fields: [
            {
              name: 'item',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // DURATION
    {
      name: 'duration',
      label: 'Duration',
      type: 'group',
      fields: [
        {
          name: 'days',
          type: 'number',
          required: true,
        },
        {
          name: 'nights',
          type: 'number',
          required: true,
        },
      ],
    },

    // ITINERARY
    {
      name: 'itinerary',
      label: 'Itinerary',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'day',
          type: 'number',
          required: true,
          label: 'Day Number',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'activities',
          type: 'array',
          label: 'Activities',
          fields: [
            {
              name: 'activity',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // DESTINATIONS
    {
      name: 'destinations',
      type: 'relationship',
      relationTo: 'destinations',
      hasMany: true,
      required: true,
      label: 'Destinations',
    },

    // CATEGORIES
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      required: true,
      label: 'Categories',
    },

    // AVAILABILITY
    {
      name: 'availability',
      label: 'Availability Periods',
      type: 'array',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true,
        },
        {
          name: 'endDate',
          type: 'date',
          required: true,
        },
        {
          name: 'minPeople',
          type: 'number',
          required: true,
        },
        {
          name: 'maxPeople',
          type: 'number',
          required: true,
        },
      ],
    },
    siteSelection,
    seoGroup,
  ],
  hooks: {
    afterRead: [
      async ({ doc, req }) => {
        try {
          const reviews = await req.payload.find({
            collection: 'reviews',
            where: {
              tour: {
                equals: doc.id,
              },
              status: {
                equals: 'approved',
              },
            },
            limit: 1000,
            depth: 0,
          })

          const ratings = reviews.docs.map((r: any) => r.rating)
          const total = ratings.length
          const average =
            total > 0 ? parseFloat((ratings.reduce((sum, r) => sum + r, 0) / total).toFixed(2)) : 0

          // Inject into the doc
          return {
            ...doc,
            averageRating: {
              totalReviews: total,
              average,
            },
          }
        } catch (error) {
          console.error('Error calculating average rating:', error)
          return doc
        }
      },
    ],
  },
}
