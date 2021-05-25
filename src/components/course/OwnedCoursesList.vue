<template>
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
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import ModalView from '../main-components/ModalView.vue'
import CourseView from './CourseView.vue'
import CourseRequest from './CourseRequest.vue'

export default {
  props: ['courses'],
  components: {
    ModalView,
    CourseView,
		CourseRequest
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
		return { openedCourse: ref(null), openedCouresRequest: ref(null) }
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
  },
  computed: {

    filteredCourses() {
      return this.getOwnedPublishedCourses.filter((course) => {
        
        return course.name.toLowerCase().includes(this.search.toLowerCase().trim()) || course.createdBy.toLowerCase().includes(this.search.toLowerCase().trim()) || course.price.includes(this.search.toLowerCase().trim())

      })
    },

    getOwnedPublishedCourses() {
      return this.courses.filter((course) => course.published.toString() === 'true' && course.delete.toString() === 'false')
    }
  },
  async mounted() {
    window.addEventListener('scroll', this.updateScroll);
  }
}
</script>

<style scoped>
.courses-list {
  padding: 0 3em;
  margin-bottom: 3em;
}

@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
  .courses-list {
  padding: 0 1em;
  margin-bottom: 2em;
}
}

@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  .courses-list {
    padding: 0em;
    margin-bottom: 2em;
  }
  .courses-list ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1em;
  }
}
</style>