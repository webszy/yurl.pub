<template>
  <h1>Home</h1>
  <p>
    <img src="../assets/logo.png" alt="logo" />
  </p>
  <button @click="state.count++">count is: {{ state.count }}</button>

</template>

<script setup>
import { reactive,onMounted } from 'vue'

const state = reactive({ count: 0 })
onMounted(()=>{
  const url = encodeURIComponent('http://admin.gainlikes.me/config/#/config/webBaselineConfig')
  fetch('/api/shorter?url='+url,{method: 'PUT'})
  .then(res=>res.json)
  .then(res=>{
    console.log(res)
  })
})
</script>

<style scoped>
h1,
a {
  color: green;
}
</style>
