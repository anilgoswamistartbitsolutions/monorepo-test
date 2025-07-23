import type { Field } from 'payload'
import { SelectedSite, SelectedSiteOptions } from '@/constants/enum'
export const seoGroup: Field = {
  name: 'seo',
  label: 'SEO Settings',
  type: 'group',
  fields: [
    {
      name: 'seoTitle',
      label: 'SEO Title',
      type: 'text',
      required: true,
    },
    {
      name: 'seoDescription',
      label: 'SEO Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'seoKeywords',
      label: 'SEO Keywords',
      type: 'text',
      required: true,
      admin: {
        description: 'Comma-separated keywords for search engines',
      },
    },
    {
      name: 'canonicalURL',
      label: 'Canonical URL',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'https://example.com/page-slug',
      },
    },
    {
      name: 'noIndex',
      label: 'No Index',
      type: 'checkbox',
      required: false,
      admin: {
        description: 'Prevent search engines from indexing this page',
      },
    },
  ],
}

export const siteSelection: Field = {
  name: 'sites',
  type: 'select',
  hasMany: true,
  required: true,
  defaultValue: [SelectedSite.All],
  options: SelectedSiteOptions,
  label: 'Site Selection',
  admin: {
    description:
      'Select which website(s) this content should appear on. Selecting "All" includes all sites.',
  },
}

export const tagField: Field = {
  name: 'tags',
  type: 'array',
  fields: [
    {
      name: 'tag',
      type: 'text',
      required: true,
    },
  ],
}
