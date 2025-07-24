// payload.d.ts
import type Payload from 'payload'

import 'express'
declare module 'express' {
  interface Request {
    payload: typeof Payload // replace `any` with the proper Payload type if you have it
  }
}
