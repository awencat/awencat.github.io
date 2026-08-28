# Awenio Personal Site

一个结构简洁、可直接部署到 GitHub Pages 的 Vue 3 个人网页。

## 功能

- 主页：左上角头像、自我介绍、自动相册和联系方式
- 相册：按文件名顺序自动读取 `src/assets/gallery/` 下的全部图片，并支持横向滑动
- 文章栏：简洁的内置 Markdown 文章列表
- 文章详情：使用 `MdPreview` 展示 Markdown，并提供本地评论区
- 未来页面：用于后续功能开发的占位空间
- GitHub Pages：Hash 路由和 GitHub Actions 自动部署

> 评论保存在浏览器 `localStorage` 中，不会同步给其他访客。项目内置文章需要提交 Markdown 文件并重新部署。

## 本地开发

```bash
npm install
npm run dev
```

测试与构建：

```bash
npm test -- --run
npm run build
```

## 添加内置文章

1. 在 `src/content/articles/` 新建 Markdown 文件。
2. 在 `src/content/articles.js` 中导入文件并添加到 `builtinArticles`。
3. 建议使用以下 frontmatter：

```md
---
title: 文章标题
date: 2026-08-28
summary: 一段简短摘要
cover: ./images/gallery-1.svg
---

# 正文标题
```

## 自定义内容

- 主页文字：`src/views/HomeView.vue`
- 头像：`public/images/avatar.svg`
- 相册：`src/assets/gallery/`，文件按自然文件名顺序展示
- 站点样式：`src/styles/main.css`
- 站点名称与导航：`src/components/SiteHeader.vue`

## 部署到 GitHub Pages

1. 把项目推送到 GitHub 仓库的 `main` 分支。
2. 在仓库 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。
3. 推送后等待 `Deploy to GitHub Pages` 工作流完成。

Vite 使用相对资源路径，Vue Router 使用 Hash 模式，因此用户站点和项目站点都无需额外配置仓库名。
