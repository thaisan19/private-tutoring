import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TutorsList from '../views/tutors/TutorsList.vue'
import CoursesList from '../views/courses/CoursesList.vue'
import TutorCourse from '../views/tutors/profile/TutorCourse.vue'
import NotFound from '../views/NotFound.vue'
import TutorRegister from '../views/register/TutorRegister.vue'
import Admin from '../views/admin/Admin.vue'
import AdminCourse from '../views/admin/pages/AdminCourse.vue'
import AdminTutor from '../views/admin/pages/AdminTutor.vue'
import AdminRequest from '../views/admin/pages/AdminRequest.vue'
import AdminLogin from '../views/admin/pages/AdminLogin.vue'
import TutorLogin from '../views/tutors/TutorLogin.vue'
import TutorProfile from '../views/tutors/profile/TutorProfile.vue'
import CreateCourse from '../views/tutors/profile/CreateCourse.vue'
import store from '../store/index.js'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/tutors',
      name: 'TutorsList',
      component: TutorsList
    },
    {
      path: '/courses',
      name: 'CoursesList',
      component: CoursesList
    },
    {
      path: '/courses/user',
      name: 'TutorCourse',
      component: TutorCourse,
      meta: {
        requiresAuthAsTutor: true
      }
    },
    {
      path: '/courses/create',
      name: 'CreateCourse',
      component: CreateCourse,
      meta: {
        requiresAuthAsTutor: true
      }
    },
    {
      path: '/pvt-admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuthAsAdmin: true
      }
    },
    {
      path: '/register',
      name: 'TutorRegister',
      component: TutorRegister,
    },
    {
      path: '/tutor/profile',
      name: 'TutorProfile',
      component: TutorProfile,
      meta: {
        requiresAuthAsTutor: true
      }
    },
    {
      path: '/pvt-admin/course',
      name: 'AdminCourse',
      component: AdminCourse,
      meta: {
        requiresAuthAsAdmin: true
      }
    },
    {
      path: '/pvt-admin/tutor',
      name: 'AdminTutor',
      component: AdminTutor,
      meta: {
        requiresAuthAsAdmin: true
      }
    },
    {
      path: '/pvt-admin/request',
      name: 'AdminRequest',
      component: AdminRequest,
      meta: {
        requiresAuthAsAdmin: true
      }
    },
    {
      path: '/pvt-admin/login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/tutor/login',
      name: 'TutorLogin',
      component: TutorLogin,
      meta: {
        requiresUnauthAsTutor: true
      }
    },
    {
      path: '/*',
      name: 'NotFound',
      component: NotFound
    }
  ]
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuthAsTutor && !store.getters.isAuthenticatedAsTutor) {
    next('/tutor/login');
  } else if (to.meta.requiresUnauthAsTutor && store.getters.isAuthenticatedAsTutor) {
    next();
  } else if (to.meta.requiresAuthAsAdmin && !store.getters.isAuthenticatedAsAdmin) {
    next('/pvt-admin/login')
  } else {
    next();
  }
})

export default router
