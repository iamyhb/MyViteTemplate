<template>
  <div class="c-single-center">
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CSingleCenter'
}
</script>
<script lang="ts" setup></script>

<style scoped lang="scss">
@include b(c-single-center) {
  @include grid($align-items: center);
}
</style>
