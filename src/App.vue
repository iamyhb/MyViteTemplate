<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  window.document.documentElement.setAttribute('data-theme', 'default')
})
</script>

<style></style>
