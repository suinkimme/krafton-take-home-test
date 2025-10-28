<script setup lang="ts">
import { provide, computed } from 'vue'

interface TabProps {
  modelValue: string
  onChange?: (value: string) => void
}

const props = defineProps<TabProps>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const select = (value: string) => {
  emit('update:modelValue', value)
  props.onChange?.(value)
}

provide('tabContext', {
  selected: computed(() => props.modelValue),
  select,
})
</script>

<template>
  <div class="tab">
    <slot />
  </div>
</template>

<style scoped>
.tab {
  display: flex;
  gap: 4px;
}
</style>
