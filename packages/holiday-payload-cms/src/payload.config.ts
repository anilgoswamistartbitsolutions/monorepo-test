// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import dotenv from 'dotenv';

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Blog } from './collections/Blogs'
import { Tours } from './collections/Tours'
import { Destination } from './collections/Destination'

import { Booking } from './collections/Booking'
import { Review } from './collections/Review'



import toursPaginatedHandler from './payload/custom-endpoints/tours-paginated';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
dotenv.config();

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  endpoints: [
    {
      path: '/tours-paginated',
      method: 'get',
      handler: toursPaginatedHandler,
    },
  ],
  collections: [Users, Media, Blog, Tours, Destination, Review, Booking],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],

})
