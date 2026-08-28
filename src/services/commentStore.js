const COMMENT_STORAGE_KEY = 'awenio:comments'

function loadCommentMap(storage) {
  try {
    const value = JSON.parse(storage.getItem(COMMENT_STORAGE_KEY) || '{}')
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  } catch {
    return {}
  }
}

function saveCommentMap(storage, value) {
  storage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(value))
}

function createCommentId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }

  return `comment-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function loadComments(storage = window.localStorage, articleId) {
  const comments = loadCommentMap(storage)[articleId]
  return Array.isArray(comments) ? comments : []
}

export function addComment(storage = window.localStorage, articleId, input, context = {}) {
  const content = String(input.content || '').trim()
  if (!content) {
    throw new Error('请输入评论内容')
  }

  const comment = {
    id: context.id || createCommentId(),
    author: String(input.author || '').trim() || '匿名访客',
    content,
    createdAt: context.createdAt || new Date().toISOString(),
  }
  const commentMap = loadCommentMap(storage)
  commentMap[articleId] = [comment, ...loadComments(storage, articleId)]
  saveCommentMap(storage, commentMap)
  return comment
}

export function removeComment(storage = window.localStorage, articleId, commentId) {
  const commentMap = loadCommentMap(storage)
  commentMap[articleId] = loadComments(storage, articleId).filter(
    (comment) => comment.id !== commentId,
  )
  saveCommentMap(storage, commentMap)
}
