<template>
  <div class="min-h-screen">
    <Header />
    <router-view class="font-mono" />
    <Footer />
  </div>
</template>

<script>
import Header from '../src/components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  title: 'Roc Food Not Bombs',
  name: 'App',
  components: {
    Header,
    Footer
  },
  created() {
    this.$store.dispatch('init')
  }
}
</script>

<style></style>
