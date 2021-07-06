<template>
    <router-view />
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

  const l = window.location
  if(window.location.pathname.length>1){
    const path = l.pathname.split('/').slice(0, 1).join('/') + '/' +
        l.pathname.slice(1).split('/').slice(0).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash

    router.replace({path})
  }
</script>
<style>
#app {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color:rgba(239,238,255,1);
  padding-top: 30px;
  box-sizing: border-box;
}
</style>
