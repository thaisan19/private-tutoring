<template>
  <div class="add-course-view">
    <h1>📕 Add Course:</h1>
    <form @submit.prevent="handleAddCourse">
      <div class="add-course-row01">
        <div class="name">
          <label>📚 Course Name:</label>
          <input type="text" v-model="name" required>
        </div>
      </div>

      <div class="add-course-row02">
        <div class="name">
          <label>🤗 Tutoring by:</label>
          <input type="text" v-model="createdBy" required>
        </div>
        <div class="length">
          <label>⏳ Course Length:</label>
          <input type="text" v-model="courseLength" required>
        </div>
        <div class="price">
          <label>💲 Course Price:</label>
          <input type="number" v-model="price" required>
        </div>

      </div>
      <div class="add-course-row03">
        <div class="desc">
          <label>🎫 Course Description:</label>
          <textarea v-model="courseDesc" required/>
        </div>
      </div>
      <div class="add-course-row04">
        <div class="requirement">
          <label>🥊 Course Requirement:</label>
          <textarea v-model="courseRequirement" required/>
        </div>
        <div class="expectation">
          <label>🎯 Course Expectation:</label>
          <textarea v-model="courseExpectation" required/>
        </div>
      </div>
      <div class="add-course-row05">
        <div class="tutoring-days">
          <label>📆 Tutoring Days (Enter to break)</label>
          <input 
            @keydown.enter.prevent="handleDayKeydown"
            v-model="day"
            type="text">
            <div v-for="day in days" :key="day" class="pill" @click="removeDay(day)">
              {{ day }} ❌
            </div>
        </div>
        <div class="tutoring-hours">
          <label>⏱ Tutoring Hours (Enter to break)</label>
          <input 
            @keydown.enter.prevent="handleHourKeydown"
            v-model="hour"
            type="text">
            <div v-for="hour in hours" :key="hour" class="pill" @click="removeHour(hour)">
              {{ hour }} ❌
            </div>
        </div>
      </div>
      <div class="add-course-row06">
      <main-button mode="btn black">Create New ➕</main-button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const name = ref('')
    const createdBy = ref('')
    const courseLength = ref('')
    const price = ref('')
    const courseDesc = ref('')
    const courseRequirement = ref('')
    const courseExpectation = ref('')
    const days = ref([])
    const day = ref('')
    const hours = ref([])
    const hour = ref('')
    const ownerId = ref(null)
    const role = ref('')
    const admin = ref('admin')
    const tutor = ref('tutor')

    const router = useRouter()

    const handleDayKeydown = () => {
      if (!days.value.includes(day.value)) {
        day.vlaue = day.value.replace(/\s/g, '')
        days.value.push(day.value)
      }
      day.value = ''
    }

    const removeDay = (day) => {
      let id = day;
      let idx = days.value.indexOf(id);
      days.value.splice(idx, 1);
    }

    const handleHourKeydown = () => {
      if (!hours.value.includes(hour.value)) {
        hour.vlaue = hour.value.replace(/\s/g, '')
        hours.value.push(hour.value)
      }
      hour.value = ''
    }

    const removeHour = (hour) => {
      let id = hour;
      let idx = hours.value.indexOf(id);
      hours.value.splice(idx, 1);
    }

    return {
      removeDay,
      removeHour,
      name,
      createdBy,
      courseLength,
      price,
      courseDesc,
      courseRequirement,
      courseExpectation,
      days,
      day,
      hours,
      hour,
      ownerId,
      handleHourKeydown, 
      handleDayKeydown,
      role,
      tutor,
      admin }
  },
  methods: {
    async handleAddCourse() {
      await axios.post('http://localhost:5000/api/course/create', {
        name: this.name,
        createdBy: this.createdBy,
        courseLength: this.courseLength,
        price: this.price,
        ownerId: this.ownerId,
        courseDesc: this.courseDesc,
        courseRequirement: this.courseRequirement,
        courseExpectation: this.courseExpectation,
        tutoringDays: this.days,
        tutoringHours: this.hours
      }).then(() => {
       this.$toast('Add New Course Successed!', {
         duration: 3000,
         slotLeft: `🎉`,
         slotRight: `🎊`,
         styles: {
           borderRadius: '0px',
           backgroundColor: 'var(--blue)',
           color: '#fff',
           borderColor: 'var(--black)',
           boxShadow: '-5px 5px 0px rgba(0,0,0,0.1)',
           border: '3px solid var(--black)'
         },
         class: 'local-class',
         positionX: 'center',
         positionY: 'top',
         disableClick: false
       })
        if(this.role = this.tutor) {
         setTimeout(() => {
           this.$router.push('/courses/user')
         }, 2000)
       } if (this.role = this.admin) {
         setTimeout(() => {
           this.$router.push('/courses/user')
         }, 2000)
       }
     }).catch(err =>
       this.$toast('Could not Add New Course!' + err, {
         duration: 3000,
         slotLeft: `💥`,
         slotRight: `❗❕`,
         styles: {
           borderRadius: '0px',
           backgroundColor: 'var(--red)',
           color: '#fff',
           borderColor: 'var(--black)',
           boxShadow: '-5px 5px 0px rgba(0,0,0,0.1)',
           border: '3px solid var(--black)'
         },
         class: 'local-class',
         positionX: 'center',
         positionY: 'top',
         disableClick: false
       })
     )
    }
  },
  // computed: {
  //   getRole() {
  //     if(localStorage.getItem('role') === 'admin') {
  //       role.value = "admin"
  //     } else {
  //       role.value = "tutor"
  //     }
  //   }
  // },
  created() {
    if(localStorage.getItem('userId') !== null) {
      this.ownerId = localStorage.getItem('userId')
      this.role = localStorage.getItem('role')
      // console.log(this.role)

      // await axios.get(`http://localhost:5000/api/tutor/find-tutor/${this.userId}`)
      //   .then((res) => this.activeTutor = res.data)
    }
  }
}
</script>

<style>
.add-course-view {
  padding: 2em;
  position: relative;
}
.add-course-view::before {
  content: "";
  background: url('../../../assets/background-pattern-vertical.png');
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  z-index: -1;
  overflow: hidden;
  opacity: .7;
}
.add-course-row01 {
  padding-top: 2em;
}
.add-course-row01, 
.add-course-row03 {
  padding-bottom: .5em;
}
.add-course-row02,
.add-course-row04,
.add-course-row05 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1.5rem;
  padding-bottom: .5em;
}
.add-course-row06 {
  padding-top: 2em;
  text-align: center;
}
</style>