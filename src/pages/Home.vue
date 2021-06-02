<template>
  <header class="w-full flex items-center justify-start box-border">
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
import { ElMessage,ElMessageBox } from 'element-plus';
import { copyText } from 'vue3-clipboard'
function isUrl (url) {
  const reg = /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/
  const result = reg.test(url)
  console.log('testURL',url,'    ',result)
  return result
}

const showConsole = ref(false)
const hasRequestOnce=ref(false)
const getId = url=> fetch('/api/shorter?url='+url,{method: 'PUT'})
      .then(res=>res.json())
      .then(res=>{
        if(res.code === 200){
          hasRequestOnce.value =true
          const shortId = res.data.shortId
          const yourUrl = `${window.location.origin}/${shortId}`
          copyText(yourUrl,undefined,(error,event)=>{
            if(error){
              window.Printer.print(yourUrl+'\n')
              ElMessage({
                type:'info',
                message:'copy failed,please remember Your url: '+yourUrl,
                duration:0
              })
            } else {
              ElMessage.success('Your URL Copied')
            }
          })
        } else {
          const yourUrl = `${window.location.origin}/${res.data.id}`
          copyText(yourUrl,undefined,(error,event)=>{
            if(error){
              window.Printer.print(yourUrl+'\n')
              ElMessage({
                type:'info',
                message:'copy failed,please rember Your url: '+yourUrl,
                duration:0
              })
            } else {
              ElMessage.success('Your URL Copied')
            }
          })
        }
      })

onMounted(()=>{
  window.isUrl = isUrl
  nextTick(()=>{showConsole.value = true})
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
