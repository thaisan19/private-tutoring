<template>
  <div class="data-table animate__animated animate__fadeIn animate__faster">
    <div class="table-header tutor-table-header">
      <h1>{{ allTutors.length }} Tutors Requests</h1>
      <input type="text" class="table-search" placeholder="Filter Tutors by: ID, Name, Email Address, Monthly Rate, Expertises" v-model="search">
      <div class="unread">
        <h1 :class="[unreadTutors.length > 0 ? 'notification':'']">{{ unreadTutors.length }}</h1>
        <div class="unread-text">
          <h3 :class="[unreadTutors.length > 0 ? 'to-blue':'']">unread</h3>
          <p>notifications</p>
        </div>
      </div>
    </div>
    <div class="table">
      <table>
        <tr>
          <th v-for="title in tableTitle" :key="title">
            {{ title }}
          </th>
          <th colspan="2">Actions</th>
        </tr>
        <tr v-for="tutor in sortedTutor" :key="tutor._id" :tutor="tutor" :class="[tutor.read ? 'read': 'not-read']">
          <td @click="openTutor(tutor)">
            <p>{{ tutor._id }}</p>
          </td>
          <td @click="openTutor(tutor)">
            <p>{{ tutor.fullName }}</p>
          </td>
          <td @click="openTutor(tutor)">
            <p>{{ tutor.phoneNumber }}</p>
          </td>
          <td @click="openTutor(tutor)">
            <p>{{ tutor.email }}</p>
          </td>
          <td @click="openTutor(tutor)">
            <p>${{ tutor.monthlyRate }}</p>
          </td>
          <td @click="openTutor(tutor)">
            <p v-for="exp in tutor.expertises" :key="exp">◾ {{ exp }}</p>
          </td>
          <td @click="openTutor(tutor)">
            <p v-for="day in tutor.tutoringDays" :key="day">◾ {{ day }}</p>
          </td>
          <td @click="openTutor(tutor)">
            <p v-for="hour in tutor.tutoringHours" :key="hour">◾ {{ hour }}</p>
          </td>
          <td @click="openTutor(tutor)">
            <p>{{ format(new Date(tutor.createdAt), 'MMM do yyyy') }}</p>
          </td>
          <td>
            <div class="action edit">
              <button @click="sendEmail(tutor)">👏</button>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="paginator">
      <button @click="prevPage">◀</button>
      <p>Page <strong>{{currentPage}}</strong> total of <strong>{{ numOfPages }}</strong></p>
      <button mode="btn black" @click="nextPage">▶</button>
    </div>
  </div>
  <ModalView
    v-if="openedTutor"
    @closeModal="openedTutor = null">
    <TutorFullView :tutor="openedTutor" @clickTutor="changeTutor" class="full-view" />
  </ModalView>
</template>

<script>
import { format } from 'date-fns'
import { ref } from 'vue'
import axios from 'axios'
import ModalView from '../../../main-components/ModalView.vue'
import TutorFullView from '../../../tutor/TutorFullView.vue'
// import axios from 'axios'

export default {
 props: ['allTutors', 'unreadTutors'],
 components: { 
   ModalView, 
   TutorFullView 
 },
 data() {
   return {
     search: '',
     currentPage: 1,
     pageSize: 10,
     filter: '',
   }
 },
 setup() {
   const tableTitle = ref([
     'ID',
     'Username',
     'Phone Number',
     'Email Address',
     'M.R',
     'Expertises',
     'Tutoring Days',
     'Tutoring Hours',
     'Requested Date'

   ])
   return { format, tableTitle, openedTutor: ref(null) }
 },
 methods: {
    nextPage() {
     if((this.currentPage*this.pageSize) < this.filteredTutor.length) this.currentPage++;
    },
    prevPage() {
     if(this.currentPage > 1) this.currentPage--;
    },
    openTutor(tutor) {
      this.openedTutor = tutor;

      if(tutor) {
        tutor.read = true
        this.updateTutor(tutor)
      }
    },
    changeTutor({closeModal}) {
      let tutor = this.openedTutor
      if(closeModal) {
        this.openedTutor = null
      }
    },
    async sendEmail(tutor) {
      await axios.put('https://private-tutoring-backend.herokuapp.com/api/admin/send-email', {
        email: tutor.email
      }).then(() => {
       this.$toast('Verify Email Send to ' + tutor.fullName + '!', {
         duration: 3000,
         slotLeft: `✨`,
         slotRight: `🎉`,
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
      }).catch(err =>
       this.$toast('Could Not Send Email! ' + err + tutor.email, {
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

        // .then(() => this.$router.go('AdminRequest'))
        
    },
    async updateTutor(tutor) {
      await axios.put(`https://private-tutoring-backend.herokuapp.com/api/admin/read-to-true/${tutor._id}`)
    }
  },
  computed: {

    filteredTutor() {
      return this.allTutors.filter((tutor) => {

          return tutor.fullName.toLowerCase().includes(this.search.toLowerCase().trim())

      })
    },
    
    sortedTutor() {
      return this.filteredTutor.filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      }) 
    },

    numOfPages() {
      return Math.ceil(this.allTutors.length / this.pageSize)
    }
  },
}
</script>

<style scoped>
.action {
  text-align: center;
}
.action button {
  font-size: 1.1em;
  cursor: pointer;
}
.unread {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.unread > h1, .notification {
  font-size: 3em;
  padding-right: .1em;
}
.notification {
  color: var(--blue);
}
.to-blue {
  color: var(--blue);
}
</style>