<script setup>
import ArticleCard from '../components/ArticleCard.vue'
import { builtinArticles } from '../content/articles.js'
import { getAllArticles } from '../services/articleStore.js'

const articles = getAllArticles(window.localStorage, builtinArticles)
</script>

<template>
  <div class="section-shell page-stack">
    <header class="page-header">
      <p class="eyebrow">Writing & notes</p>
      <h1>文章</h1>
      <p>写下一些思考，也留住一些正在发生的事。</p>
    </header>

    <section aria-labelledby="article-list-title">
      <div class="section-heading section-heading--compact">
        <div>
          <p class="eyebrow">Archive</p>
          <h2 id="article-list-title">全部文章</h2>
        </div>
        <p>{{ articles.length }} 篇记录</p>
      </div>
      <div class="article-list">
        <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
      </div>
    </section>
  </div>
</template>
