<template>
  <div style="width: 100%; height: 90vh">
    <!-- Map container -->
    <div id="map" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import L from "leaflet";
import { useStore } from "vuex";
const map = ref(null);
const marker = ref(null);
const store = useStore();
// bound to input field
const searchItem = computed(() => store.getters["searchitem/getSearchItem"]);
const locationName = ref("");
watch(searchItem, (newVal) => {
  if (newVal) {
    locationName.value = newVal;
    goToLocation();
  }
});
// Default Raipur
const mapCenter = ref([21.2514, 81.6296]);
onMounted(() => {
  // Initialize map
  map.value = L.map("map").setView(mapCenter.value, 12);

  // Add OpenStreetMap tiles (no billing)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map.value);

  // Add marker
  marker.value = L.marker(mapCenter.value).addTo(map.value);
});

// 🔹 Function to search location dynamically
const goToLocation = async () => {
  if (!locationName.value) return;

  try {
    // Call Nominatim free API with frontend param
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        locationName.value
      )}`
    );
    const data = await response.json();

    if (data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);

      mapCenter.value = [lat, lon];
      map.value.setView(mapCenter.value, 12);

      if (marker.value) {
        marker.value.setLatLng(mapCenter.value);
      } else {
        marker.value = L.marker(mapCenter.value).addTo(map.value);
      }
    } else {
      alert("Location not found!");
    }
  } catch (error) {
    console.error(error);
    alert("Error fetching location.");
  }
};
</script>
