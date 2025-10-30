import type { Priority } from './Todo'

export interface TodoItem {
  id: string
  title: string
  description: string
  date: string
  priority: Priority
  completed: boolean
}

const STORAGE_KEY = 'todos'

/**
 * localStorage에서 todos 데이터를 가져옵니다
 */
export const loadTodos = (): TodoItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as Array<any>
      // 기존에 숫자 id로 저장된 경우를 대비해 문자열로 정규화
      return parsed.map((item) => ({
        ...item,
        id: String(item.id),
      }))
    }
  } catch (error) {
    console.error('Failed to load todos from localStorage:', error)
  }
  return []
}

/**
 * localStorage에 todos 데이터를 저장합니다
 */
export const saveTodos = (todos: TodoItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch (error) {
    console.error('Failed to save todos to localStorage:', error)
  }
}

/**
 * 새로운 todo를 추가합니다
 */
export const addTodo = (
  todos: TodoItem[],
  newTodo: Omit<TodoItem, 'id' | 'completed'>,
): TodoItem[] => {
  const id =
    globalThis.crypto?.randomUUID?.() ??
    (() => {
      const bytes = new Uint8Array(16)
      if (globalThis.crypto?.getRandomValues) {
        globalThis.crypto.getRandomValues(bytes)
      } else {
        for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256)
      }
      return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    })()
  const todo: TodoItem = {
    ...newTodo,
    id,
    completed: false,
  }
  const updatedTodos = [...todos, todo]
  saveTodos(updatedTodos)
  return updatedTodos
}

/**
 * 기존 todo를 업데이트합니다
 */
export const updateTodo = (
  todos: TodoItem[],
  id: string,
  updates: Partial<Omit<TodoItem, 'id'>>,
): TodoItem[] => {
  const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
  saveTodos(updatedTodos)
  return updatedTodos
}

/**
 * todo를 삭제합니다
 */
export const deleteTodo = (todos: TodoItem[], id: string): TodoItem[] => {
  const updatedTodos = todos.filter((todo) => todo.id !== id)
  saveTodos(updatedTodos)
  return updatedTodos
}

/**
 * todo의 완료 상태를 토글합니다
 */
export const toggleTodoComplete = (todos: TodoItem[], id: string): TodoItem[] => {
  return updateTodo(todos, id, { completed: !todos.find((t) => t.id === id)?.completed })
}
