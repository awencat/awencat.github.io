<script setup>
import { useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteSidebar from './components/SiteSidebar.vue'
const route = useRoute()
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <RouterLink class="skip-link" :to="{ path: route.path, hash: '#main-content' }">跳到正文</RouterLink>
    <div class="site-layout">
      <SiteSidebar />
      <main id="main-content" class="site-main">
        <RouterView />
      </main>
    </div>
    <footer class="site-footer">
      <p>用 Vue 与 Markdown 记录生活 · {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>
