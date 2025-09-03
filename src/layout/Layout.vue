<template>
  <v-layout class="rounded rounded-md border">
    <v-navigation-drawer app :rail="rail" permanent>
      <v-btn icon variant="text" class="ma-2" @click="rail = !rail">
        <v-icon>{{ rail ? "mdi-arrow-expand" : "mdi-arrow-collapse" }}</v-icon>
      </v-btn>
      <div class="d-flex align-center" v-if="!rail">
        <img src="/Assests/logo.png" alt="logo" height="70" width="70" />
        <h1 class="ml-1 text-h4 font-weight-bold">TripNicely</h1>
      </div>

      <v-list nav dense class="mb-48">
        <v-list-item
          v-for="route in routes"
          :key="route.name"
          :to="route.path"
          link
          router
          class="d-flex align-center"
        >
          <v-icon class="mr-2 text-h5">{{ route.icon }}</v-icon>
          <span v-if="!rail">{{ route.name }}</span>
        </v-list-item>
      </v-list>

      <div
        v-if="rail"
        style="
          position: absolute;
          bottom: 110px;
          left: 0;
          right: 0;
          text-align: center;
        "
      >
        <span
          class="text-h4 font-weight-bold"
          style="
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            letter-spacing: 2px;
            display: inline-block;
          "
        >
          TripNicely
        </span>
        <img
          src="/Assests/logo.png"
          style="transform: rotate(270deg)"
          alt="logo"
          height="70"
          width="70"
        />
      </div>
    </v-navigation-drawer>

    <v-app-bar v-if="$route.path === '/'">
      <AppBar />
    </v-app-bar>
    <v-main>
      <DrawerIcons />
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref } from "vue";

import AppBar from "../components/appBar/AppBar.vue";
import DrawerIcons from "../components/DrawerItems/DrawerIcons.vue";
const rail = ref(false);

component: {
  AppBar, DrawerIcons;
}
// state
const expanded = ref(false);
// routes array
const routes = [
  { path: "/", name: "Home", icon: "mdi-home" },
  { path: "/ExplorePage", name: "Explore", icon: "mdi-compass-outline" },
  { path: "/SavePage", name: "Save", icon: "mdi-heart-outline" },
  { path: "/TripsPage", name: "Trips", icon: "mdi-airplane" },
  {
    path: "/InspirationPage",
    name: "Inspiration",
    icon: "mdi-lightbulb-outline",
  },
];
</script>
