<script setup lang="ts">
interface TextareaProps {
  placeholder?: string
  modelValue?: string
  label?: string
  id?: string
  ariaLabel?: string
  ariaDescribedBy?: string
}

const props = withDefaults(defineProps<TextareaProps>(), {
  placeholder: '',
  modelValue: '',
  label: '',
  ariaLabel: '',
  ariaDescribedBy: '',
})

const emit = defineEmits(['update:modelValue'])

// 자동 ID 생성
const textareaId = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`
</script>

<template>
  <div class="textarea-wrapper">
    <label v-if="label" :for="textareaId" class="textarea-label">{{ label }}</label>
    <textarea
      v-bind="$attrs"
      :id="textareaId"
      class="textarea"
      :placeholder="placeholder"
      :value="props.modelValue"
      :aria-label="ariaLabel || label"
      :aria-describedby="ariaDescribedBy"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
  </div>
</template>

<style scoped>
.textarea-wrapper {
  width: 100%;
}

.textarea-label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.textarea {
  width: 100%;
  min-height: 100px;
  padding: 10px 12px;
  border-radius: 8px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.textarea::placeholder {
  color: var(--color-text);
  opacity: 0.6;
}

.textarea:focus {
  border-color: var(--color-border-hover);
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
}

.textarea:focus-visible {
  outline: 2px solid var(--vt-c-indigo);
  outline-offset: 2px;
}

.textarea:focus:not(:focus-visible) {
  outline: none;
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
}
</style>
