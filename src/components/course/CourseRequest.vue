<template>
  <div class="course-request-view">
   <div class="title">
     <h2>🙌 Course Request</h2>
     <div class="tutoring-by">
       <p>Tutor By:</p>
       <h2>{{ course.createdBy }}</h2>
     </div>
   </div>
   <div class="course-request-title">
    <p>Course ID: <strong>#{{ course.id }}</strong> | Course Price: <strong>${{ course.price }}</strong></p>
    <h1>{{ course.name }}</h1>
   </div>
   <form>
        <div class="course-request-row01">
    <div>
      <label for="name">🧑 Student Name:</label>
      <input type="text" v-model="studentName" required>
    </div>
    <div>
      <label for="email">📨 Student Email:</label>
      <input type="email" v-model="studentEmail" required>
    </div>
   </div>
   <div class="course-request-row02">
    <div>
      <label for="phone">📞 Student Phone Number:</label>
      <InputMask v-model="studentPhoneNumber" mask="(999) 999 999?9" class="inputmask" required />
    </div>
    <div>
      <label for="addReq">🎫 Additional Request:</label>
      <textarea type="text" v-model="addReq" />
    </div>
   </div>
   <div class="course-request-row03">
     <div class="pick-day">
       <h3>📅 Pick Tutoring Days:</h3>
      <div class="checkbox">
        <label v-for="day in course.tutoringDays" :key="day" class="container">
          <input type="checkbox" required v-model="pickedTutoringDays" :value="day">
          {{ day }}
          <span class="checkmark"></span>
        </label>
      </div>
     </div>
     <div class="pick-hour">
       <h3>🕑 Pick Tutoring Hours:</h3>
      <div class="checkbox">
        <label v-for="hour in course.tutoringHours" :key="hour" class="container">
          <input type="checkbox" required v-model="pickedTutoringHours" :value="hour">
          {{ hour }}
          <span class="checkmark"></span>
        </label>
      </div>
     </div>
   </div>
   <div class="send-request">
    <main-button mode="btn black" @click="handleRequestCourse">🚀 Send Request</main-button>
   </div>
   </form>
  </div>
</template>

<script>
import axios from 'axios'
import InputMask from 'primevue/inputmask'

export default {
  components: {
    InputMask
  },
  setup(props, {emit}) {
   const course = props.course;

   return { }
  },
  props: {
   course: {
    type: Object,
    required: true
  }
 },
 data() {
   return {
     pickedTutoringDays: [],
     pickedTutoringHours: [],
     studentName: '',
     studentEmail: '',
     studentPhoneNumber: '',
     addReq: 'None',
   }
 },
 methods: {
   async handleRequestCourse() {

     if(this.studentName.length && this.studentEmail.length && this.studentPhoneNumber.length && this.pickedTutoringDays.length  && this.pickedTutoringHours.length) {
       await axios.post('https://www.thementor-privatetutoring.me/api/request/make', {
       title: "Course Request",
       objId: this.course.id,
       objName: this.course.name,
       studentName: this.studentName,
       studentEmail: this.studentEmail,
       studentPhoneNumber: this.studentPhoneNumber,
       reqAdd: this.addReq,
       pickedTutoringDays: this.pickedTutoringDays,
       pickedTutoringHours: this.pickedTutoringHours,
       read: false,
       delete: false
     }).then(() => {
       this.$toast('Course Request Made! We will get back to you soon 👏', {
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
          this.$router.go('')
        }, 2000);
     }).catch(err =>
       this.$toast('Could not make request right now! ' + err, {
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
     } else {
        this.$toast('✋ Please fill in all the information, at least pick one DAY and HOUR 🙏', {
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
     }
   }
 }
}
</script>

<style>
.pick-day h3, .pick-hour h3{
  text-align: center;
  padding-bottom: 1.5em;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tutoring-by {
  display: flex;
  align-items: center;
}
.tutoring-by > p {
  padding-right: .5em;
  font-size: 1.2em;
}
.course-request-view {
 padding: 1em;
}
.course-request-view::after {
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
  overflow: hidden;
  background: url('../../assets/background-pattern-vertical.png');
	background-repeat: no-repeat;
  background-size: cover;
	opacity: 0.7;
}
.course-request-title {
 margin: 2em 0;
 text-align: center;
}
.course-request-title > p {
 font-size: 1.2em;
 padding-bottom: .5em;
}
.send-request {
 text-align: center;
 padding-top: 2em;
 padding-bottom: .5em;
}
.course-request-row01, .course-request-row02, .course-request-row03 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
}

@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
  .course-request-title h1 {
    font-size: 1.5em;
  }
  .course-request-title p {
    font-size: 1em;
  }
  .tutoring-by {
    display: flex;
    flex-direction: column;
    text-align: left;
  }
  .tutoring-by p {
    font-size: 1em;
  }
  .title h2 {
    text-align: left;
  }
}
</style>