<script setup>
import SiteHeader from './components/SiteHeader.vue'
</script>

<template>
  <div class="site-shell">
    <SiteHeader />
    <main class="site-main">
      <RouterView />
    </main>
    <footer class="site-footer">
      <p>用 Vue 与 Markdown 记录生活 · {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>
