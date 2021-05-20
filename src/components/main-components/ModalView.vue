<template>
  <div class="modal">
    <div class="overlay" @click="emit('closeModal')"></div>
      <div class="modal-card animate__animated animate__fadeInUpBig animate__faster">
        <slot />
      </div>
  </div>
</template>

<script>
export default {
  setup(props, {emit}) {
    return {
      emit
    }
  }
}
</script>

<style>
.overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.1;
  background-color: black;
  height: 250vh;
  z-index: 10;
}
.modal-card {
  position: fixed;
  width: 60%;
  left: 20%;
  top: 5%;
  transform: translate(-50%, -50%);
  background-color: white;
  max-height: 80%;
  overflow: auto;
  z-index: 1000;
  opacity: 1;
  border-radius: 5px;
}

/* Email Modal */

.email-display {
  text-align: left;
}

@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: portrait) { 

    .modal-card {
      width: 90%;
      left: 5%;
      padding: 0;
    }

}

@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  .modal-card {
    width: 85%;
    left: 3em;
  }
}
</style>