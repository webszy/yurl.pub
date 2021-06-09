<template>
  <div class="table">
    <el-table :data="list" style="width: 100%">
      <el-table-column label="Your URL" width="400" prop="shorted" />
      <el-table-column label="Action" width="200">
        <template #default="scope">
          <el-button type="primary" @click.stop="handleCopy(scope.row.shorted)">Copy</el-button>
          <el-button type="primary" @click.stop="handleSave(scope.row)">Save</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {defineComponent,toRaw} from 'vue'
import { copyText } from 'vue3-clipboard'
import {ElMessage, ElMessageBox} from "element-plus"
export default defineComponent({
  name: "Table",
  inheritAttrs:false,
  setup(props,ctx){
    console.log('tableProps',props,ctx)
    const handleCopy = (url)=>{
      copyText(url,undefined,(error,event)=>{
        if(error){
          ElMessageBox.alert(`Your URL is ${url}`,'Copy Failed')
        } else {
          ElMessage.success('Your URL Copied')
        }
      })
    }
    const handleSave = (row)=>{
      const data = toRaw(row)
      const list = localStorage.getItem('list') || '[]'
      const lastData = JSON.parse(list)
      if(lastData.some(e=>e.shorted === data.shorted)){
        ElMessage.info('Your URL is already saved')
      } else {
        lastData.push(data)
        localStorage.setItem('list',JSON.stringify(lastData))
        ElMessage.success('Your URL is saved in local')
      }
    }
    return {
      list:ctx.attrs.list,
      handleCopy,
      handleSave
    }
  }
})
</script>

<style scoped>
  .table{
    width: 600px;
    max-width: 600px;
    padding-top: 50px;
  }
  .table:deep(.el-table .el-table__row){
    user-select: text;
  }
</style>
