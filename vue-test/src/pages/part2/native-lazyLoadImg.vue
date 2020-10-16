/**原生js实现懒加载图片**/
<template>
  <div>
    <md-swiper :autoplay="0">
      <md-swiper-item v-for="(item,index) in imgSrc" :key="index">
        <img class="lazy-load" src="~img/default-image.png" :data-src="item" alt />
      </md-swiper-item>
    </md-swiper>
    <!-- <div class="" v-for="(item,index) in imgSrc" :key="index">
      <img class="lazy-load"  src="~img/default-image.png" :data-src="item" alt="">
    </div>-->
  </div>
</template>

<script type="text/javascript">
import { lazyLoad } from "js/lazyLoadImage.js";
import { Swiper, SwiperItem } from "mand-mobile";
export default {
  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem
  },
  data() {
    return {
      imgSrc: [
        "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg",
        "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2396395246,715775841&fm=26&gp=0.jpg",
        "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=224866248,765861809&fm=26&gp=0.jpg",
        "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2670715487,1547868437&fm=26&gp=0.jpg",
        "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2988957523,3295751190&fm=26&gp=0.jpg",
        "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2698110318,782174384&fm=26&gp=0.jpg",
        "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1102788601,953675482&fm=26&gp=0.jpg",
        "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg",
        "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2396395246,715775841&fm=26&gp=0.jpg",
        "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=224866248,765861809&fm=26&gp=0.jpg",
        "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2670715487,1547868437&fm=26&gp=0.jpg",
        "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2988957523,3295751190&fm=26&gp=0.jpg",
        "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2698110318,782174384&fm=26&gp=0.jpg",
        "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1102788601,953675482&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2004055534,3969071219&fm=26&gp=0.jpg"
      ]
    };
  },
  components: {},
  created() {},
  mounted() {
    lazyLoad({
      preview: 1
    });
  },
  updated() {},
  methods: {}
};
</script>

<style lang="stylus" scoped>
img {
  width: 375px;
  height: 375px;
}
</style>