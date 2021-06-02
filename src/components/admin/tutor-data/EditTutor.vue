<template>
  <div class="add-tutor-view">
    <h1>👨‍ Edit Tutor</h1>
    <form @submit.prevent="handleEditTutor" enctype="multipart/form-data">
      <div class="add-tutor-row01">
        <div class="name">
          <label>👨‍🏫 Fullname:</label>
          <input type="text" v-model="fullName">
        </div>
        <div class="email">
          <label>📬 Email Address:</label>
          <input type="email" v-model="email">
        </div>
        <div class="monthly-rate">
          <label>🤑 Monthly Rate:</label>
          <input type="number" v-model="monthlyRate">
        </div>

      </div>
      <div class="add-tutor-row02">
        <div class="phone-number">
          <label>📞 Personal Phone Number:</label>
          <input type="tel" v-model="phoneNumber">
        </div>
        <div class="gender">
          <label>👨‍👦‍👦 Gender:</label>
          <select v-model="gender">
            <option disabled value="">Select one gender...</option>
            <option value="👨 Male">👨 Male</option>
            <option value="👩 Female">👩 Female</option>
          </select>
        </div>
        <div class="date-of-birth">
          <label>👶 Date of Birth:</label>
          <input type="date" v-model="dateOfBirth">
        </div>
      </div>
      <div class="add-tutor-row03">
        <div class="profile-img">
          <label>🙂 Profile Image:</label>
          <input type="file" class="custom-file-input" @change="handleProfile" id="file">
          <p class="error-file">{{profileError}}</p>
        </div>
        <div class="cv">
          <label>📃 Resume File:</label>
          <input type="file" class="custom-file-input" @change="handleCv" id="file">
          <p class="error-file">{{cvError}}</p>
        </div>
      </div>
      <div class="add-tutor-row04">
        <div class="expertises">
          <label>👨‍⚖️ Expertises (Enter to break)</label>
          <input 
            @keydown.enter.prevent="handleExpertiseKeydown"
            v-model="expertise"
            type="text">
            <div v-for="expertise in expertises" :key="expertise" class="pill" @click="removeExpertise(expertise)">
              {{ expertise }} <span class="remove-pill">❌</span>
            </div>
        </div>
        <div class="about-me">
          <label>😎 About Me:</label>
          <textarea v-model="aboutMe"/>
        </div>
      </div>
      <div class="add-tutor-row05">
        <div class="education-background">
          <label>👨‍🎓 Education Background:</label>
          <textarea v-model="eduBackground"/>
        </div>
        <div class="achievement">
          <label>🎉 Achievement:</label>
          <textarea v-model="achievement"/>
        </div>
      </div>
      <div class="add-tutor-row06">
        <div class="tutoring-days">
          <label>📅 Tutoring Days (Enter to break)</label>
          <input 
            @keydown.enter.prevent="handleDayKeydown"
            v-model="day"
            type="text">
            <div v-for="day in days" :key="day" class="pill" @click="removeDay(day)">
              {{ day }} <span class="remove-pill">❌</span>
            </div>
        </div>
        <div class="tutoring-hours">
          <label>🕑 Tutoring Hours (Enter to break)</label>
          <input 
            @keydown.enter.prevent="handleHourKeydown"
            v-model="hour"
            type="text">
            <div v-for="hour in hours" :key="hour" class="pill" @click="removeHour(Hour)">
              {{ hour }} <span class="remove-pill">❌</span>
            </div>
        </div>
      </div>
      <div class="add-tutor-row07">
      <main-button mode="btn black">Update Tutor 🔨</main-button>
      </div>
    </form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'

