import { beforeEach, describe, expect, it } from 'vitest'
import {
  getAllArticles,
  loadLocalArticles,
  parseMarkdownArticle,
  saveLocalArticle,
} from './articleStore.js'

class MemoryStorage {
  constructor() {
    this.values = new Map()
  }

  getItem(key) {
    return this.values.has(key) ? this.values.get(key) : null
  }

  setItem(key, value) {
    this.values.set(key, String(value))
  }

  clear() {
    this.values.clear()
  }
}

describe('articleStore', () => {
  let storage

  beforeEach(() => {
    storage = new MemoryStorage()
  })

  it('parses supported frontmatter and keeps the markdown body', () => {
    const raw = `---\ntitle: 第一篇文章\ndate: 2026-08-28\nsummary: 一段摘要\ncover: /images/gallery-1.svg\n---\n# 正文\n\n你好。`

    const article = parseMarkdownArticle(raw, { id: 'first', title: 'fallback' })

    expect(article).toEqual({
      id: 'first',
      title: '第一篇文章',
      date: '2026-08-28',
      summary: '一段摘要',
      cover: '/images/gallery-1.svg',
      content: '# 正文\n\n你好。',
      source: 'builtin',
    })
  })

  it('uses fallback metadata when markdown has no frontmatter', () => {
    const article = parseMarkdownArticle('# 只有正文', {
      id: 'plain',
      title: 'plain.md',
      date: '2026-01-02',
      source: 'local',
    })

    expect(article.title).toBe('plain.md')
    expect(article.content).toBe('# 只有正文')
    expect(article.source).toBe('local')
  })

  it('falls back to an empty list when local data is invalid', () => {
    storage.setItem('awenio:articles', '{broken-json')

    expect(loadLocalArticles(storage)).toEqual([])
  })

  it('saves an article without discarding existing local articles', () => {
    const first = { id: 'one', title: '文章一', content: 'A' }
    const second = { id: 'two', title: '文章二', content: 'B' }

    saveLocalArticle(storage, first)
    saveLocalArticle(storage, second)

    expect(loadLocalArticles(storage)).toEqual([second, first])
  })

  it('combines built-in and local articles in reverse date order', () => {
    saveLocalArticle(storage, { id: 'local', title: '本地', date: '2026-08-28' })
    const builtins = [{ id: 'builtin', title: '内置', date: '2026-08-30' }]

    expect(getAllArticles(storage, builtins).map((article) => article.id)).toEqual([
      'builtin',
      'local',
    ])
  })
})
