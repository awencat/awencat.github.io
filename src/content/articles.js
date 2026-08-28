import welcomeRaw from './articles/welcome.md?raw'
import notesRaw from './articles/notes.md?raw'
import { parseMarkdownArticle } from '../services/articleStore.js'

export const builtinArticles = [
  parseMarkdownArticle(welcomeRaw, { id: 'welcome' }),
  parseMarkdownArticle(notesRaw, { id: 'small-notes' }),
]
