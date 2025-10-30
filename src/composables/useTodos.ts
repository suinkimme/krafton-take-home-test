import { ref, watch } from 'vue'
import type { TodoItem } from '../lib/TodoStorage'
import {
  loadTodos,
  saveTodos,
  addTodo as addTodoToStorage,
  updateTodo as updateTodoInStorage,
  deleteTodo as deleteTodoFromStorage,
  toggleTodoComplete as toggleTodoCompleteInStorage,
} from '../lib/TodoStorage'

/**
 * localStorage와 연동되는 todos 관리 훅
 */
export const useTodos = () => {
  // 초기 데이터 로드
  const todos = ref<TodoItem[]>(loadTodos())

  // todos가 변경될 때마다 localStorage에 저장
  watch(
    todos,
    (newTodos) => {
      saveTodos(newTodos)
    },
    { deep: true },
  )

  /**
   * 새로운 todo 추가
   */
  const addTodo = (newTodo: Omit<TodoItem, 'id' | 'completed'>) => {
    todos.value = addTodoToStorage(todos.value, newTodo)
  }

  /**
   * 기존 todo 업데이트
   */
  const updateTodo = (id: string, updates: Partial<Omit<TodoItem, 'id'>>) => {
    todos.value = updateTodoInStorage(todos.value, id, updates)
  }

  /**
   * todo 삭제
   */
  const deleteTodo = (id: string) => {
    todos.value = deleteTodoFromStorage(todos.value, id)
    return todos.value
  }

  /**
   * todo 완료 상태 토글
   */
  const toggleComplete = (id: string) => {
    todos.value = toggleTodoCompleteInStorage(todos.value, id)
  }

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  }
}
