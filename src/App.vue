<script setup lang="ts">
import { ref } from 'vue'
import { getPriorityLabel } from './lib/Todo'

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
import Textarea from './components/Textarea.vue'

const todos = ref([
  { id: 1, title: '할 일 1', description: '할 일 1 내용', date: '2025-10-28', priority: 'high' },
  { id: 2, title: '할 일 2', description: '할 일 2 내용', date: '2025-10-29', priority: 'medium' },
  { id: 3, title: '할 일 3', description: '할 일 3 내용', date: '2025-10-30', priority: 'low' },
  { id: 4, title: '할 일 4', description: '할 일 4 내용', date: '2025-10-31', priority: 'high' },
  { id: 5, title: '할 일 5', description: '할 일 5 내용', date: '2025-11-01', priority: 'medium' },
  { id: 6, title: '할 일 6', description: '할 일 6 내용', date: '2025-11-02', priority: 'low' },
  { id: 7, title: '할 일 7', description: '할 일 7 내용', date: '2025-11-03', priority: 'high' },
  { id: 8, title: '할 일 8', description: '할 일 8 내용', date: '2025-11-04', priority: 'medium' },
  { id: 9, title: '할 일 9', description: '할 일 9 내용', date: '2025-11-05', priority: 'low' },
  { id: 10, title: '할 일 10', description: '할 일 10 내용', date: '2025-11-06', priority: 'high' },
  {
    id: 11,
    title: '할 일 11',
    description: '할 일 11 내용',
    date: '2025-11-07',
    priority: 'medium',
  },
  { id: 12, title: '할 일 12', description: '할 일 12 내용', date: '2025-11-08', priority: 'low' },
  { id: 13, title: '할 일 13', description: '할 일 13 내용', date: '2025-11-09', priority: 'high' },
  {
    id: 14,
    title: '할 일 14',
    description: '할 일 14 내용',
    date: '2025-11-10',
    priority: 'medium',
  },
  { id: 15, title: '할 일 15', description: '할 일 15 내용', date: '2025-11-11', priority: 'low' },
  { id: 16, title: '할 일 16', description: '할 일 16 내용', date: '2025-11-12', priority: 'high' },
  {
    id: 17,
    title: '할 일 17',
    description: '할 일 17 내용',
    date: '2025-11-13',
    priority: 'medium',
  },
])
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
      <Input type="text" placeholder="할 일을 입력하세요" />
      <Textarea placeholder="할 일 내용을 입력하세요" />
      <Input type="date" />
    </template>
    <template #footer>
      <Button>등록</Button>
    </template>
  </Card>

  <Spacing :size="30" />

  <div v-for="(todo, index) in todos" :key="index">
    <ListRow withPadding>
      <template #contents>
        <Badge status="warning" size="small">{{ getPriorityLabel(todo.priority) }}</Badge>
        <Spacing :size="10" />
        <ListRowTexts :top="todo.title" :middle="todo.description" :bottom="todo.date" />
      </template>
      <template #right>
        <div style="display: flex; gap: 3px">
          <Button size="small">수정</Button>
          <Button theme="dark" size="small">삭제</Button>
        </div>
      </template>
    </ListRow>
    <Border v-if="index !== todos.length - 1" />
  </div>
</template>
