<template>
  <div class="course-request-view">
   <div class="title">
     <h2>🙌 Tutor Request</h2>
     <div class="tutoring-by">
       <h2>${{ tutor.monthlyRate }} / month</h2>
     </div>
   </div>
   <div class="course-request-title">
    <p>Tutor ID: <strong>#{{ tutor.id }}</strong> | Tutor Expertises: <strong v-for="(expertise) in tutor.expertises" :key="expertise">{{ expertise }}&nbsp;&nbsp;</strong></p>
    <h1>{{ tutor.fullName }}</h1>
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
      <input type="tel" v-model="studentPhoneNumber" required>
    </div>
    <div>
      <label for="addReq">🎫 Additional Request:</label>
      <textarea type="textarea" v-model="addReq" />
    </div>
   </div>
   <div class="course-request-row03">
     <div class="pick-day">
       <h3>📅 Pick Tutoring Days:</h3>
      <div class="checkbox">
        <label v-for="day in tutor.tutoringDays" :key="day" class="container">
          <input type="checkbox" required v-model="pickedTutoringDays" :value="day">
          {{ day }}
          <span class="checkmark"></span>
        </label>
      </div>
     </div>
     <div class="pick-hour">
       <h3>🕑 Pick Tutoring Hours:</h3>
      <div class="checkbox">
        <label v-for="hour in tutor.tutoringHours" :key="hour" class="container">
          <input type="checkbox" required v-model="pickedTutoringHours" :value="hour">
          {{ hour }}
          <span class="checkmark"></span>
        </label>
      </div>
     </div>
   </div>
   </form>
   <div class="send-request">
    <main-button mode="btn black" @click="handleRequestTutor">Send Request</main-button>
   </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  setup(props, {emit}) {
   const tutor = props.tutor;

   return { }
  },
  props: {
   tutor: {
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
     addReq: 'None'
   }
 },
 methods: {
   async handleRequestTutor() {

     if(this.studentName.length && this.studentEmail.length && this.studentPhoneNumber.length && this.pickedTutoringDays.length  && this.pickedTutoringHours.length) {
       await axios.post('https://www.thementor-privatetutoring.me/api/request/make', {
       title: "Tutor Request",
       objId: this.tutor.id,
       objName: this.tutor.fullName,
       studentName: this.studentName,
       studentEmail: this.studentEmail,
       studentPhoneNumber: this.studentPhoneNumber,
       reqAdd: this.addReq,
       pickedTutoringDays: this.pickedTutoringDays,
       pickedTutoringHours: this.pickedTutoringHours,
       read: false
     }).then(() => {
       this.$toast('Tutor Request Made! We will get back to you soon 👏', {
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
          this.$router.go('/Tutors')
        }, 2000);
     }).catch(err =>
       this.$toast('Could not Send Request! ' + err, {
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
</style>