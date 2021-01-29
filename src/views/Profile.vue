<template>
  <div>
    <div>
      <form>
        <form-input
          label="Name"
          placeHolder="South Wedge Mission"
          v-model="event.name"
        />
        <form-input
          label="Friendly Name"
          placeHolder="Caroline Street"
          v-model="event.friendlyName"
        />
        <form-input
          label="Description"
          type="textarea"
          placeHolder="A Free Stand to take what you need from, and give to when you can"
          v-model="event.description"
        />
        <changeable-image v-model="event.picture" />
      </form>
    </div>
    <div></div>
  </div>
</template>

<script>
import FormInput from '../components/FormInput.vue'
import { mapActions } from 'vuex'

export default {
  name: 'Profile',
  methods: {
    ...mapActions([
      'updateUser' // map `this.updateUser(user)` to `this.$store.dispatch('updateUser', user)`
    ])
  }
}
</script>
