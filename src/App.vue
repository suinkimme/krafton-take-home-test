<script setup lang="ts">
import { ref } from 'vue'
import { getPriorityLabel, getPriorityBadgeStatus, type Priority } from './lib/Todo'

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

const editingStates = ref(new Map<number, boolean>())
const editingTodos = ref(
  new Map<
    number,
    { id: number; title: string; description: string; date: string; priority: Priority }
  >(),
)

const toggleEdit = (id: number) => {
  const currentState = editingStates.value.get(id) || false
  if (!currentState) {
    // 편집 모드 시작 - 현재 todo 데이터를 임시 저장
    const todo = todos.value.find((t) => t.id === id)
    if (todo) {
      editingTodos.value.set(id, { ...todo, priority: todo.priority as Priority })
    }
  } else {
    // 편집 모드 종료 - 임시 데이터 삭제
    editingTodos.value.delete(id)
  }
  editingStates.value.set(id, !currentState)
}

const saveTodo = (id: number) => {
  const editingTodo = editingTodos.value.get(id)
  if (editingTodo) {
    // todos 배열에서 해당 todo 찾아서 업데이트
    const index = todos.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      todos.value[index] = { ...editingTodo }
    }
    // 편집 모드 종료
    editingStates.value.set(id, false)
    editingTodos.value.delete(id)
  }
}

const cancelEdit = (id: number) => {
  // 편집 모드 종료 (변경사항 저장하지 않음)
  editingStates.value.set(id, false)
  editingTodos.value.delete(id)
}

const priority = ref<Priority>('medium')

const handlePriorityChange = (value: Priority) => {
  priority.value = value
}
</script>

<template>
  <ListHeader title="할 일 목록" />
  <Card>
    <template #header>
      <Tab
        :model-value="priority"
        @update:model-value="(value: string) => handlePriorityChange(value as Priority)"
      >
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
    <ListRow withPadding v-if="!editingStates.get(todo.id)">
      <template #contents>
        <Badge :status="getPriorityBadgeStatus(todo.priority as Priority)" size="small">{{
          getPriorityLabel(todo.priority as Priority)
        }}</Badge>
        <Spacing :size="10" />
        <ListRowTexts :top="todo.title" :middle="todo.description" :bottom="todo.date" />
      </template>
      <template #right>
        <div style="display: flex; gap: 3px">
          <Button size="small" @click="toggleEdit(todo.id)"> 수정 </Button>
          <Button theme="dark" size="small">삭제</Button>
        </div>
      </template>
    </ListRow>

    <Card v-else style="margin: 16px 0">
      <template #header>
        <Tab
          :model-value="editingTodos.get(todo.id)?.priority as Priority"
          @update:model-value="
            (value: string) => {
              const editingTodo = editingTodos.get(todo.id)
              if (editingTodo) {
                editingTodo.priority = value as Priority
              }
            }
          "
        >
          <TabItem value="high">높음</TabItem>
          <TabItem value="medium">보통</TabItem>
          <TabItem value="low">낮음</TabItem>
        </Tab>
      </template>
      <template #content>
        <Input
          type="text"
          :model-value="editingTodos.get(todo.id)?.title"
          @update:model-value="
            (value: string) => {
              const editingTodo = editingTodos.get(todo.id)
              if (editingTodo) {
                editingTodo.title = value
              }
            }
          "
          placeholder="할 일을 입력하세요"
        />
        <Textarea
          :model-value="editingTodos.get(todo.id)?.description"
          @update:model-value="
            (value: string) => {
              const editingTodo = editingTodos.get(todo.id)
              if (editingTodo) {
                editingTodo.description = value
              }
            }
          "
          placeholder="할 일 내용을 입력하세요"
        />
        <Input
          type="date"
          :model-value="editingTodos.get(todo.id)?.date"
          @update:model-value="
            (value: string) => {
              const editingTodo = editingTodos.get(todo.id)
              if (editingTodo) {
                editingTodo.date = value
              }
            }
          "
        />
      </template>
      <template #footer>
        <div style="display: flex; gap: 8px">
          <Button @click="saveTodo(todo.id)">저장</Button>
          <Button theme="dark" @click="cancelEdit(todo.id)">취소</Button>
        </div>
      </template>
    </Card>

    <Border v-if="index !== todos.length - 1" />
  </div>
</template>
