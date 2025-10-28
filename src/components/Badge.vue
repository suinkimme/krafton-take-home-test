<script setup lang="ts">
type Status = 'success' | 'warning' | 'error' | 'info' | 'neutral'
type Size = 'small' | 'medium' | 'large'
type StyleType = 'solid' | 'outline' | 'soft'

interface BadgeProps {
  status?: Status
  size?: Size
  styleType?: StyleType
  rounded?: boolean
}

const props = withDefaults(defineProps<BadgeProps>(), {
  status: 'neutral',
  size: 'medium',
  styleType: 'solid',
  rounded: false,
})
</script>

<template>
  <span
    class="badge"
    :class="[
      `badge--status-${props.status}`,
      `badge--size-${props.size}`,
      `badge--style-${props.styleType}`,
      { 'badge--rounded': props.rounded },
    ]"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>

<style scoped>
/* 기본 배지 스타일 */
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  white-space: nowrap;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

/* 크기별 스타일 */
.badge--size-small {
  font-size: 11px;
  padding: 2px 4px;
  border-radius: 4px;
}

.badge--size-medium {
  font-size: 12px;
  padding: 3px 5px;
  border-radius: 6px;
}

.badge--size-large {
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 8px;
}

/* 둥근 모서리 옵션 */
.badge--rounded {
  border-radius: 50px;
}

/* 상태별 색상 정의 - base.css의 전역 변수 사용 */
.badge--status-success {
  --badge-bg: var(--badge-success-bg);
  --badge-bg-soft: var(--badge-success-bg-soft);
  --badge-color: var(--badge-success-color);
  --badge-color-soft: var(--badge-success-color-soft);
  --badge-border: var(--badge-success-border);
}

.badge--status-warning {
  --badge-bg: var(--badge-warning-bg);
  --badge-bg-soft: var(--badge-warning-bg-soft);
  --badge-color: var(--badge-warning-color);
  --badge-color-soft: var(--badge-warning-color-soft);
  --badge-border: var(--badge-warning-border);
}

.badge--status-error {
  --badge-bg: var(--badge-error-bg);
  --badge-bg-soft: var(--badge-error-bg-soft);
  --badge-color: var(--badge-error-color);
  --badge-color-soft: var(--badge-error-color-soft);
  --badge-border: var(--badge-error-border);
}

.badge--status-info {
  --badge-bg: var(--badge-info-bg);
  --badge-bg-soft: var(--badge-info-bg-soft);
  --badge-color: var(--badge-info-color);
  --badge-color-soft: var(--badge-info-color-soft);
  --badge-border: var(--badge-info-border);
}

.badge--status-neutral {
  --badge-bg: var(--badge-neutral-bg);
  --badge-bg-soft: var(--badge-neutral-bg-soft);
  --badge-color: var(--badge-neutral-color);
  --badge-color-soft: var(--badge-neutral-color-soft);
  --badge-border: var(--badge-neutral-border);
}

/* 스타일 타입 (solid / outline / soft) */
.badge--style-solid {
  background-color: var(--badge-bg);
  color: var(--badge-color);
  border-color: var(--badge-bg);
}

.badge--style-outline {
  background-color: transparent;
  color: var(--badge-bg);
  border-color: var(--badge-border);
}

.badge--style-outline:hover {
  background-color: var(--badge-bg);
  color: var(--badge-color);
}

.badge--style-soft {
  background-color: var(--badge-bg-soft);
  color: var(--badge-color-soft);
  border-color: var(--badge-bg-soft);
}

.badge--style-soft:hover {
  background-color: var(--badge-bg);
  color: var(--badge-color);
}

/* 다크 모드 색상은 base.css에서 관리됨 */
</style>
