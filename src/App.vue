<template>
  <Header />
  <router-view class="font-mono" />
</template>

<script>
import Header from '../src/components/Header.vue'

export default {
  title: 'Roc Food Not Bombs',
  name: 'App',
  components: {
    Header
  },
  created() {
    this.$store.dispatch('init')
  }
}
</script>

<style></style>
