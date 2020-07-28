/****/
<template>
  <div class="">
    <base-slot-layout>
      <template v-slot:header>
        <h1>here might be a title</h1>
      </template>
      <p>a graph for main content</p>
      <p>And another one.</p>
      <!-- 更明确地做法是加上默认插槽 -->
      <!-- <template v-slot:default>
        <p>a graph for main content</p>
        <p>And another one.</p>
      </template> -->
      <!-- 任何没有被包裹在带有v-slot的<template>中的内容都会被视为默认插槽的内容 -->
      <template v-slot:footer>
        Here's some contact info.
      </template>
    </base-slot-layout>
    <div>-------------------------------分割线-------------------------------------</div>
    <h2>v-slot传参</h2>
    <current-user>
      <template v-slot:default="slotProps">
        {{slotProps.user.lastName}} <!--替换默认的firstName-->
      </template>
    </current-user>
    <h4>独占默认插槽的缩写语法</h4>
    <current-user v-slot="slotProps">
      {{slotProps.user.lastName}} <!--替换默认的firstName-->
    </current-user>
    <h4>解构插槽Prop</h4>
    <current-user v-slot="{user}">
      {{user.lastName}}
    </current-user>
    <h5>prop重命名</h5>
    <current-user v-slot="{user:person}">
      {{person.lastName}}
    </current-user>
    <h5>定义后备内容，用于插槽prop（user1）是undefined的情形</h5>
    <current-user>
      <template v-slot="{ user1 = { lastName: '二哈' } }">
        {{ user1.lastName }}
      </template>
    </current-user>
    <h5>动态插槽名（2.6.0新增）</h5>
    <current-user>
      <template v-slot:[dynamicSlotName]>
        动态插槽first自定义内容
      </template>
    </current-user>
    <h5>v-slot缩写</h5>
    <p>v-slot:header缩写为#header</p>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      dynamicSlotName:'first'
    }
  },
  components: {

  },
  created(){

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