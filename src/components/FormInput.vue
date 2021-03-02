<template>
  <div class="p-2 sm:flex">
    <div class="w-1/3">
      <label v-if="label" class="text-indigo-600">{{ label }}</label>
    </div>
    <div class="m-w-2/3">
      <input
        v-if="$attrs.type != 'textarea'"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="p-2"
        :class="edit"
        :placeholder="placeholderOrLabel"
      />
      <textarea
        v-else
        v-bind="$attrs"
        :value="modelValue"
        rows="5"
        @input="$emit('update:modelValue', $event.target.value)"
        class="border-indigo-600 p-2 border rounded"
        :placeholder="placeholderOrLabel"
      />
    </div>
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
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
      } else if (this.placeHolder === '' && this.modelValue !== '') {
        return ''
      } else {
        return this.label
      }
    },
    edit() {
      return ['rounded', 'border-indigo-600', 'border']
    }
  }
}
</script>
