import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { getPageData } from './legal-content.ts'
import { LegalPage } from './components/LegalPage.tsx'

const root = document.getElementById('root')!
const variant = root.getAttribute('data-page')

if (variant) {
  const data = getPageData(variant)
  if (data) {
    document.title = data.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', data.description)
  }
}

createRoot(root).render(
  <StrictMode>
    {variant && getPageData(variant) ? (
      <LegalPage data={getPageData(variant)!} />
    ) : (
      <App />
    )}
  </StrictMode>,
)
