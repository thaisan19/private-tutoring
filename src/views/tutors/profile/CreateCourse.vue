<template>
  <div v-if="activeTutor" class="main-tutor-profile tutor-course-create">
    <div class="main-body create-course">
      <AddCourse class="main-comp-add-course" />
    </div>
  </div>
  <div v-else class="main-body create-course">
    <h1>Loading Add Course Form...🤗🙏</h1>
  </div>
</template>

<script>
import axios from 'axios'
import AddCourse from '../../../components/admin/course-data/AddCourse.vue'

export default {
  components: {
    AddCourse
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
.create-course {
 background: #fff;
 border: 3px solid rgba(0,0,0,0.1);
 box-shadow: -10px 10px 0 rgba(0,0,0,0.1);
 width: 60%;
 z-index: 1000;
 position: relative;
}
.main-tutor-profile {
 position: relative;
 z-index: 1;
}
.main-comp-add-course {
  position: relative;
}
.main-tutor-profile::before,
.main-body::before {
  content: "";
  background: url('../../../assets/background-pattern-bottom-right-to-top-left.png');
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  z-index: 0;
}
.main-body::before {
  background: url('../../../assets/background-pattern-vertical.png');
}

@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
  .create-course {
    width: 90%;
  }
}

@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  .create-course {
    width: 90%;
  }
}
</style>