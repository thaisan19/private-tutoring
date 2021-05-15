<template>
  <TutorsTable :tutors="tutors" />
</template>

<script>
import TutorsTable from '@/components/admin/tutor-data/TutorsTable.vue'

export default {
  components: {
    TutorsTable
  },
  computed: {
    tutors() {
      return this.$store.getters['tutors/tutors'];
    },
  },
  created() {
    this.$store.dispatch('tutors/getTutors')
  }
}
</script>

<style>

</style>