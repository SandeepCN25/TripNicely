<template>
  <v-container fluid class="pa-0 fill-height">
    <v-row no-gutters class="fill-height position-relative">
      <v-col :cols="isFullWidthPage ? 12 : 6" class="pa-2 z-10">
        <v-sheet
          border="dashed md"
          color="surface-light"
          rounded="lg"
          class="fill-height d-flex flex-column"
        >
          <div class="flex-grow-1 d-flex align-center justify-center">
            <router-view />
          </div>
        </v-sheet>
      </v-col>
      <v-col
        v-if="!isFullWidthPage"
        :cols="expanded ? 12 : 6"
        class="pa-2 transition-all duration-300 z-20"
        style="position: absolute; right: 0; top: 0; bottom: 0"
      >
        <v-sheet
          border="dashed md"
          color="surface-light"
          rounded="lg"
          class="fill-height d-flex flex-column"
        >
          <!-- Expand/Collapse button -->
          <div class="d-flex justify-end pa-2 bg-transparent">
            <v-btn icon variant="tonal" size="small" @click="toggleExpand">
              <v-icon>{{
                expanded ? "mdi-arrow-collapse" : "mdi-arrow-expand"
              }}</v-icon>
            </v-btn>
          </div>

          <!-- Map content -->
          <MapComponent />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import MapComponent from "../map/MapComponent.vue";

export default {
  components: { MapComponent },
  data() {
    return {
      expanded: false,
    };
  },
  setup() {
    const route = useRoute();
    const isFullWidthPage = computed(() => route.meta.fullWidth === true);
    return { isFullWidthPage };
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
  },
};
</script>
