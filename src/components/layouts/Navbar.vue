<template>
  <div :class="isMobile || isTablet ? 'main-header-mobile':'main-header'">
   <div class="nav">
    <nav v-if="!isMobile && !isTablet">
     <main-button link to="/courses" mode="btn black">Courses ✍</main-button>
     <main-button link to="/tutors" mode="btn black">Tutors 🧔</main-button>
     <main-button link to="/register" mode="btn black" v-if="!!!isLoggedInAsTutor" >Be a Tutor 📝</main-button>
    </nav>
    <div class="menu-mobile">
      <main-button mode="btn black"
        v-if="isMobile || isTablet" @click="(showMenu = !showMenu) && (showDropdown = false)"><img src="../../assets/illustration/menu-mobile.svg" class="icon"></main-button>
    </div>

   </div>
   <div :class="isMobile || isTablet ? 'logo-mobile':'logo'" class="animate__animated animate__swing animate__delay-3s">
    <router-link to="/">
      <img src="../../assets/logo/TheMentor-logo-svg-nobackground.svg">
    </router-link>
   </div>
   <div class="social-icons">
     <main-button link to="/tutor/login" mode="btn black" v-if="!!!isLoggedInAsTutor && !isMobile && !isTablet">Login as Tutor 👨‍🏫 </main-button>
     <div class="login-mobile" v-if="isMobile || isTablet">
       <router-link to="/tutor/login">
        <main-button mode="btn black" v-if="!!!isLoggedInAsTutor">
          <img src="../../assets/illustration/login.svg" class="icon">
        </main-button>
       </router-link>
     </div>
     <div class="greeting" v-if="!!isLoggedInAsTutor && !isTablet">
      <p>Good {{ currentTime }}, </p>
      <h3 v-if="activeTutor"> {{ activeTutor.fullName }} 👋</h3>
     </div>
     <div class="profile-button">
      <main-button mode="btn black" 
      class="profile-button" 
      v-if="!!isLoggedInAsTutor"
      @click="(showDropdown = !showDropdown) && (showMenu = false)">
      <!-- <div v-if="activeTutor.profile[0]">
        <img :src="`http://localhost:5000/${activeTutor.profile[0].path}`"> 
      </div> -->
      <div v-if="activeTutor && !activeTutor.profile && activeTutor.gender == '👨 Male'">
        <img src="../../assets/illustration/tutor-male.svg"> 
      </div>
      <div v-if="activeTutor && activeTutor.profile">
        <img :src="`https://private-tutoring-backend.herokuapp.com/${activeTutor.profile[0].path}`"> 
      </div>
      <div v-if="activeTutor && !activeTutor.profile && activeTutor.gender == '👩 Female'">
        <img src="../../assets/illustration/tutor-female.svg"> 
      </div>
       <p v-if="!isMobile">Profile 📍</p><p v-if="isMobile"> 📍</p></main-button>
     </div>
   </div>
   <transition mode="out in"
   enter-active-class="animate__animated animate__fadeInRight animate__faster"
   leave-active-class="animate__animated animate__fadeOutRight animate__faster">
    <div 
      :class="isMobile || isTablet ? 'dropdown-profile-menu-mobile':'dropdown-profile-menu'" 
      v-if="!!isLoggedInAsTutor && showDropdown">
      <ul @click="showDropdown = false">
        <li>
          <router-link to="/courses/user">
            <h3>📚 My Courses</h3>
          </router-link>
        </li>
        <li>
          <router-link to="/courses/create">
            <h3>➕ Add Course</h3>
          </router-link>
        </li>
        <li>
          <router-link to="/tutor/profile">
            <h3>😎 Account</h3>
          </router-link>
        </li>
        <li @click="logout">
          <h3>🚀 Logout</h3>
        </li>
      </ul>
    </div>
   </transition>
   <transition mode="out in"
   enter-active-class="animate__animated animate__fadeInLeft animate__faster"
   leave-active-class="animate__animated animate__fadeOutLeft animate__faster">
    <div 
      :class="isMobile || isTablet ? 'dropdown-menu-mobile dropdown-profile-menu-mobile':''" 
      v-if="(showMenu && isMobile) ||(showMenu && isTablet)">
      <ul @click="showMenu = false">
        <li>
          <router-link to="/courses">
            <h3>📚 Courses</h3>
          </router-link>
        </li>
        <li>
          <router-link to="/tutors">
            <h3>👨 Tutors</h3>
          </router-link>
        </li>
        <li v-if="!isLoggedInAsTutor">
          <router-link to="/register">
            <h3>📝 Be a Tutor</h3>
          </router-link>
        </li>
      </ul>
    </div>
   </transition>
  </div>
