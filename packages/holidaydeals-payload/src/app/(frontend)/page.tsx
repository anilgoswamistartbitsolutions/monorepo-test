import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <main className="main-page">
    <div className="main-page__overlay" />
    <div className="main-page__content">
      <Image
        src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
        alt="Travel Payload CMS"
        width={80}
        height={80}
        className="main-page__logo"
      />
      <h1 className="main-page__headline">
        {user ? `Welcome, ${user.email}` : 'Travel Payload CMS'}
      </h1>
      <p className="main-page__subline">
        Experience the admin power behind your travel platform.
      </p>
      <a href={payloadConfig.routes.admin} target="_blank" className="main-page__btn">
        Go to Dashboard
      </a>
    </div>
  </main>
  )
}
