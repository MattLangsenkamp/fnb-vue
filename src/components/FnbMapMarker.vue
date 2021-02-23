<template>
  <l-marker :lat-lng="[loc.latitude, loc.longitude]" v-if="show">
    <l-tooltip>
      {{ loc.locationName }}
    </l-tooltip>
    <l-popup class="popup">
      <img src="https://via.placeholder.com/150x100" />
      <div class="col">
        <div>
          {{ loc.locationName }}
        </div>
        <div>
          {{ loc.description }}
        </div>
        <a :href="url" target="_blank">open in google maps for directions</a>
        <button @click="goToProfile">location owner</button>
        <button @click="goToLocation">location page</button>
      </div>
    </l-popup>
  </l-marker>
</template>

<script>
import { LMarker, LTooltip, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'FnbMapMarker',
  components: {
    LMarker,
    LTooltip,
    LPopup
  },
  props: {
    loc: Object,
    adding: Boolean
  },
  methods: {
    goToProfile() {
      this.$router.push({
        name: 'Profile',
        params: { id: this.loc.locationOwner }
      })
    },
    goToLocation() {
      this.$router.push({
        name: 'LocationPage',
        params: { id: this.loc.id }
      })
    }
  },
  computed: {
    url() {
      return `https://www.google.com/maps/search/?api=1&query=${this.loc.latitude},${this.loc.longitude}`
    },
    show() {
      return !this.adding
    }
  }
}
</script>

<style scoped>
.col {
  display: flex;
  flex-flow: column nowrap;
  padding-left: 10px;
}
.popup {
  display: flex;
  flex-flow: row nowrap;
}
</style>