export default {
 props: ['tutor'],
  setup(props, {emit}) {
    const expertises = ref([])
    const expertise = ref('')
    const days = ref([])
    const day = ref('')
    const hours = ref([])
    const hour = ref('')
    const gender = ref('')
    const dateOfBirth = ref('')
    const profile = ref(null)
    const cv = ref(null)
    const profileError = ref(null)
    const cvError = ref(null)

    const profileTypes = ['image/png', 'image/jpeg', 'image/jpg']
    const cvTypes = ['application/pdf', 'application/msword', 'application/docx']
    const maxSize = 50000000;
    const tooLarge = profile.size || cv.size > maxSize;

    const handleProfile = (e) => {
      const selected = e.target.files[0]
      if (selected && profileTypes.includes(selected.type) && !tooLarge) {
        profile.value = selected
        profileError.value = null
      } else {
        profile.value = null
        profileError.value = tooLarge ? `Max File Size: ${maxSize/100000}Mb!`:".pdf.jpeg.jpg file only!"
      }
      console.log(profile.value)
      profile.value = e.target.files[0]
    }

    const handleCv = (e) => {
      const selected = e.target.files[0]
      if (selected && cvTypes.includes(selected.type) && !tooLarge) {
        cv.value = selected
        cvError.value = null
      } else {
        cv.value = null
        cvError.value = tooLarge ? `Max File Size: ${maxSize/100000}Mb!`:".pdf.docx.msword file only!"
      }
      console.log(cv.value)
      cv.value = e.target.files[0]
    }

    const handleExpertiseKeydown = () => {
      if (!expertises.value.includes(expertise.value) && expertise.value.length) {
        expertise.vlaue = expertise.value.replace(/\s/g, '')
        expertises.value.push(expertise.value)
      }
      expertise.value = ''
    }
    const removeExpertise = (expertise) => {
      let id = expertise;
      let idx = expertises.value.indexOf(id);
      expertises.value.splice(idx, 1);
    }

    const handleDayKeydown = () => {
      if (!days.value.includes(day.value) && day.value.length) {
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
      if (!hours.value.includes(hour.value) && hour.value.length) {
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
      emit,
      removeExpertise,
      removeDay,
      removeHour,
      handleDayKeydown,
      handleExpertiseKeydown,
      handleHourKeydown,
      expertise,
      expertises,
      days,
      day,
      hours,
      hour,
      gender,
      dateOfBirth,
      cv,
      profile,
      profileError,
      cvError,
      handleCv,
      handleProfile
    }
  },
 data() {
  return {
   fullName: '',
   monthlyRate: '',
   email: '',
   phoneNumber: '',
   aboutMe: '',
   eduBackground: '',
   achievement: ''
  }
 },
 async created() {
   await axios.get('https://www.thementor-privatetutoring.me/api/admin/find-tutor/' + this.tutor._id)
    .then((res) => {
      console.log(res.data.profile[0])
      this.fullName = res.data.fullName,
      this.monthlyRate = res.data.monthlyRate,
      this.email = res.data.email,
      this.phoneNumber = res.data.phoneNumber,
      this.aboutMe = res.data.aboutMe,
      this.gender = res.data.gender,
      this.dateOfBirth = res.data.dateOfBirth,
      this.profile = res.data.profile[0],
      this.cv = res.data.cv[0],
      this.eduBackground = res.data.eduBackground,
      this.achievement = res.data.achievement,
      this.expertises = res.data.expertises,
      this.days = res.data.tutoringDays,
      this.hours = res.data.tutoringHours
    })
    .catch(err => console.log(err))
 },
 methods: {
   async handleEditTutor() {
      const formData = new FormData();
      for ( const i of Object.keys(this.profile)) {
        formData.append('profile', this.profile[i])
      }
      for ( const i of Object.keys(this.cv)) {
        formData.append('cv', this.cv[i])
      }

      formData.append("fullName", this.fullName)
      formData.append("monthlyRate", this.monthlyRate)
      formData.append("email", this.email)
      formData.append("phoneNumber", this.phoneNumber)
      formData.append("gender", this.gender)
      formData.append("profile", this.profile)
      formData.append("cv", this.cv)
      formData.append("dateOfBirth", this.dateOfBirth)
      formData.append("aboutMe", this.aboutMe)
      formData.append("eduBackground", this.eduBackground)
      formData.append("achievement", this.achievement)

      for (var i = 0; i < this.expertises.length; i++) {
        formData.append("expertises", this.expertises[i])
      }
      for (var i = 0; i < this.days.length; i++) {
        formData.append("tutoringDays", this.days[i])
      }
      for (var i = 0; i < this.hours.length; i++) {
        formData.append("tutoringHours", this.hours[i])
      }

     await axios.put(`https://www.thementor-privatetutoring.me/api/admin/update/${this.tutor._id}`, formData, {
     }).then(() => {
       this.$toast(this.fullName + ' Edit Successed!', {
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
          this.$router.go('/AdminTutor')
        }, 2000);
     }).catch(err =>
       this.$toast('Could not Editing! ' + err, {
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
  mounted() {
    document.getElementById("file").required = true;
  }
}
</script>

<style>
</style>