<template>
  <CoursesTable :courses="courses" />
</template>

<script>
import CoursesTable from '../../../components/admin/course-data/CoursesTable'

export default {
  components: {
    CoursesTable
  },
  computed: {
    courses() {
      return this.$store.getters['courses/courses'];
     },
    },
    created() {
     this.$store.dispatch('courses/getCourses')
    }
}
</script>

<style>

</style>