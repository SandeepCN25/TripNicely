import { createRouter, createWebHistory } from 'vue-router'
// Import your pages
import HomePage from '../pages/HomePage.vue'
import ExplorePage from '../pages/ExplorePage.vue'
import SavePage from '../pages/SavePage.vue'
import InspirationPage from '../pages/InspirationPage.vue'
import TripsPage from '../pages/TripsPage.vue'

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/ExplorePage", name: "ExplorePage", component: ExplorePage },
  { path: "/SavePage", name: "SavePage", component: SavePage, meta: { fullWidth: true } },
  { path: "/TripsPage", name: "TripsPage", component: TripsPage, meta: { fullWidth: true } },
  { path: "/InspirationPage", name: "InspirationPage", component: InspirationPage, meta: { fullWidth: true } },
];

// const routes = [
//   { path: '/', name: 'HomePage', component: HomePage },
//   { path: '/ExplorePage', name: 'ExplorePage', component: ExplorePage },
//   { path: '/SavePage', name: 'SavePage', component: SavePage },
//   { path: '/TripsPage', name: 'TripsPage', component: TripsPage },
//   { path: '/InspirationPage', name: 'InspirationPage', component: InspirationPage },

// ]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
