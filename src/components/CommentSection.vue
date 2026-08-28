<script setup>
import { ref } from 'vue'
import { addComment, loadComments, removeComment } from '../services/commentStore.js'

const props = defineProps({
  articleId: {
    type: String,
    required: true,
  },
})

const comments = ref(loadComments(window.localStorage, props.articleId))
const author = ref('')
const content = ref('')
const error = ref('')

function submitComment() {
  error.value = ''
  try {
    addComment(window.localStorage, props.articleId, {
      author: author.value,
      content: content.value,
    })
    comments.value = loadComments(window.localStorage, props.articleId)
    content.value = ''
  } catch (caughtError) {
    error.value = caughtError.message
  }
}

function deleteComment(commentId) {
  removeComment(window.localStorage, props.articleId, commentId)
  comments.value = loadComments(window.localStorage, props.articleId)
}

function formatDate(value) {
  return new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}
</script>

<template>
  <section class="comments" aria-labelledby="comments-title">
    <div class="section-heading section-heading--compact">
      <p class="eyebrow">Discussion</p>
      <h2 id="comments-title">评论区</h2>
      <p>评论仅保存在当前浏览器中。</p>
    </div>

    <form class="comment-form" @submit.prevent="submitComment">
      <label>
        你的称呼
        <input v-model="author" name="author" maxlength="30" placeholder="匿名访客" />
      </label>
      <label>
        评论内容
        <textarea
          v-model="content"
          name="content"
          maxlength="500"
          rows="4"
          placeholder="写下你的想法……"
        />
      </label>
      <div class="form-actions">
        <p v-if="error" class="form-error" role="alert">{{ error }}</p>
        <button class="button button--primary" type="submit">发表评论</button>
      </div>
    </form>

    <div v-if="comments.length" class="comment-list">
      <article v-for="comment in comments" :key="comment.id" class="comment" data-comment>
        <div class="comment__header">
          <div>
            <strong>{{ comment.author }}</strong>
            <time :datetime="comment.createdAt">{{ formatDate(comment.createdAt) }}</time>
          </div>
          <button class="icon-button" type="button" @click="deleteComment(comment.id)">
            删除
          </button>
        </div>
        <p>{{ comment.content }}</p>
      </article>
    </div>
    <p v-else class="empty-state">还没有评论，来留下第一句话吧。</p>
  </section>
</template>
