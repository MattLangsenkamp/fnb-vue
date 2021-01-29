<template>
  <div class="custom-input">
    <label v-if="label">{{ label }}</label>
    <input
      v-if="$attrs.type != 'textarea'"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="new_loc_input"
      :placeholder="placeholderOrLabel"
    />
    <textarea
      v-else
      v-bind="$attrs"
      :value="modelValue"
      rows="5"
      @input="$emit('update:modelValue', $event.target.value)"
      class="new_loc_input other"
      :placeholder="placeholderOrLabel"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    placeHolder: {
      type: String,
      default: ''
    }
  },
  computed: {
    placeholderOrLabel() {
      if (this.placeHolder != '') {
        return this.placeHolder
      } else {
        return this.label
      }
    }
  }
}
</script>
<style scoped>
.new-loc-input {
  font: 13px 'Lucida Console', Monaco, monospace;
}

.custom-input {
  font: bold 18px 'Lucida Console', Monaco, monospace;
  display: flex;
  flex-direction: column;
  text-align: left;
  text-decoration: none;
  color: black;
  padding: 0.7em;
}
</style>
