<template>
  <form class="leaflet-style-signup">
    <changeable-image v-model="event.image" />
    <form-input :label="`email`" :placeHolder="`user@example.com`" />
    <form-input :label="`password`" />
  </form>
</template>

<script>
import ChangeableImage from '../components/ChangeableImage.vue'
import FormInput from '../components/FormInput.vue'
export default {
  components: { FormInput, ChangeableImage },

  name: 'SignIn',
  data() {
    return {
      event: {
        image: '',
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style scoped>
.leaflet-style-signup {
  display: flex;
  flex-flow: column wrap;
  flex-direction: column;
  background-color: #fff;
  text-align: left;
  text-decoration: none;
  color: black;
  border-radius: 4px;
  border: 2px solid #ccc;
  padding: 0.7em;
  width: 75%;
  margin-right: auto;
  margin-left: auto;
}

@media screen and (min-width: 920px) {
  .leaflet-style-signup {
    width: 44em;
  }
}
</style>
