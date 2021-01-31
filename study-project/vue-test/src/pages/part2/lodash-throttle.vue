<template>
  <div>
    <div>测试lodash.throttle</div>
    <div>
      <button @click="doIt">触发事件</button>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";
export default {
  name: "lodash-throttle",
  methods: {
    doIt: lodash.throttle(function() {
      console.log(666);
    }, 1000)
  }
};
</script>

<style>
</style>