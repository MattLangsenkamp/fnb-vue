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
        <!-- add or back -->
        <button
          class="button"
          title="Login or create an account to add locations"
          @click="setAdding(), setSettingLocation()"
          v-if="!isAdding"
        >
          {{ 'Add a Location' }}
        </button>
        <button
          class="button"
          title="Cancel"
          @click="setNotAdding"
          v-else-if="isSettingLocation"
        >
          {{ 'Cancel' }}
        </button>
        <button
          class="button"
          title="Change Location"
          @click="setSettingLocation"
          v-else-if="isFillingOutForm"
        >
          {{ 'Change Location' }}
        </button>

        <!-- forward or submit -->
        <button
          class="button"
          title="Set Location Position"
          @click="setFillingForm"
          v-if="isSettingLocation"
        >
          {{ 'Set Position' }}
        </button>
        <button
          class="button"
          title="Submit"
          @click="setSubmitting"
          v-if="isFillingOutForm"
        >
          {{ 'Add Location' }}
        </button>
      </l-control>

      <l-control
        position="bottomright"
        class="leaflet-style"
        v-if="isFillingOutForm"
      >
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
          <button class="button" @click="addLoc">
            Submit
          </button>
        </form>
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
      <new-location-marker v-if="adding" @moved="setLatLong" />
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

import { mapActions } from 'vuex'
import FnbMapMarker from './FnbMapMarker.vue'
import 'leaflet/dist/leaflet.css'
import NewLocationMarker from './NewLocationMarker.vue'
import FormInput from './FormInput.vue'
import ChangeableImage from './ChangeableImage.vue'

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
    NewLocationMarker,
    FormInput,
    ChangeableImage
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
      adding: false,
      selectingSpot: false,
      fillingForm: false,
      submitting: false,

      event: {
        name: '',
        friendlyName: '',
        description: '',
        latitude: '',
        longitude: '',
        picture: '',
        locationTags: []
      }
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
    },
    isSettingLocation() {
      return this.selectingSpot
    },
    isFillingOutForm() {
      return this.fillingForm
    },
    locs() {
      return this.$store.state.locs
    }
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    centerUpdate(center) {
      this.currentCenter = center
    },
    setAdding() {
      this.adding = true
    },
    setNotAdding() {
      this.adding = false
      this.selectingSpot = false
      this.fillingForm = false
      this.submitting = false
    },
    setSettingLocation() {
      this.selectingSpot = true
      this.fillingForm = false
      this.submitting = false
    },
    setFillingForm() {
      this.fillingForm = true
      this.selectingSpot = false
      this.submitting = false
    },
    setSubmitting() {
      this.submitting = true
      this.selectingSpot = false
      this.fillingForm = false
      this.adding = false
    },
    setLatLong(latLong) {
      this.event.latitude = latLong.lat
      this.event.longitude = latLong.lng
    },
    ...mapActions(['addLocation']),
    addLoc(e) {
      e.preventDefault()
      this.addLocation(this.event)
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
  align-self: flex-end;
  font: bold 18px 'Lucida Console', Monaco, monospace;
  background-color: #fff;
  text-align: center;
  text-decoration: none;
  color: black;
  border-radius: 4px;
  border: 2px solid #ccc;
}

.new-form {
  font: bold 18px 'Lucida Console', Monaco, monospace;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  text-align: left;
  text-decoration: none;
  color: black;
  border-radius: 4px;
  border: 2px solid #ccc;
  padding: 0.7em;
  max-width: 50%;
}
.new-loc-input {
  font: 13px 'Lucida Console', Monaco, monospace;
}
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
  margin-right: 1.2vh;
}
</style>
