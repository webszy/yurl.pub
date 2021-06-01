<template>
  <header class="w-full flex items-center justify-start box-border">
    <a class="height:100%;"></a>
    <router-link class="h-full" to="/" tag="a">Yurl<span>.</span>pub</router-link>
  </header>
  <main class="flex-center flex-col">
    <h1>try a easy way to zip <span>Y</span>our <span>URL</span></h1>
    <transition
        enter-active-class="animated faster fadeInUp"
        leave-active-class="animated faster fadeOutDown"
    >
      <console-frm v-if="showConsole"/>
    </transition>

  </main>
</template>

<script setup>
import { ref,onMounted,defineAsyncComponent,nextTick } from 'vue'
const consoleFrm = defineAsyncComponent(() => import(`../components/console.vue`))
const showConsole = ref(false)
onMounted(()=>{
  nextTick(()=>{showConsole.value = true})
  window.addEventListener('paste', (e)=>{
    const paste = (e.clipboardData || window.clipboardData).getData('text')
    const reg = /(http(s?):)([/|.|\w|\s|-])*/
    if(reg.test(paste)){
      const url = encodeURIComponent(paste)
      fetch('/api/shorter?url='+url,{method: 'PUT'})
          .then(res=>res.json)
          .then(res=>{
            console.log(res)
          })
    } else {

    }
  })
})
</script>

<style scoped>
header{
  height: 56px;
  padding-left: 60px;
}
header a{
  font-size: 44px;
  font-weight: 900;
  font-family: 'Anton', sans-serif;
  letter-spacing: 6px;
  color:#551a8b;
}
header span{
  color:salmon;
}
main{
  padding-top:60px;
}
main h1{
  font-family: 'Mate SC', serif;
  font-size:36px;
  margin-bottom:40px;
}
main h1 span{
  color:salmon;
}

</style>
