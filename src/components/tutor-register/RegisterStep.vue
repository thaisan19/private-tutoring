<template>
  <section class="roadmap-section">
   <h1 v-if="!isMobile && !isTablet">🚀🚦 Road to Become Our Official Tutor</h1>
   <img src="../../assets/illustration/inbox.svg" v-if="isMobile || isTablet">
   <h1 v-if="isMobile || isTablet">Road to Become Our Official Tutor</h1>
   <div class="roadmap">
     <transition class="animate__animated animate__bounceIn animate__delay-1s">
      <div class="register-step step-one">
        <h1>
          <img src="../../assets/illustration/register.svg">
        </h1>
        <br>
        <h2>Register</h2>
        <br>
        <p>In order to register, the Coordinate will fill in some details about their background and profession down below.</p>
      </div>
     </transition>
     <transition class="animate__animated animate__bounceIn animate__delay-2s">
        <div class="register-step step-two">
        <h1>
          <img src="../../assets/illustration/job-interview.svg">
        </h1>
        <br>
        <h2>Interview</h2>
        <br>
        <p>After you pass our check your profession, we will invite you to the interview.</p>
      </div>
     </transition>
     <transition class="animate__animated animate__bounceIn animate__delay-3s">
        <div class="register-step step-three">
        <h1>
          <img src="../../assets/illustration/hourglass.svg">
        </h1>
        <br>
        <h2>Wait For Result</h2>
        <br>
        <p>You will receive the message through any possible platform within a week.</p>
      </div>
     </transition>
     <transition class="animate__animated animate__bounceIn animate__delay-4s">
        <div class="register-step step-fourth">
        <h1>
          <img src="../../assets/illustration/fire-cracker.svg">
        </h1>
        <br>
        <h2>Congratulation</h2>
        <br>
        <p>If you pass our interview, we will promote you as a tutor on our site and be ready for tutoring.</p>
      </div>
     </transition>
   </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      windowWidth: window.innerWidth
    }
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

<style scoped>
.roadmap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 2rem;
  padding: 2.5em 2em;
}
.roadmap div:nth-child(even) {
 margin-top: 2em;
}
.roadmap div:nth-child(odd) {
 margin-bottom: 2em;
}
.register-step {
 padding: 2em;
 border: 2.5px solid var(--black);
 cursor: pointer;
 background: url('../../assets/background-pattern-vertical.png');
 background-size: cover;
 background-repeat: no-repeat;
 overflow: hidden;
 transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.register-step:hover {
 box-shadow: 10px 10px 0px rgba(0,0,0,0.1);
}
.register-step:nth-child(odd):hover {
 background: var(--blue);
 color: #fff;
}
.register-step:nth-child(even):hover {
 background: var(--yellow);
}
.register-step p {
 line-height: 1.5em;
}
.register-step h1 img {
  width: 3em;
}
h1 {
 font-size: 2em;
}
.roadmap {
 text-align: center;
 margin: 5vh auto;
}
.roadmap img {
 width: 20%;
}

@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
  .roadmap div:nth-child(even) {
    margin-top: 0em;
  }
  .roadmap div:nth-child(odd) {
    margin-bottom: 0em;
  }
  .roadmap {
    margin-top: 0em;
  }
  .roadmap-section h1 {
    font-size: 2em;
    margin-top: .5em
  }
  .roadmap-section {
    text-align: center;
  }
  .roadmap-section img {
    width: 70%;
  }
}

@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  .roadmap-section {
    text-align: center;
  }
  .roadmap-section h1 {
    margin-top: 1em
  }
  .roadmap-section img {
    width: 50%;
  }
  .roadmap div:nth-child(even) {
    margin-top: 0em;
  }
  .roadmap div:nth-child(odd) {
    margin-bottom: 0em;
  }
  .roadmap {
    margin-top: 1em;
  }
}
</style>