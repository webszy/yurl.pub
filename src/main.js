import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from './router'
import './assets/css/reset.css'
import './assets/css/utils.css'
// import ElementPlus from 'element-plus';
// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
import {ElTable,ElTableColumn,ElButton} from 'element-plus'
export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  app.use(router)
  app.use(ElTable)
  app.use(ElTableColumn)
  app.use(ElButton)
  // app.use(ElementPlus)
  return { app, router }
}
