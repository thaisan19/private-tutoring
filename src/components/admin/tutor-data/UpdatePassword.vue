<template>
  <div class="update-password-view">
    <div class="update-password-title">
      <h1>🔑 Update Password</h1>
    </div>
    <div class="update-password-form">
      <form @submit.prevent="handleUpdatePassword">
        <div class="input">
          <label for="new">
          🌞 New Password:
          </label>
          <input type="password" v-model="newPassword">
        </div>
        <div class="input">
          <label for="confirm">
          🧱 Confirm Password:
          </label>
          <input type="password" v-model="confirmPassword">
        </div>
        <div class="update-button">
          <main-button mode="btn black">
            Confirm Update 🧭
          </main-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['tutor'],
  data() {
    return {
      newPassword: '',
      confirmPassword: ''
    }
  },
  methods: {
    async handleUpdatePassword() {
      if(this.newPassword == this.confirmPassword) {
        await axios.put("https://private-tutoring-backend.herokuapp.com/api/admin/update-password/" + this.tutor._id, {
      password: this.newPassword
     }).then(() => {
       this.$toast('Password Update Successed!', {
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
          this.$router.go('/TutorProfile')
        }, 2000);
     }).catch(err =>
       this.$toast('Could not Updating!' + err, {
         duration: 3000,
         slotLeft: `💥`,
         slotRight: `❗❕`,
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
     )
     } else {
       this.$toast('Confirm Password Not Match!', {
         duration: 3000,
         slotLeft: `💥`,
         slotRight: `❗❕`,
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
    }
  }
</script>

<style scoped>
  .update-password-form .input {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
  }
  .update-password-title h1{
    margin-bottom: 1em;
  }
  .update-button {
    text-align: center;
    margin-bottom: 1em;
    margin-top: 2em;
  }
  @media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
  .update-password-view {
    padding: 1em;
  }
  .update-password-form .input {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
  }
  .update-password-title h1{
    font-size: 1.5em;
    margin-bottom: 1em;
  }
  .update-button {
    text-align: center;
    margin: 1em 0;
  }
  }

  @media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  .update-password-form .input {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
  }
  .update-password-title h1{
    margin-bottom: 1em;
  }
  .update-button {
    text-align: center;
    margin-bottom: 0em;
    margin-top: 2em;
  }
  }
</style>