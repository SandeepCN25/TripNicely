<template>
  <div class="d-flex align-center justify-space-between w-100">
    <v-select
      class="my-auto py-1 px-4 custom-select"
      placeholder="Select trip"
      variant="plain"
      density="compact"
      :items="[
        'California',
        'Colorado',
        'Florida',
        'Georgia',
        'Texas',
        'Wyoming',
      ]"
      style="
        margin-left: 20px;
        border-radius: 26px;
        max-width: 150px;
        font-weight: bold;
        color: black;
      "
      hide-details
    />

    <v-btn
      class="my-auto mr-6 rounded-xl custom-select"
      small
      variant="outlined"
      >Create Trip</v-btn
    >
  </div>
</template>

<script setup></script>
<style>
.custom-select:hover {
  background-color: #f0f0f0 !important; /* light gray on hover */
}
</style>
