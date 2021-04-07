<template>
  <label
    for="file-upload"
    class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 mx-2 mb-3 border-indigo-500 border-dashed rounded-md"
  >
    <label
      for="file-upload"
      class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
    >
      <img
        v-if="modelValue != ''"
        class=" object-contain rounded-md max-h-60 w-auto"
        :src="img"
      />
    </label>
    <div v-if="modelValue == ''" class="space-y-1 text-center">
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div class="flex text-sm text-gray-600">
        <label
          class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <span>Upload a file (262 Kb limit)</span>
          <input
            id="file-upload"
            name="file-upload"
            @change="handleImage"
            type="file"
            class="sr-only"
          />
        </label>
      </div>
    </div>
    <input
      id="file-upload"
      name="file-upload"
      @change="handleImage"
      type="file"
      class="sr-only"
    />
  </label>
</template>
<script>
export default {
  name: 'DropzoneImage',
  props: {
    modelValue: {
      type: [String, Number],
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
  computed: {
    img() {
      if (this.modelValue == '') {
        return 'https://via.placeholder.com/50x50'
      } else {
        return this.modelValue
      }
    }
  },
  methods: {
    handleImage(e) {
      const selectedImage = e.target.files[0]

      this.convertToBase64(selectedImage)
    },
    convertToBase64(imageFile) {
      const reader = new FileReader()

      reader.onload = e => {
        this.$emit('update:modelValue', e.target.result)
      }
      reader.readAsDataURL(imageFile)
    }
  }
}
</script>
