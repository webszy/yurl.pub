<template>
  <header class="w-full flex items-center justify-start box-border">
    <router-link class="h-full" to="/" tag="a">Yurl<span>.</span>pub</router-link>
  </header>
  <main class="flex-center flex-col">
    <h1>Try a easy way to zip <span>Y</span>our <span>URL</span></h1>
    <transition
        enter-active-class="animated faster fadeInUp"
        leave-active-class="animated faster fadeOutDown"
    >
      <console-frm v-if="showConsole"/>
    </transition>
    <s-table :list="list" v-if="list.length"/>
  </main>
  <a href="https://github.com/webszy/yurl.pub" target="_blank" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#70B7FD; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
</template>

<script setup>
import { ref,onMounted,defineAsyncComponent,nextTick,reactive,watch,toRaw } from 'vue'
const consoleFrm = defineAsyncComponent(() => import('../components/console.vue'))
const STable = defineAsyncComponent(() => import('../components/table.vue'))
import { ElMessage,ElMessageBox } from 'element-plus';
import { copyText } from 'vue3-clipboard'
function isUrl (url) {
  const reg = /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/
  const result = reg.test(url)
  console.log('testURL',url,'    ',result)
  return result
}
const list = reactive([])
const showConsole = ref(false)
const hasRequestOnce=ref(false)
const getId = url=> fetch(`${import.meta.env.VITE_APP_APIURL}/yurl?url=${url}`,{method: 'POST'})
      .then(res=>res.json())
      .then(res=>{
        debugger
        if(res.code === 200){
          hasRequestOnce.value =true
          const shortId = res.data.shortId
          const yourUrl = `${window.location.origin}/${shortId}`
          updateList({origin:url,shorted:yourUrl})
          copyText(yourUrl,undefined,(error,event)=>{
            if(error){
              ElMessageBox.alert(`Your URL is ${yourUrl}`,'Copy Failed')
            } else {
              ElMessage.success('Your URL Copied')
            }
          })
        } else {
          const yourUrl = `${window.location.origin}/${res.data.id}`
          updateList({origin:url,shorted:yourUrl})
          copyText(yourUrl,undefined,(error,event)=>{
            if(error){
              ElMessageBox.alert(`Your URL is ${yourUrl}`,'Copy Failed')
            } else {
              ElMessage.success('Your URL Copied')
            }
          })
        }
      })
const updateList = (obj)=>{
  const links = list.map(e=>e.shorted)
  if(!links.includes(obj.shorted)){
    obj.origin = decodeURIComponent(obj.origin)
    list.push(obj)
  }
}
const getSavedList = () =>{
  if(localStorage.getItem('list')){
    try{
      const listData = JSON.parse(localStorage.getItem('list'))
      if(listData.length>0&&listData[0].shorted&&listData[0].shorted!==''){
        listData.forEach(item=>{list.push(item)})
      }
    }catch (e) {
      console.error(e)
    }
  }
}
onMounted(()=>{
  window.isUrl = isUrl
  nextTick(()=>{
    showConsole.value = true
    setTimeout(getSavedList,1000)
  })
  window.addEventListener('paste', (e)=>{
    if(e.target.tagName === 'INPUT'){return}
    const paste = (e.clipboardData || window.clipboardData).getData('text')
    if(isUrl(paste)&&paste.indexOf(window.location.origin)<0){
      const url = encodeURIComponent(paste)
      getId(url)
    } else {
      ElMessage.info('please copy a correct url address')
    }
  })
  const timer = setTimeout(()=>{
    if(!hasRequestOnce.value){
      ElMessageBox.prompt('Please enter your url which want be shorted', {
        iconClass:'el-icon-link',
      })
      .then(({value})=>{
        if(isUrl(value)&&value.indexOf(window.location.origin)<0){
          getId(value)
        } else {
          ElMessage.info('please enter a correct url address')
        }
      })
      .catch(()=>{
        clearInterval(timer)
      })
    } else {
      clearInterval(timer)
    }
  },10*1000)
})
watch(list,()=>console.log(toRaw(list)))
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
.github-corner:hover .octo-arm{
  animation:octocat-wave 560ms ease-in-out
}
@keyframes octocat-wave{
  0%,100%{transform:rotate(0)}
  20%,60%{transform:rotate(-25deg)}
  40%,80%{transform:rotate(10deg)}
}
@media (max-width:500px){
  .github-corner:hover .octo-arm{
    animation:none
  }
  .github-corner .octo-arm{
    animation:octocat-wave 560ms ease-in-out
  }
}

</style>
