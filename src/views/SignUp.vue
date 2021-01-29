<template>
  <form class="leaflet-style-signup">
    <form-input :label="`Email`" :placeHolder="`user@example.com`" />
    <form-input :label="`Password`" />
    <form-input :label="`Confirm Password`" />
  </form>
</template>

<script>
import FormInput from '../components/FormInput.vue'
export default {
  components: { FormInput },
  name: 'SignUp',
  data() {
    return {
      event: {}
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
</style>
