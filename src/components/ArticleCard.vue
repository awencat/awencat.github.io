<script setup>
defineProps({
  article: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="article-card">
    <div class="article-card__meta">
      <time :datetime="article.date">{{ article.date }}</time>
      <span v-if="article.source === 'local'" class="local-badge">本地文章</span>
    </div>
    <h2>{{ article.title }}</h2>
    <p>{{ article.summary || '打开文章继续阅读。' }}</p>
    <RouterLink class="text-link" :to="`/articles/${article.id}`">
      阅读全文 <span aria-hidden="true">→</span>
    </RouterLink>
  </article>
</template>
