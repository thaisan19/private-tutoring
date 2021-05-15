<template>
  <div class="footer">
   <div class="top">
    <h1>Contact Us For More Information</h1>
    <br>
    <div class="footer-icon">
      <a href="https://www.facebook.com/TheMentorOfficial">
        <img src="../../assets/illustration/facebook-logo.svg">
      </a>
      <a href="https://www.youtube.com/channel/UCJ2jArU_qn1vSywgE3DbRhw">
        <img src="../../assets/illustration/youtube-logotype.svg">
      </a>
      <a href="https://www.linkedin.com/company/thementor-official">
        <img src="../../assets/illustration/linkedin-logo.svg">
      </a>
    </div>
    <br>
   </div>
   <div class="middle">
    <div class="menu courses">
     <router-link to="/courses">
      <p v-if="!isMobile">Courses ✍</p>
      <p v-if="isMobile">Courses</p>
     </router-link>
    </div>
    <div class="menu tutors">
     <router-link to="/tutors">
      <p v-if="!isMobile">Tutors 🧔</p>
      <p v-if="isMobile">Tutors</p>
     </router-link>
    </div>
    <div class="menu be-a-tutor">
     <router-link to="/register">
      <p v-if="!isMobile">Be a Tutor 📝</p>
      <p v-if="isMobile">Be a Tutor</p>
     </router-link>
    </div>
   </div>
   <div class="bottom">
    <p>© 2021 - TheMentor ®</p>
    <p v-if="!isMobile">🌍 Offical Website - www.thementor.me 🌏</p>
    <p v-if="isMobile">Offical Website - www.thementor.me</p>
    <p v-if="!isMobile">🌄 Kirirom National Park Kampong Spue, Cambodia 🌅</p>
    <p v-if="isMobile">Kirirom National Park Kampong Spue, Cambodia</p>
   </div>
  </div>
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
.footer {
 width: 100%;
 text-align: center;
}
.middle {
 width: 100%;
 display: grid;
 grid-template-columns: repeat(3, 1fr);
}
.courses,
.be-a-tutor {
 border-top: 5px solid var(--black);
 border-bottom: 5px solid var(--black);
}
.tutors {
 border: 5px solid var(--black);
}
.menu {
 padding: 1em 0;
 transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
 overflow: hidden;
}
.menu:hover {
 background: var(--blue);
}
.menu p {
 transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.menu p:hover {
 transform: scale(1.1) rotateZ(-2deg);
 color: #fff;
}
.middle p {
 font-size: 1.5em;
 color: var(--black);
}
.bottom {
 padding: 3em 0;
 background: #fff;
 border-bottom: 30px solid var(--blue);
 background: url('../../assets/background-pattern-bottom-right-to-top-left.png');
 background-repeat: no-repeat;
 background-size: cover;
}
.bottom p {
 line-height: 1.5em;
 font-size: 1.3em;
}
.footer-icon a img{
  width: 3em;
}
.footer-icon a img{
  padding: .2em;
  border: 3px solid var(--black);
  border-radius: 50%;
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.footer-icon a img:hover {
  filter: drop-shadow(-5px 5px 0px rgba(0,0,0,0.1));
}
.footer-icon a:not(:last-child) {
  margin-right: .7em;
}

@media only screen and (min-device-width : 200px) and (max-device-width : 900px) {
  .footer {
    margin-top: 2em;
  }
  .top h1 {
    font-size: 1.8em;
  }
  .middle {
    font-size: .8em;
  }
  .bottom {
    padding: 2em 0;
  }
}
</style>