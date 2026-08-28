<script setup>
import { ref } from 'vue'

const galleryRail = ref(null)
const galleryModules = import.meta.glob(
  '../assets/gallery/*.{avif,gif,jpeg,jpg,png,svg,webp}',
  { eager: true, query: '?url', import: 'default' },
)
const gallery = Object.entries(galleryModules)
  .sort(([left], [right]) => left.localeCompare(right, undefined, { numeric: true }))
  .map(([path, src]) => ({
    src,
    alt: path.split('/').pop().replace(/\.[^.]+$/, ''),
  }))

function scrollGallery(direction) {
  const rail = galleryRail.value
  if (!rail) return
  rail.scrollBy({ left: direction * rail.clientWidth * 0.82, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <section class="hero section-shell">
      <div class="hero__copy">
        <p class="eyebrow">Personal notes · 个人笔记</p>
        <h1>你好，我是 Awenio。</h1>
        <p class="hero__lead">
          我用文字记录思考，用照片收藏日常。这里是一份保持简单、持续更新的个人档案。
        </p>
        <div class="hero__actions">
          <RouterLink class="button button--primary" to="/articles">阅读文章</RouterLink>
          <a class="button button--ghost" href="#about">认识我</a>
        </div>
      </div>
    </section>

    <section class="gallery-section section-shell" aria-labelledby="gallery-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Photo archive</p>
          <h2 id="gallery-title">精选图片</h2>
        </div>
        <div class="carousel-controls" aria-label="相册控制">
          <button type="button" aria-label="上一张照片" @click="scrollGallery(-1)">←</button>
          <button type="button" aria-label="下一张照片" @click="scrollGallery(1)">→</button>
        </div>
      </div>
      <div class="gallery-carousel" aria-label="精选图片走马灯">
        <div ref="galleryRail" class="gallery-track">
          <figure
            v-for="(item, index) in gallery"
            :key="item.src"
            class="gallery-item"
            data-gallery-item
          >
          <img :src="item.src" :alt="item.alt" />
            <figcaption>{{ String(index + 1).padStart(2, '0') }} / {{ String(gallery.length).padStart(2, '0') }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section id="about" class="about-section section-shell" aria-label="自我介绍">
      <div class="about-card">
        <div>
          <p class="eyebrow">Profile</p>
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

    <section class="contact-bar" aria-label="联系方式">
      <div class="section-shell contact-bar__inner">
        <div>
          <p class="eyebrow">Contact</p>
          <h2>保持联系</h2>
        </div>
        <dl class="contact-list">
          <div>
            <dt>GitHub</dt>
            <dd><a href="https://github.com/your-name">github.com/your-name</a></dd>
          </div>
          <div>
            <dt>QQ</dt>
            <dd>123456789</dd>
          </div>
        </dl>
      </div>
    </section>
  </div>
</template>
