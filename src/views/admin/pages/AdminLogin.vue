<template>
  <div class="login-section tutor-login-section">
   <h1>
     🔐 Login as Admin:
   </h1>
   <form @submit.prevent="handleLogin">
     <label for="email">📨 Email:</label>
     <input type="email" placeholder="Enter your email..." required v-model="email">
     <label for="username">🔑 Password:</label>
     <input type="password" placeholder="Password..." required v-model="password">
     <div class="action-login">
       <main-button mode="btn black">🚘 Log Me In 🚦</main-button>
     </div>
   </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {

      try {
        await this.$store.dispatch('loginAdmin', {
          email: this.email,
          password: this.password
        })

        this.$toast("Admin Logged In 👏", {
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
          this.$router.replace('/pvt-admin')
        }, 2000)
      } catch (err) {
        this.$toast('Wrong Admin Credential, Could Not Login 🙏', {
         duration: 3000,
         slotLeft: `✋`,
         slotRight: `⛔`,
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
}
</script>

<style>

</style>