import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store.js'
import { VuelidatePlugin } from '@vuelidate/core'

const app = createApp({
  render() {
    return h(App)
  }
})
  .use(router)
  .use(store)
  .use(VuelidatePlugin)
  .mount('#app')
