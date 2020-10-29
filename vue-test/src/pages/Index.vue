<template>
  <div>
    <h3>测试入口</h3>
    <div class="menus">
      <div ref="menuItem" :class="{'no-mgRight':(index+1)%6===0}" v-for="(item,index) in routeList" :key="index" class="menu-item" :style="`color:#${randomColor};`" @click="toRouter(item.path)" >
        <span>{{item.info}}</span>
        <img class="menu-icon" src="@/assets/images/image1.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'index',
  components: {
  },
  data () {
    return {
      randomColor: Math.ceil(Math.random() * 1000000),
      routeList:[]
    }
  },
  methods: {
    toRouter (router) {
      this.$router.push(router)
    },
    getData () {
      myAxios.get('random?auth=null').then(res => {
        console.log(res)
      })
    },
    getPageList(){
      const requireComponent=require.context('.',true,/^((?!Index).)*\.vue$/);//匹配不包含Index的以.vue结尾的
      requireComponent.keys().forEach(fileName =>{
        const config=requireComponent(fileName);
        const fileNameFormat=fileName.split('/').pop().replace(/\.\w+$/,'');
        this.routeList.push({
          path:'/'+(config.default.name||fileNameFormat),
          info:config.default.name||fileNameFormat
        })
      })
    }
  },
  mounted () {
    this.getData()
    this.getPageList()
    this.$nextTick(_=>{
      console.log('menuItem',this.$refs.menuItem[1])
    })
    
  }
}

</script>

<style lang="stylus">
h3{
  text-align:center;
}
@media screen and (max-width:600px){
  body{
    background:#85ce61;
  } 
}
@media screen and (min-width:600px) and (max-width:1200px){
  body{
    background:#dbbb63;
  }
}
@media screen and (min-width:1200px) {
  body{
    background:#72ced4;
  }
}
.menus{
  display:flex;
  flex-wrap:wrap;
  word-break:break-all;
}
.menu-item{
  display:flex;
  flex-direction: column;
  align-items: center;
  cursor:pointer;
  margin-right:20px;
  text-align:center;
  &.no-mgRight{
    margin-right: 0;
  }
}
.menu-item span{
 width:100px;
}
.menu-icon{
  width:40px;
  height:40px;
}
</style>
