<script setup lang="ts">
import type { CSSProperties } from 'vue'

interface ListRowTextsProps {
  top?: string
  topProps?: CSSProperties
  middle?: string
  middleProps?: CSSProperties
  bottom?: string
  bottomProps?: CSSProperties
}

const props = defineProps<ListRowTextsProps>()
</script>

<template>
  <div class="list-row-texts">
    <p v-if="props.top" :style="props.topProps" class="list-row-texts__top">{{ props.top }}</p>
    <p v-if="props.middle" :style="props.middleProps" class="list-row-texts__middle">
      {{ props.middle }}
    </p>
    <p v-if="props.bottom" :style="props.bottomProps" class="list-row-texts__bottom">
      {{ props.bottom }}
    </p>
  </div>
</template>

<style scoped>
.list-row-texts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-row-texts p {
  color: var(--color-heading);
  font-weight: 500;
  line-height: 1.4;
  margin: 0;
}

.list-row-texts__top {
  font-size: 16px;
  color: var(--color-heading);
  font-weight: 600;
}

.list-row-texts__middle {
  font-size: 14px;
  color: var(--color-heading);
  font-weight: 500;
}

.list-row-texts__bottom {
  font-size: 12px;
  color: var(--color-text);
  opacity: 0.6;
  font-weight: 400;
}
</style>
