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

const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      // Tab 컴포넌트에서 제공하는 키보드 네비게이션 필요
      break
    case 'ArrowRight':
      event.preventDefault()
      // Tab 컴포넌트에서 제공하는 키보드 네비게이션 필요
      break
    case 'Home':
      event.preventDefault()
      // 첫 번째 탭으로 이동
      break
    case 'End':
      event.preventDefault()
      // 마지막 탭으로 이동
      break
  }
}
</script>

<template>
  <Button
    :theme="isSelected ? 'primary' : 'dark'"
    size="small"
    :aria-label="`${$slots.default?.()?.[0]?.children || props.value} 우선순위`"
    :aria-selected="isSelected ? 'true' : 'false'"
    role="tab"
    :tabindex="isSelected ? 0 : -1"
    @click="onSelect"
    @keydown="handleKeyDown"
  >
    <slot />
  </Button>
</template>
