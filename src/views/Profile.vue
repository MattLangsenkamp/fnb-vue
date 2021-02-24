<template>
  <div>
    <div>
      <form class="leaflet-style bg-indigo-600" v-if="isEditing">
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
        <button class="button" @click="deleteProf">
          Delete
        </button>
      </form>
      <div v-if="!isEditing" class="leaflet-style">
        <button v-if="allowEditing" @click="toggleEditing">edit</button>
        <span>{{ username }}</span>
        <span>{{ contact }}</span>
        <span>{{ description }}</span>
        <img :src="picture" />
        <button
          v-for="loc in locations"
          :key="loc.id"
          @click="goToLocation(loc.id)"
        >
          {{ loc.locationName }}
        </button>
      </div>
    </div>
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

export default {
  name: 'Profile',
  components: { FormInput, ErrorMessage, ChangeableImage },
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
      editing,
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
      'updateUserData', // map `this.updateUser(user)` to `this.$store.dispatch('updateUser', user)`
      'getUserData',
      'deleteUser'
    ]),
    toggleEditing() {
      this.editing = !this.editing
    },
    updateProf(e) {
      e.preventDefault()
      this.v.$validate()
      this.v.$dirty = true
      if (!this.v.$error) {
        e.preventDefault()
        this.updateUserData({
          id: this.id,
          orgUserId: this.orgUserId,
          username: this.username,
          contact: this.contact,
          description: this.description,
          picture: this.picture
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
      pictureURI,
      username,
      locations
    }) {
      this.id = id
      this.orgUserId = orgUserId
      this.contact = contact
      this.username = username
      this.picture = pictureURI
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
      return (
        this.$store.state.authMod.loggedInUser.jti === this.$route.params.id
      )
    }
  }
}
</script>

<style scoped>
.leaflet-style {
  display: flex;
  flex-flow: column wrap;
  flex-direction: column;
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
