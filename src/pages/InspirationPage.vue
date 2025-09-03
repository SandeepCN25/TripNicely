<template>
  <v-container fluid>
    <v-row>
      <!-- Sidebar -->
      <v-col cols="3" class="pa-4" style="border-right: 1px solid #ddd">
        <!-- Refine Search (Selected Filters) -->
        <h3 class="mb-2">Refine Search</h3>
        <div v-if="selectedOptions.length === 0" class="grey--text">
          No filters selected
        </div>
        <div
          v-for="(selected, i) in selectedOptions"
          :key="i"
          class="mb-2"
          style="
            position: relative;
            display: inline-block;
            background: #e0f2f1;
            padding: 6px 20px;
            border-radius: 8px;
          "
        >
          {{ selected }}
          <v-icon
            size="16"
            color="red"
            style="position: absolute; top: -6px; right: -6px; cursor: pointer"
            @click="removeOption(selected)"
          >
            mdi-close
          </v-icon>
        </div>

        <!-- Medium Section -->
        <h4 class="mt-4">Medium</h4>
        <v-list dense>
          <v-list-item
            v-for="(medium, i) in mediums"
            :key="i"
            @click="selectOption(medium)"
            class="hoverable"
          >
            <v-list-item-content>{{ medium }}</v-list-item-content>
          </v-list-item>
        </v-list>

        <!-- Subjects Section -->
        <h4 class="mt-4">Subjects</h4>
        <v-list dense>
          <v-list-item
            v-for="(subject, i) in subjects"
            :key="i"
            @click="selectOption(subject)"
            class="hoverable"
          >
            <v-list-item-content>{{ subject }}</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Main Content (Example) -->
      <v-col cols="9" class="pa-4">
        <h2>Books / Content Area</h2>
        <p>Apply filters from the left sidebar.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // Selected filters
      selectedOptions: [],

      // Medium (only 2 options)
      mediums: ["Hindi", "English"],

      // Subjects (multiple options)
      subjects: [
        "Mathematics",
        "Science",
        "History",
        "Geography",
        "English",
        "Computer",
      ],
    };
  },
  methods: {
    selectOption(option) {
      if (!this.selectedOptions.includes(option)) {
        this.selectedOptions.push(option);
      }
    },
    removeOption(option) {
      this.selectedOptions = this.selectedOptions.filter((o) => o !== option);
    },
  },
};
</script>

<style scoped>
.hoverable {
  cursor: pointer;
}
.hoverable:hover {
  background: #f5f5f5;
}
</style>
