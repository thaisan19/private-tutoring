<template>
  <div v-if="activeTutor" class="main-tutor-profile tutor-profile">
    <div class="main-body profile">
      <TutorFullView :tutor="activeTutor" class="main-comp" />
    </div>
  </div>
  <div v-else class="main-body profile">
    <h1>No Tutor Data Found...💔✋🙏</h1>
  </div>
</template>

<script>
import axios from 'axios'
import TutorFullView from '../../../components/tutor/TutorFullView.vue'

export default {
  components: {
    TutorFullView
  },
  data() {
    return {
      userId: null,
      activeTutor: null
    }
  },
  async mounted() {
    this.userId = localStorage.getItem('userId')

    await axios.get(`https://www.thementor-privatetutoring.me/api/tutor/find-tutor/${this.userId}`)
    .then((res) => this.activeTutor = res.data)
  }
}
</script>

<style>
.main-tutor-profile {
  width: 100%;
  background: var(--blue);
  margin-top: 3em;
  padding: 5em 0em;
}
.main-body {
  width: 60%;
  margin: 0 auto;
  position: relative;
}

@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
  .main-tutor-profile {
    padding: 3em 0;
    margin-top: 0;
  }
  .main-body {
    width: 90%;
  }
}

@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  .main-body {
    width: 80%;
  }
}
</style>