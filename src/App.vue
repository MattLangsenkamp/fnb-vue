<template>
  <div
    class="h-screen flex  flex-col justify-between scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-200 "
  >
    <Modal
      v-if="modalIf"
      :title="modalTitle"
      :message="modalMessage"
      :action="modalAction"
      :nonAction="closeAreYouSure"
    />
    <Header />
    <router-view class="font-mono" />
    <Footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Header from '../src/components/Header.vue'
import Footer from './components/Footer.vue'
import Modal from './components/Modal.vue'

export default {
  title: 'Roc Food Not Bombs',
  name: 'App',
  components: {
    Header,
    Footer,
    Modal
  },
  created() {
    this.$store.dispatch('init')
  },
  methods: {
    ...mapActions(['closeAreYouSure'])
  },
  computed: {
    modalIf() {
      return this.$store.state.modal.areYouSureOpen
    },
    modalTitle() {
      return this.$store.state.modal.areYouSureTitle
    },
    modalMessage() {
      return this.$store.state.modal.areYouSureMessage
    },
    modalAction() {
      return this.$store.state.modal.areYouSureAction
    }
  }
}
</script>

<style></style>
