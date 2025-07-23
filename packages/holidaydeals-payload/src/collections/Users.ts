import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'Full Name',
      name: 'name',
      type: 'text',
      required: true,
      defaultValue: '',
      // removed admin.hidden so it shows
    },

    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Image',
      admin: {
        condition: (data, siblingData, { user }) => Boolean(user),
      },
      // removed admin.hidden
    },
    {
      name: 'isAuthor',
      type: 'checkbox',
      label: 'Are you a author?',
      defaultValue: false,
      // removed admin.hidden
    },
  ],
}
