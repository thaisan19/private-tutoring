import { createStore } from 'vuex'
import coursesModule from './modules/courses.js'
import tutorsModule from './modules/tutors.js'
import requestsModule from './modules/requests.js'
import authModule from './modules/auth.js'

const store =  createStore({
 modules: {
  courses: coursesModule,
  tutors: tutorsModule,
  requests: requestsModule,
  auth: authModule
 }
});

export default store;
