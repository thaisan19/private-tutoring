import axios from "axios"

export default {
 namespaced: true,
 state() {
  return {
   courses: [],
  }
 },
 actions: {
  getCourses(context)  {
   axios.get('https://backend-pvt.herokuapp.com/api/course/published')
   .then(res => {
    context.commit('SET_COURSES', res.data)
   })
  }
 },
 mutations: {
  SET_COURSES(state, courses) {
   state.courses = courses
  },
 },
 getters: {
  courses(state) {
   return state.courses;
  }
 }
}