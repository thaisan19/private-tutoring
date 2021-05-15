<template>
  <div class="data-table animate__animated animate__fadeIn animate__fast">
    <div class="table-header course-table-header">
      <h1>{{ courses.length }} Courses Data</h1>
      <input type="text" class="table-search" placeholder="Filter Courses by: Name, Price, Tutor's Name" v-model="search">
      <main-button mode="btn black" @click="openAddCourse">➕ Add Course</main-button>
    </div>
    <div class="table">
      <table>
        <tr>
          <th v-for="title in tableTitle" :key="title">
            {{ title }}
          </th>
          <th colspan="2">Actions</th>
        </tr>
        <tr v-for="course in sortedCourse" :key="course.id" :course="course">
          <td @click="openCourse(course)">
            <p>{{ course.id }}</p>
          </td>
          <td @click="openCourse(course)">
            <p><strong>{{ course.name }}</strong></p>
          </td>
          <td @click="openCourse(course)">
            <p>${{ course.price }}</p>
          </td>
          <td @click="openCourse(course)">
            <p>{{ course.courseLength }}</p>
          </td>
          <td @click="openCourse(course)">
            <p><strong>{{ course.createdBy }}</strong></p>
          </td>
          <td @click="openCourse(course)">
            <p v-for="day in course.tutoringDays" :key="day">◾ {{ day }}</p>
          </td>
          <td @click="openCourse(course)">
            <p v-for="hour in course.tutoringHours" :key="hour">◾ {{ hour }}</p>
          </td>
          <td @click="openCourse(course)">
            <p>{{ format(new Date(course.createdAt), 'MMM do yyyy') }}</p>
          </td>
          <td>
            <div class="action edit">
              <button @click="openEditCourse(course)">🔨</button>
            </div>
          </td>
          <td>
            <div class="action delete">
              <button @click="deleteCourse(course)">❌</button>
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
    v-if="openedCourse"
    @closeModal="openedCourse = null">
    <CourseView :course="openedCourse" @clickTutor="changeCourse" />
  </ModalView>

  <ModalView 
    v-if="openedAddCourse"
    @closeModal="openedAddCourse = null" >
      <AddCourse @clickAddCourse="changeAddCourse" />
  </ModalView>

  <ModalView 
    v-if="openedEditCourse"
    @closeModal="openedEditCourse = null" >
      <EditCourse :course="openedEditCourse" @clickEditCourse="changeEditCourse" />
  </ModalView>
</template>

<script>
import { format } from 'date-fns'
import { ref } from 'vue'
import axios from 'axios'
import ModalView from '../../main-components/ModalView.vue'
import CourseView from '../../course/CourseView.vue'
import AddCourse from '../course-data/AddCourse.vue'
import EditCourse from '../course-data/EditCourse.vue'

export default {
 props: ['courses'],
 components: { 
   ModalView, 
   CourseView ,
   EditCourse,
   AddCourse
 },
 data() {
   return {
     search: '',
     currentPage: 1,
     pageSize: 10,
     filter: '',
     numOfPages: ''
   }
 },
 setup() {
   const tableTitle = ref([
     'ID',
     'Name',
     'Price',
     'Length',
     'Created by',
     'Tutoring Days',
     'Tutoring Hours',
     'Created Date'

   ])
   return { format, tableTitle, openedCourse: ref(null), openedAddCourse: ref(null), openedEditCourse: ref(null) }
  
 },
 methods: {
    nextPage() {
     if((this.currentPage*this.pageSize) < this.filteredCourse.length) this.currentPage++;
    },
    prevPage() {
     if(this.currentPage > 1) this.currentPage--;
    },
    openCourse(course) {
      this.openedCourse = course;

      // if(course) {
      //   course.view = true
      //   this.updateCourse(course)
      // }
    },
    openAddCourse() {
      this.openedAddCourse = true
    },
    openEditCourse(course) {
      this.openedEditCourse = course;
    },
    changeCourse({closeModal}) {
      let course = this.openedCourse
      if(closeModal) {
        this.openedCourse = null
      }
    },
    changeAddCourse({closeModal}) {
      if(closeModal) {
        this.openedAddCourse = null
      }
    },
    changeEditCourse({closeModal}) {
      if(closeModal) {
        this.openedEditCourse = null
      }
    },
    async deleteCourse(course) {
      await axios.delete(`https://private-tutoring-backend.herokuapp.com/api/course/delete/${course.id}`)
       this.$toast(course.name + ' deleted!', {
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
          this.$router.go('/AdminCourse')
        }, 2000)
        .catch(err => console.log(err))
    }
    // updateTutor(tutor) {
    //   axios.put(`http://localhost:3000/tutors/${tutor.id}`, tutor)
    // }
  },
  computed: {

    filteredCourse() {

      return this.courses.filter((course) => {
        return course.name.toLowerCase().includes(this.search.toLowerCase().trim()) || course.price.toLowerCase().includes(this.search.toLowerCase().trim()) || course.createBy.toLowerCase().includes(this.search.toLowerCase().trim())
      })
    },
    sortedCourse() {
      return this.filteredCourse.filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      }) 
    },

    numOfPages() {
      return Math.ceil(this.courses.length / this.pageSize)
    }
  },
}
</script>

<style>
</style>