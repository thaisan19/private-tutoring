<template>
  <div class="not-found-main">
    <img src="../assets/illustration/broken-404.svg" alt="Private-Tutoring-TheMentor-404-Page">
    <div class="404-title">
      <h1>404 Page Not Found...</h1>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.not-found-main {
  width: 80%;
  margin: 0 auto;
  text-align: center;
  margin-top: 1em;
  font-size: 2em;
}
.not-found-main img {
  width: 30%;
}

@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
.not-found-main {
  width: 90%;
  margin: 0 auto;
  text-align: center;
  margin-top: 2em;
  font-size: 1em;
}
.not-found-main img {
  width: 80%;
}
}
</style>