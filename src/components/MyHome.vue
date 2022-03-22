<template>
  <!--  <h1>{{ store.count }}</h1>-->
  <!--  <button @click="linkTo">to about</button>-->
  <header radius5>CSS架构</header>
  <a href="https://www.baidu.com">ssss</a>
  <c-row>
    <c-col span="8">1111</c-col>
    <c-col span="8">2222</c-col>
    <c-col span="8">3333</c-col>
  </c-row>
  <c-layout></c-layout>
  <c-box-center style="width: 200px; height: 200px">123</c-box-center>
</template>

<script setup lang="ts">
// // import { Router, useRouter } from 'vue-router'
// import { useCounterStore } from '../store/store'
//
// // const router: Router = useRouter()
// const linkTo = () => {
//   store.increment()
//   // router.push({
//   //   path: '/about'
//   // })
// }
//
// const store = useCounterStore()
</script>

<style scoped lang="scss">
header {
  width: 200px;
  height: 200px;
  @include box-center(center, center);
  @include t-color-primary('background');
}
</style>
