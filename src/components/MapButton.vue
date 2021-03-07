<template>
  <button
    :title="title"
    class="m-2 bg-white border focus:border-2 rounded text-gray-500 focus:text-gray-900 border-indigo-500 ml-2 hover:bg-gray-100 focus:outline-none"
    :class="classes"
  >
    {{ text }}
  </button>
</template>
<script>
export default {
  name: 'MapButton',
  props: {
    text: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    buttonType: {
      type: String,
      default: 'map'
    }
  },
  computed: {
    classes() {
      if (this.buttonType == 'map') {
        return ['p-2', 'rounded-xl']
      }
      return ['p-1', 'rounded']
    }
  }
}
</script>
