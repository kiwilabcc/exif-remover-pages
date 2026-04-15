import './App.css'

// ── Data seams: hoist content for future slices ───────────────────────

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Terms', href: '/terms/' },
  { label: 'Support', href: '/support/' },
] as const

const PROOF_POINTS = [
  {
    icon: '🔒',
    title: 'On-Device Processing',
    body: 'All photo scanning and EXIF cleaning happens locally. Nothing is uploaded.',
  },
  {
    icon: '📍',
    title: 'GPS & Metadata Detection',
    body: 'Detect hidden GPS coordinates, camera details, and timestamps in your photos.',
  },
  {
    icon: '✋',
    title: 'You Choose Photos',
    body: 'Only photos you select are scanned. Nothing is accessed automatically.',
  },
] as const

const SCREENSHOT_PLACEHOLDERS = [
  { label: 'Photo Scanner', description: 'Select and scan photos' },
  { label: 'Metadata View', description: 'See hidden EXIF data' },
  { label: 'Clean Results', description: 'Review cleaned output' },
] as const

const APP_STORE_CTA = {
  label: 'Download on the App Store',
  badge: 'Coming soon',
  href: '#',
} as const

// ── Component ─────────────────────────────────────────────────────────

function App() {
  return (
    <div className="landing">
      {/* Header */}
      <header className="landing-header">
        <a href="#home" className="brand">
          <span className="brand-icon" aria-hidden="true">🛡️</span>
          <span className="brand-name">Privacy Eraser</span>
        </a>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="hero-section">
        <h1>Your photos carry hidden data</h1>
        <p className="hero-subtitle">
          Privacy Eraser scans photos for hidden metadata — like GPS
          locations, camera details, and timestamps — entirely on your
          device.
        </p>
        <div className="hero-badge">
          <span aria-hidden="true">✅</span>
          <span>
            EXIF scanning and cleaning available. All processing happens on
            your device.
          </span>
        </div>
        <a
          href={APP_STORE_CTA.href}
          className="cta-button cta-disabled"
          aria-disabled="true"
          onClick={(e) => e.preventDefault()}
        >
          <span className="cta-label">{APP_STORE_CTA.label}</span>
          <span className="cta-badge">{APP_STORE_CTA.badge}</span>
        </a>
      </section>

      {/* Proof Points */}
      <section className="proof-section" aria-label="Key features">
        <ul className="proof-list">
          {PROOF_POINTS.map((point) => (
            <li key={point.title} className="proof-card">
              <span className="proof-icon" aria-hidden="true">
                {point.icon}
              </span>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Screenshot Placeholders */}
      <section className="screenshots-section" aria-label="App screenshots">
        <h2>See it in action</h2>
        <ul className="screenshot-list">
          {SCREENSHOT_PLACEHOLDERS.map((shot) => (
            <li key={shot.label} className="screenshot-card">
              <div className="screenshot-placeholder" aria-hidden="true">
                <span className="placeholder-icon">📷</span>
              </div>
              <p className="screenshot-label">{shot.label}</p>
              <p className="screenshot-desc">{shot.description}</p>
            </li>
          ))}
        </ul>
        <p className="placeholder-note">
          Screenshots are placeholders — actual app images coming soon.
        </p>
      </section>

      {/* Legal Links & Support */}
      <section className="legal-section">
        <a href="/privacy/" className="legal-link-card">
          <span className="legal-link-icon" aria-hidden="true">🔒</span>
          <h2>Privacy Policy</h2>
          <p>
            All photo scanning happens on your device. No photos, metadata,
            or personal data are ever uploaded or transmitted.
          </p>
          <span className="legal-link-cta">Read full policy →</span>
        </a>

        <a href="/terms/" className="legal-link-card">
          <span className="legal-link-icon" aria-hidden="true">📄</span>
          <h2>Terms of Service</h2>
          <p>
            On-device EXIF scanning and cleaning for photos you select.
            Original photos are never modified.
          </p>
          <span className="legal-link-cta">Read full terms →</span>
        </a>

        <a href="/support/" className="legal-link-card">
          <span className="legal-link-icon" aria-hidden="true">💬</span>
          <h2>Support</h2>
          <p>
            Find answers to common questions about how Privacy Eraser works,
            data safety, and what metadata is removed.
          </p>
          <span className="legal-link-cta">Visit support page →</span>
        </a>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>
          © {new Date().getFullYear()} Privacy Eraser. All processing
          happens on your device.
        </p>
      </footer>
    </div>
  )
}

export default App
