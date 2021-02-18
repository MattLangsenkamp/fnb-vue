<template>
  <div>
    <div>
      <form class="leaflet-style" v-if="isEditing">
        <form-input
          label="Name"
          placeHolder="South Wedge Mission"
          v-model="name"
        />
        <error-message :validationStatus="v.name" />
        <form-input
          label="Friendly Name"
          placeHolder="Caroline Street"
          v-model="friendlyName"
        />
        <error-message :validationStatus="v.friendlyName" />
        <form-input
          label="Description"
          type="textarea"
          placeHolder="A Free Stand to take what you need from, and give to when you can"
          v-model="description"
        />
        <changeable-image v-model="picture" />
        <button class="button" @click="addLoc">
          Submit
        </button>
      </form>
      <div v-if="!isEditing" class="leaflet-style">
        <button v-if="allowEditing" @click="toggleEditing">edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import FormInput from '../components/FormInput.vue'
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
export default {
  name: 'LocationPage',
  setup() {
    const editing = ref(false)

    const name = ref('')
    const friendlyName = ref('')
    const description = ref('')
    const latitude = ref(0)
    const longitude = ref(0)
    const picture = ref('')
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
      name,
      friendlyName,
      description,
      latitude,
      longitude,
      picture,
      locationTags,
      v
    }
  },

  methods: {
    ...mapActions([
      'updateUser', // map `this.updateUser(user)` to `this.$store.dispatch('updateUser', user)`
      'getUser'
    ]),
    ...mapGetters(['userData', 'loggedInUser']),
    toggleEditing() {
      self.editing = !self.editing
    },
    updateProf(e) {
      e.preventDefault()
      this.v.$validate()
      this.v.$dirty = true
      if (!this.v.$error) {
        e.preventDefault()
        this.updateUser({
          name: this.name,
          friendlyName: this.friendlyName,
          description: this.description,
          latitude: this.latitude,
          longitude: this.longitude,
          picture: this.picture,
          locationTags: this.locationTags
        })
      }
    }
  },
  mounted() {
    this.getUser(this.$route.params.id)
  },
  computed: {
    user() {
      return this.userData(this.$route.params.id)
    },
    isEditing() {
      return self.editing
    },
    allowEditing() {
      return this.loggedInUser.id === this.$route.params.id
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
</style>
