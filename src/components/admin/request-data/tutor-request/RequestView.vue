<template>
  <div class="request-view">
    <div class="request-view-title">
      <h1>👏 {{ request.title }}</h1>
      <h2>#{{ request._id }}</h2>
    </div>
    <div class="request-view-row01">
      <h3>1️⃣ Requestd for:</h3>
      <div class="row01-desc">
        <div class="obj-id">
          <h2>🐇</h2>
          <p>Tutor/Course ID</p>
          <h2>{{ request.objId }}</h2>
        </div>
        <div class="obj-name">
          <h2>🐳</h2>
          <p>Tutor/Course Name</p>
          <h2>{{ request.objName }}</h2>
        </div>
      </div>
    </div>
    <div class="request-view-row02">
      <h3>2️⃣ Student Information:</h3>
      <div class="row02-desc">
        <div class="student-name">
          <h2>🐢</h2>
          <p>Student Name:</p>
          <h2>{{ request.studentName }}</h2>
        </div>
        <div class="student-email">
          <h2>🦮</h2>
          <p>Student Email:</p>
          <h2>{{ request.studentEmail }}</h2>
        </div>
      </div>
    </div>
    <div class="request-view-row03">
      <div class="student-phone">
        <h2>🦉</h2>
        <p>Student Phone-Number:</p>
        <h2>{{ request.studentPhoneNumber }}</h2>
      </div>
      <div class="student-addon">
      <h2>🦘</h2>
      <h2>Additional Details:</h2>
      <p>{{ request.reqAdd }}</p>
      </div>
    </div>
    <div class="request-view-row04">
      <div class="student-phone">
        <h2>📆</h2>
        <h2>Picked Tutoring Days:</h2>
        <div class="day">
          <p v-for="day in request.pickedTutoringDays" :key="day">◾ {{ day }}</p>
        </div>
      </div>
      <div class="student-addon">
        <h2>⏰</h2>
        <h2>Picked Tutoring Hours:</h2>
        <div class="hour">
          <p v-for="hour in request.pickedTutoringHours" :key="hour">◾ {{ hour }}</p>
        </div>
      </div>
    </div>
    <div class="request-view-row05">
      <main-button mode="btn black">
        Approve
      </main-button>
    </div>
  </div>
</template>

<script>
export default {
 setup(props, {emit}) {
  const request = props.request;

 },
 props: {
  request: {
   type: Object,
   required: true
  }
 }
}
</script>

<style scoped>
.request-view {
  padding: 2em;
  position: relative;
  z-index: 1;
}
.request-view::before {
  content: "";
  background: url('../../../../assets/background-pattern-vertical.png');
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
.request-view-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.request-view-row01, .request-view-row02 {
  margin-top: 2em;
  text-align: center;
}
.request-view-row01 > h3, .request-view-row02 > h3 {
  font-weight: 500;
}
.row01-desc, .row02-desc, .request-view-row03, .request-view-row04 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
  margin-top: 2em;
  padding: 0 1em;
  text-align: center;
}
.request-view-row04 {
  padding-bottom: 1.5em;
}
.request-view-row05 {
  text-align: center;
  margin-top: 1em;
}
.day, .hour {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.day > p:not(:last-child), .hour > p:not(:last-child) {
  padding-right: .5em;
}
.request-view p{
  font-size: 1.2em;
  margin-bottom: .5em;
}
</style>