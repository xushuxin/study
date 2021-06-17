<template>
  <div class="HelloWorld_container">
    <h1>Hello{{ str }}</h1>
    <button @click="handleStrChange">Change Hello</button>
  </div>
</template>

<script lang="ts">
/**
 * @file HelloWorld
 */
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Button } from 'ant-design-vue';

@Component({
  name: 'HelloWorld',
  components: {
    aButton: Button
  }
})

export default class HelloWorld extends Vue {

}
</script>

<style  lang="less" scoped>
</style>

