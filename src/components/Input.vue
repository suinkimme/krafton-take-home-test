<script setup lang="ts">
interface InputProps {
  type?: string
  placeholder?: string
  modelValue?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  placeholder: '',
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    v-bind="$attrs"
    class="input"
    :type="type"
    :placeholder="placeholder"
    :value="props.modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style scoped>
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
}

.input:focus {
  border-color: var(--color-border-hover);
}
</style>
