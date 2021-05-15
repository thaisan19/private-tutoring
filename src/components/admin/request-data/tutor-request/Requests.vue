<template>
  <div class="data-table animate__animated animate__fadeIn animate__faster">
    <div class="table-header tutor-table-header">
      <h1>{{ requests.length }} Requests</h1>
      <input type="text" class="table-search" placeholder="Filter Requests by: ID, Title, Student Name..." v-model="search">
      <div class="unread">
        <h1 :class="[unreadReqs.length > 0 ? 'notification':'']">{{ unreadReqs.length }}</h1>
        <div class="unread-text">
          <h3 :class="[unreadReqs.length > 0 ? 'to-blue':'']">unread</h3>
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
        <tr v-for="request in sortedRequests" :key="request.id" :request="request" :class="[request.read ? 'read': 'not-read']">
          <td @click="openRequest(request)">
            <p>{{ request._id }}</p>
          </td>
          <td @click="openRequest(request)">
            <p>{{ request.title }}</p>
          </td>
          <td @click="openRequest(request)">
            <p>{{ request.objId }}</p>
          </td>
          <td @click="openRequest(request)">
            <p>{{ request.objName }}</p>
          </td>
          <td @click="openRequest(request)">
            <p>{{ request.studentName }}</p>
          </td>
          <td @click="openRequest(request)">
            <p>{{ request.studentEmail }}</p>
          </td>
          <td @click="openRequest(request)">
            <p>{{ format(new Date(request.createdAt), 'MMM do yyyy') }}</p>
          </td>
          <td>
            <div class="action edit">
              <button @click="deleteRequest(request)">❌</button>
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
    v-if="openedRequest"
    @closeModal="openedRequest = null">
    <RequestView :request="openedRequest" @clickRequest="changeRequest" />
  </ModalView>
</template>

<script>
import { format } from 'date-fns'
import { ref } from 'vue'
import axios from 'axios'
import ModalView from '../../../main-components/ModalView.vue'
import RequestView from '../tutor-request/RequestView.vue'

export default {
 props: ['requests', 'unreadReqs'],
 components: { 
   ModalView, 
   RequestView 
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
     'Title',
     'Tutor/Course ID',
     'Tutor/Course Name',
     'Student Name',
     'Student Email',
     'Requested At'
   ])
   return { format, tableTitle, openedRequest: ref(null) }
 },
 methods: {
    nextPage() {
     if((this.currentPage*this.pageSize) < this.filteredRequests.length) this.currentPage++;
    },
    prevPage() {
     if(this.currentPage > 1) this.currentPage--;
    },
    openRequest(request) {
      this.openedRequest = request;

      if(request) {
        request.read = true
        this.updateRequest(request)
      }
    },
    changeRequest({closeModal}) {
      let request = this.openedRequest
      if(closeModal) {
        this.openedRequest = null
      }
    },
    async deleteRequest(request) {
      await axios.delete('http://localhost:5000/api/request/delete/' + request._id)
      .then(() => {
       this.$toast('Deleted request from ' + request.studentName, {
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
      }
      ).catch(err =>
       this.$toast('Request could not delete: ' + err + request.title, {
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
    updateRequest(request) {
      axios.put(`http://localhost:5000/api/request/update/${request._id}`, request)
    }
  },
  computed: {

    filteredRequests() {
      return this.requests.filter((request) => {

          return request.title.toLowerCase().includes(this.search.toLowerCase().trim())

      })
    },
    
    sortedRequests() {
      return this.filteredRequests.filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      }) 
    },

    numOfPages() {
      return Math.ceil(this.requests.length / this.pageSize)
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