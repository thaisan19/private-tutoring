<template>
  <div class="own-course">
    <div class="course-by-tutor" v-if="ownedCourses">
      <main-button mode="btn black" class="add" link to="/courses/create">
        <p v-if="!isMobile">
          Add New Course ➕
        </p>
        <p v-if="isMobile">
          Add ➕
        </p>
        </main-button>
      <CoursesListComp :courses="ownedCourses" />
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import CoursesListComp from '../../../components/course/CoursesListComp'

export default {
  components: {
    CoursesListComp
  },
  data() {
    return {
      userId: null,
      ownedCourses: null,
      windowWidth: window.innerWidth
    }
  },
  async created() {
    if(localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId')
    }

    await axios.get(`http://localhost:5000/api/tutor/find-tutor/${this.userId}`)
    .then((res) => this.ownedCourses = res.data.coursePublished)
  },
  computed: {
    isMobile() {
      if(this.windowWidth < 480) {
        return true
      }
    },
    isTablet() {
      if(this.windowWidth < 1024 && this.windowWidth > 500) {
        return true
      }
    }
  },
  watch: {
    width(newWidth, oldWidth) {
      this.txt = `it change to ${newWidth} from ${oldWidth}`;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    }
  }
}
</script>

<style scoped>
.course-by-tutor {
  width: 80%;
  margin: 0 auto;
}
.add {
  position: absolute;
  margin-top: 1.5em;
}

@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
  .add {
  margin-top: 1.5em;
}
}
</style>