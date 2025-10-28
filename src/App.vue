<script setup lang="ts">
import ListHeader from './components/ListHeader.vue'
import ListRow from './components/ListRow.vue'
import ListRowTexts from './components/ListRowTexts.vue'
import Button from './components/Button.vue'
import Badge from './components/Badge.vue'
</script>

<template>
  <ListHeader title="할 일 목록" />
  <ListRow withPadding>
    <template #contents>
      <Badge status="warning" size="small">높음</Badge>
      <ListRowTexts
        top="할 일 1"
        middle="할 일 1 내용할 일 1 내용할 일 1 내용할 일 1 내용할 일 1 내용할 일 1 내용할 일 1 내용할 일 1 내용"
        bottom="2025년 10월 28일 오후 10시 00분"
      />
    </template>
    <template #right>
      <div style="display: flex; gap: 3px">
        <Button size="small">수정</Button>
        <Button theme="dark" size="small">삭제</Button>
      </div>
    </template>
  </ListRow>
</template>

<style scoped></style>
