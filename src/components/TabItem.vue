<script setup lang="ts">
import { inject, computed, type ComputedRef } from 'vue'
import Button from './Button.vue'

interface TabItemProps {
  value: string
}

const props = defineProps<TabItemProps>()

const tabContext = inject<{
  selected: ComputedRef<string>
  select: (value: string) => void
}>('tabContext', {
  selected: computed(() => ''),
  select: () => {},
})

const isSelected = computed(() => tabContext.selected.value === props.value)
const onSelect = () => tabContext.select(props.value)
</script>

<template>
  <Button :theme="isSelected ? 'primary' : 'dark'" size="small" @click="onSelect">
    <slot />
  </Button>
</template>
