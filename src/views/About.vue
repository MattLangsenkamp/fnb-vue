<template>
  <div
    class="font-mono scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-200 overflow-y-scroll text-gray-500 map p-2 pb-12 m-auto max-w-m md:max-w-3xl lg:max-w-5xl xl:max-w-7xl h-full"
  >
    <div
      class="flex p-4 mb-8 justify-center scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-200 overflow-x-scroll"
    >
      <img
        v-for="pic in pics"
        :key="pic.id"
        :src="pic.imageUri + '?ver=' + getDate()"
        class="rounded h-32 sm:h-56 w-auto m-1"
      />
    </div>
    <p>
      Since the onset of covid-19 mutual aid efforts in the Rochester Area have
      been on the rise. One project many have invested time into is the free
      food stand project. Many different organizations and individuals have
      taken part in this collective effort to combat food insecurity. This
      website is meant as a tool for these organizations and individuals to
      share information people who use these free resources. The map contains
      locations and information about these locations as to how to use the aid
      they contain. If you have a resource you would like to add to the map log
      in or sign up and go to the map. This website does not take credit for or
      manage any of these locations. If you would like to get in contact with a
      location steward please see that locations page.
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {},
  methods: {
    ...mapActions(['imageUrls']),
    getDate() {
      var d = new Date()
      return d.getTime()
    }
  },
  data() {
    return {
      picsD: []
    }
  },
  computed: {
    pics() {
      return this.picsD
    }
  },
  created() {
    this.imageUrls({ type: 'location' }).then(data => {
      console.log(data)
      for (let index = 0; index < 5 && index < data.length; index++) {
        this.picsD.push(data[index])
      }
    })
    this.picsD
      .map(a => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value)
  }
}
</script>
