import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SiteHeader from './SiteHeader.vue'

describe('SiteHeader', () => {
  it('uses the personal avatar as the top-left home link', () => {
    const wrapper = mount(SiteHeader, {
      global: {
        stubs: { RouterLink: { template: '<a><slot /></a>' } },
      },
    })

    const avatar = wrapper.get('a[aria-label="返回主页"] img')
    expect(avatar.attributes('alt')).toBe('Awenio 的头像')
    expect(avatar.attributes('src')).toContain('avatar.svg')
  })
})