</template>

<script>
import axios from 'axios'
import { format } from 'date-fns'

export default {
  data() {
    return {
      showDropdown: false,
      showMenu: false,
      userId: null,
      activeTutor: null,
      windowWidth: window.innerWidth
    }
  },
  computed: {
    isLoggedInAsTutor() {
      return this.$store.getters.isAuthenticatedAsTutor;
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
    currentTime() {
      return format(new Date(), 'BBBB').split(' ').pop();
    },
    isMobile() {
      if(this.windowWidth < 481) {
        return true
      }
    },
    isTablet() {
      if(this.windowWidth < 1025) {
        return true
      }
    }
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    logout() {
      
      try {
        this.$store.dispatch('logout');

        this.$toast("User logged out 👏 See you again soon.", {
         duration: 3000,
         slotLeft: `🎉`,
         slotRight: `🎊`,
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
          this.$router.replace('/')
        }, 2000)
      } catch (err) {
        console.log(err.message || 'Could not log user out!')
        this.$toast('Could not log user out 🙏', {
         duration: 3000,
         slotLeft: `🎉`,
         slotRight: `🎊`,
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
      }
    }
  },
  created() {
    if(localStorage.getItem('userId') !== null) {
      this.userId = localStorage.getItem('userId')

      axios.get(`https://private-tutoring-backend.herokuapp.com/api/tutor/find-tutor/${this.userId}`)
        .then((res) => this.activeTutor = res.data)
    }
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
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  }
}
</script>

<style scoped>
.dropdown-profile-menu,
.dropdown-profile-menu-mobile {
  position: absolute;
  right: 5em;
  top: 8em;
  z-index: 1000;
}
.dropdown-profile-menu ul,
.dropdown-profile-menu-mobile ul {
  background: #fff;
  box-shadow: -5px 5px 0px rgba(0,0,0,0.1);
  border: 2px solid var(--black);
}
.dropdown-profile-menu ul li,
.dropdown-profile-menu-mobile ul li {
  padding: .5em 2em;
  cursor: pointer;
  transition: .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.dropdown-profile-menu ul li:hover,
.dropdown-profile-menu-mobile ul li:hover {
  background: var(--blue);
  color: #fff;
}
.dropdown-profile-menu ul li h3:hover,
.dropdown-profile-menu-mobile ul li h3:hover {
  transform: scale(1.1) rotate(-2deg);
}
a {
  color: var(--black);
}
.dropdown-profile-menu ul li:hover > a,
.dropdown-profile-menu-mobile ul li:hover > a {
  color: #fff;
}
.dropdown-profile-menu-mobile {
  right: 1em;
}
.dropdown-menu-mobile {
  width: auto;
  left: 1em;
  right: auto;
}
.profile-button button{
  padding: .2em;
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}
.profile-button button img {
  width: 2em;
  border-radius: 50%;
  height: 2em;
	object-fit: cover;
	object-position: 50% 50%;
  margin-right: 1em;
}
.profile-button button p {
  font-weight: 500;
}
.main-header {
 display: grid;
 grid-template-columns: 2fr 1fr 2fr;
 justify-content: space-between;
 align-items: center;
 border-bottom: 2.5px solid var(--black);
 padding: 1em 0;
}
.main-header-mobile {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  align-items: center;
  padding: 1em 0;
  border-bottom: 4px solid var(--black);
}
.menu-mobile button,
.login-mobile  button {
  width: 2em;
  font-size: 1.7em;
  height: 2em;
  border-radius: 50%;
  align-items: center;
  padding: 0;
  text-align: center;
}
.logo-mobile img {
  width: 4em;
}

.btn:nth-last-child(3), .btn:nth-last-child(2), .router:nth-last-child(3), .router:nth-last-child(2) {
 margin-right: 0.5em;
}
.logo img {
 width: 4.5em;
}
.logo {
 text-align: center;
}
.social-icons {
 text-align: right;
 display: flex;
 align-items: center;
 justify-content: flex-end;
}
.greeting {
  display: flex;
  align-items: flex-end;
  margin-right: .5em;
}

@media only screen and (min-device-width : 320px) and (max-device-width : 900px) { 

  .main-header {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    overflow: hidden;
  }
  .logo {
    grid-area: 1 / 1 / 2 / 3;
  }
  .to-mobile {
    grid-area: 2 / 1 / 3 / 2;
  }
  .icon {
    width: 1.2em;
  }
  .navbar {
    max-width: 100%;
    padding: 1em 1em;
  }
  .logo-mobile {
    text-align: center;
  }
}
@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  .logo-mobile {
    text-align: center;
  }
  .menu-mobile {
    display: flex;
    align-items: center;
  }
}
</style>