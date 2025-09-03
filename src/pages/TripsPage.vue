<template>
  <v-container style="padding: 30px 40px; max-width: 1000px">
    <!-- Header Row -->
    <v-row
      class="align-center justify-space-between"
      style="margin-bottom: 30px"
    >
      <!-- Left: Title + Switch -->
      <v-col cols="6" class="d-flex align-center">
        <h1 style="font-size: 28px; font-weight: 600; margin-right: 20px">
          Your trips
        </h1>
        <v-switch
          v-model="bookedOnly"
          label="Booked only"
          hide-details
          inset
          style="margin-top: 0"
        ></v-switch>
      </v-col>

      <!-- Right: Dropdown + New Trip -->
      <v-col cols="6" class="d-flex justify-end align-center">
        <v-menu>
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              style="text-transform: none; font-weight: 500; margin-right: 20px"
              append-icon="mdi-chevron-down"
            >
              Upcoming
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="opt in options"
              :key="opt"
              @click="selected = opt"
            >
              <v-list-item-title>{{ opt }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn
          color="black"
          rounded="lg"
          style="color: white; text-transform: none; font-weight: 500"
        >
          + New trip
        </v-btn>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <div style="text-align: center; margin-top: 100px" v-if="savedItems == 0">
      <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px">
        No trips
      </h3>
      <p style="color: gray; font-size: 15px; margin-bottom: 25px">
        You don’t have any trips yet.
      </p>

      <!-- Bag Icon -->
      <v-icon size="50" style="color: lightgray; margin-bottom: 25px"
        >mdi-briefcase-outline</v-icon
      >

      <!-- Create Trip Button -->
      <div>
        <v-btn
          color="black"
          rounded="lg"
          style="
            color: white;
            text-transform: none;
            padding: 10px 28px;
            font-weight: 500;
          "
        >
          Create a trip
        </v-btn>
      </div>
    </div>

    <div class="scroll-container mt-3" v-else>
      <v-row>
        <v-col
          v-for="item in savedItems"
          :key="item.id"
          cols="12"
          sm="6"
          md="6"
        >
          <v-card flat class="clean-card mb-4">
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

              <!-- Icons Overlay (absolute, inside the image area) -->
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

<style>
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
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const savedItems = computed(() => store.getters["trips/getTripItems"]);

const bookedOnly = ref(false);
const options = ["Upcoming", "Past", "All"];
const selected = ref("Upcoming");
</script>
