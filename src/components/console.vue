<template>
  <div id="window" class="console flex flex-col justify-between">
    <div id="title-bar" class="bar w-full box-border flex">
      <i class="block"></i>
      <i class="block"></i>
      <i class="block"></i>
      <p>Yurl.pub</p>
    </div>
    <div id="show-board" class="board w-full flex-1 box-border"></div>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
export default defineComponent({
  name:'ConsoleFrm',
  mounted() {
    if(window.Printer){
      let str = 'echo Welcome To Yurl.pub!\n'
      str += 'echo This is a tool for zip your long url\n'
      str += 'echo You can paste a long url on the page \n'
      str += 'try now!\n'
      window.Printer.init(str, {
        selector: 'show-board',
        lnStr: 'root@Yurl.pub ~/ # '
      }).print();
    }
  }
})
</script>
<style scoped>
.console {
  width: 600px;
  height: 400px;
  background-color: black;
  box-shadow: 0 0 10px rgb(0 0 0 / 80%);
}
.bar{
  padding:5px;
  font-size: 14px;
  background-color: #333;
  font-family: Consolas, serif;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.bar i{
  width: 14px;
  height:14px;
  border-radius: 50%;
  margin-right: 5px;
}
.bar i:first-of-type{
  background-color:red;
}
.bar i:nth-of-type(2){
  background-color:yellow;
}
.bar i:last-of-type{
  background-color:#00FF00;
  margin-right: 15px;
}
.bar p{
  color:#eee;
}
.board{
  padding: 8px;
  color:#eee;
}
</style>
