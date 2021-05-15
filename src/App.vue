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
      windowWidth: window.innerWidth
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
    })
  },
  beforeDestroy() {
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
</style>
