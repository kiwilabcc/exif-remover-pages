import privacyMarkdown from '../docs/privacy_policy.md?raw'
import termsMarkdown from '../docs/terms.md?raw'

export type PageVariant = 'privacy' | 'terms'

export interface LegalPageData {
  title: string
  description: string
  markdown: string
}

export const pages: Record<PageVariant, LegalPageData> = {
  privacy: {
    title: 'Privacy Policy — Privacy Eraser',
    description:
      'Privacy Eraser privacy policy. All photo scanning and metadata cleaning happens entirely on your device.',
    markdown: privacyMarkdown,
  },
  terms: {
    title: 'Terms of Service — Privacy Eraser',
    description:
      'Terms of service for Privacy Eraser, an on-device EXIF photo scanner.',
    markdown: termsMarkdown,
  },
} as const

const validVariants = new Set<string>(['privacy', 'terms'])

export function getPageData(variant: string): LegalPageData | null {
  if (!validVariants.has(variant)) return null
  return pages[variant as PageVariant]
}
