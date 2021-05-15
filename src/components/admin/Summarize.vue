<template>
  <div class="sum-content">
    <router-link to="/pvt-admin/request">
    <div class="requests">
      <div class="icon">
        🔔
      </div>
      <div class="number">
        <h1>{{ courses.length }}</h1>
        <h2>Requests</h2>
        <p>of all time</p>
      </div>
    </div>
    </router-link>
    <router-link to="/pvt-admin/tutor">
    <div class="tutors">
      <div class="icon">
        👨‍⚖️
      </div>
      <div class="number">
        <h1>{{ tutors.length }}</h1>
        <h2>Tutors</h2>
        <p>registered in system</p>
      </div>
    </div>
    </router-link>
    <router-link to="/pvt-admin/course">
    <div class="courses">
      <div class="icon">
        📚
      </div>
      <div class="number">
        <h1>{{ courses.length }}</h1>
        <h2>Courses</h2>
        <p>added by all tutors</p>
      </div>
    </div>
    </router-link>     
  </div>
</template>

<script>
export default {
  computed: {
    courses() {
      return this.$store.getters['courses/courses'];
    },
    tutors() {
      return this.$store.getters['tutors/tutors'];
    }
  },
  mounted() {
    this.$store.dispatch("courses/getCourses"),
    this.$store.dispatch("tutors/getTutors")
  }
}
</script>

<style scoped>
.sum-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-gap: 3rem;
  padding: 3em;
  margin-top: 2em;
}
.requests, .courses, .tutors {
  padding: 2em;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 3px solid var(--black);
  box-shadow: -5px 5px 0px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
}
.requests:hover, .courses:hover, .tutors:hover {
  transform: scale(1.1) rotateZ(-2deg);
  box-shadow: -10px 10px 0px rgba(0,0,0,0.1);
}
.requests::after, .courses::after, .tutors::after {
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: 0;
  overflow: hidden;
	background: url('../../assets/background-pattern-bottom-right-to-top-left.png');
	background-repeat: no-repeat;
  background-size: cover;
	opacity: 0.6;
}
.requests h1, .courses h1, .tutors h1 {
  font-size: 2.5em;
}
.icon {
  font-size: 5em;
}
a {
  color: var(--black);
}

@media only screen and (min-device-width : 320px) and (max-device-width : 900px) {
  .sum-content {
    padding: 1em 2em;
  }
}
@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  .sum-content {
    padding: 1em 2em;
  }
}
</style>