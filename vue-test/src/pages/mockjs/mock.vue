/**测试mockjs**/
<template>
  <div class="">
    <div v-for="({key,mockTitle,mockContent,mockAction},index) in dataList" :key="index">
      <span>{{key}}</span>|
      <span>{{mockTitle}}</span>|
      <span>{{mockContent}}</span>|
      <span>{{mockAction}}</span>
    </div>
  </div>
</template>

<script type="text/javascript">
import Mock from "mockjs";
import myAxios from 'js/axios'
export default {
  data() {
    return {
      dataList:[]
    }
  },
  components: {

  },
  created(){
    myAxios.post('/test/DataOne',{}).then(res=>{
      this.dataList=res.dataSource;
      console.log('mock数据',res)
    })
  },
  mounted(){

  },
  updated(){

  },
  methods:{

  }
}
</script>

<style lang="stylus" scoped>
</style>