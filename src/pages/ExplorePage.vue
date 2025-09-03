<template>
  <v-container fluid class="bg-white fill-height">
    <!-- Location + Search -->
    <v-row class="mb-0" align="center" justify="start">
      <!-- Search Input -->
      <v-col cols="12" sm="8" md="9" lg="10">
        <v-text-field
          v-model="search"
          placeholder="Search"
          density="comfortable"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          rounded="xl"
          class="search-field"
        />
      </v-col>

      <!-- Button -->
      <v-col cols="12" sm="4" md="3" lg="2" class="d-flex align-center">
        <v-btn
          color="warning"
          variant="outlined"
          rounded="xl"
          class="p-4"
          @click="saveSearch"
        >
          Search
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <!-- Tabs -->
      <v-tabs v-model="tab" bg-color="white" grow show-arrows>
        <v-tab v-for="item in tabs" :key="item.value" :value="item.value">
          {{ item.label }}
        </v-tab>
      </v-tabs>

      <!-- Tab content -->
      <v-window v-model="tab">
        <v-window-item
          v-for="item in tabs"
          :key="item.value"
          :value="item.value"
        >
          <v-card flat>
            <v-card-text>
              <component :is="item.component" />
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Remove blue highlight on text-field */
.v-field--focused {
  --v-theme-primary: transparent !important;
  box-shadow: none !important;
  border-color: #ccc !important;
}

/* Search field should expand nicely */
.search-field {
  width: 100%;
}

/* Make scroll areas clean */
.clean-card {
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
}
.scroll-container {
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 8px;
}
.scroll-container::-webkit-scrollbar {
  display: none;
}
</style>

<script>
import ForYouStatic from "../components/ExploreOpenAI/ForYouStatic.vue";
import ResturantAI from "../components/ExploreOpenAI/ResturantAI.vue";
import ThingsToDoAI from "../components/ExploreOpenAI/ThingsToDoAI.vue";

export default {
  data() {
    return {
      search: "",
      tab: "foryou",
      tabs: [
        { label: "For you", value: "foryou", component: ForYouStatic },
        { label: "Restaurants", value: "restaurants", component: ResturantAI },
        { label: "Things to do", value: "thingsToDo", component: ThingsToDoAI },
      ],
    };
  },
  methods: {
    saveSearch() {
      console.log("search item:", this.search);
      this.$store.commit("searchitem/ADD_TO_SEARCHITEM", this.search);
    },
  },
};
</script>
