<template>
  <l-marker :lat-lng="[loc.latitude, loc.longitude]" v-if="show">
    <l-tooltip>
      {{ loc.locationName }}
    </l-tooltip>
    <l-popup class="inline-block break-words  w-64">
      <div class="flex justify-around">
        <img src="https://via.placeholder.com/950x300" class="max-h-60" />
      </div>
      <div class="inline-block p-2">
        <h2 class="text-xl font-bold text-indigo-600 hover:text-indigo-400">
          {{ loc.locationName }} now im cool yes i am woww
        </h2>

        <span
          title="google"
          class="text-lg w-64 flex font-semibold text-indigo-400 hover:text-indigo-200"
        >
          {{ loc.friendlyName }} oak st what
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width="15"
            height="15"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </span>

        <div>
          {{ loc.description }}
        </div>
        <a :href="url" target="_blank">open in google maps for directions</a
        ><br />
        <button @click="goToProfile">go to location steward page</button><br />
        <button @click="goToLocation">go to location page</button>
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
