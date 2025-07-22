import type { CollectionConfig } from 'payload';

export const Booking: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'userEmail',
  },
  access: {
    read: () => true, // adjust according to your auth rules
    create: () => true,
    update: () => false,
    delete: () => false,
  },
  timestamps: true,
  fields: [
    {
      name: 'tour',
      type: 'relationship',
      relationTo: 'tours', // assuming you have a tours collection
      required: true,
    },
    {
      name: 'userEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'userName',
      type: 'text',
      required: true,
    },
    {
      name: 'userPhone',
      type: 'text',
      required: false,
    },
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
      name: 'numberOfGuests',
      type: 'number',
      required: true,
      min: 1,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      required: false,
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
