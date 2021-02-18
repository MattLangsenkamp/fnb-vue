<template>
  <div v-if="validationStatus.$error" class="messages">
    <p v-for="$error in validationStatus.$errors" :key="$error.$property">
      {{ $error.$message }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'ErrorMessage',
  props: {
    validationStatus: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.messages {
  padding-left: 0.7em;
  font: 13px;
  color: red;
}
</style>
