import { describe, it, expect } from 'vitest'
import privacyMarkdown from '../../docs/privacy_policy.md?raw'
import termsMarkdown from '../../docs/terms.md?raw'

// ── Banned phrases — contradictory claims that must never re-enter ────
const BANNED_PHRASES = [
  'IP address',
  'analytics',
  'third-party',
  'third party',
  'active internet connection',
  'data allowance',
  'roaming',
  '<span',
  'Internet Protocol',
  'aggregated, anonymized',
  'periodically transmitted',
  'marketing promotions',
] as const

// ── Privacy policy required claims ────────────────────────────────────
const PRIVACY_REQUIRED = [
  /Privacy Policy/i,
  /on.your.device/i,
  /never.*(uploaded|transmitted|sent)/i,
  /support@kiwilab\.cc/,
  /no.*(analytics|tracking)/i,
  /GPS/i,
  /EXIF/i,
  /Effective date/i,
] as const

// ── Terms required claims ─────────────────────────────────────────────
const TERMS_REQUIRED = [
  /Terms of Service/i,
  /on.your.device/i,
  /support@kiwilab\.cc/,
  /EXIF/i,
  /Effective date/i,
  /as is/i,
] as const

describe('Privacy policy markdown', () => {
  it('has all required truthful claims', () => {
    for (const pattern of PRIVACY_REQUIRED) {
      expect(privacyMarkdown).toMatch(pattern)
    }
  })

  it('contains no banned contradictory phrases', () => {
    for (const phrase of BANNED_PHRASES) {
      expect(privacyMarkdown).not.toContain(phrase)
    }
  })

  it('has a top-level heading', () => {
    expect(privacyMarkdown).toMatch(/^#\s+/m)
  })

  it('has a contact section', () => {
    expect(privacyMarkdown).toMatch(/##\s*Contact/i)
  })
})

describe('Terms of service markdown', () => {
  it('has all required truthful claims', () => {
    for (const pattern of TERMS_REQUIRED) {
      expect(termsMarkdown).toMatch(pattern)
    }
  })

  it('contains no banned contradictory phrases', () => {
    for (const phrase of BANNED_PHRASES) {
      expect(termsMarkdown).not.toContain(phrase)
    }
  })

  it('has a top-level heading', () => {
    expect(termsMarkdown).toMatch(/^#\s+/m)
  })

  it('has a contact section', () => {
    expect(termsMarkdown).toMatch(/##\s*Contact/i)
  })
})

describe('Both docs independent coverage', () => {
  it('privacy and terms are distinct documents', () => {
    expect(privacyMarkdown).not.toBe(termsMarkdown)
    expect(privacyMarkdown.length).toBeGreaterThan(100)
    expect(termsMarkdown.length).toBeGreaterThan(100)
  })

  it('neither doc is empty or whitespace-only', () => {
    expect(privacyMarkdown.trim().length).toBeGreaterThan(0)
    expect(termsMarkdown.trim().length).toBeGreaterThan(0)
  })
})
