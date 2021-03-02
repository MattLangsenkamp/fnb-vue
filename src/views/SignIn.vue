<template>
  <form
    class=" border border-gray-200  rounded w-3/4 md:w-1/2  lg:w-1/3 m-auto"
  >
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
    <map-button
      @click="submitLocal"
      title="Submit"
      text="Submit"
      buttonType="form"
    />
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
import MapButton from '../components/MapButton.vue'

export default {
  components: { FormInput, ChangeableImage, ErrorMessage, MapButton },

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
        this.signIn({
          email: this.userEmail,
          password: this.userPassword
        }).then(() => {
          this.$router.push({
            name: 'Locations'
          })
        })
      }
    }
  }
}
</script>
