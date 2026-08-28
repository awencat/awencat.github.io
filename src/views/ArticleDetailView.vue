<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { MdPreview } from 'md-editor-v3'
import CommentSection from '../components/CommentSection.vue'
import { builtinArticles } from '../content/articles.js'
import { getAllArticles } from '../services/articleStore.js'

const route = useRoute()
const articles = getAllArticles(window.localStorage, builtinArticles)
const article = computed(() => articles.find((item) => item.id === route.params.id))
</script>

<template>
  <div class="section-shell article-detail">
    <template v-if="article">
      <RouterLink class="back-link" to="/articles">← 返回文章栏</RouterLink>
      <article>
        <header class="article-detail__header">
          <div class="article-card__meta">
            <time :datetime="article.date">{{ article.date }}</time>
            <span v-if="article.source === 'local'" class="local-badge">本地文章</span>
          </div>
          <h1>{{ article.title }}</h1>
          <p>{{ article.summary }}</p>
        </header>
        <div class="markdown-paper">
          <MdPreview :model-value="article.content" language="zh-CN" />
        </div>
      </article>
      <CommentSection :article-id="article.id" />
    </template>
    <section v-else class="not-found">
      <p class="eyebrow">Not found</p>
      <h1>没有找到这篇文章</h1>
      <p>它可能已从当前浏览器中移除，或者链接并不存在。</p>
      <RouterLink class="button button--primary" to="/articles">返回文章栏</RouterLink>
    </section>
  </div>
</template>
