import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:8080/graphql'
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render() {
    return h(App)
  }
})
  .use(router)
  .mount('#app')
