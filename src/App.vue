<template>
  <AdminNav v-if="['Admin', 'AdminTutor', 'AdminCourse', 'AdminRequest'].includes($route.name)" />
  <Navbar class="navbar" v-else />
  <div class="content">
    <router-view v-slot="{ Component }">
      <transition
      enter-active-class="animate__animated animate__fadeInLeft animate__fast"
      leave-active-class="animate__animated animate__fadeOut animate__fast"
      >
        	<component :is="Component"></component>
      </transition>
    </router-view>
    <div class="to-top" v-show="scY > 300" @click="toTop">
      <button class="to-top-button">
        <img src="./assets/icons/up-arrow.svg">
      </button>
    </div>
  </div>
  <Footer class="footer" />
</template>

<script>
import Navbar from './components/layouts/Navbar.vue'
import Footer from './components/layouts/Footer.vue'
import AdminNav from './components/layouts/AdminNav.vue'

export default {
  components: {
    Navbar,
    Footer,
    AdminNav
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      scTimer: 0,
      scY: 0
    }
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
    isMobile() {
      if(this.windowWidth < 480) {
        return true
      }
    },
    isTablet() {
      if(this.windowWidth < 1024) {
        return true
      }
    }
  },
  created() {
    this.$store.dispatch('autoLogin');
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/');
      }
    },
    width(newWidth, oldWidth) {
      this.txt = `it change to ${newWidth} from ${oldWidth}`;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    }),
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    handleScroll: function () {
      if(this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }
}
</script>

<style>
.to-top {
  position: fixed;
  bottom: 2em;
  right: 2em;
  z-index: 1000;
}
.to-top-button {
  background: none;
  border: none;
  cursor: pointer;
}
.to-top-button img{
  width: 4em;
  height: auto;
  filter: drop-shadow(-5px 5px 0 rgba(0,0,0,0.2));
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.to-top-button img:hover {
  transform: scale(1.1) rotate(-10deg) translateY(-15px);
}
.navbar {
  max-width: 90vw;
  margin: 0vh auto 0vh;
  padding: 0;
}
.content {
  margin: 0 auto;
  width: 100%;
  padding: 0;
}
.footer {
  max-width: 100%;
  padding: 0;
  margin-top: 5em;
}

@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
  .to-top {
    bottom: 1em;
    right: 1em;
    z-index: 1000;
}
}
</style>
