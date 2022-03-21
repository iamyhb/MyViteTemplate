<template>
  <h1>{{ store.count }}</h1>
  <button @click="linkTo">to about</button>
</template>

<script setup lang="ts">
// import { Router, useRouter } from 'vue-router'
import { useCounterStore } from '../store/store'

// const router: Router = useRouter()
const linkTo = () => {
  store.increment()
  // router.push({
  //   path: '/about'
  // })
}

const store = useCounterStore()
</script>

<style scoped></style>
