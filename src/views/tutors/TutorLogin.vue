<template>
  <div class="login-section tutor-login-section">
   <h1>
     🔐 Login as Tutor:
   </h1>
   <form @submit.prevent="handleLogin">
     <label for="email">📨 Email:</label>
     <input type="email" placeholder="Enter your email..." required v-model="email">
     <label for="username">🔑 Password:</label>
     <input type="password" placeholder="Password..." required v-model="password">
     <div class="action-login">
       <main-button mode="btn black" class="login-button">Log Me In 🚦</main-button>
     </div>
   </form>
  </div>
</template>

<script>
import axios from 'axios'
import { useRoute } from 'vue-router'

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
        await this.$store.dispatch('loginTutor', {
          email: this.email,
          password: this.password
        })

        this.$toast("User logged in 👏", {
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
        console.log(err.message || 'Could not log tuto in!')
        this.$toast('Could not log tutor in 🙏', {
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

      // const response = await fetch('http://localhost:5000/api/tutor/login', {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: this.email,
      //     password: this.password
      //   })
      // });
      // const resData = await response.json();
      // console.log(resData)
    }
  },
  // async mounted() {
  //   const getTutor = await axios.get('http://localhost:3000/api/tutor/')
  //   .then((getTutor) => {
  //     console.log(getTutor.data.data[0])
  //   })
  // }
}
</script>

<style>
  .login-section {
    width: 20%;
    margin: 0 auto;
    padding: 3em 0;
    background: #fff;
    padding: 2em;
    border: 3px solid var(--black);
    margin-top: 4em;
    box-shadow: -10px 10px 0 rgba(0,0,0,0.1);
    position: relative;
  }
  .login-section::before {
  content: "";
  background: url('../../assets/background-pattern-bottom-right-to-top-left.png');
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  z-index: 0;
}
  .login-section > h1 {
    padding-bottom: 1em;
  }
  .login-section label {
    font-size: 1.2em;
  }
  .login-section input {
    margin-top: 1em;
    z-index: 1000;
    position: relative;
  }
  .login-section button {
    margin-top: 1.5em;
    padding: .5em 2em;
    margin-bottom: .5em;
  }
  .action-login {
    text-align: center;
  }

  @media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
    .login-section {
      width: 65%;
    }
    .login-section > h1 {
      font-size: 1.5em;
    }
    .action-login button{
      padding: 1em;
    }
  }

  @media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
    .login-section {
      width: 40%;
    }
  }
</style>