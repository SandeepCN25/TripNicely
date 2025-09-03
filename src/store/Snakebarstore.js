// src/store/savedStore.js
export default {
  namespaced: true,

  state: {
    snakebar: {
      show: false,
      color: "",
      msg: "",
    },
  },

  mutations: {
    ADD_TO_SAVEDSNAKEBAR(state, obj) {
      state.snakebar.show = obj.show;
      state.snakebar.color = obj.color;
      state.snakebar.msg = obj.msg;
    },
    ADD_TO_TRIPSNAKEBAR(state, obj) {
      state.snakebar.show = obj.show;
      state.snakebar.color = obj.color;
      state.snakebar.msg = obj.msg;
    },
  },
  getters: {
    getsnakeBarvalue: (state) => state.snakebar,
  },
};
