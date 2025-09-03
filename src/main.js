// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/Router'
import store from "./store";
import "leaflet/dist/leaflet.css";

// Vuetify styles
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Optional icons
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
})

const app = createApp(App)

app.use(store)
app.use(router)
app.use(vuetify)
app.mount('#app')
