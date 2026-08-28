import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HomeView from './HomeView.vue'

describe('HomeView', () => {
  function mountHome() {
    return mount(HomeView, {
      global: {
        stubs: { RouterLink: { template: '<a><slot /></a>' } },
      },
    })
  }

  it('introduces the owner and renders every gallery image in filename order', () => {
    const wrapper = mountHome()

    expect(wrapper.get('h1').text()).toContain('你好，我是 Awenio')
    expect(wrapper.get('[aria-label="自我介绍"]').text()).toContain('关于我')
    const images = wrapper.findAll('[data-gallery-item] img')
    expect(images).toHaveLength(3)
    expect(images.map((image) => image.attributes('alt'))).toEqual([
      'gallery-1',
      'gallery-2',
      'gallery-3',
    ])
  })

  it('provides carousel controls for browsing the gallery', () => {
    const wrapper = mountHome()

    expect(wrapper.get('[aria-label="精选图片走马灯"]')).toBeTruthy()
    expect(wrapper.get('button[aria-label="上一张照片"]')).toBeTruthy()
    expect(wrapper.get('button[aria-label="下一张照片"]')).toBeTruthy()
  })

  it('shows placeholder GitHub and QQ contact details at the bottom', () => {
    const wrapper = mountHome()

    const contacts = wrapper.get('[aria-label="联系方式"]').text()
    expect(contacts).toContain('github.com/your-name')
    expect(contacts).toContain('123456789')
  })
})
