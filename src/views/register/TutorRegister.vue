<template>
  <div class="roadmap-section">
    <RegisterStep />
  </div>
  <section class="register-form-section">
    <div class="register-form">
      <div class="add-tutor">
        <AddTutor />
      </div>
    </div>
  </section>
</template>

<script>
import RegisterStep from '../../components/tutor-register/RegisterStep.vue'
import AddTutor from '../../components/admin/tutor-data/AddTutor.vue'

export default {
  components: {
    RegisterStep,
    AddTutor
  }
}
</script>

<style scoped>
.roadmap-section {
  width: 75vw;
  margin: 0 auto;
  margin-top: 2em;
}
.register-form-section {
 width: 100%;
 align-items: center;
 margin-bottom: 10vh;
 overflow: hidden;
 background: var(--blue);
}
.register-form {
  padding: 5em 0;
  position: relative;
  z-index: 1;
}
.register-form::before {
  content: "";
  background: url('../../assets/background-pattern-bottom-right-to-top-left.png');
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  z-index: -1;
  overflow: hidden;
}
.add-tutor {
  width: 60%;
  margin: 0 auto;
  background: #fff;
  border: 3px solid var(--black);
  box-shadow: 10px 10px 0px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1;
}
.add-tutor::before {
  content: "";
  background: url('../../assets/background-pattern-vertical.png');
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  z-index: -1;
  overflow: hidden;
  opacity: .7;
}

@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
  .roadmap-section {
    width: 95%;
  }
  .roadmap {
    margin: 0;
  }
  .register-form {
    width: 100%;
    padding: 3em 0;
  }
  .add-tutor {
    width: 90%;
  }
}

@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  .add-tutor {
    width: 80%;
  }
}

</style>