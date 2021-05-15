<template>
  <div class="tutor-full-view">
    <div class="tutor-full-view-title">
      <div class="name-profile-title">
        <img :src="`https://private-tutoring-backend.herokuapp.com/${tutor.profile[0].path}`">
        <div>
          <h1>{{ tutor.fullName }}</h1>
          <h3>#{{ tutor.id }}</h3>
        </div>
      </div>
      <div v-if="(!!isLoggedInAsTutor && userId == tutor.id) || isLoggedInAsAdmin" class="full-view-action">
        <main-button 
          mode="btn black"
          @click="openEditTutor(tutor)"
        >
          Edit Profile 🔨
        </main-button>
        <main-button 
          mode="btn black"
          @click="openUpdatePassword(tutor)"
        >
          Update Password 🔑
        </main-button>
      </div>
      <div class="full-view-action" v-if="!isLoggedInAsTutor && !isLoggedInAsAdmin">
        <main-button 
          mode="btn black"
          @click="openTutorRequest(tutor)"
        >
          Send Request 🚀
        </main-button>
      </div>

    </div>
    <div class="tutor-full-view-row01"  v-if="!!isLoggedInAsTutor && (tutor.id == userId) || !!isLoggedInAsAdmin">
      <div class="full-email">
        <p>Tutor Email:</p>
        <h2>{{ tutor.email }}</h2>
      </div>
      <h1>🌺</h1>
      <div class="full-phone">
        <p>Tutor Phone Number:</p>
        <h2>{{ tutor.phoneNumber }}</h2>
      </div>
      <h1>🌾</h1>
      <div class="full-cv">
        <p>Tutor Resume:</p>
        <a class="pdf-file" :href="`https://private-tutoring-backend.herokuapp.com/${tutor.cv[0].path}`" target="_black">{{ tutor.cv[0].originalname }}</a>
      </div>
    </div>
    <div class="tutor-full-view-row02">
      <div class="full-expertises">
        <p>Tutor Expertises:</p>
        <h2 v-for="exp in tutor.expertises" :key="exp">🔹 {{ exp }}</h2>
      </div>
      <h1>🍁</h1>
      <div class="full-gender">
        <p>Tutor Gender:</p>
        <h2>{{ tutor.gender }}</h2>
      </div>
      <h1>🌿</h1>
      <div class="full-dob">
        <p>Date of Birth:</p>
        <h2>{{ format(new Date(tutor.dateOfBirth), 'MMM do yyyy') }}</h2>
      </div>
      <h1>🌼</h1>
      <div class="full-mr">
        <p>Monthly Rate:</p>
        <h2>$ {{ tutor.monthlyRate }}</h2>
      </div>
    </div>
    <div class="tutor-full-view-row03">
      <div class="full-about-me">
        <h2>1️⃣ About Me:</h2>
        <p>{{ tutor.aboutMe }}</p>
      </div>
    </div>
    <div class="tutor-full-view-row04">
      <div class="full-edu">
        <h2>2️⃣ Education Background:</h2>
        <p>{{ tutor.eduBackground }}</p>
      </div>
      <div class="full-achievement">
        <h2>3️⃣ Achievement:</h2>
        <p>{{ tutor.achievement }}</p>
      </div>
    </div>
    <div class="tutor-full-view-row05">
      <div class="full-days">
        <h2>📆 Tutoring Days:</h2>
        <div class="days-hours">
          <p v-for="day in tutor.tutoringDays" :key="day">🔹 {{ day }}</p>
        </div>
      </div>
      <div class="full-hours">
        <h2>⏰ Tutoring Hours:</h2>
        <div class="days-hours">
          <p v-for="hour in tutor.tutoringHours" :key="hour">🔹 {{ hour }}</p>
        </div>
      </div>
    </div>
  </div>

  <ModalView 
    v-if="openedEditTutor"
    @closeModal="openedEditTutor = null" >
      <EditTutor :tutor="openedEditTutor" @clickEditTutor="changeEditTutor" />
  </ModalView>

	<ModalView 
    v-if="openedTutorRequest"
    @closeModal="openedTutorRequest = null">
    <TutorRequest :tutor="openedTutorRequest" @changeTutorRequest="changeTutorRequest" />
  </ModalView>

	<ModalView 
    v-if="openedUpdatePassword"
    @closeModal="openedUpdatePassword = null">
    <UpdatePassword :tutor="openedUpdatePassword" @changeUpdatePassword="changeUpdatePassword" />
  </ModalView>
</template>

<script>
import { format } from 'date-fns' 
import ModalView from '../main-components/ModalView.vue'
import EditTutor from '../admin/tutor-data/EditTutor.vue'
import TutorRequest from '../tutor/TutorRequest.vue'
import { ref } from 'vue'
import axios from 'axios'
import UpdatePassword from '../admin/tutor-data/UpdatePassword.vue'

