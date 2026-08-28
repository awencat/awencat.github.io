import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import ArticlesView from './ArticlesView.vue'

describe('ArticlesView', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('shows the article archive without writing or upload controls', () => {
    const wrapper = mount(ArticlesView, {
      global: {
        stubs: { RouterLink: { template: '<a><slot /></a>' } },
      },
    })

    expect(wrapper.get('[aria-labelledby="article-list-title"]')).toBeTruthy()
    expect(wrapper.find('input[type="file"]').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Markdown 写作台')
  })
})
