import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store.js'
import { VuelidatePlugin } from '@vuelidate/core'
import './index.css'

const app = createApp({
  render() {
    return h(App)
  }
})
  .use(router)
  .use(store)
  .use(VuelidatePlugin)
  .mount('#app')
