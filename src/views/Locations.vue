<template>
  <fnb-map class="map" />
</template>

<script>
import FnbMap from '../components/FnbMap.vue'

export default {
  name: 'Locations',
  components: {
    FnbMap
  }
}
</script>

<style scoped>
.map {
  margin-left: auto;
  margin-right: auto;
  height: 73vh;
  width: 80vw;
}
</style>
