<script setup>
const publicAsset = (name) => `${import.meta.env.BASE_URL}images/${name}`

const gallery = [
  { src: publicAsset('gallery-1.svg'), alt: '山谷与晨光插画', caption: '山野之间' },
  { src: publicAsset('gallery-2.svg'), alt: '海边落日插画', caption: '日落以后' },
  { src: publicAsset('gallery-3.svg'), alt: '夜晚城市插画', caption: '城市夜色' },
]
</script>

<template>
  <div>
    <section class="hero section-shell">
      <div class="hero__copy">
        <p class="eyebrow">Personal space · 个人空间</p>
        <h1>你好，我是 Awenio。<br />很高兴在这里遇见你。</h1>
        <p class="hero__lead">
          我用文字记录思考，用照片收藏日常。这里没有复杂的功能，只有一些认真生活的痕迹。
        </p>
        <div class="hero__actions">
          <RouterLink class="button button--primary" to="/articles">阅读文章</RouterLink>
          <a class="button button--ghost" href="#about">认识我</a>
        </div>
      </div>
      <div class="hero__portrait">
        <div class="portrait-halo" />
        <img :src="publicAsset('avatar.svg')" alt="Awenio 的头像" />
        <span class="portrait-note">保持好奇，持续记录</span>
      </div>
    </section>

    <section class="gallery-section section-shell" aria-labelledby="gallery-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Selected moments</p>
          <h2 id="gallery-title">精选图片</h2>
        </div>
        <p>收藏经过的风景，也收藏当时的心情。</p>
      </div>
      <div class="gallery-grid">
        <figure v-for="item in gallery" :key="item.src" class="gallery-item" data-gallery-item>
          <img :src="item.src" :alt="item.alt" />
          <figcaption>{{ item.caption }}</figcaption>
        </figure>
      </div>
    </section>

    <section id="about" class="about-section section-shell" aria-label="自我介绍">
      <div class="about-card">
        <div>
          <p class="eyebrow">A little about me</p>
          <h2>关于我</h2>
        </div>
        <div class="about-copy">
          <p>
            我是一名喜欢创造与分享的普通人，关注技术、设计和生活里细小但有趣的部分。
            建立这个网站，是想为自己的文字和照片留一处安静、长期的空间。
          </p>
          <p>
            目前这里还很简单。未来我会继续增加新的内容，也欢迎你通过文章下方的评论留下想法。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
