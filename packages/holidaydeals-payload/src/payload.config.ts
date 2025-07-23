// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import type { SharpDependency } from 'payload';

import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Category } from './collections/Category'

import { Blog } from './collections/Blog'
import { Tours } from './collections/Tours'
import { Destination } from './collections/Destination'

import { Booking } from './collections/Booking'
import { Review } from './collections/Review'
import { FrontEndIntegration } from './collections/FrontEndIntegration'
// import toursPaginatedHandler from './payload/custom-endpoints/tours-paginated';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // endpoints: [
  //   {
  //     path: '/tours-paginated',
  //     method: 'get',
  //     handler: toursPaginatedHandler,
  //   },
  // ],
  collections: [
    Media,
    Users,
    Category,
    Blog,
    Tours,
    Destination,
    Review,
    Booking,
    FrontEndIntegration,
  ],
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
  sharp: sharp as unknown as SharpDependency,
  plugins: [
    payloadCloudPlugin(),
    vercelBlobStorage({
      enabled: true,
      collections: {
        // If you have another collection that supports uploads, you can add it below
        media: true,
      },
      token: process.env.VERCEL_BLOB_TOKEN,
    }),
    // storage-adapter-placeholder
  ],
})
