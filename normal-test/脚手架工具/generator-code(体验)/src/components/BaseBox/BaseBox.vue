<template>
  <div class="BaseBox_container">
    <h1>Hello{{ str }}</h1>
    <button @click="handleStrChange">Change Hello</button>
  </div>
</template>

<script>
/**
 * @file BaseBox
 */
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'BaseBox',
  setup() {
    const str = ref('World');

    /**
     * @function ChangeStr
     * @description handle str change
     */
    const handleStrChange = () => {
      str.value = 'Vue';
    };

    return {
      str,
      handleStrChange,
    };
  },
});
</script>

<style lang="less">
.BaseBox {
  &_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
