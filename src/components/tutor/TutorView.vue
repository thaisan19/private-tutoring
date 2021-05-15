<template>
  <div class="tutor-detail-display">
   <div class="detail-header">
    <div class="tutor-image">
     <img src="https://cdn.dribbble.com/users/2364329/screenshots/10481283/media/f013d5235bfcf1753d56cad154f11a67.jpg?compress=1&resize=400x300">
     <div class="tutor-name-expertise">
      <h1>{{ tutor.fullName }}</h1>
      <ul>
            <li v-for="expertise in tutor.expertises" :key="expertise">
              {{ expertise }}
            </li>
      </ul>
      <h2>${{ tutor.monthlyRate }}/month</h2>
     </div>
    </div>
    <div class="tutor-action">
     <main-button mode="btn black" @click="openTutorRequest(tutor)">
      Request Tutoring 🙌🤗
     </main-button>
    </div>
   </div>
   <div class="detail-body">
    <div class="about-me">
     <h2>😎 About Me:</h2>
     <p>{{ tutor.aboutMe }}</p>
    </div>
    <br>
    <h2>👨‍🎓 Education Background:</h2>
    <p>This is education background.</p>
    <br>
    <h2>🎉 Achievement:</h2>
    <p>{{ tutor.achievement }}</p>
    <br>
    <h2>📚 Tutoring Days:</h2>
    <ul>
            <li v-for="day in tutor.tutoringDays" :key="day">
              {{ day }}
            </li>
     </ul>
     <br>
     <h2>⏰Tutoring Hours:</h2>
     <ul>
            <li v-for="hour in tutor.tutoringHours" :key="hour">
              {{ hour }}
            </li>
     </ul>
   </div>
   <div class="detail-footer">
    <div class="tutor-action">
     <main-button mode="btn black" @click="openTutorRequest(tutor)">
      Request Tutoring 🙌🤗
     </main-button>
    </div>
   </div>
  </div>
	<ModalView 
    v-if="openedTutorRequest"
    @closeModal="openedTutorRequest = null">
    <TutorRequest :tutor="openedTutorRequest" @changeTutorRequest="changeTutorRequest" />
  </ModalView>
</template>

<script>
import TutorRequest from './TutorRequest.vue'
import ModalView from '../main-components/ModalView.vue'
import { ref } from 'vue'


export default {
  components: {
    TutorRequest,
    ModalView
  },
  setup(props, {emit}) {
    const tutor = props.tutor;

    return { openedTutorRequest: ref(null) }
  },
  props: {
    tutor: {
      type: Object,
      required: true
  }
 },
 methods: {
    openTutorRequest(tutor) {
      this.openedTutorRequest = tutor;
    },
    changeTutorRequest({closeModal}) {
      let tutor = this.openedTutorRequest
      if(closeModal) {
        this.openedTutorRequest = null
      }
    },
 }
}
</script>

<style>
</style>