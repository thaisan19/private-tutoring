<template>
<div class="contain">
  <section class="section-one" v-if="!isMobile && !isTablet">
    <div class="wrapper">
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
    </div>
    <div class="main-section">
      <h1 class="animate__animated animate__jello">Private<br>Tutoring</h1>
    </div>
  </section>
  <div class="section-one-mobile" v-if="isMobile && !isTablet">
    <div class="section-one-mobile-content">
      <h1>Private<br>Tutoring</h1>
      <p>BY THEMENTOR</p>
    </div>
    <div class="illustra">
      <img src="../assets/illustration/education-green.svg">
    </div>
  </div>
  <div class="section-one-tablet" v-if="isTablet && !isMobile">
    <div class="section-one-tablet-content">
      <h1>PRIVATE<br>TUTORING</h1>
      <p>BY THEMENTOR</p>
    </div>
    <div class="illustra">
      <img src="../assets/illustration/education-green.svg">
    </div>
  </div>
  <section class="section-two">
    <div class="button-mobile" v-if="isMobile">
      <router-link to="/courses">
        <main-button mode="btn black" class="button">
            Courses
        </main-button>
      </router-link>
      <router-link to="/tutors">
        <main-button mode="btn black" class="button">
            Tutors
        </main-button>
      </router-link>
    </div>
    <div class="button-tablet" v-if="isTablet">
      <router-link to="/courses">
        <main-button mode="btn black" class="button">
            Courses
        </main-button>
      </router-link>
      <router-link to="/tutors">
        <main-button mode="btn black" class="button">
            Tutors
        </main-button>
      </router-link>
    </div>
    <div class="button-desktop" v-if="!isTablet && !isMobile">
      <router-link to="/courses">
        <main-button mode="btn black" class="button">
            Courses
        </main-button>
      </router-link>
      <router-link to="/tutors">
        <main-button mode="btn black" class="button">
            Tutors
        </main-button>
      </router-link>
    </div>
    <div class="first-body">
      <div class="first-body-left">
        <h1>We Will Provide <br>FOR YOU...</h1>
        <br>
        <br>
        <p>Online tutoring platform that consists of best qualified tutors. We are assured that our service will provide you <strong>KNOWLEDGE</strong> <br>and <strong>BENEFITS</strong>.</p>
        <br><br>
        <h2 v-if="!isMobile && !isTablet">💡📌🧷</h2>
        <img src="../assets/illustration/Build.svg" v-if="isMobile">
      </div>
      <div class="first-body-right">
        <div class="first-body-right-ele first-body-right-top">
          <div>
            <h1 v-if="!isMobile">👩‍🏫</h1>
            <img src="../assets/illustration/teacher.svg" class="first-body-right-image-icon" v-if="isMobile">
            <h2>Tutors' Benefits</h2>
          </div>
          <br>
          <p>
            Our Tutor is a high-achieving student or teacher who is well-behaved and able to help a student achieve his or her goal. Tutors will get the income based on the performance.
          </p>
        </div>
        <div class="first-body-right-ele first-body-right-middle">
          <br>
          <div>
            <h1 v-if="!isMobile">👨‍🎓</h1>
            <img src="../assets/illustration/student-think.svg" class="first-body-right-image-icon" v-if="isMobile">
            <h2>Students' Benefits</h2>
          </div>
          <br>
          <p>
            Students who join our tutoring  are assured that our service will provide you with knowledge and extra  benefits such mentoring , certificates and more.
          </p>
        </div>
        <div class="first-body-right-ele first-body-right-bottom">
          <br>
          <div>
            <h1 v-if="!isMobile">🤝</h1>
            <img src="../assets/illustration/matching.svg" class="first-body-right-image-icon" v-if="isMobile">
            <h2>Matching Service</h2>
          </div>
          <br>
          <p>
            We will match the tutor and student based on the subject requirement, and then both tutor and student will be invited to the chat party.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="section-three">
    <div class="second-body">
      <div class="be-tutor-illus" v-if="isMobile">
          <img src="../assets/illustration/Directions.svg">
      </div>
      <div class="be-tutor-illus-tablet" v-if="isTablet">
          <img src="../assets/illustration/Directions.svg">
      </div>
      <div class="second-body-title">
        <h2 v-if="!isMobile">Be Our Official Tutor <br>With 4 Steps...</h2>
        <h2 v-if="isMobile">Be Our Official Tutor With 4 Steps...</h2>
      </div>
      <div class="steps">
        <div class="step step-one">
          <div class="sticks">
            <div class="stick stick--active"></div>
            <div class="stick"></div>
            <div class="stick"></div>
            <div class="stick"></div>
          </div>
          <h2>Register With Our Platform</h2>
          <p>In order to register, the Coordinate will fill in some details about their background and profession.
