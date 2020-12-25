<template>
  <div class="container">
    <div class="top-bar">
      <img
        id="main-img"
        alt="nope"
        height="300"
        v-bind:src="mainImg"
        v-if="mainImg != null"
      />
      <div class="words" v-if="mainImg != null">
        <h2>{{ title }}</h2>
        <p id="desc">{{ description }}</p>
      </div>
      <div class="friends" v-else>
        <h2>{{ title }}</h2>
        <p id="desc">{{ description }}</p>
      </div>
    </div>
    <div class="bottom-bar" v-if="subImgs === true">
      <div class="bottom-bar-inner" v-for="(obj, key) in list" :key="key">
        <img
          :src="`${obj.subImg}`"
          alt=""
          height="70"
          @click="myFunction(`${obj.link}`)"
          :title="`${obj.hoverText}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { rfnb } from '../assets/pics'

export default {
  name: 'InformationCard',
  props: {
    title: {
      type: String,
      required: true
    },
    mainImg: {
      type: String,
      required: false,
      default: null
    },
    description: {
      type: String,
      required: true
    },
    subImgs: {
      type: Boolean,
      required: false,
      default: null
    }
  },
  data() {
    return {
      list: [
        {
          hoverText: 'Flower City Pickers',
          subImg: require('../assets/fcp_logo-dark.png'),
          link: 'https://flowercitypickers.org/'
        },
        {
          hoverText: 'Rochester Mutual Aid Network',
          subImg: require('../assets/rman.png'),
          link: 'https://www.facebook.com/rocmutualaid'
        },
        {
          hoverText: 'Street Medics',
          subImg: require('../assets/street-medics.jpg'),
          link: 'https://www.facebook.com/RocStreetMedics/'
        },
        {
          hoverText: 'Free The People Roc',
          subImg: require('../assets/ftp.jpg'),
          link: 'https://www.facebook.com/ftproc'
        },
        {
          hoverText: 'Roc Food Relief',
          subImg: require('../assets/roc_food_relief.png'),
          link: 'https://www.facebook.com/liberateallblacklives'
        },
        {
          hoverText: 'LABL',
          subImg: require('../assets/labl.jpg'),
          link: 'https://www.facebook.com/liberateallblacklives'
        }
      ]
    }
  },
  methods: {
    myFunction(link) {
      console.log(`"${link}"`)
      window.open(link, '_blank')
    }
  }
}
</script>

<style scoped>
.container {
  padding: 5px;
  height: 100%;
  width: 95%;
  border: 1px solid black;
  margin-left: auto;
  margin-bottom: 2em;
  margin-right: auto;
  display: block;
}

#main-img {
  display: none;
  width: 33%;
  object-fit: cover;
}

#desc {
  padding-left: 5px;
}

@media screen and (min-width: 920px) {
  .container {
    height: 100%;
    width: 55.304em;
  }
  #main-img {
    display: block;
  }
}

.words {
  width: 100%;
  height: 100%;
}

@media screen and (min-width: 600px) {
  #main-img {
    display: block;
  }
}

.container:hover {
  transform: scale(1.05);
}
.top-bar {
  flex-flow: row nowrap;
  display: flex;
}

.friends {
  width: 100%;
  height: 100%;
}
.bottom-bar {
  display: flex;

  justify-content: space-around;
  flex-flow: row wrap;
  width: 100%;
  height: 70px;
}
</style>
