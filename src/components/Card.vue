<template>
  <div class="card">
    <div class="card-header">
      <slot name="header" />
    </div>

    <div class="card-content">
      <slot name="content" />
    </div>

    <div class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  margin: 0 auto;
  color: var(--color-text);
  box-sizing: border-box;
  transition:
    background-color 0.5s,
    border-color 0.5s,
    color 0.5s;
}

.card-header {
  margin-bottom: 16px;
  color: var(--color-heading);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card-footer {
  margin-top: 24px;
}
</style>
