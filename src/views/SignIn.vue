<template>
  <form class="leaflet-style-signup">
    <form-input
      label="email"
      v-model="userEmail"
      autocomplete="username"
      :placeHolder="`user@example.com`"
    />
    <error-message :validationStatus="v.userEmail" />
    <form-input
      label="password"
      v-model="userPassword"
      type="password"
      autocomplete="current-password"
    />
    <error-message :validationStatus="v.userPassword" />
    <button class="button" @click="submitLocal">
      Submit
    </button>
  </form>
</template>

<script>
import ChangeableImage from '../components/ChangeableImage.vue'
import FormInput from '../components/FormInput.vue'
import { mapActions } from 'vuex'
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs, minLength } from '@vuelidate/validators'
import ErrorMessage from '../components/ErrorMessage.vue'

export default {
  components: { FormInput, ChangeableImage, ErrorMessage },

  name: 'SignIn',
  setup() {
    const userEmail = ref('')
    const userPassword = ref('')
    // Validation Logics
    const rules = {
      userEmail: { required, email },
      userPassword: { required, minLength: minLength(8) }
    }
    const v = useVuelidate(rules, { userEmail, userPassword })
    return {
      userEmail,
      userPassword,
      v
    }
  },
  methods: {
    ...mapActions(['signIn']),
    submitLocal(e) {
      e.preventDefault()
      this.v.$validate()
      this.v.$dirty = true
      if (!this.v.$error) {
        this.signIn({ email: this.userEmail, password: this.userPassword })
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
.button {
  align-self: flex-end;
  font: bold 18px 'Lucida Console', Monaco, monospace;
  background-color: #fff;
  text-align: center;
  text-decoration: none;
  color: black;
  border-radius: 4px;
  border: 2px solid #ccc;
}

@media screen and (min-width: 920px) {
  .leaflet-style-signup {
    width: 44em;
  }
}
</style>