</p>
        </div>
        <div class="step step-two">
          <div class="sticks">
            <div class="stick stick--active"></div>
            <div class="stick stick--active"></div>
            <div class="stick"></div>
            <div class="stick"></div>
          </div>
          <h2>Interview</h2>
          <p>After you pass our check your profession, we will invite you to the interview.</p>
        </div>
        <div class="step step-three">
          <div class="sticks">
            <div class="stick stick--active"></div>
            <div class="stick stick--active"></div>
            <div class="stick stick--active"></div>
            <div class="stick"></div>
          </div>
          <h2>Waiting For Result</h2>
          <p>You will receive the message through any possible platform within a week.</p>
        </div>
        <div class="step step-four">
          <div class="sticks">
            <div class="stick stick--active"></div>
            <div class="stick stick--active"></div>
            <div class="stick stick--active"></div>
            <div class="stick stick--active"></div>
          </div>
          <h2>Congratulations</h2>
          <p>If you pass our interview, we will promote you as a tutor on our site and be ready for tutoring.</p>
        </div>
      </div>
    </div>
  </section>
  <section class="section-four">
    <router-link to="/register">
      <div class="register-marquee">
        <p v-if="!isMobile">Register As a Tutor With Us Now 🤝👨‍⚖️😃</p>
        <p v-if="isMobile">Register As a Tutor With Us Now <br>
          <img src="../assets/illustration/tutor-female.svg" alt="">&nbsp;&nbsp;
          <img src="../assets/illustration/tutor-male.svg" alt="">
        </p>
      </div>
    </router-link>
  </section>
  <section class="section-five">
    <div class="first-video">
      <div class="student-video">
        <iframe
        src="https://youtube.com/embed/Np-_FD-5yTY">
        </iframe>
      </div>
      <div class="student-video-title">
        <h2>Student's Tips</h2>
        <p v-if="!isMobile">The video at your left handside will definitely shows you, students, of how to enjoy our platform.</p>
        <p v-if="isMobile">The first video above this text will definitely shows you, students, of how to enjoy our platform.</p>
        <h1 v-if="!isMobile && !isTablet">👈</h1>
      </div>
    </div>
    <div class="between-video" v-if="isMobile && !isTablet">
      <img src="../assets/illustration/Notification.svg">
    </div>
    <div class="between-video-tablet" v-if="isTablet">
      <img src="../assets/illustration/Notification.svg">
    </div>
    <div class="second-video">
      <div class="tutor-video-title">
        <h2>Tutor's Tips</h2>
        <p>Hello There Tutor 👋 Hardly to find out how to register with our platform? You will need the video on your right handside. Enjoy Tutor.</p>
        <h1 v-if="!isMobile && !isTablet">👉</h1>
      </div>
      <div class="tutor-video">
        <iframe
        src="https://youtube.com/embed/Np-_FD-5yTY">
        </iframe>
      </div>
    </div>
  </section>
  <section class="section-six">
    <div class="our-team">
      <h1 v-if="!isMobile">🤹‍♂️ Meet The Team</h1>
      <div class="our-team-mobile" v-if="isMobile">
        <img src="../assets/illustration/team.svg" class="team-icon">
        <h1>Our Team</h1>
      </div>
      <Carousel :items-to-show="1" class="carousel" :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="member in members" :key="member.name">
          <div class="carousel__item">
            <div class="carousel-item-left">
              <img :src="member.img">
            </div>
            <div class="carousel-item-right">
              <h2>{{ member.name }}</h2>
              <h4>{{ member.role }}</h4>
              <p>{{ member.description }}</p>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>

    </div>
  </section>
