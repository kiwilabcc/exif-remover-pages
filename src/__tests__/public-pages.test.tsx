import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { getPageData, pages } from '../legal-content'
import { LegalPage } from '../components/LegalPage'
import privacyMarkdown from '../../docs/privacy_policy.md?raw'
import termsMarkdown from '../../docs/terms.md?raw'

afterEach(cleanup)

// ── Page selection ─────────────────────────────────────────────────────

describe('getPageData', () => {
  it('returns privacy page data for "privacy" variant', () => {
    const data = getPageData('privacy')
    expect(data).not.toBeNull()
    expect(data!.title).toContain('Privacy Policy')
    expect(data!.markdown).toBe(privacyMarkdown)
  })

  it('returns terms page data for "terms" variant', () => {
    const data = getPageData('terms')
    expect(data).not.toBeNull()
    expect(data!.title).toContain('Terms of Service')
    expect(data!.markdown).toBe(termsMarkdown)
  })

  it('returns null for unknown variant', () => {
    expect(getPageData('unknown')).toBeNull()
    expect(getPageData('')).toBeNull()
    expect(getPageData('home')).toBeNull()
  })

  it('returns null for empty string', () => {
    expect(getPageData('')).toBeNull()
  })
})

// ── Legal headings ─────────────────────────────────────────────────────

describe('Legal page headings', () => {
  it('privacy page has a top-level heading with "Privacy Policy"', () => {
    render(<LegalPage data={pages.privacy} />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.textContent).toContain('Privacy Policy')
  })

  it('terms page has a top-level heading with "Terms of Service"', () => {
    render(<LegalPage data={pages.terms} />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.textContent).toContain('Terms of Service')
  })
})

// ── Docs-driven rendering ──────────────────────────────────────────────

describe('Docs-driven content rendering', () => {
  it('privacy page renders content from docs/privacy_policy.md', () => {
    render(<LegalPage data={pages.privacy} />)
    // The rendered markdown should contain key phrases from the privacy doc
    const headings = screen.getAllByRole('heading')
    const headingTexts = headings.map((h) => h.textContent)
    expect(headingTexts.some((t) => t?.includes('Privacy Policy'))).toBe(true)
    expect(headingTexts.some((t) => t?.includes('Contact'))).toBe(true)
    // Verify a distinctive phrase from the privacy doc is rendered
    expect(screen.getByText(/never uploaded, transmitted, or sent/i)).toBeInTheDocument()
  })

  it('terms page renders content from docs/terms.md', () => {
    render(<LegalPage data={pages.terms} />)
    const headings = screen.getAllByRole('heading')
    const headingTexts = headings.map((h) => h.textContent)
    expect(headingTexts.some((t) => t?.includes('Terms of Service'))).toBe(true)
    expect(headingTexts.some((t) => t?.includes('Contact'))).toBe(true)
    // Verify a distinctive phrase from the terms doc is rendered
    expect(screen.getByText(/"as is" without warranties/i)).toBeInTheDocument()
  })

  it('privacy and terms pages render distinct content', () => {
    const { container: privacyContainer } = render(
      <LegalPage data={pages.privacy} />,
    )
    const privacyHtml = privacyContainer.innerHTML
    cleanup()

    const { container: termsContainer } = render(
      <LegalPage data={pages.terms} />,
    )
    const termsHtml = termsContainer.innerHTML

    expect(privacyHtml).not.toBe(termsHtml)
  })
})

// ── Shared shell structure ─────────────────────────────────────────────

describe('Legal page shell', () => {
  it('has a back link to the home page', () => {
    render(<LegalPage data={pages.privacy} />)
    const backLink = screen.getByRole('link', { name: /← Privacy Eraser/ })
    expect(backLink).toHaveAttribute('href', '/')
  })

  it('has a footer with copyright', () => {
    render(<LegalPage data={pages.privacy} />)
    const footer = screen.getByText(/© \d{4} Privacy Eraser/)
    expect(footer).toBeInTheDocument()
  })
})

// ── Negative tests ─────────────────────────────────────────────────────

describe('Negative cases', () => {
  it('getPageData rejects non-existent variant', () => {
    expect(getPageData('nonexistent')).toBeNull()
  })

  it('both pages have non-empty markdown content', () => {
    expect(pages.privacy.markdown.trim().length).toBeGreaterThan(0)
    expect(pages.terms.markdown.trim().length).toBeGreaterThan(0)
  })

  it('privacy and terms markdown are distinct documents', () => {
    expect(pages.privacy.markdown).not.toBe(pages.terms.markdown)
  })

  it('page data titles are distinct', () => {
    expect(pages.privacy.title).not.toBe(pages.terms.title)
  })
})
