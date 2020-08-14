/**原生 js实现 lazyLoad**/
<template>
  <div class="box" >
     <md-swiper :autoplay="0">
      <md-swiper-item  v-for="(item,index) in list" :key="index" >
        <div style="width:100%;height:100px;" class="lazy-1 lazy-2 lazy-3" v-itemLazy>
          {{item}}
        </div>
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script type="text/javascript">
import itemLazy from '@/directive/itemLazy';
import {Swiper,SwiperItem} from 'mand-mobile';
export default {
  data() {
    return {
      list:[...new Array(7)].map((i,j)=>new Date(Date.now()+j*1000*60*60*24).toLocaleDateString())
    }
  },
  components: {
    [Swiper.name]:Swiper,
    [SwiperItem.name]:SwiperItem,
  },
  created(){

  },
  mounted(){
    
  },
  updated(){

  },
  directives:{
    'itemLazy':itemLazy
  },
  methods:{

  }
}
</script>

<style lang="stylus" scoped>
.box{
  height:auto;
}
.md-swiper-item{
  width:100%;
  height:100px;
  line-height :100px;
  text-align :center;
  background:#a12389;
}
</style>