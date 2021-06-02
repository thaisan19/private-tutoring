<template>
  <div class="toggle-search" :class="{changeSticky: scrollPosition > 110}">
		<button @click="toggleSearch" ><h1>🔎</h1></button>
	</div>
	<transition mode="out-in"
	enter-active-class="animate__animated animate__zoomIn animate__faster"
	leave-active-class="animate__animated animate__zoomOut animate__faster">
  	<div class="search-lable" v-if="searchOn">
    	<input type="text" name="search-lable" v-model="search" placeholder="Search by: Courses' Name | Price" :class="{changeInputSticky: scrollPosition > 110}">
  </div>
	</transition>
  <div class="tutors-list" v-if="sortedTutors.length > 0">
    <ul>
      <li 
        v-for="tutor in sortedTutors" 
        :key="tutor.id"
        class="tutor-list"
        >
        <div class="tutor-profile-img">
          <img :src="`https://www.thementor-privatetutoring.me/${tutor.profile[0].path}`" :alt="tutor.profile[0].originalname">
        </div>
        <div class="tutor-desc">
          <h1>{{ tutor.fullName }} <span v-if="isMobile">- ${{ tutor.monthlyRate }}</span></h1>
          <p>{{ tutor.aboutMe }}</p>
          <ul>
            <li v-for="expertise in tutor.expertises" :key="expertise.id">
              {{ expertise }}
            </li>
          </ul>
        </div>
        <div class="tutor-actions">
          <div class="tutor-rate" v-if="!isMobile">
            <h2>${{ tutor.monthlyRate }}</h2>
            <h3>monthly rate</h3>
          </div>
          <div class="tutor-button">
           <main-button mode="btn black" @click="openTutor(tutor)">
            Details 🧷
           </main-button>
           <main-button mode="btn black" @click="openTutorRequest(tutor)">
            Courses 🙌
           </main-button>
          </div>
        </div>
      </li>
    </ul>
   <div class="paginator client-paginator">
      <button @click="prevPage">
        <img src="../../assets/icons/left-arrow.svg" alt="left-arrow">
      </button>
      <p>Page <strong>{{currentPage}}</strong> total of <strong>{{ numOfPages }}</strong></p>
      <button mode="btn black" @click="nextPage">
        <img src="../../assets/icons/right-arrow.svg" alt="right-arrow">
      </button>
   </div>
  </div>
  <div v-else>
    <h1>No searching result, please try again...🙏🌿</h1>
  </div>
  <ModalView 
    v-if="openedTutor"
    @closeModal="openedTutor = null">
    <TutorFullView :tutor="openedTutor" @changeTutor="changeTutor" />
  </ModalView>

  <div class="owned-courses">
	  <ModalView 
      v-if="openedTutorRequest"
      @closeModal="openedTutorRequest = null">
      <div class="is-courses">
        <h1>{{ openedTutorRequest.length }} courses</h1>
      </div>
      <OwnedCoursesList :courses="openedTutorRequest" @changeTutorRequest="changeTutorRequest" class="owned-courses" />
    </ModalView>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import ModalView from '../main-components/ModalView.vue'
import TutorFullView from './TutorFullView.vue'
// import TutorRequest from './TutorRequest.vue'
import OwnedCoursesList from '../course/OwnedCoursesList.vue'

