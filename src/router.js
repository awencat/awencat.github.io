import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('./views/HomeView.vue') },
    { path: '/articles', name: 'articles', component: () => import('./views/ArticlesView.vue') },
    {
      path: '/articles/:id',
      name: 'article-detail',
      component: () => import('./views/ArticleDetailView.vue'),
    },
    { path: '/future', name: 'future', component: () => import('./views/FutureView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
