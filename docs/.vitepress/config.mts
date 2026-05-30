import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'CCNA用語集',
  description: 'CCNA学習でよく出るネットワーク用語を整理するサイト',
  base: '/ccna/',
  lang: 'ja-JP',
  themeConfig: {
    nav: [],
    sidebar: false,
    search: {
      provider: 'local'
    }
  }
})
