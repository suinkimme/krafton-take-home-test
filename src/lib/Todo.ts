import { createMapper } from './Utils'

export const PRIORITY = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const

export type Priority = (typeof PRIORITY)[keyof typeof PRIORITY]

const priorityLabelMap = {
  [PRIORITY.HIGH]: '높음',
  [PRIORITY.MEDIUM]: '보통',
  [PRIORITY.LOW]: '낮음',
} as const

const priorityBadgeStatusMap = {
  [PRIORITY.HIGH]: 'error',
  [PRIORITY.MEDIUM]: 'warning',
  [PRIORITY.LOW]: 'info',
} as const

export const getPriorityLabel = createMapper(priorityLabelMap)
export const getPriorityBadgeStatus = createMapper(priorityBadgeStatusMap)
