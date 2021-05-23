<template>
  <div>
    <form
      class="w-3/4 md:w-1/2 mb-2 mx-auto border p-4 border-indigo-500 rounded"
    >
      <map-button
        v-if="allowEditing && !editing"
        title="Edit"
        text="Edit"
        buttonType="form"
        @click="toggleEditing"
      />
      <form-input label="Name" v-model="name" :editing="isEditing" />
      <error-message :validationStatus="v.name" />
      <form-input
        label="Friendly Name"
        v-model="friendlyName"
        :editing="isEditing"
      />
      <error-message :validationStatus="v.friendlyName" />
      <form-input
        label="Description"
        type="textarea"
        v-model="description"
        :editing="isEditing"
      />
      <error-message :validationStatus="v.description" />
      <changeable-image
        label="Location Picture"
        v-model="image"
        :editing="isEditing"
      />
      <error-message :validationStatus="v.image" />
      <map-button
        class="button"
        v-if="editing"
        title="Submit"
        text="Submit"
        buttonType="form"
        @click="updateLoc"
      />
      <map-button
        class="button"
        v-if="editing"
        title="Delete"
        text="Delete"
        buttonType="form"
        @click="toggleAttDel"
      />
      <map-button
        v-if="editing"
        title="Cancel"
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
import MapButton from '../components/MapButton.vue'
import Modal from '../components/Modal.vue'

import { mapActions } from 'vuex'
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

export default {
  name: 'LocationPage',
  components: { FormInput, ErrorMessage, ChangeableImage, MapButton, Modal },

  setup() {
    const editing = ref(false)

    const id = ref(0)
    const name = ref('')
    const friendlyName = ref('')
    const description = ref('')
    const latitude = ref(0)
    const longitude = ref(0)
    const image = ref('')
    const locationOwner = ref('')
    const needsCleaning = ref(false)
    const locationTags = ref([])

    const rules = {
      name: { required, minLength: minLength(2) },
      friendlyName: { required, minLength: minLength(2) },
      description: { required, minLength: minLength(8) },
      latitude: { required, minValue: minValue(-90), maxValue: maxValue(90) },
      longitude: {
        required,
        minValue: minValue(-180),
        maxValue: maxValue(180)
      },
      image: { required },
      locationTags: {}
    }
    const v = useVuelidate(rules, {
      name,
      friendlyName,
      description,
      latitude,
      longitude,
      image,
      locationTags
    })
    return {
      id,
      editing,
      name,
      friendlyName,
      description,
      latitude,
      longitude,
      image,
      locationTags,
      locationOwner,
      needsCleaning,
      v
    }
  },

  methods: {
    ...mapActions([
      'updateLocation', // map `this.updateUser(user)` to `this.$store.dispatch('updateUser', user)`
      'getLocation',
      'deleteLocation',
      'openAreYouSure',
      'closeAreYouSure'
    ]),
    toggleEditing() {
      this.editing = !this.editing
      const locAfterUpdating = this.$store.state.locMod.locs.find(
        loc => loc.id === this.$route.params.id
      )
      console.log(this.$store.state.locMod.locs)
      if (locAfterUpdating) {
        this.initProfile(locAfterUpdating)
      }
    },
    goToProfile() {
      this.$router.push({
        name: 'Profile',
        params: { id: this.locationOwner }
      })
    },
    toggleAttDel(e) {
      e.preventDefault()
      this.openAreYouSure({
        title: 'Delete Location',
        message:
          'Are you sure you want to delete this location? This action cannot be undone.',
        action: this.deleteLoc,
        nonAction: ''
      })
    },
    updateLoc(e) {
      e.preventDefault()
      this.v.$validate()
      this.v.$dirty = true
      if (!this.v.$error) {
        // check dirty
        this.updateLocation({
          id: this.id,
          name: this.name,
          friendlyName: this.friendlyName,
          description: this.description,
          latitude: parseFloat(this.latitude),
          longitude: parseFloat(this.longitude),
          image: this.image,
          locationTags: this.locationTags
        }).then(() => {
          this.toggleEditing()
          this.v.$reset()
        })
      }
    },
    deleteLoc() {
      this.deleteLocation({ id: this.id }).then(() => {
        this.closeAreYouSure()
        this.$router.push({
          name: 'Locations'
        })
      })
    },
    initProfile({
      description,
      friendlyName,
      id,
      latitude,
      locationName,
      locationOwner,
      locationTags,
      longitude,
      needsCleaning,
      imageUrls
    }) {
      this.description = description
      this.friendlyName = friendlyName
      this.id = id
      this.locationName = locationName
      this.locationOwner = locationOwner
      this.latitude = latitude
      this.longitude = longitude
      this.name = locationName
      if (imageUrls && imageUrls[0]) {
        this.image = imageUrls[0].imageUri
      } else {
        this.image = 'no'
      }
    }
  },
  created() {
    this.getLocation(parseInt(this.$route.params.id)).then(loc => {
      this.initProfile(loc)
    })
  },
  computed: {
    isEditing() {
      return this.editing
    },
    allowEditing() {
      if (this.$store.state.authMod.loggedInUser) {
        return (
          parseInt(this.$store.state.authMod.loggedInUser.jti) ===
          this.locationOwner
        )
      }
      return false
    }
  }
}
</script>
