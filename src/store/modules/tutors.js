import axios from "axios"

export default {
 namespaced: true,
 state() {
  return {
   tutors: [],
   allTutors: [],
   unreadTutors: []
   // publishedTutors: []
  }
 },
 actions: {
  async getTutors(context) {
   await axios.get('https://private-tutoring-backend.herokuapp.com/api/admin/published')
   .then(res => {
    context.commit('SET_TUTORS', res.data)
   })
  },
  async getAllTutors(context) {
   await axios.get('https://private-tutoring-backend.herokuapp.com/api/admin/all')
   .then(res => {
    context.commit('SET_ALL_TUTORS', res.data.Data)
   })
  },
  async getAllUnread(context) {
   await axios.get('https://private-tutoring-backend.herokuapp.com/api/admin/not-read')
   .then(res => {
    context.commit('SET_UNREAD', res.data)
   })
  }
  // getPublishedTutors(context) {
  //  axios.get('http://localhost:5000/api/tutor/published')
  //  .then(res => {
  //   context.commit('SET_PUBLISHED_TUTORS', res.data.data)
  //  })
  // }
 },
 mutations: {
  SET_TUTORS(state, tutors) {
   state.tutors = tutors
  },
  SET_ALL_TUTORS(state, allTutors) {
   state.allTutors = allTutors
  },
  SET_UNREAD(state, unreadTutors) {
   state.unreadTutors = unreadTutors
  }
 },
 getters: {
  tutors(state) {
   return state.tutors;
  },
  allTutors(state) {
   return state.allTutors;
  },
  unreadTutors(state) {
   return state.unreadTutors;
  }
  // publishedTutors(state) {
  //  return state.publishedTutors;
  // }
 }
}