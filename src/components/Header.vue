<template>
  <div class="relative pt-6 px-4 sm:px-6 lg:px-8 mb-20">
    <nav
      class="relative flex items-center justify-between sm:h-10 "
      aria-label="Global"
    >
      <div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
        <div class="flex items-center justify-between w-full md:w-auto">
          <a href="#">
            <span class="sr-only">Workflow</span>
            <img class="h-8 w-auto sm:h-10" src="../assets/rocflower.svg" />
          </a>
          <div class="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
              @click="toggleExpand"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Heroicon name: outline/menu -->
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
        <router-link
          to="/"
          class="font-medium text-gray-500 hover:text-gray-900"
          >About</router-link
        >

        <router-link
          to="/locations"
          class="font-medium text-gray-500 hover:text-gray-900"
          >Map</router-link
        >
        <router-link
          v-if="!loggedIn"
          to="/signin"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          >Log in</router-link
        >
        <router-link
          v-if="!loggedIn"
          to="/signup"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          >Sign up</router-link
        >
        <router-link
          v-if="loggedIn"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          :to="{ name: 'Profile', params: { id: userId } }"
          >Profile</router-link
        >
        <a
          href="#"
          v-if="loggedIn"
          @click="logOut"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          >Log out</a
        >
      </div>
    </nav>
  </div>
  <transition name="fade">
    <div
      v-if="isExpanded"
      class="absolute top-0 inset-x-0 p-2 transition delay-700 transform origin-top-right md:hidden z-matt"
    >
      <div
        class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
      >
        <div class="px-5 pt-4 flex items-center justify-between">
          <div>
            <img class="h-8 w-auto" src="../assets/rocflower.svg" alt="" />
          </div>
          <div class="-mr-2">
            <button
              type="button"
              class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              @click="toggleExpand"
            >
              <span class="sr-only">Close main menu</span>
              <!-- Heroicon name: outline/x -->
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            to="/"
            class="block text-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >About</router-link
          >

          <router-link
            to="/locations"
            class="block text-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >Map</router-link
          >
        </div>
        <router-link
          v-if="!loggedIn"
          to="/signin"
          class="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
        >
          Log in
        </router-link>
        <router-link
          v-if="!loggedIn"
          to="/signup"
          class="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
        >
          Sign up
        </router-link>
        <router-link
          v-if="loggedIn"
          class="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
          :to="{ name: 'Profile', params: { id: userId } }"
          >profile</router-link
        >
        <a
          href="#"
          v-if="loggedIn"
          @click="logOut"
          class="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
          >Log Out</a
        >
      </div>
    </div>
  </transition>
</template>

<script>
import { watch } from 'vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    ...mapActions(['getUserData', 'logOut']),
    toggleExpand() {
      this.expanded = !this.expanded
    }
  },
  computed: {
    isExpanded() {
      return this.expanded
    },
    userId() {
      return this.$store.state.authMod.loggedInUser.jti
    },
    profileImage() {
      const user = this.$store.state.userDataMod.userDatas.find(
        us => us.orgUserId == this.userId
      )
      if (!user && this.loggedIn == true) {
        this.getUserData(parseInt(this.$store.state.authMod.loggedInUser.jti))
        return null
      }
      return user.pictureURI
    },
    loggedIn() {
      return this.$store.state.authMod.loggedInUser != null
    }
  },
  watch: {
    loggedIn: function() {
      if (this.loggedIn == true) {
        this.getUserData(parseInt(this.$store.state.authMod.loggedInUser.jti))
      }
    }
  }
}
</script>
<style scoped>
.z-matt {
  z-index: 2000;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.175s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
