const ARTICLE_STORAGE_KEY = 'awenio:articles'

function cleanValue(value = '') {
  const trimmed = value.trim()
  const quote = trimmed[0]

  if ((quote === '"' || quote === "'") && trimmed.at(-1) === quote) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

function createSummary(content) {
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#>*_`\[\]()-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 100)
}

export function parseMarkdownArticle(raw, fallback = {}) {
  const normalized = String(raw ?? '').replace(/\r\n/g, '\n').trim()
  const frontmatterMatch = normalized.match(/^---\n([\s\S]*?)\n---(?:\n|$)/)
  const metadata = {}

  if (frontmatterMatch) {
    for (const line of frontmatterMatch[1].split('\n')) {
      const separator = line.indexOf(':')
      if (separator > 0) {
        metadata[line.slice(0, separator).trim()] = cleanValue(line.slice(separator + 1))
      }
    }
  }

  const content = frontmatterMatch
    ? normalized.slice(frontmatterMatch[0].length).trim()
    : normalized

  return {
    id: metadata.id || fallback.id,
    title: metadata.title || fallback.title || '未命名文章',
    date: metadata.date || fallback.date || new Date().toISOString().slice(0, 10),
    summary: metadata.summary || fallback.summary || createSummary(content),
    cover: metadata.cover || fallback.cover || '',
    content,
    source: fallback.source || 'builtin',
  }
}

export function loadLocalArticles(storage = window.localStorage) {
  try {
    const value = JSON.parse(storage.getItem(ARTICLE_STORAGE_KEY) || '[]')
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

export function saveLocalArticle(storage = window.localStorage, article) {
  const articles = loadLocalArticles(storage).filter((item) => item.id !== article.id)
  storage.setItem(ARTICLE_STORAGE_KEY, JSON.stringify([article, ...articles]))
  return article
}

export function getAllArticles(storage = window.localStorage, builtinArticles = []) {
  return [...builtinArticles, ...loadLocalArticles(storage)].sort((left, right) =>
    String(right.date || '').localeCompare(String(left.date || '')),
  )
}
