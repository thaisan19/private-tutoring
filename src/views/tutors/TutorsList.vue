<template>
  <div class="tutors-list">
    <div class="courses-list">
      <div v-if="tutors.length">
        <TutorsListComp :tutors="tutors" />
      </div>
      <div v-else class="loading">
        <h1>Loading Tutors Data...🙌🙏🤗</h1>
      </div>
    </div>
  </div>
</template>

<script>
import TutorsListComp from "@/components/tutor/TutorsListComp.vue";

export default {
  components: {
    TutorsListComp,
  },
  computed: {
    tutors() {
      return this.$store.getters["tutors/tutors"];
    },
  },
  created() {
    this.$store.dispatch("tutors/getTutors");
  },
};
</script>

<style scoped>
.tutors-list {
  width: 80%;
  height: auto;
  margin: 0 auto;
}
@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
  .tutors-list {
    width: 90%;
  }
}

@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  .tutors-list {
    width: 90%;
  }
}
</style>
