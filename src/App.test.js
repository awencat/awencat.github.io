import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { expect, it } from 'vitest'
import App from './App.vue'

it('shows the personal sidebar only on the home route when navigating between pages', async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: { template: '<p>主页正文</p>' } },
      { path: '/articles', name: 'articles', component: { template: '<p>文章列表</p>' } },
      { path: '/articles/:id', name: 'article-detail', component: { template: '<p>文章正文</p>' } },
      { path: '/future', name: 'future', component: { template: '<p>未来页面</p>' } },
    ],
  })
  await router.push('/')
  await router.isReady()
  const wrapper = mount(App, { global: { plugins: [router] } })

  expect(wrapper.find('.site-sidebar').exists()).toBe(true)
  for (const path of ['/articles', '/articles/welcome', '/future']) {
    await router.push(path)
    expect(wrapper.find('.site-sidebar').exists()).toBe(false)
    expect(wrapper.find('.site-layout--standalone').exists()).toBe(true)
  }
  await router.push('/')
  expect(wrapper.find('.site-sidebar').exists()).toBe(true)
  wrapper.unmount()
})
