// store/index.js
import { createStore } from "vuex";

import tripStore from "./tripStore";
import savedStore from "./savedStore";
import mapsearch from "./mapsearch";
import snakebarstore from "./snakebarstore";

export default createStore({
  modules: {
    trips: tripStore,
    saved: savedStore,
    searchitem:mapsearch,
    snakebardata:snakebarstore
  }
});
