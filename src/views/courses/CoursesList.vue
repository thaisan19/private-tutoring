<template>
  <div class="courses-list">
    <div v-if="courses.length">
      <CoursesListComp :courses="courses" />
    </div>
    <div v-else class="loading">
      <h1>Loading Courses Data...🙌🙏🤗</h1>
    </div>
  </div>
</template>

<script>
import CoursesListComp from '@/components/course/CoursesListComp.vue'


export default {
  components: {
    CoursesListComp
  },
  computed: {
    courses() {
      return this.$store.getters['courses/publishedCourses'];
    },
  },
  created() {
    this.$store.dispatch('courses/getPublishedCourses')
  }
}
</script>

<style scoped>
.courses-list {
  width: 80%;
  height: auto;
  margin: 0 auto;
}

@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
  .courses-list {
    width: 85%;
  }
}

@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  .courses-list {
    width: 90%;
  }
}
</style>