<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <header class="list-header">
    <h1 class="title">
      <slot name="title">{{ props.title }}</slot>
    </h1>
  </header>
</template>

<style scoped>
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}
</style>
