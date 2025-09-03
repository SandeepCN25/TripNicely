<template>
  <v-container style="padding: 40px; max-width: 800px">
    <!-- Title -->
    <v-row>
      <v-col>
        <h1
          style="font-size: 32px; font-weight: 600; margin-bottom: 5px"
          class="text-center"
        >
          Your saved places
        </h1>
      </v-col>
    </v-row>

    <!-- Tabs -->
    <v-row>
      <v-col>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          grow
          style="margin-bottom: 2px"
        >
          <v-tab style="font-weight: 500">Places 0</v-tab>
          <v-tab style="font-weight: 500">Collections 1</v-tab>
          <v-tab style="font-weight: 500">Guides 0</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <!-- Filter buttons -->
    <v-row style="margin-bottom: 20px">
      <v-col>
        <v-btn
          v-for="filter in filters"
          :key="filter"
          outlined
          rounded
          style="margin-right: 10px; text-transform: none"
        >
          {{ filter }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="justify-center" v-if="savedItems == 0">
      <v-col class="text-center">
        <p style="color: gray; font-size: 16px; margin-bottom: 20px">
          You haven’t saved any places yet.<br />
          Start a new travel-related conversation.
        </p>
        <v-btn
          color="black"
          style="text-transform: none; padding-left: 30px; padding-right: 30px"
        >
          New chat
        </v-btn>
      </v-col>
    </v-row>

    <div class="scroll-container mt-3" v-else>
      <v-row>
        <v-col
          v-for="item in savedItems"
          :key="item.id"
          cols="12"
          sm="6"
          md="6"
        >
          <v-card flat class="clean-card mb-2">
            <div
              style="position: relative; border-radius: 16px; overflow: hidden"
            >
              <v-img
                :src="item.image"
                height="300"
                width="300"
                cover
                style="display: block; border-radius: 16px"
              ></v-img>

              <div
                style="
                  position: absolute;
                  top: 0;
                  right: 0;
                  padding: 12px;
                  display: flex;
                  gap: 8px;
                  z-index: 2;
                "
              ></div>
            </div>
            <v-card-title class="d-flex justify-space-between align-center">
              <span>{{ item.title }}</span>
              <div class="d-flex align-center">
                <v-card-subtitle class="ml-1">
                  <v-icon color="black !important" size="small"
                    >mdi-star</v-icon
                  >
                  {{ item.rating }}
                </v-card-subtitle>
              </div>
            </v-card-title>

            <v-card-subtitle>
              {{ item.cuisine }} • {{ item.location }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const savedItems = computed(() => store.getters["saved/getSavedItems"]);
const tab = ref(0);
const search = ref("");
const filters = [
  "All",
  "Stays",
  "Restaurants",
  "Attractions",
  "Activities",
  "Locations",
];
</script>
