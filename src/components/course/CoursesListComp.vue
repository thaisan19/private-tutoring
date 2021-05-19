<template>
  <ConfirmPopup></ConfirmPopup>
	<div class="toggle-search" :class="{changeSticky: scrollPosition > 110}">
		<button @click="toggleSearch"><h1>🔎</h1></button>
	</div>
	<transition mode="out-in"
	enter-active-class="animate__animated animate__zoomIn animate__faster"
	leave-active-class="animate__animated animate__zoomOut animate__faster">
  	<div class="search-lable" v-if="searchOn">
    	<input type="text" name="search-lable" v-model="search" placeholder="Search by: Courses' Name | Courses' Price | Tutors' Name" :class="{changeInputSticky: scrollPosition > 110}">
  </div>
	</transition>
  <div class="courses-list" v-if="filteredCourses.length > 0" :courses="courses">
   <ul>
    <li class="course-list" v-for="course in filteredCourses" :key="course.id">
			<div class="course-list-header">
				<div class="course-tutor-profile">
					<img :src="`https://private-tutoring-backend.herokuapp.com/${course.ownerProfile[0].path}`">
					<h3>{{ course.createdBy }}</h3>
				</div>
				<div class="course-price">
					<h3>${{ course.price }}&nbsp;</h3>
					<p>/ {{ course.courseLength }}</p>
				</div>
			</div>
			<div class="course-list-body">
				<h2>{{ course.name }}</h2>
				<div class="tutoring-day">
					<h3>📆 Tutoring Days:</h3>
					<ul>
						<li v-for="day in course.tutoringDays" :key="day" class="display-days">
							<p>◾ {{ day }}</p>
						</li>
					</ul>
				</div>
				<div class="tutoring-hour">
					<h3>⏰ Tutoring Hours:</h3>
					<ul>
						<li v-for="hour in course.tutoringHours" :key="hour" class="display-hours">
							<p>◾ {{ hour }}</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="course-list-footer">
				<main-button mode="btn black" @click="openCourse(course)" class="course-btn">Details 📃</main-button>
				<main-button 
          mode="btn black" 
          @click="openEditCourse(course)" 
          class="delete-btn"
          v-if="!!isLoggedInAsTutor && userId == course.ownerId">
            🔨
        </main-button>
				<main-button 
          mode="btn black" 
          @click="deleteCourse(course, $event)" 
          class="delete-btn"
          v-if="!!isLoggedInAsTutor && userId == course.ownerId">
            ❌
        </main-button>

				<main-button 
        mode="btn black" 
        class="course-btn" 
        @click="openCourseRequest(course)"
        v-if="!isLoggedInAsAdmin && !isLoggedInAsTutor">Request 🚀</main-button>
			</div>
    </li>
   </ul>
   
  </div>
	<div v-else class="no-result">
		<h1>No course found, please try another title...🙌🍁</h1>
	</div>
	<ModalView 
    v-if="openedCourse"
    @closeModal="openedCourse = null">
    <CourseView :course="openedCourse" @changeCourse="changeCourse"
		@openCourseReq="openCourseReq" />
  </ModalView>

	<ModalView 
    v-if="openedCouresRequest"
    @closeModal="openedCouresRequest = null">
    <CourseRequest :course="openedCouresRequest" @changeCouresRequest="changeCouresRequest" />
  </ModalView>

  <ModalView 
    v-if="openedEditCourse"
    @closeModal="openedEditCourse = null" >
      <EditCourse :course="openedEditCourse" @clickEditCourse="changeEditCourse" />
  </ModalView>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import ModalView from '../main-components/ModalView.vue'
import CourseView from './CourseView.vue'
import CourseRequest from './CourseRequest.vue'
import EditCourse from '../admin/course-data/EditCourse.vue'
import ConfirmPopup from 'primevue/confirmpopup';

