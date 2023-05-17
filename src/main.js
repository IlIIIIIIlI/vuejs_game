import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import PlayerInfo from "./GlobalComponents/PlayerInfo.vue"; // 引入 PlayerInfo 组件

Vue.use(Vuex);

import "./assets/style.css";
import vuetify from './plugins/vuetify';


import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlane)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component("PlayerInfo", PlayerInfo);

const store = new Vuex.Store({
  state: {
    playerName: "",
    gameID: "",
    roleID: "",
    // assist with rejoining the game at the right page
    checkpoint: "",
    // zuo xia jiao de na ge dong xi
    showPlayerInfo: true,
  },
  mutations: {
    setGame(state, payload) {
      state.playerName = payload.playerName;
      state.gameID = payload.gameID;
    },

    setRole(state, payload){
      state.roleID = payload.roleID;
    },

    setCheckpoint(state, payload) {
      state.checkpoint = payload.checkpoint;
    },

    togglePlayerInfo(state) {
      state.showPlayerInfo = !state.showPlayerInfo;
    },

    setPlayerInfoVisibility(state, visible) {
      state.showPlayerInfo = visible;
    },
  },
  plugins: [createPersistedState()]
});

Vue.config.productionTip = false;

// for show zuo xia jiao to pages other than menu
router.beforeEach((to, from, next) => {
  // 定义一个数组，包含需要隐藏的页面名称
  const hiddenPages = ["Home", "Waiting", "Background", "NewGame", "JoinGame", "ChooseYourRole"];

  // 检查to.name是否在hiddenPages数组中
  if (hiddenPages.includes(to.name)) {
    store.commit("setPlayerInfoVisibility", false);
  } else {
    // 或显示my playerinfo
    store.commit("setPlayerInfoVisibility", true);
  }
  next();
});


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");


router.afterEach(to => {
  let page = to.name;
  if (page !== "Home") {
    store.commit("setCheckpoint", {
      checkpoint: page
    })
  }
});

import SequentialEntrance from 'vue-sequential-entrance'
import 'vue-sequential-entrance/vue-sequential-entrance.css'
Vue.use(SequentialEntrance);
