import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import CommentSection from './CommentSection.vue'

describe('CommentSection', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('adds a comment and shows it below the form', async () => {
    const wrapper = mount(CommentSection, { props: { articleId: 'article-one' } })

    await wrapper.get('input[name="author"]').setValue('小明')
    await wrapper.get('textarea[name="content"]').setValue('写得真好！')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.get('[data-comment]').text()).toContain('小明')
    expect(wrapper.get('[data-comment]').text()).toContain('写得真好！')
    expect(wrapper.get('textarea[name="content"]').element.value).toBe('')
  })

  it('shows a validation message for an empty comment', async () => {
    const wrapper = mount(CommentSection, { props: { articleId: 'article-one' } })

    await wrapper.get('form').trigger('submit')

    expect(wrapper.get('[role="alert"]').text()).toBe('请输入评论内容')
  })
})
