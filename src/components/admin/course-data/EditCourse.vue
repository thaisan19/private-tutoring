<template>
  <div class="add-course-view">
    <h1>📕 Edit Course:</h1>
    <form @submit.prevent="handleEditCourse">
      <div class="add-course-row01">
        <div class="name">
          <label>📚 Course Name:</label>
          <input type="text" v-model="name" disabled>
        </div>
      </div>

      <div class="add-course-row02">
        <div class="name">
          <label>🤗 Tutoring by:</label>
          <input type="text" v-model="createdBy" disabled>
        </div>
        <div class="length">
          <label>⏳ Course Length:</label>
          <input type="text" v-model="courseLength" disabled>
        </div>
        <div class="price">
          <label>💲 Course Price:</label>
          <input type="number" v-model="price" disabled>
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
      <main-button mode="btn black">Update Course 🔨</main-button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
 props: ['course'],
 setup () {
   const days = ref([])
   const day = ref('')
   const hours = ref([])
   const hour = ref('')

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
     days, 
     day, 
     hours,
     hour,
     handleDayKeydown,
     handleHourKeydown,
     removeDay,
     removeHour }
 },
 data() {
  return {
   uri: 'https://private-tutoring-backend.herokuapp.com/api/course/',
   name: '',
   createdBy: '',
   courseLength: '',
   price: '',
   courseDesc: '',
   courseRequirement: '',
   courseExpectation: ''
  }
 },
 async mounted() {
   await axios.get(this.uri + 'find-one/' + this.course.id)
    .then(res => {
      this.name = res.data.name,
      this.createdBy = res.data.createdBy,
      this.courseLength = res.data.courseLength,
      this.price = res.data.price,
      this.courseDesc = res.data.courseDesc,
      this.courseRequirement = res.data.courseRequirement,
      this.courseExpectation = res.data.courseExpectation,
      this.days = res.data.tutoringDays,
      this.hours = res.data.tutoringHours
    })
    .catch(err => console.log(err))
 },
 methods: {
   async handleEditCourse() {
     await axios.put(this.uri + 'update/' + this.course.id, {
      name: this.name,
      createdBy: this.createdBy,
      courseLength: this.courseLength,
      tutoringDays: this.days,
      tutoringHours: this.hours,
      price: this.price,
      courseDesc: this.courseDesc,
      courseRequirement: this.courseRequirement,
      courseExpectation: this.courseExpectation
     }).then(() => {
       this.$toast('Edit Successed!', {
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
        setTimeout(() =>{
          this.$router.go('/AdminCourse')
        }, 2000);
     }).catch(err => {
       if (err.response) {
         console.log(err.response.data.message)
       } else {
         console.log("No respionse")
       }
     }
      //  this.$toast('Could not Editing!' + err, {
      //    duration: 3000,
      //    slotLeft: `💥`,
      //    slotRight: `❗❕`,
      //    styles: {
      //      borderRadius: '0px',
      //      backgroundColor: 'var(--red)',
      //      color: '#fff',
      //      borderColor: 'var(--black)',
      //      boxShadow: '-5px 5px 0px rgba(0,0,0,0.1)',
      //      border: '3px solid var(--black)'
      //    },
      //    class: 'local-class',
      //    positionX: 'center',
      //    positionY: 'top',
      //    disableClick: false
      //  })
     )
   }
 }
}
</script>

<style>

</style>