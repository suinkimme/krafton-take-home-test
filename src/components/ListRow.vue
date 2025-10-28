<script setup lang="ts">
interface ListRowProps {
  withPadding?: boolean
  onClick?: () => void
}

const props = withDefaults(defineProps<ListRowProps>(), {
  withPadding: true,
  onClick: () => {},
})
</script>

<template>
  <div class="list-row" :class="{ 'with-padding': props.withPadding }" @click="props.onClick">
    <!-- 왼쪽 슬롯 -->
    <div class="list-row__left">
      <slot name="left" />
    </div>

    <!-- 가운데 콘텐츠 -->
    <div class="list-row__contents">
      <slot name="contents" />
    </div>

    <!-- 오른쪽 슬롯 -->
    <div class="list-row__right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.list-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.list-row.with-padding {
  padding: 12px 16px;
}

.list-row__left,
.list-row__right {
  display: flex;
  align-items: center;
}

.list-row__contents {
  flex: 1;
  margin: 0 8px;
}
</style>
