import { shallowMount, createLocalVue} from '@vue/test-utils'
import Background from '@/views/Background.vue'
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router'
const localVue = createLocalVue()

const axios = require('axios');
Vue.config.silent = true
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      playerName: "Pei",
      gameID: "qqqq",
      players: ["Pei","2","3","4","5"],
      timer: "5",
      ready: true,
    },
    mutations: {
      setGame(state, payload) {
        state.playerName = payload.playerName;
        state.gameID = payload.gameID;
      },
    },
  });
  
const $route = {
    path: '/ChooseYourRole'
  }

const wrapper = shallowMount(Background, {
	localVue,
    store,
    mocks: {
        $route
      },
})

wrapper.setData({background: "Content text that gets retrieved from back-end"})

async function getBackgroundInfo() {
    const response = await axios.get("https://swen90013-ce-backend-staging.herokuapp.com/play/background/qqqq");
    return response.data;
  }
  
  module.exports = getBackgroundInfo;

describe('Background.vue unit test suite', () => {
    test('check whether Background page title render correctly and make sure its class exists', () => {
        const titleClass = wrapper.find('.my-10')
        const formClass = wrapper.find('.display-1')
        expect(titleClass.exists()).toBe(true)
        expect(formClass.exists()).toBe(true)
        expect(wrapper.html()).toContain('Background')
      })

      // test('check Background page can get correct data from backend', async () => {
      //   const contentclass = wrapper.find('.my-6')
      //   const backendreturnClass = wrapper.find('.mx-auto')
      //   expect(contentclass.exists()).toBe(true)
      //   expect(backendreturnClass.exists()).toBe(true)
      //   const data = await getBackgroundInfo();
      //   expect(data).toContain("Boeing, the biggest aircraft producer in the world, now faces the most serious challenge you have ever faced in the company's history. Your competitor, Airbus, had little market share back in 1990s, but it splits the market nearly evenly with you. Moreover, Airbus prepares to launch a new aircraft model, which they claim it can carry more payload but consume less fuel. It would cause that Boeing 737's demand decreases and more worst, lower stock price. To turn the situation around, you, a group of people from different areas, are gathered and assigned a task: develop a new aircraft model which can beat Airbus.");
        
      // })

      test('check Next button going to the Choose Your role page', async () => {
        const buttonClass = wrapper.find('.text-center-right')
        const clickClass = wrapper.find('.ma-2')
        expect(buttonClass.exists()).toBe(true)
        expect(clickClass.exists()).toBe(true)
        clickClass.trigger('click')
        await Vue.nextTick()
        expect(wrapper.vm.$route.path).toBe('/ChooseYourRole')
      })
})