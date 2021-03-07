<template>
  <form
    class=" border border-gray-200 mb-4 rounded w-3/4 md:w-1/2  lg:w-1/3 m-auto"
  >
    <form-input
      :label="`Email`"
      autocomplete="username"
      :placeHolder="`user@example.com`"
      v-model="userEmail"
    />
    <error-message :validationStatus="v.userEmail" />
    <form-input
      :label="`Password`"
      v-model="userPassword"
      type="password"
      autocomplete="current-password"
    />
    <error-message :validationStatus="v.userPassword" />

    <form-input
      :label="`Confirm Password`"
      v-model="userPasswordConfirm"
      autocomplete="current-password"
      type="password"
    />
    <error-message :validationStatus="v.userPasswordConfirm" />
    <form-input
      label="Username"
      v-model="username"
      placeHolder="Roc Food Not Bombs"
    />
    <error-message :validationStatus="v.username" />
    <form-input
      label="Contact"
      v-model="contact"
      placeHolder="Find us on facebook or visit rocfoodnotbombs.com"
    />
    <error-message :validationStatus="v.contact" />
    <form-input
      label="Description"
      type="textarea"
      v-model="description"
      placeHolder="Roc Food Not Bombs recovers and shares free vegetarian and vegan meals & food in our local community of Rochester, NY."
    />
    <error-message :validationStatus="v.description" />
    <dropzone-image v-model="picture" label="Profile Picture" />
    <error-message :validationStatus="v.picture" />
    <map-button
      buttonType="form"
      text="Submit"
      title="Submit"
      @click="submitLocal"
    />
  </form>
</template>

<script>
import FormInput from '../components/FormInput.vue'
import ChangeableImage from '../components/ChangeableImage'
import { mapActions } from 'vuex'
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs, minLength } from '@vuelidate/validators'
import ErrorMessage from '../components/ErrorMessage.vue'
import MapButton from '../components/MapButton.vue'
import DropzoneImage from '../components/DropzoneImage.vue'

export default {
  components: {
    FormInput,
    ErrorMessage,
    ChangeableImage,
    MapButton,
    DropzoneImage
  },
  name: 'SignUp',

  setup() {
    const userEmail = ref('')
    const userPassword = ref('')
    const userPasswordConfirm = ref('')
    const username = ref('')
    const contact = ref('')
    const description = ref('')
    const picture = ref('')
    // Validation Logics
    const rules = {
      userEmail: { required, email },
      userPassword: { required, minLength: minLength(8) },
      userPasswordConfirm: { required, sameAsPassword: sameAs(userPassword) },
      username: { required, minLength: minLength(2) },
      contact: { required, minLength: minLength(2) },
      description: { required, minLength: minLength(8) },
      picture: { required }
    }
    const v = useVuelidate(rules, {
      userEmail,
      userPassword,
      userPasswordConfirm,
      username,
      contact,
      description,
      picture
    })
    return {
      userEmail,
      userPassword,
      userPasswordConfirm,
      username,
      contact,
      description,
      picture,
      v
    }
  },
  methods: {
    ...mapActions(['signUp']),
    submitLocal(e) {
      e.preventDefault()
      this.v.$validate()
      this.v.$dirty = true
      if (!this.v.$error) {
        this.signUp({
          email: this.userEmail,
          password: this.userPassword,
          username: this.username,
          description: this.description,
          contact: this.contact,
          picture: this.picture
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
