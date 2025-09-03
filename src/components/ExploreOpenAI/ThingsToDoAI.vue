<template>
  <v-container fluid class="bg-white fill-height">
    <div class="scroll-container mt-2">
      <v-row v-if="loading" class="width-100%">
        <v-col v-for="n in 6" :key="n" cols="12">
          <p>Getting Data...</p>
          <v-skeleton-loader class="mx-auto my-3" type="card" />
        </v-col>
      </v-row>

      <!-- Hotel Cards -->
      <v-row v-else>
        <v-col v-for="(hotel, index) in hotels" :key="index" cols="12">
          <v-card class="text-center my-2" outlined>
            <v-card-title
              class="headline mt-4 text-amber-darken-2 text-h5 font-weight-bold"
              >{{ hotel.name }}</v-card-title
            >
            <div><strong>Location:</strong> {{ hotel.location }}</div>
            <v-btn small class="mt-2 mb-3 bg-amber-lighten-1">see more</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
const loading = ref(false);
const store = useStore();
const hotels = ref([]);

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Function to parse hotel text into structured objects
function parseHotels(text) {
  const blocks = text
    .split(/\n(?=###|\d+\.\s+\*\*Hotel|Hotel\s)/)
    .filter((b) => b.trim() !== "");

  return blocks
    .map((block) => {
      const name =
        block.match(/\*\*(.+?)\*\*/)?.[1] ||
        block.match(/^(Hotel.+)/)?.[1] ||
        "";
      const discription =
        block.match(/Type\*?\*?:\s*([^\n]+)/i)?.[1]?.trim() || "";
      const location =
        block.match(/Location\*?\*?:\s*([^\n]+)/i)?.[1]?.trim() || "";
      return { name, discription, location };
    })
    .filter((h) => h.name);
}
// Call OpenAI when search item changes
async function fetchHotels(city) {
  if (!city) return;
  loading.value = true;
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Give me a list of activities to do in ${city} with discription and location.`,
          },
        ],
      }),
    });

    const data = await res.json();

    if (data.choices?.length > 0) {
      const aiResponse = data.choices[0].message.content;
      hotels.value = parseHotels(aiResponse);
    } else {
      hotels.value = [];
    }
  } catch (err) {
    console.error("❌ Error fetching hotels:", err);
    hotels.value = [];
  } finally {
    loading.value = false;
  }
}

// Watch for search item changes from Vuex
watch(
  () => store.getters["searchitem/getSearchItem"],
  (newCity) => {
    fetchHotels(newCity);
  },
  { immediate: true } // trigger once on load too
);
</script>

<style>
.chat-container {
  height: 90vh;
}
.messages {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.chat-input {
  position: sticky;
  bottom: 10px;
}

.assistant-msg code {
  background: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
  margin: 5px;
}
.assistant-msg pre {
  background: #eee;
  padding: 8px;
  border-radius: 6px;
  overflow-x: auto;
}

/* Typing dots animation */
.dot {
  height: 8px;
  width: 8px;
  margin: 0 2px;
  background-color: #555;
  border-radius: 50%;
  display: inline-block;
  animation: bounce 1.4s infinite;
}
.dot:nth-child(2) {
  animation-delay: 0.2s;
}
.dot:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.6;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
