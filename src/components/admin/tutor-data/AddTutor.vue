<template>
  <div class="add-tutor-view">
    <h1>👨‍ Register a Tutor</h1>
    <form @submit.prevent="handleAddTutor">
      <div class="add-tutor-row01">
        <div class="name">
          <label>👨‍🏫 Fullname:</label>
          <input type="text" v-model="fullName" required>
        </div>
        <div class="email">
          <label>📬 Email Address:</label>
          <input type="email" v-model="email" required>
        </div>
        <div class="monthly-rate">
          <label>🤑 Monthly Rate:</label>
          <input type="number" v-model="monthlyRate" required>
        </div>

      </div>
      <div class="add-tutor-row02">
        <div class="phone-number">
          <label>📞 Personal Phone Number:</label>
          <input type="tel" v-model="phoneNumber" required>
        </div>
        <div class="gender">
          <label>👨‍👦‍👦 Gender:</label>
          <select v-model="gender" required>
            <option disabled value="">Select one gender...</option>
            <option value="👨 Male">👨 Male</option>
            <option value="👩 Female">👩 Female</option>
          </select>
        </div>
        <div class="date-of-birth">
          <label>👶 Date of Birth:</label>
          <input type="date" v-model="dateOfBirth" required>
        </div>
      </div>
      <div class="add-tutor-row03">
        <div class="profile-img">
          <label>🙂 Profile Image:</label>
          <input type="file" class="custom-file-input" @change="handleProfile">
          <p class="error-file">{{profileError}}</p>
        </div>
        <div class="cv">
          <label>📃 Resume File:</label>
          <input type="file" class="custom-file-input" @change="handleCv">
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
          <textarea v-model="aboutMe" required/>
        </div>
      </div>
      <div class="add-tutor-row05">
        <div class="education-background">
          <label>👨‍🎓 Education Background:</label>
          <textarea v-model="eduBackground" required/>
        </div>
        <div class="achievement">
          <label>🎉 Achievement:</label>
          <textarea v-model="achievement" required/>
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
            <div v-for="hour in hours" :key="hour" class="pill" @click="removeHour(hour)">
              {{ hour }} <span class="remove-pill">❌</span>
            </div>
        </div>
      </div>
      <div class="add-tutor-row07">
      <main-button mode="btn black">Register New ➕</main-button>
      </div>
    </form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const fullName = ref('')
    const monthlyRate = ref('')
    const email = ref('')
    const phoneNumber = ref('')
    const gender = ref('')
    const dateOfBirth = ref('')
    const aboutMe = ref('')
    const eduBackground = ref('')
    const achievement = ref('')
    const expertises = ref([])
    const expertise = ref('')
    const days = ref([])
    const day = ref('')
    const hours = ref([])
    const hour = ref('')
    const profile = ref(null)
    const cv = ref(null)
    const profileError = ref(null)
    const cvError = ref(null)

    const router = useRouter()

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
      if (!expertises.value.includes(expertise.value)) {
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
      fullName,
      monthlyRate,
      email,
      phoneNumber,
      gender,
      dateOfBirth,
      eduBackground,
      achievement,
      aboutMe,
      expertise,
      expertises,
      days,
      day,
      hours,
      hour,
      handleExpertiseKeydown,
      handleDayKeydown,
      handleHourKeydown,
      handleProfile,
      handleCv,
      profile,
      cv,
      profileError,
      cvError,
      removeExpertise,
      removeDay,
      removeHour
    }
  },
  methods: {
    async handleAddTutor() {
      const formData = new FormData();

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

      await axios.post('https://private-tutoring-backend.herokuapp.com/api/admin/register-tutor', formData, {
      }).then(() => {
        this.$toast("You Have Been Registered " + this.fullName + ' As a New Tutor 👏 We Will Get Back To You Very Soon 🤗🙏', {
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
          this.$router.go('/register')
        }, 2000);
      }).catch(err =>
       this.$toast('Could not Register Tutor! ' + err, {
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
  }
}
</script>

<style>
  .add-tutor-view {
    padding: 2em;
    position: relative;
  }
  .add-tutor-view::before {
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
  .add-tutor-row01 {
    padding-top: 2em;
  }
  .add-tutor-row01 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1.5rem;
    padding-bottom: .5em;
  }
  .add-tutor-row02,
  .add-tutor-row03,
  .add-tutor-row04,
  .add-tutor-row05,
  .add-tutor-row06 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1.5rem;
    padding-bottom: .5em;
  }
  .add-tutor-row07 {
    padding-top: 1.5em;
    text-align: center;
  }
  .profile-img input, .cv input {
    padding: 0;
    border: none;
  }
  .profile-img > input::before {
    content: "Select a profile image"
  }
  .cv > input::before {
    content: "Select a resume file"
  }
  .gender {
    display: flex;
    flex-direction: column;
  }
  .gender > label {
    margin-bottom: .6em;
  }
  .gender > select {
    padding: .5em;
    border-radius: 0;
    border: 2px solid var(--black);
    font-size: 1em;
  }
  .gender > select:focus {
    border-radius: 0;
  }
  .error-file {
    color: var(--red);
    font-weight: 600;
    text-align: right;
    margin-top: -.5em
  }

  @media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
    .add-tutor-view::before {
  background: url('../../../assets/background-pattern-vertical.png');
  background-size:contain ;
}
}

  /* @media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  } */
</style>