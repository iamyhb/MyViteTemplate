<template>
  <div class="c-box-center">
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CBoxCenter'
}
</script>
<script lang="ts" setup></script>

<style scoped lang="scss">
@include b(c-box-center) {
  @include box-center($justify: center, $align: center);
}
</style>
