<template>
  <div class="container-about">
    <information-card
      :title="data.about.title"
      :mainImg="require(`../assets/fnb_info.jpg`)"
      :description="data.about.desc"
      class="odd"
    />
    <information-card
      :title="data.Covid.title"
      :mainImg="require(`../assets/covid19.jpg`)"
      :description="data.Covid.desc"
      class="odd"
    />
    <information-card
      :title="data.donate.title"
      :mainImg="require(`../assets/money.png`)"
      :description="data.donate.desc"
      class="odd"
    />
    <information-card
      :title="data.friends.title"
      :description="data.friends.desc"
      :subImgs="true"
      class="odd"
    />
  </div>
</template>

<script>
import json_data from '../assets/about-data.json'
import InformationCard from '../components/InformationCard.vue'
export default {
  components: { InformationCard },
  data() {
    return { data: json_data }
  }
}
</script>

<style scoped>
.container-about {
  margin-top: 10vh;
}

.odd {
  margin-right: auto;
  margin-left: auto;
}

.even {
  margin-right: auto;
  margin-left: auto;
}
</style>
