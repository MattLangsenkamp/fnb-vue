<template>
  <div class="m-2 w-full h-full">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :options="mapOptions"
      :center="center"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      :zoomAnimation="true"
      class="rounded-xl"
    >
      <l-control position="topright">
        <!-- add or back -->
        <MapButton
          text="Add a Location"
          title="Login or create an account to add locations"
          @click="setAdding(), setSettingLocation()"
          v-if="!isAdding && loggedIn"
        />
        <MapButton
          text="Cancel"
          title="Cancel"
          @click="setNotAdding"
          v-else-if="isSettingLocation"
        />
        <MapButton
          text="Set Position"
          title="Set Location Position"
          @click="setFillingForm"
          v-if="isSettingLocation"
        />

        <!-- forward or submit -->
        <MapButton
          text="Cancel"
          title="Cancel"
          @click="setNotAdding"
          v-if="isFillingOutForm"
        />
        <MapButton
          text="Change Location"
          title="Change Location"
          @click="setSettingLocation"
          v-if="isFillingOutForm"
        />
      </l-control>

      <l-control
        position="bottomright"
        class="border mr-5 border-indigo-500 max-h-96 bg-white p-1 rounded scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-200 overflow-auto"
        v-if="isFillingOutForm"
      >
        <form class=" max-h-80 ">
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
          <error-message :validationStatus="v.description" />
          <dropzone-image v-model="newImage" label="Location Picture" />
          <MapButton
            text="submit"
            title="submit"
            buttonType="form"
            @click="addLoc"
          />
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
      <new-location-marker
        :center="cent"
        v-on:moved="setLatLong"
        v-if="adding"
      />
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
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import MapButton from './MapButton.vue'
import DropzoneImage from './DropzoneImage'
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
    ChangeableImage,
    ErrorMessage,
    MapButton,
    DropzoneImage
  },
  setup() {
    const name = ref('')
    const friendlyName = ref('')
    const description = ref('')
    const latitude = ref(43.1521)
    const longitude = ref(-77.607649)
    const newImage = ref('')
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
      newImage: { required },
      locationTags: {}
    }
    const v = useVuelidate(rules, {
      name,
      friendlyName,
      description,
      latitude,
      longitude,
      newImage,
      locationTags
    })
    return {
      name,
      friendlyName,
      description,
      latitude,
      longitude,
      newImage,
      locationTags,
      v
    }
  },

  data() {
    return {
      center: [43.1521, -77.607649],
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
      recentered: false
    }
  },
  computed: {
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
      return this.$store.state.locMod.locs
    },
    loggedIn() {
      return this.$store.state.authMod.loggedInUser != null
    },
    cent() {
      if (this.recentered == false) {
        this.recentered = true
        return this.center
      }
    }
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    centerUpdate(center) {
      this.center = center
    },
    setAdding() {
      this.adding = true
    },
    setNotAdding() {
      this.adding = false
      this.selectingSpot = false
      this.fillingForm = false
      this.submitting = false
      this.recentered = false
    },
    setSettingLocation() {
      this.selectingSpot = true
      this.fillingForm = false
      this.submitting = false
    },
    setFillingForm() {
      console.log(this.latitude, this.longitude)
      this.getAddress({
        latitude: String(this.latitude),
        longitude: String(this.longitude)
      }).then(data => {
        this.friendlyName = data.display_name
        this.fillingForm = true
        this.selectingSpot = false
        this.submitting = false
      })
    },
    setSubmitting() {
      this.submitting = true
      this.selectingSpot = false
      this.fillingForm = false
      this.adding = false
    },
    setLatLong(latLong) {
      this.latitude = latLong.lat
      this.longitude = latLong.lng
    },
    ...mapActions(['addLocation', 'getLocations', 'getAddress']),
    addLoc(e) {
      e.preventDefault()
      this.v.$validate()
      this.v.$dirty = true
      if (!this.v.$error) {
        e.preventDefault()
        this.addLocation({
          name: this.name,
          friendlyName: this.friendlyName,
          description: this.description,
          latitude: this.latitude,
          longitude: this.longitude,
          image: this.newImage,
          locationTags: this.locationTags
        }).then(() => {
          this.setNotAdding()
          this.name = ''
          this.friendlyName = ''
          this.description = ''
          this.newImage = ''
          this.locationTags = []
          this.v.$reset()
        })
      }
    }
  },
  created() {
    this.getLocations()
  }
}
</script>
