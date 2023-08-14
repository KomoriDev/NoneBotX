<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="fakeqq bg">
    <div v-if="title" class="btnBar">
      <span class="btn red"></span>
      <span class="btn yellow"></span>
      <span class="btn green"></span>
    </div>
    <div v-if="title" class="banner">
      <span class="title">{{ title }}</span>
    </div>
    <div v-else style="height: 8px"></div>
    <div class="list"><slot></slot></div>
  </div>
</template>

<style lang="scss">
@import './fakeqq.scss';
</style>
