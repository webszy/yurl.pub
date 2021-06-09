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
const getId = url=> fetch('/api/shorter?url='+url,{method: 'PUT'})
      .then(res=>res.json())
      .then(res=>{
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

</style>
