<script setup lang="ts">
interface BorderProps {
  height?: number
}

const props = withDefaults(defineProps<BorderProps>(), {
  height: 1,
})
</script>

<template>
  <div class="border" :style="{ height: `${height}px` }" />
</template>

<style scoped>
.border {
  width: 100%;
  background-color: var(--color-border);
  flex-shrink: 0;
}
</style>
