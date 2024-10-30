<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <section class="qq">
    <q-header>{{ title }}</q-header>
    <q-main><slot></slot></q-main>
  </section>
</template>

<style lang="scss" scoped>
.qq {
  width: 100%;
  background-color: var(--qq-background-03);
  border-radius: 10px;
  transition: background-color 0.2s;
}
</style>
