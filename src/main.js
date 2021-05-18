import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import 'animate.css'
import DKToast from 'vue-dk-toast'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'

import './assets/main.css'

import MainButton from './components/main-components/MainButton.vue'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(DKToast, {
 duration: 2000,
 positionY: 'top',
 positionX: 'center',
 styles: {
  color: '#000',
  backgroundColor: '#fff'
 }
})
app.use(PrimeVue)
app.use(ConfirmationService)

app.component('main-button', MainButton)

app.mount('#app')
