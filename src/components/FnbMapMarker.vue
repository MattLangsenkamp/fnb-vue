<template>
  <l-marker :lat-lng="[loc.latitude, loc.longitude]" v-if="show">
    <l-tooltip>
      {{ loc.locationName }}
    </l-tooltip>
    <l-popup class="inline-block break-words  w-64">
      <div class="flex justify-around">
        <img :src="imageUri" class="max-h-60 rounded" />
      </div>
      <div class="inline-block p-2">
        <h2
          class="text-xl font-bold text-indigo-600 hover:text-indigo-400"
          @click="goToLocation"
        >
          {{ loc.locationName }}
        </h2>
        <a :href="url" target="_blank">
          <span
            title="google"
            class="text-lg w-64 flex font-semibold text-indigo-400 hover:text-indigo-200"
          >
            {{ loc.friendlyName }}
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
        </a>

        <div>
          {{ loc.description }}
        </div>
        <map-button
          @click="goToProfile"
          title="steward page"
          text="steward page"
          buttonType="form"
        />
      </div>
    </l-popup>
  </l-marker>
</template>

<script>
import { LMarker, LTooltip, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import MapButton from './MapButton.vue'
import { compile } from 'vue-demi'

export default {
  name: 'FnbMapMarker',
  components: {
    LMarker,
    LTooltip,
    LPopup,
    MapButton
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
    },
    imageUri() {
      var d = new Date()
      if (this.loc.imageUrls[0] === void 0) return ''
      return this.loc.imageUrls[0].imageUri + '?ver=' + d.getTime()
    }
  }
}
</script>
