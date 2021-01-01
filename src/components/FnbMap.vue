<template>
  <div class="map">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :options="mapOptions"
      :center="[43.1521, -77.607649]"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      :zoomAnimation="true"
    >
      <l-control position="topright">
        <button
          class="button"
          title="Login or create an account to add locations"
          @click="setAdding"
        >
          {{ isAdding ? 'click to set location' : 'Add location' }}
        </button>
      </l-control>
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>

      <fnb-map-marker
        v-for="loc in locs"
        :key="loc.id"
        :loc="loc"
        :adding="isAdding"
      />
      <new-location-marker v-if="adding" />
    </l-map>
  </div>
</template>

<script>
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControl,
  LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
  LRectangle
} from '@vue-leaflet/vue-leaflet'

import FnbMapMarker from './FnbMapMarker.vue'
import 'leaflet/dist/leaflet.css'
import NewLocationMarker from './NewLocationMarker.vue'

export default {
  name: 'FnbMap',
  components: {
    FnbMapMarker,
    LMap,
    LIcon,
    LTileLayer,
    LControl,
    LControlLayers,
    LPolyline,
    LPolygon,
    LRectangle,
    NewLocationMarker
  },
  data() {
    return {
      test: [43.1521, -77.607649],
      zoom: 13,
      iconWidth: 25,
      iconHeight: 40,
      mapOptions: {
        zoomSnap: 0.5
      },
      locs: [
        {
          id: 1,
          friendlyName: 'f-hfasdfasdfi',
          description: 'first',
          latitude: 43.1531,
          longitude: -77.607649,
          locationName: 'i',
          needsCleaning: false,
          creationDateTime: '2020-12-25T01:57:24.958576Z',
          pictureURI: 'goober',
          locationOwner: 1,
          locationTags: [
            {
              id: 1
            }
          ]
        },
        {
          id: 2,
          friendlyName: 'f-hfasdfasdfi',
          description: 'cool i made another',
          latitude: 43.1521,
          longitude: -77.617649,
          locationName: 'south wedge mission',
          needsCleaning: false,
          creationDateTime: '2020-12-25T03:49:31.407661Z',
          pictureURI: 'goober',
          locationOwner: 1,
          locationTags: []
        }
      ],
      adding: false
    }
  },
  computed: {
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight]
    },
    isAdding() {
      return this.adding
    }
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    centerUpdate(center) {
      this.currentCenter = center
    },
    log(a) {
      console.log(a)
    },

    setAdding() {
      this.adding = !this.adding
    }
  }
}
</script>

<style scoped>
.map {
  height: 100%;
  width: 100%;
  align-items: flex-end;
  display: flex;
  flex-flow: column nowrap;
}

.button {
  margin-bottom: 6vh;
  align-self: flex-end;
  font: bold 18px 'Lucida Console', Monaco, monospace;
  background-color: #fff;
  text-align: center;
  text-decoration: none;
  color: black;
  border-radius: 4px;
  border: 2px solid #ccc;
}
.button:focus {
}
</style>
