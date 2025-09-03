<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar.show" :timeout="2000" :color="snackbar.color">
      {{ snackbar.msg }}

      <template v-slot:actions>
        <v-btn color="white" @click="snackbar.show = false"> X </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const snackbar = computed(() => store.getters["snakebardata/getsnakeBarvalue"]);
console.log("data in Snakebarcomponent", snackbar);
const text = ref("My timeout is set to 2000.");
</script>