</div>
</template>

<script>
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

export default {
  name: 'Home',
  data() {
    return {
      breakpoints: {
        700: {
          itemsToShow: 1.5,
          snapAlign: 'center',
        },
        1024: {
          itemsToShow: 2.5,
          snapAlign: 'center'
        }
      },
      windowWidth: window.innerWidth,
      members: [
        {
          img: require('../assets/member-profile/meas_soknoy.jpg'),
          name: 'Meas Soknoy',
          role: 'President',
          description: "I'm a 3rd year student at Kirirom Institute of Technolog. Hey there, nice to meet you 🤗👋"
        },
        {
          img: require('../assets/member-profile/y_sreylin.jpg'),
          name: 'Y Sreylin',
          role: 'Vice-President',
          description: "Never expect enspiration from other. Your will get it without condition from the heart of your parent."
        },
        {
          img: require('../assets/member-profile/thai_san.jpg'),
          name: 'Chhour Thaisan',
          role: 'Developer, Designer',
          description: "It's just life. It will be over before we knew it. The soul know no time, life is too short to waste a second 🤗👋"
        },
        {
          img: require('../assets/member-profile/ly_panha.jpg'),
          name: 'Ly Panha',
          role: 'Developer',
          description: "Hope tomorrow is better than today."
        },
        {
          img: require('../assets/member-profile/bun_chhean.jpg'),
          name: 'Chhiv Bunchhean',
          role: 'Content Writer',
          description: "Life is born to solve the problem, but problem exist every minute."
        },
        {
          img: require('../assets/member-profile/veasna_pich.jpg'),
          name: 'Pich Veasna',
          role: 'Content Creator',
          description: "I'm a 2rd year student at Kirirom Institute of Technolog. Hey there,  🤗👋"
        },
        {
          img: require('../assets/member-profile/long_hakley.jpg'),
          name: 'Long Hakly',
          role: 'CMO',
          description: "Nothing is impossible, except you do nothing."
        },
        {
          img: require('../assets/member-profile/pich_rechana.jpg'),
          name: 'Pich Rachana',
          role: 'Marketing',
          description: "Fake it till you make it."
        },
      ]
    }
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
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
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    }
  }
}
</script>

<style>
/* caroudsel style */
.carousel {
  z-index: 1;
}
.carousel__item {
  min-height: 10em;
  width: 100%;
  color:  var(--black);
  background: #fff;
  font-size: 20px;
  border: 4px solid var(--black);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-content: center;
  align-items: center;
  box-shadow: 10px 10px 0 rgba(0,0,0,0.1);
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: auto;
  overflow: hidden;
}
.carousel-item-left {
  height: 100%;
  z-index: 1;
  overflow: hidden;
}
.carousel-item-right p {
  padding: 1em;
}
.carousel-item-left img {
  height: auto;
  width: 80%;
  transform: scale(1.3);
}
.carousel-item-right {
  padding: 1em 0;
}
.carousel__item::after {
  content: "";
  background: url('../assets/background-pattern-bottom-right-to-top-left.png');
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  z-index: 0;
  overflow: hidden;
}
.carousel__item:hover {
  transform: scale(1) rotateZ(-3deg);
}
.carousel__slide {
  padding: 1em;
}
.carousel__pagination-button {
  background: #fff;
  transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  width: 1.7em;
  height: .5em;
  transform: skewX(-40deg);
}
.carousel__pagination-button:focus {
  outline: none;
}
.carousel__pagination-button--active {
  background: var(--yellow);
}
.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
  background: var(--blue);
  z-index: 1;
}
.carousel__prev:focus,
.carousel__next:focus {
  outline: none;
}

