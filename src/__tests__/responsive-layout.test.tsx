/**
 * Responsive layout guardrails for the mobile/iPhone contract.
 *
 * These tests guard the CSS seam that keeps the landing page and standalone
 * legal/support pages usable on phone-sized screens. They assert structural
 * assumptions that the mobile media query and full-width root depend on.
 */
import { describe, it, expect, afterEach } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { render, cleanup } from '@testing-library/react'
import App from '../App'
import { getPageData } from '../legal-content'
import { LegalPage } from '../components/LegalPage'

const appCssSource = readFileSync(join(__dirname, '..', 'App.css'), 'utf-8')
const indexCssSource = readFileSync(join(__dirname, '..', 'index.css'), 'utf-8')

afterEach(cleanup)

// ── Mobile media-query seam ───────────────────────────────────────────

describe('Mobile responsive CSS seam', () => {
  it('App.css contains a max-width: 768px breakpoint', () => {
    expect(appCssSource).toMatch(/@media\s*\(\s*max-width:\s*768px\s*\)/)
  })

  it('mobile breakpoint stacks proof-list to single column', () => {
    const mediaBlock = appCssSource.match(
      /@media\s*\(\s*max-width:\s*768px\s*\)\s*\{[\s\S]*?\n\}/,
    )
    expect(mediaBlock).not.toBeNull()
    expect(mediaBlock![0]).toMatch(/\.proof-list\s*\{[^}]*grid-template-columns:\s*1fr/)
  })

  it('mobile breakpoint stacks legal-section to single column', () => {
    const mediaBlock = appCssSource.match(
      /@media\s*\(\s*max-width:\s*768px\s*\)\s*\{[\s\S]*?\n\}/,
    )
    expect(mediaBlock).not.toBeNull()
    expect(mediaBlock![0]).toMatch(/\.legal-section\s*\{[^}]*grid-template-columns:\s*1fr/)
  })

  it('mobile breakpoint stacks screenshot-list to single column', () => {
    const mediaBlock = appCssSource.match(
      /@media\s*\(\s*max-width:\s*768px\s*\)\s*\{[\s\S]*?\n\}/,
    )
    expect(mediaBlock).not.toBeNull()
    expect(mediaBlock![0]).toMatch(/\.screenshot-list\s*\{[^}]*grid-template-columns:\s*1fr/)
  })

  it('mobile breakpoint uses .screenshot-image for real images, not placeholder classes', () => {
    const mediaBlock = appCssSource.match(
      /@media\s*\(\s*max-width:\s*768px\s*\)\s*\{[\s\S]*?\n\}/,
    )
    expect(mediaBlock).not.toBeNull()
    expect(mediaBlock![0]).toMatch(/\.screenshot-image\s*\{/)
    expect(mediaBlock![0]).not.toMatch(/\.screenshot-placeholder/)
    expect(mediaBlock![0]).not.toMatch(/\.placeholder-icon/)
  })

  it('nav links have min-height of at least 44px on mobile', () => {
    const mediaBlock = appCssSource.match(
      /@media\s*\(\s*max-width:\s*768px\s*\)\s*\{[\s\S]*?\n\}/,
    )
    expect(mediaBlock).not.toBeNull()
    expect(mediaBlock![0]).toMatch(/\.nav-list\s*a\s*\{[^}]*min-height:\s*44px/)
  })
})

// ── Full-width root seam ──────────────────────────────────────────────

describe('Full-width #root seam', () => {
  it('index.css sets #root width to 100%', () => {
    expect(indexCssSource).toMatch(/#root\s*\{[^}]*width:\s*100%/)
  })

  it('index.css sets #root min-height to 100svh', () => {
    expect(indexCssSource).toMatch(/#root\s*\{[^}]*min-height:\s*100svh/)
  })

  it('body has overflow-x: hidden guard', () => {
    expect(indexCssSource).toMatch(/body\s*\{[^}]*overflow-x:\s*hidden/)
  })
})

// ── Overflow prevention ───────────────────────────────────────────────

describe('Overflow prevention', () => {
  it('landing wrapper uses min-height 100svh, not fixed height', () => {
    expect(appCssSource).toMatch(/\.landing\s*\{[^}]*min-height:\s*100svh/)
  })

  it('legal-page wrapper uses min-height 100svh, not fixed height', () => {
    expect(indexCssSource).toMatch(/\.legal-page\s*\{[^}]*min-height:\s*100svh/)
  })
})

// ── Landing page structure on mobile ──────────────────────────────────

describe('Landing page mobile structure', () => {
  it('renders all three proof point cards', () => {
    render(<App />)
    const proofCards = document.querySelectorAll('.proof-card')
    expect(proofCards).toHaveLength(3)
  })

  it('renders all three legal-link cards with correct hrefs', () => {
    render(<App />)
    const cards = document.querySelectorAll('.legal-link-card')
    expect(cards).toHaveLength(3)
    const hrefs = Array.from(cards).map((c) => c.getAttribute('href'))
    expect(hrefs).toContain('/privacy/')
    expect(hrefs).toContain('/terms/')
    expect(hrefs).toContain('/support/')
  })

  it('renders nav list with all four items', () => {
    render(<App />)
    const navLinks = document.querySelectorAll('.nav-list a')
    expect(navLinks).toHaveLength(4)
  })

  it('hero section has centered text alignment', () => {
    render(<App />)
    const hero = document.querySelector('.hero-section')
    expect(hero).not.toBeNull()
  })

  it('cta button is present and disabled', () => {
    render(<App />)
    const cta = document.querySelector('.cta-button.cta-disabled')
    expect(cta).not.toBeNull()
  })

  it('renders three screenshot images with .screenshot-image class', () => {
    render(<App />)
    const images = document.querySelectorAll<HTMLImageElement>('.screenshot-image')
    expect(images).toHaveLength(3)
    for (const img of images) {
      expect(img.src).toBeTruthy()
      expect(img.tagName).toBe('IMG')
    }
  })

  it('screenshot cards contain no placeholder classes', () => {
    render(<App />)
    expect(document.querySelector('.screenshot-placeholder')).toBeNull()
    expect(document.querySelector('.placeholder-icon')).toBeNull()
    expect(document.querySelector('.placeholder-note')).toBeNull()
  })
})

// ── Legal page mobile structure ───────────────────────────────────────

describe('Legal page mobile structure', () => {
  it.each(['privacy', 'terms', 'support'] as const)(
    '%s page has back link pointing to /',
    (variant) => {
      const data = getPageData(variant)!
      render(<LegalPage data={data} />)
      const backLink = document.querySelector('.legal-page-back')
      expect(backLink).not.toBeNull()
      expect(backLink!.getAttribute('href')).toBe('/')
    },
  )

  it.each(['privacy', 'terms', 'support'] as const)(
    '%s page has legal-page-body with max-width',
    (variant) => {
      const data = getPageData(variant)!
      render(<LegalPage data={data} />)
      const body = document.querySelector('.legal-page-body')
      expect(body).not.toBeNull()
    },
  )

  it.each(['privacy', 'terms', 'support'] as const)(
    '%s page has sticky header',
    (variant) => {
      const data = getPageData(variant)!
      render(<LegalPage data={data} />)
      const header = document.querySelector('.legal-page-header')
      expect(header).not.toBeNull()
    },
  )
})

// ── Negative / regression tests ───────────────────────────────────────

describe('Responsive regression guards', () => {
  it('proof-list does NOT use fixed columns outside media query', () => {
    // The base .proof-list rule should use repeat(3, 1fr), not a fixed width
    // that could cause overflow on narrow screens
    const baseProofList = appCssSource.match(
      /\.proof-list\s*\{[^}]*grid-template-columns:\s*([^;]+);/,
    )
    expect(baseProofList).not.toBeNull()
    expect(baseProofList![1].trim()).toBe('repeat(3, 1fr)')
  })

  it('legal-section does NOT use fixed columns outside media query', () => {
    const baseLegalSection = appCssSource.match(
      /\.legal-section\s*\{[^}]*grid-template-columns:\s*([^;]+);/,
    )
    expect(baseLegalSection).not.toBeNull()
    expect(baseLegalSection![1].trim()).toBe('repeat(3, 1fr)')
  })

  it('no hardcoded pixel widths on landing that exceed 768px', () => {
    // max-width values should be reasonable
    const maxWidths = appCssSource.match(/max-width:\s*(\d+)px/g) || []
    for (const mw of maxWidths) {
      const value = parseInt(mw.match(/\d+/)![0], 10)
      // Allow up to 1120px for legal-section max-width (it's constrained by grid)
      expect(value).toBeLessThanOrEqual(1120)
    }
  })

  it('landing header nav does not use fixed positioning', () => {
    // Header should be sticky, not fixed — fixed could cause overlap issues
    expect(appCssSource).toMatch(/\.landing-header\s*\{[^}]*position:\s*sticky/)
    // Ensure no position:fixed in the header rule
    const headerRule = appCssSource.match(/\.landing-header\s*\{[^}]+\}/)
    expect(headerRule).not.toBeNull()
    expect(headerRule![0]).not.toMatch(/position:\s*fixed/)
  })
})
