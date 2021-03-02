<template>
  <fnb-map
    class="map p-2 pb-12 m-auto max-w-m md:max-w-3xl lg:max-w-5xl xl:max-w-7xl h-56"
  />
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
  height: 80vh;
}
</style>
