<template>
  <header class="site-header">
    <RouterLink class="brand" to="/" aria-label="返回主页">
      <span class="brand-mark">A</span>
      <span>Awenio</span>
    </RouterLink>
    <nav class="site-nav" aria-label="主导航">
      <RouterLink to="/">主页</RouterLink>
      <RouterLink to="/articles">文章</RouterLink>
      <RouterLink to="/future">未来</RouterLink>
    </nav>
  </header>
</template>
