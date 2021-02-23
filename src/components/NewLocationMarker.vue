<template>
  <l-marker draggable :lat-lng="cent" @moveend="moved">
    <l-tooltip>
      drag location to appropriate spot
    </l-tooltip>
    <l-popup class="popup">
      form will go here
    </l-popup>
  </l-marker>
</template>

<script>
import { LMarker, LTooltip, LPopup, LIcon } from '@vue-leaflet/vue-leaflet'
import { icon } from 'leaflet'

import 'leaflet/dist/leaflet.css'

export default {
  name: 'NewLocationMarker',
  emits: ['moved'],
  components: {
    LMarker,
    LTooltip,
    LPopup,
    LIcon
  },
  props: {
    setting: Boolean,
    center: Array
  },
  data() {
    return {
      iconWidth: 45,
      iconHeight: 45
    }
  },
  computed: {
    iconSize() {
      return [this.iconWidth, this.iconHeight]
    },
    cent() {
      return this.center
    }
  },
  methods: {
    moved(e) {
      this.$emit('moved', e.target._latlng)
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
