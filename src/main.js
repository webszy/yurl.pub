import App from './App.vue'
import { createApp } from 'vue'
import { createRouter } from './router'
import './assets/css/reset.css'
import './assets/css/utils.css'
import {ElTable,ElTableColumn,ElButton} from 'element-plus'
const app = createApp(App)
const router = createRouter()
app.use(router)
app.use(ElTable)
app.use(ElTableColumn)
app.use(ElButton)
app.mount('#app')