export default {
  components: {
    ModalView,
    EditTutor,
    TutorRequest,
    UpdatePassword
  },
  setup(props, {emit}) {
    const tutor = props.tutor;

    return { format, openedEditTutor: ref(null), openedTutorRequest: ref(null), openedUpdatePassword: ref(null) }
  },
  data() {
    return {
      userId: null
    }
  },
  props: {
    tutor: {
      type: Object,
      required: true
  }
 },
 methods: {
    openEditTutor(tutor) {
      this.openedEditTutor = tutor;
    },
    changeEditTutor({closeModal}) {
      if(closeModal) {
        this.openedEditTutor = null
      }
    },
    openTutorRequest(tutor) {
      this.openedTutorRequest = tutor;
    },
    changeTutorRequest({closeModal}) {
      let tutor = this.openedTutorRequest
      if(closeModal) {
        this.openedTutorRequest = null
      }
    },
    openUpdatePassword(tutor) {
      this.openedUpdatePassword = tutor;
    },
    changeUpdatePassword({closeModal}) {
      let tutor = this.openedUpdatePassword
      if(closeModal) {
        this.openedUpdatePassword = null
      }
    },
 },
 computed: {
    isLoggedInAsTutor() {
      return this.$store.getters.isAuthenticatedAsTutor;
    },
    isLoggedInAsAdmin() {
      return this.$store.getters.isAuthenticatedAsAdmin;
    },
 },
  created() {
    if(localStorage.getItem('userId') !== null) {
      this.userId = localStorage.getItem('userId')

      axios.get(`https://private-tutoring-backend.herokuapp.com/api/tutor/find-tutor/${this.userId}`)
        .then((res) => this.activeTutor = res.data)
    }
  },
}
</script>

<style scoped>
.tutor-full-view-title,
.tutor-full-view-row01,
.tutor-full-view-row02,
.tutor-full-view-row03,
.tutor-full-view-row04,
.tutor-full-view-row05 {
  position: relative;
  z-index: 1000;
}
  .tutor-full-view::before {
    content: "";
    background: url('../../assets/background-pattern-vertical.png');
    background-size: auto;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 0;
    position: absolute;
  }
.tutor-full-view-row01,
.tutor-full-view-row02 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2em;
  padding: 0 3em;
  text-align: center;
  flex-wrap: wrap;
}
.tutor-full-view-row03,
.tutor-full-view-row04,
.tutor-full-view-row05 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  grid-gap: 1.5rem;
  padding: 0 3em;
  margin-top: 2em;
}
.tutor-full-view-row03 p,
.tutor-full-view-row04 p,
.tutor-full-view-row05 p {
  padding: .7em;
  flex-wrap: wrap;
}
.tutor-full-view p {
  font-size: 1.2em;
  margin-bottom: .2em;
}
.tutor-full-view {
  padding: 2em;
  margin: 0 auto;
  background: #fff;
  border: 3px solid var(--black);
  box-shadow: -10px 10px 0px rgba(0,0,0,0.1);
  overflow: hidden;
}
.tutor-full-view-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: .5em;
}
.name-profile-title {
  display: flex;
  align-items: center;
}
.full-view-action button:first-child {
  margin-right: .5em;
}
.days-hours {
  display: flex;
  flex-wrap: wrap;
}
.name-profile-title img {
  width: 5em;
  border-radius: 50%;
  height: 5em;
	object-fit: cover;
	object-position: 50% 50%;
  margin-right: 1em;
  cursor: pointer;
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.name-profile-title img:hover {
  filter: drop-shadow(-5px 5px 0px rgba(0,0,0,0.1));
  transform: scale(1.1) rotate(-3deg);
}

@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
  .tutor-full-view {
    padding: 1em;
    position: relative;
  }
  .full-view-action {
    position: absolute;
    top: 1.5em;
    right: 1em;
    display: flex;
    flex-direction: column;
  }
  .name-profile-title {
    flex-wrap: wrap;
  }
  .name-profile-title h1{
    font-size: 1.5em;
    margin-top: 1em;
  }
  .full-view-action button{
    padding: .3em;
  } 
  .full-view-action button:first-child {
    margin-bottom: .5em;
  }
  .tutor-full-view-row02,
  .tutor-full-view-row01 {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-top: 0;
  }
  .tutor-full-view-row02 p,
  .tutor-full-view-row01 p {
    margin-top: 1em;
  }
  .tutor-full-view-row03,
  .tutor-full-view-row04,
  .tutor-full-view-row05 {
    padding: 0;
  }
  .full-about-me,
  .full-achievement,
  .full-edu {
    width: 92%;
    margin: 0 auto;
  }
}

@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
    .tutor-full-view {
    padding: 1em;
    position: relative;
  }
  .name-profile-title {
    flex-wrap: wrap;
  }
  .name-profile-title h1{
    font-size: 1.5em;
    margin-top: .5em;
  }
  .full-view-action {
    position: absolute;
    top: 1.5em;
    right: 1em;
    display: flex;
    flex-direction: column;
  }
  .full-view-action button:first-child {
    margin-bottom: .5em;
  }
  .tutor-full-view-row02,
  .tutor-full-view-row01 {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-top: 0;
  }
  .tutor-full-view-row02 p,
  .tutor-full-view-row01 p {
    margin-top: 1em;
  }
  .tutor-full-view-row03,
  .tutor-full-view-row04,
  .tutor-full-view-row05 {
    padding: 0;
  }
  .full-about-me,
  .full-achievement,
  .full-edu {
    width: 90%;
    margin: 0 auto;
  }
}
</style>