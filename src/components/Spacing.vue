<script setup lang="ts">
interface SpacingProps {
  /** 간격 크기 (단위: px) */
  size: number
}

const props = defineProps<SpacingProps>()
</script>

<template>
  <div :style="{ height: `${props.size}px` }" class="spacing" />
</template>

<style scoped>
.spacing {
  width: 100%;
  flex-shrink: 0;
}
</style>
