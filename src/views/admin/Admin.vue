<template>
  <div class="dashboard">
    <Summarize />
  </div>
</template>

<script>
import Summarize from '@/components/admin/Summarize.vue'
// import getCourses from '../../composables/getCourses'

export default {
  components: {
    Summarize
  }
}
</script>

<style scoped>
.dashboard {
  width: 80%;
  margin: 0 auto;
  padding: 2em 0;
}

@media only screen and (min-device-width : 320px) and (max-device-width : 900px) {
  .dashboard {
    padding: 0;
    width: 100%;
  }
}
@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
}
</style>