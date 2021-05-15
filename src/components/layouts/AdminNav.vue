<template>
  <header>
    <div class="admin-nav">
      <router-link to="/pvt-admin">
      <div class="logo">
        <img src="../../assets/logo/TheMentor-logo-svg-nobackground.svg">
        <h3>PRIVATE TUTORING ADMIN PANEL 💠</h3>
      </div>
      </router-link>
      <div class="right-nav">
        <main-button mode="btn black" link to="/">
          🏡 Home
        </main-button>
        <main-button mode="btn black" link to="/pvt-admin/request">
          🔔 Requests
          <span :class="[unreadReqs.length > 0 || unreadTutors.length > 0 ? 'has-unread':'no-unread']">{{ unreadTutors.length + unreadReqs.length }}</span>
        </main-button>
        <main-button mode="btn black" link to="/pvt-admin/course">
          📚 Courses
        </main-button>
        <main-button mode="btn black" link to="/pvt-admin/tutor">
          👨‍🏫 Tutors
        </main-button>
        <main-button mode="btn black" @click="logout">
          🛫 Logout
        </main-button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    unreadTutors() {
      return this.$store.getters['tutors/unreadTutors'];
    },
    unreadReqs() {
      return this.$store.getters['requests/unreadReqs']
    },
    allNotifications() {
      return this.unreadTutors.length + this.unreadReqs.length
    }
  },
  methods: {
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
    this.$store.dispatch('tutors/getAllUnread')
    this.$store.dispatch('requests/getUnreadReqs')
  }
}
</script>

<style scoped>
.admin-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5em 5em;
  background: #fff;
  border-bottom: 5px solid var(--black);
  box-shadow: -5px 5px 5px rgba(0,0,0,.1); 
}
.logo {
  display: flex;
  align-items: center;
}
a {
  color: var(--black);
}
.logo > h3 {
  font-weight: 500;
}
.logo > img {
  width: 3em;
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-right: 1em;
}
.logo > img:hover {
  transform: scale(1.2) rotateZ(-3deg);
  filter: drop-shadow(-5px 5px 0px rgba(0,0,0,.1))
}
.right-nav > *:not(:last-child){
  margin-right: .5em;
}

@media only screen and (min-device-width : 320px) and (max-device-width : 900px) { 
  .admin-nav {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    width: 100%;
    padding: 1em;
  }
  .logo {
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    flex-direction: column;
  }
  .logo h3 {
    margin-top: .5em;
  }
  .right-nav {
    grid-area: 2 / 1 / 3 / 2;
    overflow: auto;
    white-space: nowrap;
    margin-top: 1em;
    text-align: center;
  }
  ::-webkit-scrollbar { 
    display: none; 
  }
}
@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  .admin-nav {
    width: auto;
    padding: 1em 2em;
  }
}
</style>