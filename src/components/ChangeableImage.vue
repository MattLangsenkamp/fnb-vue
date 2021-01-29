<template>
  <div class="img-container">
    <img class="img" :src="img" />
    <input @change="handleImage" type="file" accept="image/*" />
  </div>
</template>

<script>
export default {
  name: 'ChangeableImage',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
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

<style scoped>
.img {
  border-radius: 8px;
  width: inherit;
  height: inherit;
  object-fit: contain;
  max-width: 200px;
  max-height: 200px;
}
.img-container {
  max-width: 300px;
  max-height: 300px;
}
</style>
