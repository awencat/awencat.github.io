import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HomeView from './HomeView.vue'

describe('HomeView', () => {
  it('introduces the owner and renders a curated gallery', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: { RouterLink: { template: '<a><slot /></a>' } },
      },
    })

    expect(wrapper.get('h1').text()).toContain('你好，我是 Awenio')
    expect(wrapper.get('[aria-label="自我介绍"]').text()).toContain('关于我')
    expect(wrapper.findAll('[data-gallery-item]')).toHaveLength(3)
  })
})
