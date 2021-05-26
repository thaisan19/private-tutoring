<template>
  <div class="login-section tutor-login-section">
   <h1>
     🔐 Login as Tutor:
   </h1>
   <form @submit.prevent="handleLogin">
     <label for="email">📨 Email:</label>
     <input type="email" placeholder="Enter your email..." required v-model="email" :disabled="showForgetInput">
     <label for="username">🔑 Password:</label>
     <input type="password" placeholder="Password..." required v-model="password" :disabled="showForgetInput">
     <div class="forget-password" v-if="showForgetPassword"
     @click="showForgetDiv">
       <p>Forgot your password ❕❓</p>
     </div>
     <div class="action-login">
       <main-button mode="btn black" class="login-button"
       v-if="isLoginButton">
         Log Me In 🚦
       </main-button>
     </div>
   </form>
   <div class="forget-input"
    v-if="showForgetPassword && showForgetInput">
    <label for="email">📨 Enter your account email:</label>
    <input type="email" placeholder="Enter your email..." required v-model="forgetEmail">
    <div class="action-login">
    <main-button mode="btn black" class="login-button"
       @click="handleForgetPassword">
         Send Forgot Password 🚀
    </main-button>
    </div>      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useRoute } from 'vue-router'

export default {
  data() {
    return {
      email: '',
      password: '',
      showForgetPassword: false,
      forgetEmail: '',
      showForgetInput: false,
      isLoginButton: true
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
          this.$router.go('')
          this.$router.replace('/')
        }, 2000)
      } catch (err) {
        this.showForgetPassword = true
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
    },
    async handleForgetPassword() {
      await axios.post('https://private-tutoring-backend.herokuapp.com/api/tutor/forgot-password/', {email: this.forgetEmail})
      .then((res) => {
        this.$toast("Please check your email for a new account password 👏", {
         duration: 5000,
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
      })
      .catch(err => {
        this.$toast("Could not send forgot password email ❕🙏", {
         duration: 3000,
         slotLeft: `🚫`,
         slotRight: `❓❗❕`,
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
      })
      this.showForgetInput = false
      this.isLoginButton = true
    },
    showForgetDiv() {
      this.showForgetInput = !this.showForgetInput
      this.isLoginButton = !this.isLoginButton
    }
  },
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
  .forget-password {
    margin-top: .5em;
    font-weight: 600;
    font-style: italic;
    cursor: pointer;
    position: relative;
    transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .forget-password:hover {
    letter-spacing: .1em;
  }
  .forget-input {
    margin-top: 1em;
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