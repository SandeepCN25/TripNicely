export default {
  namespaced: true,
  state: {
    searchItem: null,
  },
  mutations: {
    ADD_TO_SEARCHITEM(state, value) {
      state.searchItem = value;
    },
  },
  getters: {
    getSearchItem: (state) => state.searchItem,
  },
};
