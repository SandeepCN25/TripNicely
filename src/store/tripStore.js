// src/store/tripStore.js
export default {
  namespaced: true, // ✅ this makes sense now, since this will be used as a module
  state: {
    tripItems: [],
  },
  mutations: {
    ADD_TO_TRIP(state, item) {
      // if no id, generate one
      if (!item.id) {
        item.id = Date.now() + Math.random(); // quick unique id
      }
      // check for duplicates
      if (!state.tripItems.find((i) => i.id === item.id)) {
        state.tripItems.push(item); // ✅ fixed (tripItems, not savedItems)
      }
    },
    REMOVE_FROM_TRIP(state, id) {
      state.tripItems = state.tripItems.filter((i) => i.id !== id); // ✅ fixed
    },
  },
  getters: {
    getTripItems: (state) => state.tripItems, // ✅ fixed (tripItems, not savedItems)
  },
};
