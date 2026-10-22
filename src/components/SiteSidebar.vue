<script setup>
import { builtinArticles } from '../content/articles.js'
import { getAllArticles } from '../services/articleStore.js'

const articles = getAllArticles(window.localStorage, builtinArticles)
const avatarUrl = `${import.meta.env.BASE_URL}images/avatar.jpg`
</script>

<template>
  <aside class="site-sidebar" aria-label="个人资料与站点导航">
    <div class="sidebar-profile">
      <RouterLink to="/" aria-label="返回主页">
        <img class="sidebar-avatar" :src="avatarUrl" alt="awencat 的头像" />
      </RouterLink>
      <strong>awencat</strong>
      <p>个人笔记 · 生活记录</p>
      <div class="sidebar-stats">
        <RouterLink to="/articles"><b>{{ articles.length }}</b><span>篇文章</span></RouterLink>
        <RouterLink :to="{ path: '/', hash: '#gallery-title' }"><b>相册</b><span>日常片段</span></RouterLink>
      </div>
    </div>
    <div class="sidebar-group">
      <h2>站点导航</h2>
      <nav aria-label="侧边导航">
        <RouterLink to="/" exact-active-class="is-current"><span aria-hidden="true">⌂</span> 主页</RouterLink>
        <RouterLink to="/articles" active-class="is-current"><span aria-hidden="true">▤</span> 文章归档</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#about' }"><span aria-hidden="true">◇</span> 关于我</RouterLink>
        <RouterLink to="/future" active-class="is-current"><span aria-hidden="true">＋</span> 未来计划</RouterLink>
      </nav>
    </div>
    <div class="sidebar-group sidebar-recent">
      <h2>最近更新</h2>
      <RouterLink v-for="article in articles.slice(0, 4)" :key="article.id" :to="`/articles/${article.id}`">
        <span>{{ article.title }}</span><time :datetime="article.date">{{ article.date }}</time>
      </RouterLink>
    </div>
    <div class="sidebar-bottom"><span class="status-dot" /> 这里仍在缓慢更新</div>
  </aside>
</template>
