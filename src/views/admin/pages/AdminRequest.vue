<template>
  <div class="request-navigate">
    <main-button 
      mode="btn black" 
      class="button-left"
      @click="(showRegistration = true) && (showRequest = false)"
    ><span :class="[unreadTutors.length > 0 ? 'has-unread':'no-unread']">{{unreadTutors.length}}</span> Registration Requests
    </main-button>
    <main-button 
      mode="btn black"
      @click="(showRequest = true) && (showRegistration = false)"
      >
      <span :class="[unreadReqs.length > 0 ? 'has-unread':'no-unread']">{{unreadReqs.length}}</span> Student Requests</main-button>
  </div>
  <div v-if="allTutors && showRegistration">
    <TutorRequestTable :allTutors="allTutors" :unreadTutors="unreadTutors" />
  </div>
  <div v-if="showRequest">
    <Requests :requests="requests" :unreadReqs="unreadReqs" />
  </div>
</template>

<script>
import TutorRequestTable from '@/components/admin/request-data/tutor-request/TutorRequestTable.vue'
import Requests from '@/components/admin/request-data/tutor-request/Requests.vue'
import { ref } from 'vue'

export default {
  components: {
    TutorRequestTable,
    Requests
  },
  setup() {
    const showRequest = ref(false);
    const showRegistration = ref(true)

    return { showRequest, showRegistration }
  },
  computed: {
    allTutors() {
      return this.$store.getters['tutors/allTutors'];
    },
    unreadTutors() {
      return this.$store.getters['tutors/unreadTutors'];
    },
    requests() {
      return this.$store.getters['requests/requests']
    },
    unreadReqs() {
      return this.$store.getters['requests/unreadReqs']
    }
  },
  created() {
    this.$store.dispatch('tutors/getAllTutors')
    this.$store.dispatch('tutors/getAllUnread')
    this.$store.dispatch('requests/getRequests')
    this.$store.dispatch('requests/getUnreadReqs')
  }
}
</script>

<style>
.request-navigate {
  width: 80%;
  margin: 0 auto;
  text-align: right;
  padding-top: 2.5em;
}
.button-left {
  margin-right: 1em;
}
.has-unread {
  color: var(--blue);
  font-weight: 700;
  padding: .2em;
}
.no-unread {
  display: none;
}

@media only screen and (min-device-width : 320px) and (max-device-width : 900px) {
  .request-navigate {
    white-space: nowrap;
    overflow: auto;
    width: 90%;
    padding-top: 2em;
  }
  ::-webkit-scrollbar { 
    display: none; 
  }
}
@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
}
</style>