<template>
  <v-container fluid class="bg-white fill-height">
    <!-- Scrollable Cards Section -->
    <div class="scroll-container mt-6">
      <v-row>
        <v-col
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          cols="12"
          sm="6"
          md="6"
        >
          <v-card flat class="clean-card mb-4">
            <div
              style="position: relative; border-radius: 16px; overflow: hidden"
            >
              <v-img
                :src="restaurant.image"
                height="300"
                cover
                style="display: block; border-radius: 16px"
              ></v-img>
              <!-- Icons Overlay (absolute, inside the image area) -->
              <div
                style="
                  position: absolute;
                  top: 6px;
                  right: 6px;
                  display: flex;
                  gap: 4px;
                  z-index: 2;
                "
              >
                <!-- icons heart and trip -->
                <v-btn
                  icon
                  size="x-small"
                  variant="outlined"
                  class="mr-2"
                  @click="saveItem(restaurant)"
                  :style="
                    likedCards.includes(restaurant.id)
                      ? 'background-color: rgba(0,0,0,0.5); border: 1px solid white; color: red;'
                      : ' border: 1px solid white; color: white;'
                  "
                >
                  <v-icon> mdi-heart </v-icon>
                </v-btn>

                <v-btn
                  icon
                  size="x-small"
                  variant="outlined"
                  color="white"
                  :class="
                    TripedCards.includes(restaurant.id)
                      ? 'bg-blue text-white'
                      : ''
                  "
                  @click="saveItemTrip(restaurant)"
                >
                  <v-icon>
                    {{
                      TripedCards.includes(restaurant.id)
                        ? "mdi-check"
                        : "mdi-plus"
                    }}
                  </v-icon>
                </v-btn>
              </div>
            </div>
            <v-card-title class="d-flex justify-space-between align-center">
              <span>{{ restaurant.name }}</span>
              <div class="d-flex">
                <v-card-subtitle
                  ><v-icon color="black !important" size="small"
                    >mdi-star</v-icon
                  >{{ restaurant.rating }} ({{
                    restaurant.reviews
                  }})</v-card-subtitle
                >
              </div>
            </v-card-title>

            <v-card-subtitle>
              {{ restaurant.cuisine }} • {{ restaurant.location }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
  <SnakeBar />
</template>

<style scoped>
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
import SnakeBar from "../snakeBar/SnakeBar.vue";
import { useStore } from "vuex";
const store = useStore();
export default {
  components: {
    SnakeBar,
  },
  methods: {
    saveItem(restaurant) {
      const item = {
        id: restaurant.id,
        title: restaurant.name,
        image: restaurant.image,
        cuisine: restaurant.cuisine || "",
        location: restaurant.location || "",
        rating: restaurant.rating || "",
      };
      this.$store.commit("saved/ADD_TO_SAVED", item);

      // Commit mutation
      this.$store.commit("snakebardata/ADD_TO_SAVEDSNAKEBAR", {
        show: true,
        color: "red",
        msg: "Added in Saved Page!",
      });

      if (this.likedCards.includes(restaurant.id)) {
        this.likedCards = this.likedCards.filter((x) => x !== restaurant.id);
      } else {
        this.likedCards.push(restaurant.id);
      }
    },

    saveItemTrip(restaurant) {
      const item = {
        id: restaurant.id,
        title: restaurant.name,
        image: restaurant.image,
        cuisine: restaurant.cuisine || "",
        location: restaurant.location || "",
        rating: restaurant.rating || "",
      };

      this.$store.commit("trips/ADD_TO_TRIP", item);

      this.$store.commit("snakebardata/ADD_TO_TRIPSNAKEBAR", {
        show: true,
        color: "blue",
        msg: "Added in Trip Page!",
      });

      if (this.TripedCards.includes(restaurant.id)) {
        this.TripedCards = this.TripedCards.filter((x) => x !== restaurant.id);
      } else {
        this.TripedCards.push(restaurant.id);
        console.log(TripedCards[0]);
      }
    },
  },

  data() {
    return {
      restaurants: [
        {
          id: 1,
          name: "O Pedro - BKC",
          cuisine: "Portuguese",
          location: "Mumbai, Maharashtra",
          rating: 4.6,
          reviews: "6.6k",
          image:
            "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop&q=60",
        },
        {
          id: 2,
          name: "O22",
          cuisine: "Indian",
          location: "Mumbai, Maharashtra",
          rating: 4.4,
          reviews: "561",
          image:
            "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&auto=format&fit=crop&q=60",
        },
        {
          id: 3,
          name: "Shubh Sagar",
          cuisine: "Vegetarian",
          location: "Kurla, Mumbai",
          rating: 4.3,
          reviews: "1.2k",
          image:
            "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxyZXN0YXVyYW50fGVufDB8fDB8fHww",
        },
        {
          id: 4,
          name: "Yauatcha",
          cuisine: "Chinese",
          location: "Bandra Kurla Complex, Mumbai",
          rating: 4.5,
          reviews: "3.8k",
          image:
            "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE3fHxyZXN0YXVyYW50fGVufDB8fDB8fHww",
        },
        {
          id: 5,
          name: "The Table",
          cuisine: "Continental",
          location: "Colaba, Mumbai",
          rating: 4.7,
          reviews: "2.1k",
          image:
            "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHxyZXN0YXVyYW50fGVufDB8fDB8fHww",
        },
        {
          id: 6,
          name: "Bastian",
          cuisine: "Seafood",
          location: "Bandra, Mumbai",
          rating: 4.6,
          reviews: "4.5k",
          image:
            "https://images.unsplash.com/photo-1602956033956-003e7180d339?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMzfHxyZXN0YXVyYW50fGVufDB8fDB8fHww",
        },
        {
          id: 7,
          name: "Trishna",
          cuisine: "Coastal Indian",
          location: "Fort, Mumbai",
          rating: 4.4,
          reviews: "3.2k",
          image:
            "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
        },
        {
          id: 8,
          name: "Masala Library",
          cuisine: "Modern Indian",
          location: "Bandra Kurla Complex, Mumbai",
          rating: 4.5,
          reviews: "2.9k",
          image:
            "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
        },
        {
          id: 9,
          name: "Bombay Canteen",
          cuisine: "Fusion Indian",
          location: "Lower Parel, Mumbai",
          rating: 4.6,
          reviews: "5.3k",
          image:
            "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
        },
        {
          id: 10,
          name: "Leopold Cafe",
          cuisine: "Cafe / Bar",
          location: "Colaba Causeway, Mumbai",
          rating: 4.2,
          reviews: "7.1k",
          image:
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
        },
      ],
      likedCards: [],
      TripedCards: [],
    };
  },
};
</script>
