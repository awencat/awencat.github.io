<script setup>
import { ref } from 'vue'
import { MdEditor } from 'md-editor-v3'
import ArticleCard from '../components/ArticleCard.vue'
import { builtinArticles } from '../content/articles.js'
import {
  getAllArticles,
  parseMarkdownArticle,
  saveLocalArticle,
} from '../services/articleStore.js'

const articles = ref(getAllArticles(window.localStorage, builtinArticles))
const draftTitle = ref('')
const draftContent = ref('# 新文章\n\n从这里开始写作……')
const uploadError = ref('')
const uploadNotice = ref('')

async function selectMarkdown(event) {
  uploadError.value = ''
  uploadNotice.value = ''
  const file = event.target.files?.[0]
  if (!file) return

  if (!file.name.toLowerCase().endsWith('.md')) {
    uploadError.value = '请选择 .md 格式的 Markdown 文件。'
    return
  }

  try {
    const raw = await file.text()
    if (!raw.trim()) throw new Error('Markdown 文件不能为空。')
    const parsed = parseMarkdownArticle(raw, {
      id: 'preview',
      title: file.name.replace(/\.md$/i, ''),
      source: 'local',
    })
    draftTitle.value = parsed.title
    draftContent.value = parsed.content
    uploadNotice.value = `已载入 ${file.name}，可继续编辑后保存。`
  } catch (error) {
    uploadError.value = error.message || '读取文件失败，请重试。'
  }
}

function saveDraft() {
  uploadError.value = ''
  if (!draftContent.value.trim()) {
    uploadError.value = '文章内容不能为空。'
    return
  }

  const title = draftTitle.value.trim() || '未命名文章'
  const timestamp = Date.now()
  const article = parseMarkdownArticle(draftContent.value, {
    id: `local-${timestamp}-${Math.random().toString(16).slice(2)}`,
    title,
    date: new Date(timestamp).toISOString().slice(0, 10),
    source: 'local',
  })
  article.title = title
  saveLocalArticle(window.localStorage, article)
  articles.value = getAllArticles(window.localStorage, builtinArticles)
  uploadNotice.value = `《${title}》已保存到当前浏览器。`
}
</script>

<template>
  <div class="section-shell page-stack">
    <header class="page-header">
      <p class="eyebrow">Writing & notes</p>
      <h1>文章</h1>
      <p>写下一些思考，也留住一些正在发生的事。</p>
    </header>

    <section class="editor-panel" aria-labelledby="editor-title">
      <div class="editor-panel__intro">
        <div>
          <p class="eyebrow">Local workshop</p>
          <h2 id="editor-title">Markdown 写作台</h2>
        </div>
        <p>上传或直接编辑 Markdown。保存内容只会留在当前浏览器中。</p>
      </div>
      <div class="editor-toolbar">
        <label class="file-picker">
          <span>上传 .md 文件</span>
          <input type="file" accept=".md,text/markdown" @change="selectMarkdown" />
        </label>
        <label class="title-field">
          文章标题
          <input v-model="draftTitle" maxlength="80" placeholder="输入文章标题" />
        </label>
      </div>
      <MdEditor v-model="draftContent" language="zh-CN" :preview="true" />
      <div class="form-actions">
        <p v-if="uploadError" class="form-error" role="alert">{{ uploadError }}</p>
        <p v-else-if="uploadNotice" class="form-notice" role="status">{{ uploadNotice }}</p>
        <button class="button button--primary" type="button" @click="saveDraft">
          保存到文章栏
        </button>
      </div>
    </section>

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
