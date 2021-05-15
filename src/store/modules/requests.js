import axios from "axios"

export default {
 namespaced: true,
 state() {
  return {
   requests: [],
   unreadReqs: []
  }
 },
 actions: {
  async getRequests(context)  {
   await axios.get('https://private-tutoring-backend.herokuapp.com/api/request/get-reqs')
   .then(res => {
    context.commit('SET_REQUESTS', res.data)
   })
  },
  async getUnreadReqs(context) {
   await axios.get('https://private-tutoring-backend.herokuapp.com/api/request/unread')
   .then(res => {
    context.commit('SET_UNREAD_REQS', res.data)
   })
  }
 },
 mutations: {
  SET_REQUESTS(state, requests) {
   state.requests = requests
  },
  SET_UNREAD_REQS(state, unreadReqs) {
   state.unreadReqs = unreadReqs
  }
 },
 getters: {
  requests(state) {
   return state.requests;
  },
  unreadReqs(state) {
   return state.unreadReqs
  }
 }
}