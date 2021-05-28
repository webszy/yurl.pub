import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory
} from 'vue-router'
import * as path from "path";

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('./pages/*.vue')

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase()
  console.log(name)
  let routePath = ''
  if(name === '/home'){
    routePath = '/'
  } else if(name === '/redirect'){
    routePath = '/:redirect'
  } else {
    routePath = name
  }
  return {
    path: routePath,
    component: pages[path] // () => import('./pages/*.vue')
  }
})

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}
