import { describe, it, expect } from 'vitest'
import privacyMarkdown from '../../docs/privacy_policy.md?raw'
import termsMarkdown from '../../docs/terms.md?raw'
import supportMarkdown from '../../docs/support.md?raw'
import appSource from '../App.tsx?raw'

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

// ── Stale support phrases — must not appear after /support/ retarget ──
const STALE_SUPPORT_PHRASES = [
  'support site is being set up',
  'reach out through the app store listing',
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

// ── Support required claims ───────────────────────────────────────────
const SUPPORT_REQUIRED = [
  /Support/i,
  /Frequently Asked Questions/i,
  /on.your.device/i,
  /support@kiwilab\.cc/,
  /EXIF/i,
  /GPS/i,
  /Privacy Policy/,
  /Terms of Service/,
  /never.*(uploaded|transmitted|sent)/i,
  /free/i,
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

describe('Support markdown', () => {
  it('has all required truthful claims', () => {
    for (const pattern of SUPPORT_REQUIRED) {
      expect(supportMarkdown).toMatch(pattern)
    }
  })

  it('contains no banned contradictory phrases', () => {
    for (const phrase of BANNED_PHRASES) {
      expect(supportMarkdown).not.toContain(phrase)
    }
  })

  it('has a top-level heading', () => {
    expect(supportMarkdown).toMatch(/^#\s+/m)
  })

  it('has a FAQ section', () => {
    expect(supportMarkdown).toMatch(/##\s*Frequently Asked Questions/i)
  })

  it('has a contact section with email', () => {
    expect(supportMarkdown).toMatch(/##\s*Contact/i)
    expect(supportMarkdown).toMatch(/support@kiwilab\.cc/)
  })

  it('has legal cross-links', () => {
    expect(supportMarkdown).toMatch(/\[Privacy Policy\]\(\/privacy\/\)/)
    expect(supportMarkdown).toMatch(/\[Terms of Service\]\(\/terms\/\)/)
  })

  it('answers key user questions truthfully', () => {
    expect(supportMarkdown).toMatch(/on.your.device/i)
    expect(supportMarkdown).toMatch(/original.*(not|never).*(modif|touch|chang)/i)
    expect(supportMarkdown).toMatch(/free/i)
  })
})

describe('All docs independent coverage', () => {
  it('privacy, terms, and support are distinct documents', () => {
    expect(privacyMarkdown).not.toBe(termsMarkdown)
    expect(privacyMarkdown).not.toBe(supportMarkdown)
    expect(termsMarkdown).not.toBe(supportMarkdown)
    expect(privacyMarkdown.length).toBeGreaterThan(100)
    expect(termsMarkdown.length).toBeGreaterThan(100)
    expect(supportMarkdown.length).toBeGreaterThan(100)
  })

  it('no doc is empty or whitespace-only', () => {
    expect(privacyMarkdown.trim().length).toBeGreaterThan(0)
    expect(termsMarkdown.trim().length).toBeGreaterThan(0)
    expect(supportMarkdown.trim().length).toBeGreaterThan(0)
  })
})

// ── Stale support phrase regression guard ──────────────────────────────

describe('Home page stale support phrases', () => {
  it('landing page source contains no stale support-setup phrases', () => {
    for (const phrase of STALE_SUPPORT_PHRASES) {
      expect(appSource).not.toContain(phrase)
    }
  })
})
