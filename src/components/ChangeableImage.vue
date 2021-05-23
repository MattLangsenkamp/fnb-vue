<template>
  <div class="relative p-2 sm:flex w-full">
    <div class="w-full sm:w-1/3">
      <label v-if="label" class="text-indigo-600">{{ label }}</label>
    </div>
    <div class="relative max-w-md xl:max-w-lg">
      <img class=" object-fill rounded" :src="img" />
      <label
        v-if="editing"
        for="file-upload"
        class="absolute bottom-0 right-0 cursor-pointer bg-white bg-opacity-70 rounded-tl rounded-br font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-auto h-20"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
          />
        </svg>

        <input
          id="file-upload"
          name="file-upload"
          type="file"
          @change="handleImage"
          accept="image/*"
          class="sr-only"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChangeableImage',
  props: {
    modelValue: {
      type: [String, File],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    editing: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      imgData: ''
    }
  },
  computed: {
    img() {
      var d = new Date()
      if (typeof this.modelValue === 'string') {
        return this.modelValue + '?ver=' + d.getTime()
      }
      return this.imgData
    }
  },
  methods: {
    handleImage(e) {
      const selectedImage = e.target.files[0]
      this.convertToBase64(selectedImage)
      this.$emit('update:modelValue', selectedImage)
    },

    convertToBase64(imageFile) {
      const reader = new FileReader()
      reader.onload = e => {
        this.imgData = e.target.result
      }
      reader.readAsDataURL(imageFile)
    }
  }
}
</script>
