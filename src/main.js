import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'
import './assets/css/reset.css'
import './assets/css/utils.css'
// import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.

export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  app.use(router)
  // app.use(ElementPlus)
  return { app, router }
}
