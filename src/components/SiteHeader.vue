<script setup>
const avatarUrl = `${import.meta.env.BASE_URL}images/avatar.svg`
</script>

<template>
  <header class="site-header">
    <RouterLink class="brand" to="/" aria-label="返回主页">
      <img class="brand-avatar" :src="avatarUrl" alt="Awenio 的头像" />
      <span>Awenio</span>
    </RouterLink>
    <nav class="site-nav" aria-label="主导航">
      <RouterLink to="/">主页</RouterLink>
      <RouterLink to="/articles">文章</RouterLink>
      <RouterLink to="/future">未来</RouterLink>
    </nav>
  </header>
</template>
