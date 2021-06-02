<template>
  <div class="table">
    <el-table :data="list" style="width: 100%">
      <el-table-column label="Your URL" width="400" prop="link" />
      <el-table-column label="Action" width="200">
        <template #default="scope">
          <el-button type="primary" @click.stop="handleCopy(scope.row.link)">Copy</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
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
    return {
      list:ctx.attrs.list,
      handleCopy
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
