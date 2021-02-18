<template>
  <div>
    <div>
      <form class="leaflet-style" v-if="isEditing">
        <form-input label="Username" v-model="username" />
        <error-message :validationStatus="v.username" />
        <form-input label="Contact" v-model="contact" />
        <error-message :validationStatus="v.contact" />
        <form-input label="Description" type="textarea" v-model="description" />
        <error-message :validationStatus="v.description" />

        <changeable-image v-model="picture" />
        <error-message :validationStatus="v.picture" />
        <button class="button" @click="updateProf">
          Submit
        </button>
      </form>
      <div v-if="!isEditing" class="leaflet-style">
        <button v-if="allowEditing" @click="toggleEditing">edit</button>
        <span>{{ username }}</span>
        <span>{{ contact }}</span>
        <span>{{ description }}</span>
        <img :src="picture" />
        <span v-for="loc in locations" :key="loc.id">{{
          loc.locationName
        }}</span>
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
import ErrorMessage from '../components/ErrorMessage.vue'
import { store } from '../store/store.js'

export default {
  name: 'Profile',
  setup() {
    const editing = ref(false)

    const username = ref('')
    const contact = ref('')
    const description = ref('')
    const picture = ref('')
    const locations = ref([])

    const rules = {
      username: { required, minLength: minLength(2) },
      contact: { required, minLength: minLength(2) },
      description: { required, minLength: minLength(8) },
      picture: { required }
    }
    const v = useVuelidate(rules, {
      username,
      contact,
      description,
      picture
    })
    return {
      username,
      contact,
      description,
      picture,
      locations,
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
          username: this.username,
          contact: this.contact,
          description: this.description,
          picture: this.picture
        })
      }
    },
    initProfile({
      contact,
      description,
      id,
      orgUserId,
      pictureURI,
      username,
      locations
    }) {
      this.contact = contact
      this.username = username
      this.picture = pictureURI
      this.locations = locations
      this.description = description
    }
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('getUser', parseInt(to.params.id)).then(user => {
      next(vm => vm.initProfile(user))
    })
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
