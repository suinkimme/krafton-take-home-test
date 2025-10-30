<script setup lang="ts">
import { ref } from 'vue'
import { getPriorityLabel, getPriorityBadgeStatus, type Priority } from './lib/Todo'
import { useTodos } from './composables/useTodos'
import type { TodoItem } from './lib/TodoStorage'

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

// localStorage와 연동되는 todos 관리
const {
  todos,
  addTodo: addTodoToStorage,
  updateTodo,
  deleteTodo: deleteTodoFromStorage,
  toggleComplete,
} = useTodos()

const editingStates = ref(new Map<string, boolean>())
const editingTodos = ref(
  new Map<
    string,
    { id: string; title: string; description: string; date: string; priority: Priority }
  >(),
)

const toggleEdit = (id: string) => {
  const currentState = editingStates.value.get(id) || false
  if (!currentState) {
    // 편집 모드 시작 - 현재 todo 데이터를 임시 저장
    const todo = todos.value.find((t: TodoItem) => t.id === id)
    if (todo) {
      editingTodos.value.set(id, { ...todo, priority: todo.priority as Priority })
    }
  } else {
    // 편집 모드 종료 - 임시 데이터 삭제
    editingTodos.value.delete(id)
  }
  editingStates.value.set(id, !currentState)
}

const saveTodo = (id: string) => {
  const editingTodo = editingTodos.value.get(id)
  if (editingTodo) {
    // localStorage를 통해 todo 업데이트
    updateTodo(id, {
      title: editingTodo.title,
      description: editingTodo.description,
      date: editingTodo.date,
      priority: editingTodo.priority,
    })
    // 편집 모드 종료
    editingStates.value.set(id, false)
    editingTodos.value.delete(id)
  }
}

const cancelEdit = (id: string) => {
  // 편집 모드 종료 (변경사항 저장하지 않음)
  editingStates.value.set(id, false)
  editingTodos.value.delete(id)
}

const deleteTodo = (id: string) => {
  // localStorage를 통해 todo 삭제
  deleteTodoFromStorage(id)

  // 편집 상태도 정리
  editingStates.value.delete(id)
  editingTodos.value.delete(id)
}

// 새 todo 등록을 위한 폼 데이터
const newTodo = ref({
  title: '',
  description: '',
  date: '',
  priority: 'medium' as Priority,
})

// 새 todo 등록 함수 (명시적 인자)
const addTodo = (todo: Omit<TodoItem, 'id' | 'completed'>) => {
  if (todo.title.trim() && todo.description.trim()) {
    // localStorage를 통해 새 todo 추가
    addTodoToStorage({
      title: todo.title.trim(),
      description: todo.description.trim(),
      date: todo.date,
      priority: todo.priority,
    })

    // 폼 초기화
    newTodo.value = {
      title: '',
      description: '',
      date: '',
      priority: 'medium',
    }
  }
}

const toggleCompleteTodo = (id: string) => {
  // localStorage를 통해 완료 상태 토글
  toggleComplete(id)
}
</script>

<template>
  <ListHeader title="할 일 목록" />
  <Card>
    <template #header>
      <Tab
        :model-value="newTodo.priority"
        @update:model-value="(value: string) => (newTodo.priority = value as Priority)"
      >
        <TabItem value="high">높음</TabItem>
        <TabItem value="medium">보통</TabItem>
        <TabItem value="low">낮음</TabItem>
      </Tab>
    </template>
    <template #content>
      <Input type="text" v-model="newTodo.title" placeholder="할 일을 입력하세요" />
      <Textarea v-model="newTodo.description" placeholder="할 일 내용을 입력하세요" />
      <Input type="date" v-model="newTodo.date" />
    </template>
    <template #footer>
      <Button aria-label="새 할 일 등록" @click="addTodo(newTodo)">등록</Button>
    </template>
  </Card>

  <Spacing :size="30" />

  <div v-if="todos.length > 0">
    <div v-for="(todo, index) in todos" :key="todo.id">
      <ListRow
        withPadding
        v-if="!editingStates.get(todo.id)"
        :style="{
          textDecoration: todo.completed ? 'line-through' : 'none',
          opacity: todo.completed ? 0.6 : 1,
        }"
        :aria-label="`${todo.completed ? '완료된' : ''} 할 일: ${todo.title}`"
        @click="toggleCompleteTodo(todo.id)"
      >
        <template #contents>
          <Badge :status="getPriorityBadgeStatus(todo.priority as Priority)" size="small">{{
            getPriorityLabel(todo.priority as Priority)
          }}</Badge>
          <Spacing :size="10" />
          <ListRowTexts :top="todo.title" :middle="todo.description" :bottom="todo.date" />
        </template>
        <template #right>
          <div style="display: flex; gap: 3px">
            <Button size="small" aria-label="할 일 수정" @click.stop="toggleEdit(todo.id)">
              수정
            </Button>
            <Button
              theme="dark"
              size="small"
              aria-label="할 일 삭제"
              @click.stop="deleteTodo(todo.id)"
              >삭제</Button
            >
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
            <Button aria-label="수정 내용 저장" @click="saveTodo(todo.id)">저장</Button>
            <Button theme="dark" aria-label="수정 취소" @click="cancelEdit(todo.id)">취소</Button>
          </div>
        </template>
      </Card>

      <Border v-if="index !== todos.length - 1" />
    </div>
  </div>
  <div v-else>
    <p>할 일이 없습니다.</p>
  </div>
</template>
