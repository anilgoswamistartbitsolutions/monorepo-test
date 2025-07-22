import type { CollectionConfig } from 'payload';

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
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Approved', value: 'approved' },
                { label: 'Rejected', value: 'rejected' },
            ],
            defaultValue: 'pending',
            required: true,
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
