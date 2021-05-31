<template>
  <div class="p-2 sm:flex w-full">
    <div class="w-1/3 mx-2">
      <!-- w-full sm:w-1/3 !-->
      <label v-if="label" class="text-indigo-600">{{ label }}</label>
    </div>
    <div class="max-w-lg">
      <input
        v-if="$attrs.type != 'textarea' && editing"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="p-2 text-gray-500 w-full break-words mr-auto ml-0"
        :class="edit"
        :placeholder="placeholderOrLabel"
        :disabled="!editing"
      />
      <textarea
        v-else-if="$attrs.type == 'textarea' && editing"
        v-bind="$attrs"
        :value="modelValue"
        rows="3"
        cols="30"
        @input="$emit('update:modelValue', $event.target.value)"
        class="p-2 text-gray-500 w-full"
        :class="edit"
        :placeholder="placeholderOrLabel"
        :disabled="!editing"
      />
      <span v-if="!editing" class="p-2 text-gray-500 break-words w-full"
        >{{ modelValue }}
      </span>
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
    },
    editing: {
      type: Boolean,
      default: true
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
      if (this.editing) {
        return ['rounded', 'border-indigo-600', 'border', 'resize']
      } else {
        return ['rounded', 'bg-white', 'resize-none']
      }
    }
  }
}
</script>
