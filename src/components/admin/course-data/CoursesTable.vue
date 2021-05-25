<template>
  <ConfirmPopup></ConfirmPopup>
  <div class="data-table animate__animated animate__fadeIn animate__fast">
    <div class="table-header course-table-header">
      <h1>{{ courses.length }} Courses Data</h1>
      <input type="text" class="table-search" placeholder="Filter Courses by: Name, Price, Tutor's Name" v-model="search">
      <main-button mode="btn black" @click="openAddCourse">➕ Add Course</main-button>
    </div>
    <div class="table">
      <table>
        <tr>
          <th @click="sort('id')">ID &nbsp;
            <span :class="[currentSortDir === 'asc' ? 'asc':'desc']"></span>
          </th>
          <th @click="sort('name')">Name &nbsp;
            <span :class="[currentSortDir === 'asc' ? 'asc':'desc']"></span>
          </th>
          <th @click="sort('price')">Price
            <span :class="[currentSortDir === 'asc' ? 'asc':'desc']"></span>
          </th>
          <th @click="sort('courseLength')">Length
            <span :class="[currentSortDir === 'asc' ? 'asc':'desc']"></span>
          </th>
          <th>Created By</th>
          <th>Tutoring Days</th>
          <th>Tutoring Hours</th>
          <th @click="sort('createdAt')">Created Date &nbsp;
            <span :class="[currentSortDir === 'asc' ? 'asc':'desc']"></span>
          </th>
          <th colspan="3">Actions</th>
        </tr>
        <tr v-for="course in sortedCourses" :key="course.id" :course="course">
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
              <button @click="toPublished(course)"
              :disabled="course.published">🤗</button>
               <span class="tooltiptext">Approve Course</span>
            </div>
          </td>
          <td>
            <div class="action edit">
              <button @click="openEditCourse(course)">🔨</button>
               <span class="tooltiptext">Edit Course</span>
            </div>
          </td>
          <td>
            <div class="action delete">
              <button @click="deleteCourse(course, $event)">❌</button>
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
import ConfirmPopup from 'primevue/confirmpopup';

export default {
 props: ['courses'],
 components: { 
   ModalView, 
   CourseView ,
   EditCourse,
   AddCourse,
   ConfirmPopup
 },
 data() {
   return {
     search: '',
     currentPage: 1,
     pageSize: 10,
     filter: '',
     numOfPages: '',
     currentSort: 'id',
     currentSortDir: 'asc'
   }
 },
 setup() {
   return { format, openedCourse: ref(null), openedAddCourse: ref(null), openedEditCourse: ref(null) }
  
 },
 methods: {
    sort(s) {
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
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
    toPublished(course) {
      if (course) {
        course.published = true
        this.updatePublished(course)
      }
    },
    // toDelete(course, event) {
    //   if (course) {
    //     course.delete = true
    //     this.deleteCourse(course, event)
    //   }
    // },
    updatePublished(course) {
      axios.put(`https://private-tutoring-backend.herokuapp.com/api/course/update/${course.id}`, course)
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
    deleteCourse(course, event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: `Are you sure want to delete course name ${course.name} ❔❗❕⭕`,
        accept: () => {
         axios.put(`https://private-tutoring-backend.herokuapp.com/api/course/update/${course.id}`, {delete: true})
        
         .then(() => {
          this.$toast(course.name + ' has been deleted!', {
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
    }
    // updateTutor(tutor) {
    //   axios.put(`http://localhost:3000/tutors/${tutor.id}`, tutor)
    // }
  },
  computed: {

    notDeleteCourses() {
      return this.courses.filter((course) => course.delete.toString() === 'false')
    },

    filteredCourse() {

      return this.notDeleteCourses.filter((course) => {
        return course.name.toLowerCase().includes(this.search.toLowerCase().trim()) || course.price.includes(this.search.trim()) || course.createdBy.toLowerCase().includes(this.search.toLowerCase().trim())
      })
    },

    sortedCourses() {
      return this.filteredCourse.sort((a, b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      })
    },

    numOfPages() {
      return Math.ceil(this.courses.length / this.pageSize)
    }
  },
  watch: {
    filter() {
      console.log('Reset to Page1 Due to Filter.');
      this.currentPage = 1;
    }
  }
}
</script>

<style>
.asc::after {
  content: '🔽';
  display: inline-block;
}
.desc::after {
  content: '🔼';
  display: inline-block;
}
</style>