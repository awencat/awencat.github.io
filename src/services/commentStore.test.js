import { beforeEach, describe, expect, it } from 'vitest'
import { addComment, loadComments, removeComment } from './commentStore.js'

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
}

describe('commentStore', () => {
  let storage

  beforeEach(() => {
    storage = new MemoryStorage()
  })

  it('returns an empty list for an article without comments', () => {
    expect(loadComments(storage, 'article-one')).toEqual([])
  })

  it('adds a trimmed comment to only the selected article', () => {
    const comment = addComment(
      storage,
      'article-one',
      { author: '  小明 ', content: ' 很喜欢这篇文章。 ' },
      { id: 'comment-1', createdAt: '2026-08-28T08:00:00.000Z' },
    )

    expect(comment).toEqual({
      id: 'comment-1',
      author: '小明',
      content: '很喜欢这篇文章。',
      createdAt: '2026-08-28T08:00:00.000Z',
    })
    expect(loadComments(storage, 'article-one')).toEqual([comment])
    expect(loadComments(storage, 'article-two')).toEqual([])
  })

  it('rejects comments without content', () => {
    expect(() =>
      addComment(storage, 'article-one', { author: '访客', content: '   ' }),
    ).toThrow('请输入评论内容')
  })

  it('removes only the selected comment', () => {
    addComment(
      storage,
      'article-one',
      { author: '甲', content: '第一条' },
      { id: 'comment-1', createdAt: '2026-08-28T08:00:00.000Z' },
    )
    addComment(
      storage,
      'article-one',
      { author: '乙', content: '第二条' },
      { id: 'comment-2', createdAt: '2026-08-28T09:00:00.000Z' },
    )

    removeComment(storage, 'article-one', 'comment-1')

    expect(loadComments(storage, 'article-one').map((item) => item.id)).toEqual([
      'comment-2',
    ])
  })
})
