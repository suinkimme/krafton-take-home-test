// Priority 상수 정의
export const PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const

// Priority 타입 정의
export type Priority = (typeof PRIORITY)[keyof typeof PRIORITY]

// Priority를 한국어로 변환하는 함수
export const getPriorityLabel = (priority: Priority): string => {
  const priorityMap: Record<Priority, string> = {
    [PRIORITY.HIGH]: '높음',
    [PRIORITY.MEDIUM]: '보통',
    [PRIORITY.LOW]: '낮음',
  }
  return priorityMap[priority]
}
