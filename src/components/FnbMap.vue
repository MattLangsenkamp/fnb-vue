<template>
  <div class="map">
    <button class="button" @click="changeIcon">hi</button>
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :options="mapOptions"
      :center="[43.1521, -77.607649]"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      :zoomAnimation="true"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-control-layers />

      <l-marker :lat-lng="test" draggable @moveend="log">
        <l-tooltip>
          lol I have much more content
        </l-tooltip>
      </l-marker>

      <l-marker :lat-lng="[50, 50]" draggable @moveend="log('moveend')">
        <l-popup>
          lol
          <img :src="iconUrl" />
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
  LRectangle
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'FnbMap',
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip,
    LPopup,
    LPolyline,
    LPolygon,
    LRectangle
  },
  data() {
    return {
      test: [43.1521, -77.607649],
      zoom: 13,
      iconWidth: 25,
      iconHeight: 40,
      mapOptions: {
        zoomSnap: 0.5
      }
    }
  },
  computed: {
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight]
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
    changeIcon() {
      this.iconWidth += 2
      if (this.iconWidth > this.iconHeight) {
        this.iconWidth = Math.floor(this.iconHeight / 2)
      }
    }
  }
}
</script>

<style scoped>
.map {
  height: 100%;
  width: 100%;
}
</style>
