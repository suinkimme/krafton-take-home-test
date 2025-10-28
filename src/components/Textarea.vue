<script setup lang="ts">
interface TextareaProps {
  placeholder?: string
  modelValue?: string
}

const props = withDefaults(defineProps<TextareaProps>(), {
  placeholder: '',
  modelValue: '',
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <textarea
    v-bind="$attrs"
    class="textarea"
    :placeholder="placeholder"
    :value="props.modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>

<style scoped>
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
}

.textarea:focus {
  border-color: var(--color-border-hover);
}
</style>
