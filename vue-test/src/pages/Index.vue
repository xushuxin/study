<template>
  <div>
    <h3>测试入口</h3>
    <div class="menus">
      <div v-for="(item,index) in routeList" :key="index" class="menu-item" :style="`color:#${randomColor};`" @click="toRouter(item.path)" >
        <span>{{item.info}}</span>
        <img class="menu-icon" src="@/assets/images/image1.png" alt="">
      </div>
      <!-- <div class="menu-item" :style="`color:#${randomColor};`" @click="toRouter('/use-slide-del')" >
        <span>移动端左滑删除事件（自己写的）</span>
        <img class="menu-icon" src="@/assets/images/image1.png" alt="">
      </div>
      <div class="menu-item" :style="`color:#${randomColor};`" @click="toRouter('/test-mand-mobile')" >
         <span>测试mand-mobile</span>
        <img class="menu-icon" src="@/assets/images/image1.png" alt="">
      </div>
      <div class="menu-item" :style="`color:#${randomColor};`" @click="toRouter('/lodash-debounce')" >
         <span>测试lodash.debounce</span>
        <img class="menu-icon" src="@/assets/images/image1.png" alt="">
      </div> -->
    </div>
  </div>
</template>

<script>
import myAxios from 'js/axios'
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
      const requireComponent=require.context('.',true,/\.vue$/);
      requireComponent.keys().forEach(fileName =>{
        const config=requireComponent(fileName);
        this.routeList.push({
          path:'/'+config.default.name,
          info:config.default.name
        })
      })
    }
  },
  mounted () {
    console.log('haha', [1, 2, 3].includes(1))
    console.log(this.randomColor)
    // this.getData()
    this.getPageList()
  }
}

</script>

<style lang="css">
.menus{
  display:flex;
  padding:0 40px;
}
.menu-item{
  display:flex;
  flex-direction: column;
  align-items: center;
  cursor:pointer;
  margin-right:20px;
  text-align:center;
}
.menu-item span{
 width:100px;
}
.menu-icon{
  width:40px;
  height:40px;
}
</style>
