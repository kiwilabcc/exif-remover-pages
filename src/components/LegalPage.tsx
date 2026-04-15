import ReactMarkdown from 'react-markdown'
import type { LegalPageData } from '../legal-content'

interface LegalPageProps {
  data: LegalPageData
}

export function LegalPage({ data }: LegalPageProps) {
  return (
    <div className="legal-page">
      <header className="legal-page-header">
        <a href="/" className="legal-page-back">
          ← Privacy Eraser
        </a>
      </header>
      <main className="legal-page-body">
        <ReactMarkdown>{data.markdown}</ReactMarkdown>
      </main>
      <footer className="legal-page-footer">
        <p>
          © {new Date().getFullYear()} Privacy Eraser. All processing
          happens on your device.
        </p>
      </footer>
    </div>
  )
}
