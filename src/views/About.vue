<template>
  <div class="container">
    <information-card
      :title="data.about.title"
      :mainImg="require(`../assets/fnb_info.jpg`)"
      :description="data.about.desc"
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
.containerp {
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
