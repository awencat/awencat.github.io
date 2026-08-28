<script setup>
import ArticleCard from '../components/ArticleCard.vue'
import { builtinArticles } from '../content/articles.js'
import { getAllArticles } from '../services/articleStore.js'

const articles = getAllArticles(window.localStorage, builtinArticles)
</script>

<template>
  <div class="section-shell page-stack">
    <header class="page-header">
      <p class="eyebrow">废话 & 智软</p>
      <h1>文章（废话）</h1>
      <p>欢迎来到废话时间，阅读以下内容可能导致浪费宝贵的阳寿，（骗你的不阅读也浪费了）。</p>
    </header>

    <section aria-labelledby="article-list-title">
      <div class="section-heading section-heading--compact">
        <div>
          <p class="eyebrow">Archive</p>
          <h2 id="article-list-title">全部文章</h2>
        </div>
        <p>{{ articles.length }} 篇废纸</p>
      </div>
      <div class="article-list">
        <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
      </div>
    </section>
  </div>
</template>
