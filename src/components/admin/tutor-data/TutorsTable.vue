<template>
  <ConfirmPopup></ConfirmPopup>
  <div class="data-table animate__animated animate__fadeIn animate__faster">
    <div class="table-header tutor-table-header">
      <h1>{{ tutors.length }} Tutors Data</h1>
      <input type="text" class="table-search" placeholder="Filter Tutors by: ID, Name, Email Address, Monthly Rate, Expertises" v-model="search">
      <main-button mode="btn black" @click="openAddTutor">➕ Add Tutor</main-button>
    </div>
    <div class="table">
      <table>
        <tr>
          <th v-for="title in tableTitle" :key="title">
            {{ title }}
          </th>
          <th colspan="2">Actions</th>
        </tr>
        <tr v-for="tutor in sortedTutor" :key="tutor.id" :tutor="tutor">
          <td @click="openTutor(tutor)">
            <p>{{ tutor.id }}</p>
          </td>
          <td @click="openTutor(tutor)">
            <p><strong>{{ tutor.fullName }}</strong></p>
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
            <p v-for="expertise in tutor.expertises" :key="expertise">◾ {{ expertise }}</p>
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
              <button @click="openEditTutor(tutor)">🔨</button>
            </div>
          </td>
          <td>
            <div class="action delete">
              <button @click="deleteTutor(tutor, $event)">❌</button>
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
    <TutorFullView :tutor="openedTutor" @clickTutor="changeTutor" />
  </ModalView>

  <ModalView 
    v-if="openedAddTutor"
    @closeModal="openedAddTutor = null" >
      <AddTutor @clickAddTutor="changeAddTutor" />
  </ModalView>

  <ModalView 
    v-if="openedEditTutor"
    @closeModal="openedEditTutor = null" >
      <EditTutor :tutor="openedEditTutor" @clickEditTutor="changeEditTutor" />
  </ModalView>
</template>

<script>
import { format } from 'date-fns'
import { ref } from 'vue'
import axios from 'axios'
import ModalView from '../../main-components/ModalView.vue'
import TutorFullView from '../../tutor/TutorFullView.vue'
import AddTutor from '../tutor-data/AddTutor.vue'
import EditTutor from '../tutor-data/EditTutor.vue'
import ConfirmPopup from 'primevue/confirmpopup';
// import axios from 'axios'

export default {
 props: ['tutors'],
 components: { 
   ModalView, 
   TutorFullView ,
   EditTutor,
   AddTutor,
   ConfirmPopup
 },
 data() {
   return {
     search: '',
     currentPage: 1,
     pageSize: 10,
     filter: ''
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
     'Registerd Date'

   ])
   return { format, tableTitle, openedTutor: ref(null), openedAddTutor: ref(null), openedEditTutor: ref(null) }
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

      // if(tutor) {
      //   tutor.read = true
      //   this.updateTutor(tutor)
      // }
    },
    openAddTutor() {
      this.openedAddTutor = true
    },
    openEditTutor(tutor) {
      this.openedEditTutor = tutor;
    },
    changeTutor({closeModal}) {
      let tutor = this.openedTutor
      if(closeModal) {
        this.openedTutor = null
      }
    },
    changeAddTutor({closeModal}) {
      if(closeModal) {
        this.openedAddTutor = null
      }
    },
    changeEditTutor({closeModal}) {
      if(closeModal) {
        this.openedEditTutor = null
      }
    },
    async deleteTutor(tutor, event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: `Are you sure want to delete tutor name ${tutor.fullName} ❔❗❕⭕`,
        accept: () => {
         axios.delete(`https://private-tutoring-backend.herokuapp.com/api/tutor/delete/${tutor.id}`)
        
         .then(() => {
          this.$toast(tutor.fullName + ' has been deleted!', {
            duration: 2000,
            slotLeft: `🚫`,
            slotRight: `💥`,
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
          }, 2000)
        })
        .catch(err => console.log(err))
        },
        reject: () => {
          this.$confirm.close()
        }
      })
    },
    // updateTutor(tutor) {
    //   axios.put(`http://localhost:5000/api/tutor/update/${tutor.id}`, tutor)
    // }
  },
  computed: {

    filteredTutor() {
      return this.tutors.filter((tutor) => {
        
        const expLen = tutor.expertises.length;
        for (const i = 0; i < expLen; i++) {
          return tutor.expertises[i].toLowerCase().includes(this.search.toLowerCase().trim()) || tutor.expertises[i+1].toLowerCase().includes(this.search.toLowerCase().trim()) || tutor.fullName.toLowerCase().includes(this.search.toLowerCase().trim()) || tutor.uniqueString.includes(this.search.toLowerCase().trim()) || tutor.email.toLowerCase().includes(this.search.toLowerCase().trim()) || tutor.monthlyRate.toLowerCase().includes(this.search.toLowerCase().trim())
        }

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
      return Math.ceil(this.tutors.length / this.pageSize)
    }
  },
}
</script>