export default {
  props: ['courses'],
  components: {
    ModalView,
    CourseView,
		CourseRequest,
    EditCourse,
    ConfirmPopup
  },
  data() {
    return {
      search: '',
			searchOn: false,
      userId: '',
      scrollPosition: null
    }
  },
  setup() {

		return { openedCourse: ref(null), openedCouresRequest: ref(null), openedEditCourse: ref(null) }
  },
  
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
    toggleSearch() {
      this.searchOn = !this.searchOn
      this.search = ''
    },
    openCourse(course) {
      this.openedCourse = course;

      // if(course) {
      //   course.view = true
      //   this.updateCourse(course)
      // }
    },
    changeCourse({closeModal}) {
      let course = this.openedCourse
      if(closeModal) {
        this.openedCourse = null
      }
    },
    openCourseRequest(course) {
      this.openedCouresRequest = course;
    },
    changeCourseRequest({closeModal}) {
      let course = this.openedCouresRequest
      if(closeModal) {
        this.openedCouresRequest = null
      }
    },
    openEditCourse(course) {
      this.openedEditCourse = course;
    },
    changeEditCourse({closeModal}) {
      if(closeModal) {
        this.openedEditCourse = null
      }
    },
    async deleteCourse(course, event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: `Are you sure want to delete course name ${course.name} ❔❗❕⭕`,
        accept: () => {
         axios.delete(`https://private-tutoring-backend.herokuapp.com/api/course/delete/${course.id}`)
        
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
  },
  computed: {
    isOwned() {
      this.courses.filter((course) => {
        if(course.ownerId = localStorage.getItem('userId')) {
          return course
        }
      })
    },

    filteredCourses() {
      return this.courses.filter((course) => {
        
        return course.name.toLowerCase().includes(this.search.toLowerCase().trim()) || course.createdBy.toLowerCase().includes(this.search.toLowerCase().trim()) || course.price.includes(this.search.toLowerCase().trim())

      })
    },
    isLoggedInAsTutor() {
      return this.$store.getters.isAuthenticatedAsTutor;
    },
    isLoggedInAsAdmin() {
      return this.$store.getters.isAuthenticatedAsAdmin;
    },
  },
  async created() {
    if(localStorage.getItem('userId') !== null) {
      this.userId = localStorage.getItem('userId')
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  }
}
</script>

<style scoped>
.no-result {
  padding: 2em;
}
.course-btn {
	box-shadow: -5px 5px 0px rgba(0,0,0,.1);
}
.courses-list > ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 3rem;
  list-style: none;
  }
.courses-list > ul > li {
  background: #fff;
  box-shadow: -10px 10px 0px rgba(0,0,0,.1);
  overflow: hidden;
  border: 3px solid var(--black);
	position: relative;
	display: block;
	padding: 1.5em;
}
.courses-list > ul > li::after {
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: 0;
  overflow: hidden;
}
.courses-list > ul > li:nth-child(even)::after {
	background: url('../../assets/test-background-03.png');
	background-repeat: no-repeat;
  background-size: cover;
	opacity: 0.6;
}
.courses-list > ul > li:nth-child(odd)::after {
	background: url('../../assets/background-pattern-bottom-right-to-top-left.png');
	background-repeat: no-repeat;
  background-size: cover;
	opacity: 0.6;
}
.course-tutor-profile > img {
	width: 3em;
	height: 3em;
	border-radius: 50%;
	object-fit: cover;
	object-position: 50% 50%;
	margin-right: .5em;
}
.course-list-footer, .course-list-header, .course-list-body {
	z-index: 10;
	position: relative;
}
.course-list-header, .course-tutor-profile, .course-price {
	display: flex;
	align-items: center;
}
.course-list-header {
	justify-content: space-between;
}
.course-list-body h2 {
	padding: .5em 0;
	text-align: center;
}
.tutoring-day > ul, .tutoring-hour > ul {
	display: flex;
	flex-wrap: wrap;
	padding: .5em 0;
}
.tutoring-day > ul > li, .tutoring-hour > ul > li {
	padding-right: .5em;
	font-weight: 600;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
}
.course-list-footer {
	padding-top: 1em;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	width: 80%;
	margin: 0 auto;
}
@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
  .courses-list > ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 2em;
  }
  .courses-list > ul > li {
    padding: 1em;
  }
  .course-list-footer {
    width: 90%;
  }
}

@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  .content {
    padding: 0;
    width: 100%;
  }
  .courses-list {
    width: 100%;
  }
  .courses-list > ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 2em;
  }
}

</style>