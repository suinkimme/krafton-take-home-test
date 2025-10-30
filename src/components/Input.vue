<script setup lang="ts">
interface InputProps {
  type?: string
  placeholder?: string
  modelValue?: string
  label?: string
  id?: string
  ariaLabel?: string
  ariaDescribedBy?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  placeholder: '',
  label: '',
  ariaLabel: '',
  ariaDescribedBy: '',
})

const emit = defineEmits(['update:modelValue'])

// 자동 ID 생성
const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`
</script>

<template>
  <div class="input-wrapper">
    <label v-if="label" :for="inputId" class="input-label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :id="inputId"
      class="input"
      :type="type"
      :placeholder="placeholder"
      :value="props.modelValue"
      :aria-label="ariaLabel || label"
      :aria-describedby="ariaDescribedBy"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style scoped>
.input-wrapper {
  width: 100%;
}

.input-label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 14px;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.input::placeholder {
  color: var(--color-text);
  opacity: 0.6;
}

.input:focus {
  border-color: var(--color-border-hover);
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
}

.input:focus-visible {
  outline: 2px solid var(--vt-c-indigo);
  outline-offset: 2px;
}

.input:focus:not(:focus-visible) {
  outline: none;
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
}
</style>
