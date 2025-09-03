

// src/store/savedStore.js
export default {
  namespaced: true,

  state: {
    savedItems: [],
  },

  mutations: {
   ADD_TO_SAVED(state, item) {
    if (!state.savedItems.find(i => i.id === item.id)) {
      state.savedItems.push(item)   // ✅ appends new items
    }
  },
 

    REMOVE_FROM_SAVED(state, id) {
      state.savedItems = state.savedItems.filter(i => i.id !== id)
    }
  },
  getters: {
    getSavedItems: (state) => state.savedItems,
  }
}