export default {
  props: ['tutors'],
  components: {
    ModalView,
    TutorFullView,
    // TutorRequest,
    OwnedCoursesList
  },
  data() {
    return {
      search: '',
      searchOn: false,
      windowWidth: window.innerWidth,
      scrollPosition: null,
      currentPage: 1,
      pageSize: 12
    }
  },
  setup() {
    return {
      openedTutor: ref(null),
      openedTutorRequest: ref(null)
    }
  },
  methods: {
    nextPage() {
     if((this.currentPage*this.pageSize) < this.filteredTutors.length) this.currentPage++;
    },
    prevPage() {
     if(this.currentPage > 1) this.currentPage--;
    },
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
    toggleSearch() {
      this.searchOn = !this.searchOn
      this.search = ''
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    openTutor(tutor) {
      this.openedTutor = tutor;

      // if(tutor) {
      //   tutor.view = true
      //   this.updateTutor(tutor)
      // }
    },
    changeTutor({closeModal}) {
      let tutor = this.openedTutor
      if(closeModal) {
        this.openedTutor = null
      }
    },
    openTutorRequest(tutor) {
      this.openedTutorRequest = tutor.ownedCourses;
    },
    changeCourseRequest({closeModal}) {
      let tutor = this.openedTutorRequest
      if(closeModal) {
        this.openedTutorRequest = null
      }
    },
    // updateTutor(tutor) {
    //   axios.put(`http://localhost:5000/api/tutor/${tutor.id}`, tutor)
    // }
  },
  computed: {
    isMobile() {
      if(this.windowWidth < 481) {
        return true
      }
    },
    isTablet() {
      if(this.windowWidth < 1025 && this.windowWidth > 700) {
        return true
      }
    },
    notDeleteTutors() {
      return this.tutors.filter((tutor) => tutor.delete.toString() === 'false')
    },
    filteredTutors() {
      return this.notDeleteTutors.filter((tutor) => {
        
        const expLen = tutor.expertises.length;
        for (const i = 0; i < expLen; i++) {
          console.log(tutor.expertises[i+2])
          return tutor.expertises[i].toLowerCase().includes(this.search.toLowerCase().trim()) || tutor.expertises[i+1].toLowerCase().includes(this.search.toLowerCase().trim()) || tutor.fullName.toLowerCase().includes(this.search.toLowerCase().trim()) || tutor.monthlyRate.toLowerCase().includes(this.search.toLowerCase().trim())
        }
        
      })
    },
    sortedTutors() {
      return this.filteredTutors.filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      })
    },
    numOfPages() {
      return Math.ceil(this.tutors.length / this.pageSize)
    }, 
  },
  watch: {
    width(newWidth, oldWidth) {
      this.txt = `it change to ${newWidth} from ${oldWidth}`;
    }    
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    window.addEventListener('scroll', this.updateScroll);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
}
</script>

<style scoped>
  .is-courses {
    position: absolute;
    top: 1em;
    left: 2em;
  }
  .tutors-list > ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    grid-gap: 3rem;
    list-style: none;
  }
  .tutors-list > ul > li {
    background: #fff;
    box-shadow: -10px 10px 0px rgba(0,0,0,.05);
    overflow: hidden;
    border: 3px solid var(--black);
  }
  .tutor-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tutor-profile-img {
    width: 22%;
    height: 100%;
    overflow: hidden;
  }
  .tutor-desc {
    width: 55%;
    height: 100%;
    padding-left: 1em;
    padding-right: 0;
    
  }
  .tutor-desc > p {
    padding: 0em 0em;
    padding-left: 1em;
    overflow: hidden;
 	  text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .tutor-desc > h1 {
    padding: .5em 0 .5em .5em;
  }
  .tutor-desc > ul {
    padding-top: 1em;
    display: flex;
    align-items: center;
    padding-left: 1em;
    flex-wrap: wrap;
  }
  .tutor-desc > ul > li {
    margin-right: .5em;
    padding: .5em;
    background: var(--white);
    box-shadow: inset 0px 5px 5px rgba(0,0,0,.1);
    /* border: 2px solid var(--black); */
    border-radius: 20px;
    font-weight: 500;
    margin-bottom: .5em;
  }
  .tutor-actions {
    width: 23%;
    padding: 1em;
    padding-left: 0em;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: right;
    background: url('../../assets/background-pattern-vertical.png');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .tutor-profile-img img{
    width: 100%;
    height: 100%;
	  object-fit: cover;
	  object-position: 50% 50%;
  }
  .tutor-button button{
    margin-bottom: .5em;
  }
  .tutor-button {
    padding-bottom: 1.5em;
  }
  .tutor-rate {
    padding-top: 1em;
  }

@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
  .is-courses {
    top: 1em;
    left: 1em;
  }
  .is-courses h1{
    font-size: 1.5em;
  }
  .tutors-list > ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    grid-gap: 2em;
  }
  .tutor-desc {
    padding: 0;
  }
  .tutor-desc > h1 {
    padding: .5em;
    font-size: 1.5em;
  }
  .tutors-list > ul > li {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 3fr 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    height: auto;
  }
  .tutors-list > ul > li .tutor-profile-img {
    grid-area: 1 / 1 / 3 / 2;
    width: 100%;
  }
  .tutor-desc {
    grid-area: 1 / 2 / 2 / 3;
    width: 100%;
    padding: 0;
  }
  .tutor-actions {
    grid-area: 2 / 2 / 3 / 3;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0;
  }
  .tutor-button button:first-child {
    margin-right: .5em;
  }
  .tutor-button {
    padding-bottom: .2em;
    padding-top: .7em;
  }
}

@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
}
</style>