<template>
  <div id="nav">
    <img class="logo" alt="Roc Food Not Bombs" src="../assets/rfnb.svg" />
    <div class="links">
      <div class="dropdown">
        <img
          v-if="!loggedIn"
          class="user-img"
          alt="profile"
          src="../assets/login-default.svg"
        />
        <img
          v-if="loggedIn"
          class="user-img"
          alt="profile"
          :src="profileImage"
        />

        <div class="dropdown-content">
          <router-link v-if="!loggedIn" class="nav-link-embedded" to="/signin"
            >sign in</router-link
          >
          <router-link v-if="!loggedIn" class="nav-link-embedded" to="/signup"
            >sign up</router-link
          >
          <router-link
            v-if="loggedIn"
            class="nav-link-embedded"
            :to="{ name: 'Profile', params: { id: userId } }"
            >profile</router-link
          >
          <button v-if="loggedIn" @click="logOut">Log Out</button>
        </div>
      </div>
      <router-link to="/locations">Locations</router-link>
      <router-link to="/">About</router-link>
    </div>
  </div>
</template>

<script>
import { watch } from 'vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Header',
  methods: {
    ...mapActions(['getUser', 'logOut']),
    ...mapGetters(['userData'])
  },
  computed: {
    userId() {
      return this.$store.state.loggedInUser.jti
    },
    profileImage() {
      const user = this.$store.state.users.find(
        us => us.orgUserId == this.userId
      )
      if (!user && this.loggedIn == true) {
        this.getUser(parseInt(this.$store.state.loggedInUser.jti))
        return null
      }
      return user.pictureURI
    },
    loggedIn() {
      return this.$store.state.loggedInUser != null
    }
  },
  watch: {
    loggedIn: function() {
      if (this.loggedIn == true) {
        this.getUser(parseInt(this.$store.state.loggedInUser.jti))
      }
    }
  }
}
</script>
<style scoped>
#nav {
  border-bottom: 1px solid black;
  height: 5vh;
  flex-direction: row;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 7em;
}
.user-img {
  height: 2.4em;
  margin: 1em;
}

#nav a:hover,
.user-img:hover {
  transform: scale(1.1);
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.6);
}

.user-img:hover {
  border-radius: 1.2em;

  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.6);
  -o-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.6);
}

.dropdown:hover .dropdown-content {
  display: block;
}
.logo {
  position: ablsolute;
  height: 10em;
  display: none;
  z-index: 2000;
}
@media screen and (min-width: 540px) {
  .logo {
    display: inline;
  }
}

.logo:hover {
  transform: scale(1.1);
}

.links {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

#nav a {
  font-weight: bold;
  font-size: 1.5rem;
  color: black;
  margin: 1em;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #b9519e;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content {
  display: none;
  position: absolute;
  margin-left: -5.5em;
  background-color: #e4e4e4;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.4);
  z-index: 2000;
}
</style>
