<template>
  <div id="nav">
    <img class="logo" alt="Roc Food Not Bombs" src="../assets/rfnb.svg" />
    <div class="links">
      <div class="dropdown">
        <img
          class="user-img"
          alt="default-login-img"
          src="../assets/login-default.svg"
        />
        <div class="dropdown-content">
          <router-link class="nav-link-embedded" to="/signin"
            >sign in</router-link
          >
          <router-link class="nav-link-embedded" to="/signup"
            >sign up</router-link
          >
        </div>
      </div>
      <router-link to="/locations">Locations</router-link>
      <router-link to="/">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      fetchedImage: ''
    }
  },
  computed: {
    loginImage() {
      return this.fetchedImage ? 'poo' : '../assets/rfnb.svg'
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
  margin-bottom: 6vh;
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
