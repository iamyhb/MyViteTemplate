<template><section class="c-layout" :class="{ 'c-layout--horizontal': horizontal }"></section></template>
<script lang="ts">
export default {
  name: 'CLayout'
}
</script>
<script lang="ts" setup>
interface Props {
  horizontal: boolean
}

withDefaults(defineProps<Props>(), {
  horizontal: false
})
</script>

<style scoped lang="scss">
@include b(c-layout) {
  display: flex;
  flex-direction: column;
  @include m(horizontal) {
    flex-direction: row;
  }
}
</style>
