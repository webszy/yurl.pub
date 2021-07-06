<template>
    <router-view />
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
  if (window.sessionStorage.getItem('redirect')) {
    const redirect = window.sessionStorage.getItem('redirect')
    window.sessionStorage.removeItem('redirect')
    router.push(redirect)
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
