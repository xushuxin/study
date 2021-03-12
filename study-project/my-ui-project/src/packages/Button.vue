<template>
  <button class="zf-button" :class="btnClass" @click="$emit('click',$event)">
    <!-- $slots.default获取插槽内容 -->
    <zf-icon v-if="icon&&!loading" class="icon" :icon="icon"></zf-icon>
    <zf-icon class="icon" v-if="loading" icon="loading"></zf-icon>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button> 
</template>
<script>
  export default{
    name:'zf-button',
    props: {
      type:{
        type:String,
        default:'',
        validator(type){
          const typeList=['warning','success','danger','info','primary'];
          if(type&&typeList.includes(type)){
            console.log('type的类型必须为'+typeList.join('、'));
          }
          return true;
        }
      },
      icon:{
        type:String
      },
      iconPosition:{
        type:String,
        deafult:'left',
        validator(type){
          const typeList=['left','right']
          if(type&&!typeList.includes(type)){
            console.error(`iconPosition属性必须为${typeList.join('或')}`)
          }
          return true;
        }
      },
      loading:{
        type:Boolean,
        default:false
      }
    },
    computed:{
      btnClass(){
        let classList=[];
        let originList=[this.type,this.iconPosition];
        originList.forEach(item=>{
          item&&classList.push(`zf-button-${item}`);
        })
        // this.type&&classList.push(`zf-button-${this.type}`);
        // this.iconPosition&&classList.push(`zf-button-${this.iconPosition}`)
        return classList;
      }
    },
    mounted(){
      //  console.log(this.$slots)
    }
  }
</script>
<style lang="scss" scoped>
@import "../styles/common.scss";
$height:42px;
$font-size:14px;
$color:#606866;
$border-color:#dcdfe6;
$background:#ecf5ff;
$active-color:#3a8ee6;
.zf-button{
  border-radius:$border-radius;
  border:1px solid $border-color;
  color:$color;
  background:#fff;
  height:42px;
  cursor: pointer;
  font-size:$font-size;
  line-height:1;
  padding:12px 20px;
  display:inline-flex;
  justify-content:center;
  vertical-align:middle;
  &:hover{
    border-color:$border-color;
    background:$background;
  }
  &:focus,&:active{
    color:$active-color;
    border:1px solid $active-color;
    background:$background;
    outline:none;
  }
  @each $type,$color in(
    primary:$primary,
    success:$success,
    info:$info,
    warning:$warning,
    danger:$danger
  ){
    &-#{$type}{
      background:#{$color};
      border:1px solid #{$color};
      color:#fff;
      fill:#fff;
    }
  }
  @each $type,$color in(
    primary:$primary-hover,
    success:$success-hover,
    info:$info-hover,
    warning:$warning-hover,
    danger:$danger-hover
  ){
    &-#{$type}:hover{
      background:#{$color};
      border:1px solid #{$color};
      color:#fff;
      fill:#fff;
    }
  }
  @each $type,$color in(
    primary:$primary-active,
    success:$success-active,
    info:$info-active,
    warning:$warning-active,
    danger:$danger-active
  ){
    &-#{$type}:active,&-#{$type}:focus{
      background:#{$color};
      border:1px solid #{$color};
      color:#fff;
      fill:#fff;
    }
  }
  .icon {
    width:14px;
    height:14px;
  }
  &-left{
    svg{
      order:1;
      margin-right:5px;
    }
    span{
      order:2;
    }
  }
  &-right{
    svg{
      order:2;
    }
    span{
      order:1;
      margin-right:5px;
    }
  }
}

</style>

