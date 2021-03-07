<template>
  <div>
    <form class="w-3/4 sm:w-1/2 m-auto border p-4 border-indigo-500 rounded">
      <map-button
        v-if="allowEditing && !editing"
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
        v-model="picture"
        :editing="isEditing"
      />
      <map-button
        class="button"
        v-if="editing"
        text="Submit"
        buttonType="form"
        @click="updateLoc"
      />
      <map-button
        class="button"
        v-if="editing"
        text="Delete"
        buttonType="form"
        @click="toggleAttDel"
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
    const picture = ref('')
    const locationOwner = ref('')
    const needsCleaning = ref(false)
    const locationTags = ref([])
    const attemptDelete = ref(false)

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
      picture: { required },
      locationTags: {}
    }
    const v = useVuelidate(rules, {
      name,
      friendlyName,
      description,
      latitude,
      longitude,
      picture,
      locationTags
    })
    return {
      editing,
      name,
      friendlyName,
      description,
      latitude,
      longitude,
      picture,
      locationTags,
      locationOwner,
      needsCleaning,
      attemptDelete,
      v
    }
  },

  methods: {
    ...mapActions([
      'updateLocation', // map `this.updateUser(user)` to `this.$store.dispatch('updateUser', user)`
      'getLocation',
      'deleteLocation'
    ]),
    toggleEditing() {
      this.editing = !this.editing
    },
    goToProfile() {
      this.$router.push({
        name: 'Profile',
        params: { id: this.locationOwner }
      })
    },
    toggleAttDel(e) {
      e.preventDefault()
      this.attemptDelete = !this.attemptDelete
    },
    updateLoc(e) {
      e.preventDefault()
      this.v.$validate()
      this.v.$dirty = true
      if (!this.v.$error) {
        e.preventDefault()
        this.updateLocation({
          id: this.id,
          name: this.name,
          friendlyName: this.friendlyName,
          description: this.description,
          latitude: parseFloat(this.latitude),
          longitude: parseFloat(this.longitude),
          picture: this.picture,
          locationTags: this.locationTags
        }).then(() => {
          this.toggleEditing()
          this.v.$reset()
        })
      }
    },
    deleteLoc() {
      this.deleteLocation({ id: this.id }).then(() => {
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
      pictureURI
    }) {
      this.description = description
      this.friendlyName = friendlyName
      this.id = id
      this.locationName = locationName
      this.locationOwner = locationOwner
      this.latitude = latitude
      this.longitude = longitude
      this.name = locationName
      this.picture = pictureURI
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

<style scoped>
.leaflet-style {
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