/* register marquee animation */
.register-marquee {
  height: 20vh;
  overflow: hidden;
  position: relative;
  color: var(--black);
  padding-top: 3em;
  border-bottom: 5px solid var(--black);
  border-top: 5px solid var(--black);
  background: url('../assets/background-pattern-vertical.png');
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
}        
.register-marquee p {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: auto auto;
  font-weight: 700;
  text-align: center;
  font-size: 4em;
  -moz-transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
  -moz-animation: scroll-left 2s linear infinite;
  -webkit-animation: scroll-left 2s linear infinite;
  animation: scroll-left 15s linear infinite;
  transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.register-marquee p:hover {
  letter-spacing: .03em;
  color: var(--blue);
}
        
@-moz-keyframes scroll-left {
  0% {
    -moz-transform: translateX(100%);
  }
  100% {
    -moz-transform: translateX(-100%);
  }
}      
@-webkit-keyframes scroll-left {
  0% {
    -webkit-transform: translateX(100%);
  }
  100% {
    -webkit-transform: translateX(-100%);
  }
}
        
@keyframes scroll-left {
  0% {
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
}
  100% {
    -moz-transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}
.section-one {
  width: 70vw;
  margin: 0 auto;
  overflow: hidden;
}
.global-search input {
  width: 40%;
  border: 2.5px solid var(--black);
  margin-bottom: 15vh;
  border-radius: 20px;
}
.animate__animated.animate__jello {
  --animate-duration: 2.5s;
}
.main-section {
  text-align: center;
  font-size: 10em;
  font-weight: 900;
  margin-top: 12vh;
  line-height: 115%;
  /* mix-blend-mode: luminosity; */
  color: black;
  -webkit-text-fill-color: var(--blue);
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: var(--black);
  /* text-decoration: underline; */
  /* text-shadow: 0px 20px 5px rgba(0,0,0,0.2); */
  height: 70vh;
}
.wrapper {
  height: 80%;
  width: 100%;
  background: transparent;
  position: absolute;
  z-index: 0;
  left: 0;
  margin-top: 0;
}
.wrapper div {
  height: 60px;
  width: 60px;
  border: 2px solid var(--black);
  border-radius: 50px;
  position: absolute;
  top: 10%;
  left: 10%;
  animation: animate 4s linear infinite;
}
div .dot {
  height: 10px;
  width: 10px;
  border-radius: 50px;
  background: var(--black);
  position: absolute;
  top: 20%;
  right: 20%;
}
.wrapper div:nth-child(1) {
  top: 20%;
  left: 20%;
  animation: animate 8s linear infinite;
}
.wrapper div:nth-child(2) {
  top: 60%;
  left: 80%;
  animation: animate 10s linear infinite;
}
.wrapper div:nth-child(3) {
  top: 40%;
  left: 40%;
  animation: animate 5s linear infinite;
}
.wrapper div:nth-child(4) {
  top: 66%;
  left: 60%;
  animation: animate 7s linear infinite;
}
.wrapper div:nth-child(5) {
  top: 90%;
  left: 10%;
  animation: animate 9s linear infinite;
}
.wrapper div:nth-child(6) {
  top: 30%;
  left: 90%;
  animation: animate 5s linear infinite;
}
.wrapper div:nth-child(7) {
  top: 70%;
  left: 20%;
  animation: animate 8s linear infinite;
}
.wrapper div:nth-child(8) {
  top: 75%;
  left: 60%;
  animation: animate 10s linear infinite;
}
.wrapper div:nth-child(9) {
  top: 50%;
  left: 50%;
  animation: animate 6s linear infinite;
}
.wrapper div:nth-child(10) {
  top: 5%;
  left: 50%;
  animation: animate 7s linear infinite;
}
.wrapper div:nth-child(11) {
  top: 10%;
  left: 90%;
  animation: animate 9s linear infinite;
}
.wrapper div:nth-child(12) {
  top: 20%;
  left: 70%;
  animation: animate 7s linear infinite;
}
.wrapper div:nth-child(13) {
  top: 20%;
  left: 20%;
  animation: animate 8s linear infinite;
}
.wrapper div:nth-child(14) {
  top: 60%;
  left: 5%;
  animation: animate 6s linear infinite;
}
.wrapper div:nth-child(15) {
  top: 90%;
  left: 80%;
  animation: animate 9s linear infinite;
}
@keyframes animate {
  0% {
    transform: scale(0) translateY(0) rotate(70deg);
  }
  100% {
    transform: scale(1.3) translateY(-100px) rotate(360deg)
  }
}
.button-desktop {
  text-align: center;
  width: auto;
  margin: 0 auto;
  margin-bottom: 4em;
  font-size: 1.3em;
}
.button-desktop button {
  width: 20em;
}
.button-desktop button:first-child {
  margin-right: 1em;
}
.button-desktop button:last-child {
  margin-left: 1em;
}
/* .section-two {
  background: url('../assets/background-pattern-bottom-right-to-top-left.png');
  background-size: cover;
  background-repeat: no-repeat;
} */
.first-body {
  width: 70%;
  height: 80%;
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(2, 1fr);
  gap: 10em;
  color: var(--black);
  padding-bottom: 10em;
  padding-top: 2em;
}
.first-body h1 {
  font-size: 3.5em;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.first-body h1:hover {
  transform: scale(1.1) rotateZ(-2deg);
  color: var(--blue);
  margin-left: .4em;
}

.first-body-left h2 {
  font-size: 4em;
}
.first-body-left p {
 font-size: 1.8em;
 line-height: 1.4em;
}
.first-body-left strong {
  cursor: pointer;
}
.first-body-right {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
}
.first-body-right h2 {
  font-size: 2em;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}
.first-body-right-ele div{
  display: flex;
  align-items: center;
}
.first-body-right-ele div h1 {
  padding-right: .5em;
  width: 1.5em;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.first-body-right-ele div h1:hover {
  transform: scale(1.3) rotateZ(10deg);
}
.first-body-right-ele div h2:hover {
  letter-spacing: .07em;
  transform: scale(1.1) translateZ(5);
  color: var(--blue);
}
.first-body-right-ele p {
  padding-left: 6em;
  font-size: 1.2em;
  line-height: 1.5em;
}
.section-three {
  background: var(--blue);
  overflow: hidden;
  display: block;
  position: relative;
}
.second-body{
  width: 70vw;
  margin: 0 auto;
  height: 80vh;
  padding: 7em 0;
}
.section-three::after {
  content: "";
  background-image: url('../assets/test-background-03.png');
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  z-index: 0;
}
.second-body-title h1 {
  font-size: 7em;
  color: #fff;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-right: .2em;
  cursor: pointer;
  z-index: 1;
  text-shadow: 10px 10px 0px rgba(0,0,0,0.1);
}
.second-body-title h1:hover {
  transform: scale(1.1) rotateZ(-2deg);
}
.second-body-title h2:hover {
  letter-spacing: .07em;
  transform: scale(1.1) translateZ(5);
  color: var(--white);
}
.second-body-title h2 {
  font-size: 4em;
  line-height: 1em;
  color: #fff;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  z-index: 1;
  text-shadow: 10px 10px 0px rgba(0,0,0,0.1);
}
.second-body-title {
  display: flex;
  align-items: center;
}
.steps {
  padding: 5em 0;
  /* padding-right: 5em; */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 10em;
  grid-row-gap: 3em;
  color: #fff;
}
.step {
  z-index: 1;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}
.step h2 {
  font-size: 1.5em;
  font-weight: 500;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}
.step h2:hover {
  transform: scale(1.2) rotateZ(-1deg);
  padding-left: 1.5em;
  color: var(--yellow);
}
.step p {
  padding: 1em 0;
  line-height: 1.5em;
  font-size: 1.1em;
}
.sticks {
  padding: 1em 0;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);
  width: 30%;
  padding-left: .5em;
}
.stick {
  width: .8em;
  height: 1em;
  background: #fff;
  transform: skew(-40deg);
}
.stick--active {
  background: var(--yellow);
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}
.stick--active:hover {
  transform: skew(-40deg) scale(1.1);
  height: 1.4em;
  width: 1em;
}
.section-five {
  width: 90%;
  height: auto;
  margin: 0 auto;
  padding: 10em 0;
  margin-bottom: 5em;
}
.first-video,
.second-video {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-column-gap: 10em;
  height: auto;
  width: 100%;
}
.student-video iframe,
.tutor-video iframe {
  width: 100%;
  height: 100%;
  border: none;
  padding: 2em;
  border: 5px solid var(--black);
  background: url('../assets/test-background-03.png');
  background-size: cover;
  background-repeat: no-repeat;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}
.student-video iframe:hover {
  box-shadow: 10px 10px 0px rgba(0,0,0,0.1);
  transform: scale(1.05) rotateZ(-1deg);
}
.tutor-video iframe:hover {
  box-shadow: 10px 10px 0px rgba(0,0,0,0.1);
  transform: scale(1.05) rotateZ(1deg);
}
.student-video-title h2,
.tutor-video-title h2 {
  font-size: 4em;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}
.student-video-title h2:hover,
.tutor-video-title h2:hover {
  color: var(--blue);
  letter-spacing: .07em;
  text-shadow: 10px 10px 0px rgba(0,0,0,0.1);
}
.student-video-title p,
.tutor-video-title p {
  padding: 1em 0;
  padding-right: 4em;
  line-height: 1.5em;
  font-size: 1.5em;
}
.student-video-title h1,
.tutor-video-title h1 {
  font-size: 5em;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}
.student-video-title h1:hover,
.tutor-video-title h1:hover {
  transform: scale(1.3) rotateZ(-2deg);
  text-shadow: 10px 10px 0px rgba(0,0,0,0.1);
}
.second-video {
  margin-top: 10em;
}
.tutor-video-title {
  text-align: right;
}
.tutor-video-title p {
  padding-right: 0em;
  padding-left: 4em;
}
.tutor-video iframe{
  float: right;
}
.section-six {
  width: 100%;
  height: auto;
  padding: 7em 0;
  background: var(--blue);
  display: block;
  overflow: hidden;
  position: relative;
}
.section-six::after {
  content: "";
  background-image: url('../assets/background-pattern-vertical.png');
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  z-index: 0;
}
.our-team {
  width: 80%;
  margin: 0 auto;
  z-index: 1;
  height: auto;
}
.our-team h1 {
  font-size: 4rem;
  color: #fff;
  padding-bottom: .5em;
  text-shadow: 10px 10px 0 rgba(0,0,0,0.1);
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1;
}
.our-team h1:hover {
  letter-spacing: .7em;
}
.first-body {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
}

@media only screen and (min-device-width : 200px) and (max-device-width : 480px) { 
  .contain {
    overflow: hidden;
  }
  .section-one {
    display: none;
  }

  /* first body styles  */
  .first-body {
    width: 100%;
    overflow: hidden;
    padding: 0;
    height: auto;
  }
  .first-body-left {
    height: auto;
    padding: 2em 0;
    width: 85%;
    margin: 0 auto;
  }
  .first-body-left h1,
  .first-body-left h2{
    font-size: 2.5em;
  }
  .first-body-left p {
    font-size: 1.5em;
    padding: 0;
  }
  .first-body-right {
    width: 100%;
    margin: 0 auto;
  }
  .first-body-right-ele h2,
  .first-body-right-ele h1 {
    z-index: 1;
    color: #fff;
  }
  .first-body-right-ele h1 {
    padding-left: .5em;
  }
  .first-body-right-ele div h2:hover {
    color: #fff;
    letter-spacing: .2em;
  }
  .first-body-right-ele div h1:hover {
    transform: rotate(-5deg) scale(1.2);
  }
  .first-body-right-ele div {
    background: var(--blue);
    width: auto;
    padding: 1em;
    z-index: 1000;
    border-top: 4px solid var(--black);
    border-bottom: 4px solid var(--black);
    box-shadow: -10px 10px 0px rgba(0,0,0,0.1);
    position: relative;
  }
  .first-body-right-ele div::after,
  .first-body-right-ele p::after {
  content: "";
  background: url('../assets/background-pattern-bottom-right-to-top-left.png');
  background-size: cover;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: 0;
  overflow: hidden;
  opacity: 0.7;
  }
  .first-body-right-ele p::after {
    background: url('../assets/background-pattern-vertical.png');
    background-size: cover;
    opacity: .5;
    
  }
  .first-body-right-ele p {
    margin: 0 auto;
    text-align: center;
    background: #fff;
    padding: .5em 1em;
    border-top: 3px solid rgba(0,0,0,0.1);
    border-bottom: 3px solid rgba(0,0,0,0.1);
    position: relative;
  }

  .first-body-right-ele div{
    margin-bottom: 0;
  }


  /* be our official tutor styles  */
  .second-body {
    width: 90%;
    padding: 2em 0;
    padding-bottom: 0;
    height: auto;
  }
  .steps {
    padding: 3em 1em;
    padding-top: 2em;
    grid-row-gap: .5em;
  }
  /* .step-two,
  .step-four {
    display: flex;
    flex-direction: column;
    text-align: right;
  }
  .step-two .sticks,
  .step-four .sticks{
    align-self: flex-end;
  } */
  .second-body-title {
    align-items: center;
  }
  .second-body-title h2 {
    font-size: 2em;
    text-align: center;
    padding: 0 .2em;
    margin-top: 1em;
  }

  /* section 4 with marquee */
  .register-marquee {
    text-align: center;
    align-items: center;
    display: flex;
    height: 11em;
  }
  .register-marquee p {
    font-size: 2.5em;
    width: auto;
  }
  .section-three {
    margin-top: 3em;
  }

  /* video section 5th  */
  .section-five {
    padding: 0;
    margin-top: 2em;
    width: 100%;
  }
  .student-video,
  .tutor-video {
    width: 100%;
    padding: 0;
    border: none;
    text-align: center;
  }
  .tutor-video{
    justify-content: center;
    display: flex;
    margin-top: 1em;
  }
  .student-video iframe, 
  .tutor-video iframe {
    padding: 0em;
    width: 80%;
    margin: 0 auto;
    background: none;
  }
  .student-video-title,
  .tutor-video-title {
    padding: 0em 2em;
    margin-top: 2em;
    margin: 0;
  }
  .tutor-video-title {
    display: grid;
    grid-template-columns: 2fr;
    grid-template-rows: 2.5fr 3.5fr 1fr;
    height: 20em;
  }
  .tutor-video-title p {
    grid-area: 3 / 1 / 4 / 2;
  }
  .tutor-video-title h2 {
    grid-area: 2 / 1 / 3 / 2;
    margin-top: .5em;
  }
  .tutor-video-title h1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .student-video-title p,
  .tutor-video-title p {
    padding: 0;
    margin-top: .5em;
    font-size: 1.3em;
  }
  .student-video-title h2,
  .tutor-video-title h2 {
    font-size: 2.5em;
  }
  .student-video-title h1,
  .tutor-video-title h1 {
    text-align: center;
  }
  .first-video,
  .second-video {
    grid-row-gap: 2em;
  }
  .second-video {
    margin-top: -5em;
  }

  /* meet the team slider  */
  .section-six {
    padding: 2em 0;
  }
  .our-team {
    width: 90%;
  }
  .our-team h1 {
    font-size: 2.5em;
  }
  .carousel {
    padding: 0;
  }
  .section-one-mobile {
    width: 100%;
    height: 100%;
    padding-bottom: 2em;
    background: var(--blue);
    box-shadow: -10px 10px 0px rgba(0,0,0,0.1);
    position: relative;
    margin-bottom: 1em;
  }
  .section-one-mobile::before {
    content: "";
    background: url('../assets/background-pattern-vertical.png');
    background-size: auto;
    background-repeat: no-repeat;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 0;
    overflow: hidden;
  }

  .section-one-mobile-content {
    padding: 2em;
    color: #fff;
    position: relative;
  }
  .section-one-mobile-content h1 {
    font-size: 3.5em;
    line-height: 1em;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: .1em;
    filter: drop-shadow(10px 10px 0px rgba(0,0,0,0.1))
  }
  .section-one-mobile-content p {
    font-size: 1.2em;
    text-align: center;
    filter: drop-shadow(10px 10px 0px rgba(0,0,0,0.1))
  }
  .illustra {
    text-align: center;
  }
  .illustra img{
    width: 90%;
    margin-top: 0em;
    position: relative;
  }
  .be-tutor-illus {
    text-align: center;
  }
  .be-tutor-illus img {
    height: 20em;
  }
  .first-body-right-image-icon {
    width: 5em;
    margin-right: 1.5em;
    margin-left: 1.5em;
  }
  .register-marquee img{
    width: 1.5em;
    padding-top: .2em;
    padding-bottom: .2em;
  }
  .between-video img {
    width: 90%;
  }
  .between-video {
    margin: 2em 0;
    text-align: center;
  }
  .team-icon {
    width: 5em;
    align-items: center;
    margin: 0 .5em 0 1em;
    filter: drop-shadow(10px 10px 0px rgba(0,0,0,0.1));
  }
  .our-team-mobile {
    display: flex;
    align-items: center;
  }
  .button-mobile {
    width: 85%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3em;
  }
  .button-mobile a .button {
    font-size: 1.3em;
    padding: .3em 1.9em;
  }
}

/* responsive ipad */
@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  .contain {
    overflow: hidden;
  }
  .section-one-tablet {
    background: var(--blue);
    padding: 2em 0;
    text-align: center;
    color: #fff;
    position: relative;
    display: block;
    z-index: 1000;
  }
  .section-one-tablet::before {
    content: "";
    background: url('../assets/background-pattern-vertical.png');
    background-size: cover;
    background-repeat: no-repeat;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
    overflow: hidden;
  }
  .section-one-tablet img {
    width: 60%;
    z-index: 1000;
  }
  .section-one-tablet-content h1 {
    font-size: 3em;
  }
  .section-one-tablet-content,
  .illustra {
    z-index: 100;
  }
  .second-body {
    height: auto;
    width: 80%;
    padding-top: 5em;
    padding-bottom: 0;
  }
  .second-body-title h2 {
    font-size: 3.5em;
    text-align: center;
  }
  .steps h2{
    font-size: 2.2em;
  }
  .second-body p {
    font-size: 1.5em;;
  }
  .steps {
    grid-row-gap: 1em;
    padding-top: 3em;
  }
  .steps .sticks .stick {
    width: 1.8em;
  }
  .be-tutor-illus-tablet {
    text-align: center;
  }
  .be-tutor-illus-tablet img {
    width: 60%;
    margin-bottom: 2em;
  }
  .first-video,
  .second-video {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    align-items: center;
  }
  .section-five {
    padding: 5em 0;
  }
  .student-video {
    text-align: center;
  }
  .tutor-video iframe{
    text-align: left;
    margin-top: -2em;
    margin-right: 1.3em;
  }
  .student-video iframe,
  .tutor-video iframe{
    width: 80% ;
    height: 20em;
  }
  .second-video {
    margin-top: 0;
    width: 90%;
    margin: 0 auto;
  }
  .student-video-title {
    width: 90%;
    margin: 0 auto;
    margin-top: -6em;
  }
  .between-video-tablet {
    width: 70%;
    margin: 0 auto;
    margin-top: -7em;
  }
  .section-six {
    padding: 4em 0;
  }
  .button-tablet {
    width: 65%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0em auto;
    margin-top: 4em;
    margin-bottom: 1em;
  }
  .button-tablet a .button {
    padding: .5em 3em;
    font-size: 1.5em;
    border-radius: 30px;
  }
}
</style>
