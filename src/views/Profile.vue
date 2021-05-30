<template>
  <div>
    <form
      class="w-3/4 md:w-1/2 border p-4 mb-2 mx-auto border-indigo-500 rounded"
    >
      <map-button
        v-if="allowEditing && !editing"
        text="Edit"
        buttonType="form"
        @click="toggleEditing"
      />
      <form-input label="Username" v-model="username" :editing="isEditing" />
      <error-message :validationStatus="v.username" />
      <form-input label="Contact" v-model="contact" :editing="isEditing" />
      <error-message :validationStatus="v.contact" />
      <form-input
        label="Description"
        type="textarea"
        v-model="description"
        :editing="isEditing"
      />
      <error-message :validationStatus="v.description" />

      <changeable-image
        v-model="image"
        :editing="isEditing"
        label="Profile Picture"
      />
      <error-message :validationStatus="v.image" />
      <map-button
        class="button"
        v-if="editing"
        text="Submit"
        buttonType="form"
        @click="updateProf"
      />
      <map-button
        class="button"
        v-if="editing"
        text="Delete"
        buttonType="form"
        @click="deleteProf"
      />
      <map-button
        v-if="editing"
        text="Cancel"
        buttonType="form"
        @click="toggleEditing"
      />
    </form>
  </div>
</template>

<script>
import FormInput from '../components/FormInput.vue'
import ChangeableImage from '../components/ChangeableImage.vue'
import { mapActions, mapGetters } from 'vuex'
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import {
  required,
  email,
  sameAs,
  minLength,
  minValue,
  maxValue
} from '@vuelidate/validators'
import ErrorMessage from '../components/ErrorMessage.vue'
import MapButton from '../components/MapButton.vue'

export default {
  name: 'Profile',
  components: { FormInput, ErrorMessage, ChangeableImage, MapButton },
  setup() {
    const editing = ref(false)

    const username = ref('')
    const contact = ref('')
    const description = ref('')
    const image = ref([])
    const locations = ref([])

    const rules = {
      username: { required, minLength: minLength(2) },
      contact: { required, minLength: minLength(2) },
      description: { required, minLength: minLength(8) },
      image: { required }
    }
    const v = useVuelidate(rules, {
      username,
      contact,
      description,
      image
    })
    return {
      editing,
      username,
      contact,
      description,
      image,
      locations,
      v
    }
  },

  methods: {
    ...mapActions([
      'updateUserData', // map `this.updateUser(user)` to `this.$store.dispatch('updateUser', user)`
      'getUserData',
      'deleteUser'
    ]),
    toggleEditing() {
      this.editing = !this.editing
      const userDataAfterUpdating = this.$store.state.userDataMod.userDatas.find(
        ud => ud.id === this.$route.params.id
      )
      if (userDataAfterUpdating) {
        this.initProfile(userDataAfterUpdating)
      }
    },
    updateProf(e) {
      e.preventDefault()
      this.v.$validate()
      this.v.$dirty = true
      if (!this.v.$error) {
        this.updateUserData({
          id: this.id,
          orgUserId: this.orgUserId,
          username: this.username,
          contact: this.contact,
          description: this.description,
          image: this.image
        }).then(() => {
          this.toggleEditing()
          this.v.$reset()
        })
      }
    },
    deleteProf(e) {
      e.preventDefault()
      this.deleteUser({ id: this.orgUserId }).then(() => {
        this.$router.push({
          name: 'Locations'
        })
      })
    },
    initProfile({
      contact,
      description,
      id,
      orgUserId,
      imageUrls,
      username,
      locations
    }) {
      this.id = id
      this.orgUserId = orgUserId
      this.contact = contact
      this.username = username
      if (imageUrls[0]) {
        this.image = imageUrls[0].imageUri
      }
      this.locations = locations
      this.description = description
    },
    goToLocation(id) {
      this.$router.push({
        name: 'LocationPage',
        params: { id: id }
      })
    }
  },
  created() {
    this.getUserData(parseInt(this.$route.params.id)).then(user =>
      this.initProfile(user)
    )
  },
  computed: {
    isEditing() {
      return this.editing
    },
    allowEditing() {
      if (this.$store.state.authMod.loggedInUser) {
        return (
          this.$store.state.authMod.loggedInUser.jti === this.$route.params.id
        )
      }
      return false
    }
  }
}
</script>
