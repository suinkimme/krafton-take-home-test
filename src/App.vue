<script setup lang="ts">
import { ref } from 'vue'

// components
import ListHeader from './components/ListHeader.vue'
import ListRow from './components/ListRow.vue'
import ListRowTexts from './components/ListRowTexts.vue'
import Button from './components/Button.vue'
import Badge from './components/Badge.vue'
import Spacing from './components/Spacing.vue'
import Tab from './components/Tab.vue'
import TabItem from './components/TabItem.vue'
import Card from './components/Card.vue'
import Border from './components/Border.vue'
import Input from './components/Input.vue'

const priority = ref('medium')

const handlePriorityChange = (value: string) => {
  priority.value = value
}
</script>

<template>
  <ListHeader title="할 일 목록" />
  <Card>
    <template #header>
      <Tab :model-value="priority" @update:model-value="handlePriorityChange">
        <TabItem value="high">높음</TabItem>
        <TabItem value="medium">보통</TabItem>
        <TabItem value="low">낮음</TabItem>
      </Tab>
    </template>
    <template #content>
      <Input type="date" />
      <Input type="text" placeholder="할 일을 입력하세요" />
    </template>
    <template #footer>
      <Button>등록</Button>
    </template>
  </Card>

  <Spacing :size="30" />

  <ListRow withPadding>
    <template #contents>
      <Badge status="warning" size="small">높음</Badge>
      <Spacing :size="10" />
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
  <Border />
</template>

<style scoped></style>
