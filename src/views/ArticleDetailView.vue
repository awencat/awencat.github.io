<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { MdCatalog, MdPreview } from 'md-editor-v3'
import CommentSection from '../components/CommentSection.vue'
import { builtinArticles } from '../content/articles.js'
import { getAllArticles } from '../services/articleStore.js'

const route = useRoute()
const articles = getAllArticles(window.localStorage, builtinArticles)
const article = computed(() => articles.find((item) => item.id === route.params.id))
const scrollElement = document.documentElement
const editorId = computed(() => `article-${route.params.id}`)
const readingMinutes = computed(() => Math.max(1, Math.ceil((article.value?.content.length || 0) / 400)))
</script>

<template>
  <div class="section-shell article-detail">
    <template v-if="article">
      <div class="page-tabs"><RouterLink to="/articles">文章</RouterLink><span class="selected">阅读</span><RouterLink :to="{ path: route.path, hash: '#comments-title' }">评论</RouterLink></div>
      <div class="reading-layout">
      <div class="reading-main">
      <RouterLink class="back-link" to="/articles">← 返回文章栏</RouterLink>
      <article>
        <header class="article-detail__header">
          <div class="article-card__meta">
            <time :datetime="article.date">{{ article.date }}</time>
            <span>约 {{ readingMinutes }} 分钟阅读</span>
            <span v-if="article.source === 'local'" class="local-badge">本地文章</span>
          </div>
          <h1>{{ article.title }}</h1>
          <p>{{ article.summary }}</p>
        </header>
        <div class="markdown-paper">
          <MdPreview :key="article.id" :id="editorId" :model-value="article.content" language="zh-CN" preview-theme="github" />
        </div>
      </article>
      <CommentSection :key="article.id" :article-id="article.id" />
      </div>
      <aside class="article-toc" aria-label="文章目录">
        <h2>本文目录</h2>
        <MdCatalog :key="article.id" :editor-id="editorId" :scroll-element="scrollElement" />
        <RouterLink :to="{ path: route.path, hash: '#comments-title' }" class="toc-comment-link">↓ 前往评论</RouterLink>
      </aside>
      </div>
    </template>
    <section v-else class="not-found">
      <p class="eyebrow">Not found</p>
      <h1>没有找到这篇文章</h1>
      <p>它可能已从当前浏览器中移除，或者链接并不存在。</p>
      <RouterLink class="button button--primary" to="/articles">返回文章栏</RouterLink>
    </section>
  </div>
</template>
