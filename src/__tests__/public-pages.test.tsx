import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { getPageData, pages } from '../legal-content'
import { LegalPage } from '../components/LegalPage'
import App from '../App'
import privacyMarkdown from '../../docs/privacy_policy.md?raw'
import termsMarkdown from '../../docs/terms.md?raw'
import supportMarkdown from '../../docs/support.md?raw'
import appSource from '../App.tsx?raw'

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

  it('returns support page data for "support" variant', () => {
    const data = getPageData('support')
    expect(data).not.toBeNull()
    expect(data!.title).toContain('Support')
    expect(data!.markdown).toBe(supportMarkdown)
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

  it('support page has a top-level heading with "Support"', () => {
    render(<LegalPage data={pages.support} />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.textContent).toContain('Support')
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

  it('support page renders content from docs/support.md', () => {
    render(<LegalPage data={pages.support} />)
    const headings = screen.getAllByRole('heading')
    const headingTexts = headings.map((h) => h.textContent)
    expect(headingTexts.some((t) => t?.includes('Support'))).toBe(true)
    expect(headingTexts.some((t) => t?.includes('Frequently Asked Questions'))).toBe(true)
    expect(headingTexts.some((t) => t?.includes('Contact'))).toBe(true)
    // Verify FAQ content renders
    expect(screen.getByText(/scans your photos for hidden EXIF metadata/i)).toBeInTheDocument()
  })

  it('support page includes a contact email link', () => {
    render(<LegalPage data={pages.support} />)
    const emailLink = screen.getByRole('link', { name: /support@kiwilab\.cc/i })
    expect(emailLink).toHaveAttribute('href', 'mailto:support@kiwilab.cc')
  })

  it('support page includes legal cross-links to privacy and terms', () => {
    render(<LegalPage data={pages.support} />)
    const privacyLink = screen.getByRole('link', { name: /Privacy Policy/i })
    const termsLink = screen.getByRole('link', { name: /Terms of Service/i })
    expect(privacyLink).toHaveAttribute('href', '/privacy/')
    expect(termsLink).toHaveAttribute('href', '/terms/')
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

  it('support page renders distinct content from privacy and terms', () => {
    const { container: supportContainer } = render(
      <LegalPage data={pages.support} />,
    )
    const supportHtml = supportContainer.innerHTML
    cleanup()

    const { container: privacyContainer } = render(
      <LegalPage data={pages.privacy} />,
    )
    const privacyHtml = privacyContainer.innerHTML
    cleanup()

    const { container: termsContainer } = render(
      <LegalPage data={pages.terms} />,
    )
    const termsHtml = termsContainer.innerHTML

    expect(supportHtml).not.toBe(privacyHtml)
    expect(supportHtml).not.toBe(termsHtml)
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
    expect(pages.support.markdown.trim().length).toBeGreaterThan(0)
  })

  it('privacy, terms, and support markdown are distinct documents', () => {
    expect(pages.privacy.markdown).not.toBe(pages.terms.markdown)
    expect(pages.privacy.markdown).not.toBe(pages.support.markdown)
    expect(pages.terms.markdown).not.toBe(pages.support.markdown)
  })

  it('page data titles are distinct', () => {
    expect(pages.privacy.title).not.toBe(pages.terms.title)
    expect(pages.privacy.title).not.toBe(pages.support.title)
    expect(pages.terms.title).not.toBe(pages.support.title)
  })
})

// ── Landing page support retarget ──────────────────────────────────────

describe('Landing page support retarget', () => {
  it('nav Support link points to /support/ not #support', () => {
    render(<App />)
    const supportLink = screen.getByRole('link', { name: 'Support' })
    expect(supportLink).toHaveAttribute('href', '/support/')
    expect(supportLink).not.toHaveAttribute('href', '#support')
  })

  it('has a support card linking to /support/', () => {
    render(<App />)
    const supportCard = screen.getByRole('link', { name: /Visit support page/i })
    expect(supportCard).toHaveAttribute('href', '/support/')
  })

  it('stale "support site is being set up" phrase is absent', () => {
    render(<App />)
    expect(screen.queryByText(/support site is being set up/i)).not.toBeInTheDocument()
  })

  it('stale "reach out through the app store listing" phrase is absent', () => {
    render(<App />)
    expect(screen.queryByText(/reach out through the app store listing/i)).not.toBeInTheDocument()
  })

  it('no inline FAQ details elements on home page', () => {
    render(<App />)
    const detailsElements = screen.queryAllByRole('group')
    expect(detailsElements).toHaveLength(0)
  })

  it('renders a live App Store CTA with the production listing URL', () => {
    render(<App />)
    const cta = screen.getByRole('link', { name: /download privacy eraser on the app store/i })
    expect(cta).toHaveAttribute('href', 'https://apps.apple.com/us/app/photo-privacy-exif-eraser/id6761869082')
    expect(cta).toHaveAttribute('target', '_blank')
    expect(cta).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(screen.getByText('Download on the')).toBeInTheDocument()
    expect(screen.getByText('App Store')).toBeInTheDocument()
    expect(screen.queryByText(/Coming soon/i)).not.toBeInTheDocument()
  })

  it('support nav item in source uses /support/ not #support', () => {
    // Source-level regression guard
    expect(appSource).not.toMatch(/href:\s*['"]#support['"]/) 
    expect(appSource).toMatch(/href:\s*['"]\/support\/['"]/) 
  })
})

// ── Screenshot truthfulness ────────────────────────────────────────────

describe('Screenshot truthfulness', () => {
  it('renders three screenshot images from repo-owned assets', () => {
    render(<App />)
    const images = document.querySelectorAll<HTMLImageElement>('.screenshot-image')
    expect(images).toHaveLength(3)
    // Each image must have a non-empty src (Vite resolves imports to hashed URLs)
    for (const img of images) {
      expect(img.src).toBeTruthy()
      expect(img.src).not.toBe('')
    }
  })

  it('screenshot images have descriptive alt text', () => {
    render(<App />)
    const images = document.querySelectorAll<HTMLImageElement>('.screenshot-image')
    const altTexts = Array.from(images).map((img) => img.alt)
    expect(altTexts).toHaveLength(3)
    // Each alt text should mention Privacy Eraser and describe the screen
    for (const alt of altTexts) {
      expect(alt).toContain('Privacy Eraser')
      expect(alt.length).toBeGreaterThan(20)
    }
  })

  it('screenshot cards have correct labels', () => {
    render(<App />)
    expect(screen.getByText('Photo Scanner')).toBeInTheDocument()
    expect(screen.getByText('Metadata View')).toBeInTheDocument()
    expect(screen.getByText('Clean Results')).toBeInTheDocument()
  })

  it('placeholder note text is absent from the rendered page', () => {
    render(<App />)
    expect(screen.queryByText(/Screenshots are placeholders/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/actual app images coming soon/i)).not.toBeInTheDocument()
  })

  it('placeholder CSS class is absent from rendered DOM', () => {
    render(<App />)
    expect(document.querySelector('.screenshot-placeholder')).toBeNull()
    expect(document.querySelector('.placeholder-icon')).toBeNull()
    expect(document.querySelector('.placeholder-note')).toBeNull()
  })

  it('source code does not contain placeholder seam', () => {
    // Source-level regression guard
    expect(appSource).not.toMatch(/SCREENSHOT_PLACEHOLDERS/)
    expect(appSource).not.toMatch(/Screenshots are placeholders/)
    expect(appSource).not.toMatch(/actual app images coming soon/)
    expect(appSource).not.toMatch(/screenshot-placeholder/)
  })

  it('screenshots are imported from repo-owned assets', () => {
    // Verify imports exist in source
    expect(appSource).toMatch(/import.*photo-scanner\.png/)
    expect(appSource).toMatch(/import.*metadata-view\.png/)
    expect(appSource).toMatch(/import.*clean-results\.png/)
  })
})
