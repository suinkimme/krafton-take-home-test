<script setup lang="ts">
type Theme = 'primary' | 'dark'
type StyleType = 'fill' | 'weak'
type Size = 'small' | 'medium' | 'large'

interface ButtonProps {
  theme?: Theme
  styleType?: StyleType
  size?: Size
  fullWidth?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  theme: 'primary',
  styleType: 'fill',
  size: 'medium',
  fullWidth: false,
  ariaLabel: '',
})
</script>

<template>
  <button
    class="btn"
    :class="[
      `btn--theme-${props.theme}`,
      `btn--style-${props.styleType}`,
      `btn--size-${props.size}`,
      { 'btn--full-width': props.fullWidth },
    ]"
    :aria-label="props.ariaLabel || undefined"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<style scoped>
/* 기본 버튼 스타일 */
.btn {
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:focus-visible {
  outline: 2px solid var(--vt-c-indigo);
  outline-offset: 2px;
}

.btn:focus:not(:focus-visible) {
  outline: none;
}

/* 크기별 스타일 */
.btn--size-small {
  font-size: 12px;
  padding: 6px 12px;
}

.btn--size-medium {
  font-size: 14px;
  padding: 8px 16px;
}

.btn--size-large {
  font-size: 16px;
  padding: 10px 20px;
}

/* 테마별 스타일 */
.btn--theme-primary {
  --btn-bg: var(--vt-c-indigo);
  --btn-color: var(--vt-c-white);
}

.btn--theme-dark {
  --btn-bg: var(--vt-c-black-soft);
  --btn-color: var(--vt-c-white);
}

/* 다크 모드 호환성 */
@media (prefers-color-scheme: dark) {
  .btn--theme-primary {
    --btn-bg: var(--vt-c-indigo);
    --btn-color: var(--vt-c-white);
  }

  .btn--theme-dark {
    --btn-bg: var(--vt-c-black-mute);
    --btn-color: var(--vt-c-white);
  }
}

/* 스타일 타입 (fill / weak) */
.btn--style-fill {
  background-color: var(--btn-bg);
  color: var(--btn-color);
}

.btn--style-fill:hover {
  background-color: var(--color-border-hover);
}

.btn--style-weak {
  background-color: transparent;
  color: var(--btn-bg);
  border: 1px solid var(--btn-bg);
}

.btn--style-weak:hover {
  background-color: var(--color-background-mute);
  border-color: var(--color-border-hover);
}

/* 전체 너비 옵션 */
.btn--full-width {
  width: 100%;
}
</style>
