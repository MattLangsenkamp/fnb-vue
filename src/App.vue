<template>
  <Modal
    v-if="$store.state.modal.areYouSureOpen"
    title="Delete Location"
    message="Are you sure you want to delete this location? This action cannot be undone"
    :action="deleteLoc"
    :nonAction="toggleAttDel"
  />
  <div
    class="h-screen flex  flex-col justify-between scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-200 "
  >
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
