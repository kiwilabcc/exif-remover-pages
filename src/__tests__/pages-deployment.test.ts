import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = resolve(__dirname, '..', '..')
const distDir = resolve(projectRoot, 'dist')

/**
 * Deployment contract tests for GitHub Pages artifact.
 *
 * These tests run against the built `dist/` output to assert that
 * the hosting artifact matches the promised custom-domain, root-served
 * multi-page architecture. They should be executed after `npm run build`.
 */
describe('GitHub Pages deployment contract', () => {
  const requiredEntrypoints = [
    'dist/index.html',
    'dist/privacy/index.html',
    'dist/terms/index.html',
    'dist/support/index.html',
  ]

  describe('required entrypoints', () => {
    for (const entry of requiredEntrypoints) {
      it(`${entry} exists`, () => {
        expect(existsSync(resolve(projectRoot, entry))).toBe(true)
      })
    }

    it('all entrypoints contain valid HTML', () => {
      for (const entry of requiredEntrypoints) {
        const html = readFileSync(resolve(projectRoot, entry), 'utf-8')
        expect(html).toContain('<!doctype html')
        expect(html).toContain('</html>')
      }
    })
  })

  describe('custom domain artifact', () => {
    it('dist/CNAME exists', () => {
      expect(existsSync(resolve(distDir, 'CNAME'))).toBe(true)
    })

    it('CNAME contains exifremover.kiwilab.cc', () => {
      const cname = readFileSync(resolve(distDir, 'CNAME'), 'utf-8').trim()
      expect(cname).toBe('exifremover.kiwilab.cc')
    })

    it('public/CNAME is the canonical source and matches dist/CNAME', () => {
      const publicCname = readFileSync(
        resolve(projectRoot, 'public', 'CNAME'),
        'utf-8',
      ).trim()
      const distCname = readFileSync(resolve(distDir, 'CNAME'), 'utf-8').trim()
      expect(publicCname).toBe(distCname)
    })
  })

  describe('root-served architecture (no accidental base-path drift)', () => {
    it('index.html uses root-absolute links', () => {
      const html = readFileSync(resolve(distDir, 'index.html'), 'utf-8')
      // Should link to /privacy/, /terms/, /support/ — not relative or subpath
      expect(html).toMatch(/["']\/privacy\/["']/)
      expect(html).toMatch(/["']\/terms\/["']/)
      expect(html).toMatch(/["']\/support\/["']/)
    })

    it('legal pages use root-absolute asset references', () => {
      for (const page of ['privacy', 'terms', 'support']) {
        const html = readFileSync(
          resolve(distDir, page, 'index.html'),
          'utf-8',
        )
        // All static assets should use root-absolute paths (e.g. /favicon.svg, /assets/...)
        expect(html).toMatch(/href="\/favicon\.svg"/)
        expect(html).toMatch(/src="\/assets\//)
      }
    })

    it('no repo-subpath base appears in any entrypoint', () => {
      for (const entry of requiredEntrypoints) {
        const html = readFileSync(resolve(projectRoot, entry), 'utf-8')
        // Reject any <base href="/repo-name/"> pattern that would indicate subpath hosting
        expect(html).not.toMatch(/<base\s+href="\/[^"]+\/"/)
      }
    })

    it('data-page attribute is preserved for legal pages', () => {
      for (const page of ['privacy', 'terms', 'support']) {
        const html = readFileSync(
          resolve(distDir, page, 'index.html'),
          'utf-8',
        )
        expect(html).toContain(`data-page="${page}"`)
      }
    })
  })

  describe('favicon and static assets', () => {
    it('dist/favicon.svg exists', () => {
      expect(existsSync(resolve(distDir, 'favicon.svg'))).toBe(true)
    })
  })
})

describe('Deployment workflow contract', () => {
  const workflowPath = resolve(
    projectRoot,
    '.github',
    'workflows',
    'deploy-pages.yml',
  )

  it('workflow file exists', () => {
    expect(existsSync(workflowPath)).toBe(true)
  })

  it('uses actions/configure-pages', () => {
    const yml = readFileSync(workflowPath, 'utf-8')
    expect(yml).toContain('actions/configure-pages')
  })

  it('uses actions/upload-pages-artifact', () => {
    const yml = readFileSync(workflowPath, 'utf-8')
    expect(yml).toContain('actions/upload-pages-artifact')
  })

  it('uses actions/deploy-pages', () => {
    const yml = readFileSync(workflowPath, 'utf-8')
    expect(yml).toContain('actions/deploy-pages')
  })

  it('runs npm test before build', () => {
    const yml = readFileSync(workflowPath, 'utf-8')
    const testIndex = yml.indexOf('npm test')
    const buildIndex = yml.indexOf('npm run build')
    expect(testIndex).toBeGreaterThan(-1)
    expect(buildIndex).toBeGreaterThan(-1)
    expect(testIndex).toBeLessThan(buildIndex)
  })

  it('uploads dist/ directory', () => {
    const yml = readFileSync(workflowPath, 'utf-8')
    expect(yml).toMatch(/path:\s*dist/)
  })

  it('does not contain hardcoded secrets or tokens', () => {
    const yml = readFileSync(workflowPath, 'utf-8')
    // Match lines with TOKEN/SECRET/PASSWORD as key names, excluding "id-token" (GitHub OIDC)
    const lines = yml.split('\n')
    const secretLines = lines.filter(
      (line) =>
        /(TOKEN|SECRET|PASSWORD)\s*:/i.test(line) &&
        !/id-token/i.test(line),
    )
    expect(secretLines).toHaveLength(0)
  })
})
