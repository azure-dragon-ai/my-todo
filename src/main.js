import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './styles/index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Check for saved dark mode preference
const savedTheme = localStorage.getItem('darkMode')
if (savedTheme === 'true') {
  document.documentElement.classList.add('dark')
}

app.mount('#app')
