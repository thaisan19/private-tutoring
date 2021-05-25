import axios from "axios"

export default {
 namespaced: true,
 state() {
  return {
   courses: [],
   publishedCourses: []
  }
 },
 actions: {
  getCourses(context)  {
   axios.get('https://private-tutoring-backend.herokuapp.com/api/course/all')
   .then(res => {
    context.commit('SET_COURSES', res.data)
   })
  },
  getPublishedCourses(context) {
   axios.get('https://private-tutoring-backend.herokuapp.com/api/course/ispublished')
   .then(res => {
    context.commit('SET_PUBLISHED_COURSES', res.data)
   })
  }
 },
 mutations: {
  SET_COURSES(state, courses) {
   state.courses = courses
  },
  SET_PUBLISHED_COURSES(state, publishedCourses) {
   state.publishedCourses = publishedCourses
  }
 },
 getters: {
  courses(state) {
   return state.courses;
  },
  publishedCourses(state) {
   return state.publishedCourses;
  }
 }
}