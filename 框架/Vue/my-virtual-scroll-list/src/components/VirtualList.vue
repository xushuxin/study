<template>
<div class="viewport" ref="viewport" @scroll="scrollFn">
  <!-- 自己做一个滚动条 -->
  <div class="scroll-bar" ref="scrollBar"></div>
  <div class="scroll-list" :style="{transform:`translate3d(0,${offset}px,0)`}">
    <div v-for="item in visibleData" :key="item.id" :vid="item.id" ref="items">
      <slot :item="item"></slot>
    </div>
  </div>
</div>
</template>

<script>
import throttle from 'lodash/throttle';
export default {
  name: "VirtualList",
  props: {
    size: Number, //当前每一项的高度
    remain: Number, //可见多少个
    items: Array, //总的数据
    variable: Boolean //列表项高度是否不固定，默认false
  },
  data() {
    return {
      start: 0,
      end: this.remain,
      offset: 0
    };
  },
  computed: {
    //渲染三屏幕
    prevCount() {
      //前面预留几个
      //滚动到超过一屏显示之前，只需要预留滚过的元素，后续固定为remain个
      return Math.min(this.start, this.remain);
    },
    nextCount() {
      //后面预留几个
      //滚动到最后一屏显示之前，默认预留一屏，最后一屏时剩余几个则预留几个
      return Math.min(this.remain, this.items.length - this.end);
    },
    //通过开始和结束索引，计算出可见的数据列表
    visibleData() {
      //开始和结束索引从与预留项开始
      let start = this.start - this.prevCount;
      let end = this.end + this.prevCount;
      return this.items.slice(start, end);
    }
  },
  created() {
    //节流后的函数
    this.scrollFn = throttle(this.handleScroll, 200, {
      leading: false
    })
  },
  mounted() {
    //设置视口的高度为：可见个数*每一项的高度
    this.$refs.viewport.style.height = this.size * this.remain + "px";
    //设置滚动条的高度为总条数*每一项的高度
    this.$refs.scrollBar.style.height =
      this.items.length * this.size + "px";

    //如果加载完毕，我需要缓存每一项的高度
    this.cacheList(); //先记录好，等一会滚动时，渲染页面时获取真实dom的高度，来更新缓存的内容,重新计算滚动条的高度
  },
  updated() {
    //页面渲染完成后，需要根据当前展示的数据库，更新缓存区的内容
    console.log('数据更新，视图重新渲染了',this.$refs.items)
    //根据当前显示的更新缓存中的height bottom top，最终更新滚动条的高度
    let nodes = this.$refs.items; //获取真实节点
    if (!(nodes && nodes.length > 0)) {
      return;
    }
    nodes.forEach(node => {
      let {
        height
      } = node.getBoundingClientRect(); //真实高度
      let id = node.getAttribute('vid') - 0;
      let oldHeight = this.positions[id].height;
      let dif = height - oldHeight; //变化的高度
      if (dif) { //如果变化了，修改高度和bottom
        this.positions[id].height = height;
        this.positions[id].bottom = this.positions[id].bottom + dif;

        for (let i = id + 1; i < this.positions.length; i++) {
          this.positions[i].top = this.positions[i - 1].bottom;
          this.positions[i].bottom = this.positions[i].bottom + dif;
        }
      }
    });
    //设置滚动条的高度为列表最后一项的bottom值
    this.$refs.scrollBar.style.height = this.positions[this.positions.length - 1].bottom + 'px';
  },
  methods: {
    cacheList() {
      //缓存每一项的高度、top值、bottom值
      this.positions = this.items.map((item, index) => ({
        height: this.size, //列表项的高度
        top: index * this.size, //列表项顶部距离滚动区域顶部的距离
        bottom: (index + 1) * this.size //列表项底部距离滚动区域顶部的距离
      }));
    },
    getStartIndex(value) { //查找当前滚动到的位置对应的列表项索引
      let start = 0; //开始索引
      let end = this.positions.length - 1; //结束索引
      let temp = null; //记录中间索引
      while (start <= end) {
        let middleIndex = parseInt((start + end) / 2); //中间项的索引
        let middleValue = this.positions[middleIndex].bottom; //中间项的bottom值
        //把查找项的值与中间项进行对比
        if (value === middleValue) {
          //如果查找到，则列表从下一项开始渲染（因为匹配的是bottom的值，代表这一项正好滚过去了）
          return middleIndex + 1;
        } else if (value > middleValue) { //查找项在右边
          start = middleIndex + 1; //从中间索引加1项到结束索引再进行查找
        } else if (value < middleValue) { //查找项在左边
          end = middleIndex - 1; //从开头到中间索引减1项再进行查找
          if (temp === null || temp > middleIndex) {
            temp = middleIndex; //找到范围
          }
        }
      }
      return temp;
    },
    handleScroll() {
      //1.先计算当前滚过去几个了，当前应该从第几个开始显示
      //当前用户滚动的距离
      let scrollTop = this.$refs.viewport.scrollTop;
      if (this.variable) { //列表项高度不固定
        //如果有传递variable，说明要使用二分查找找到对应的记录
        this.start = this.getStartIndex(scrollTop);
        // console.log(this.start);
        this.end = this.start + this.remain; //结束项索引
        //设置偏移量
        this.offset = this.positions[this.start - this.prevCount] ? this.positions[this.start - this.prevCount].top : 0;

      } else { //列表项高度固定
        //2.修改当前渲染列表的开始索引（滚过的距离除以每一项的高度，向下取整）
        this.start = Math.floor(scrollTop / this.size);
        //修改当前渲染的列表的结束索引
        this.end = this.start + this.remain;
        //定位当前可视区域(记录滚过项的个数，使用transform:translate调整偏移位置)
        this.offset = this.start * this.size - this.prevCount * this.size; //需要减去预留项的高度
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.viewport {
  position: relative;
  overflow-y: scroll;
}

.scroll-list {
  // ie11及以上可以尝试使用这种方式，不用去计算
  // position:fixed;
  // pointer-events:none;
  position: absolute;
  top: 0;
  left: 0;
  width:100%;
}
</style>
