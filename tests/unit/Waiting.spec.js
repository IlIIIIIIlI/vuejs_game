import { shallowMount, createLocalVue} from '@vue/test-utils'
import Waiting from '@/views/Waiting.vue'
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
      gameID: "bbbb",
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
    path: '/Background'
  }

const wrapper = shallowMount(Waiting, {
	localVue,
    store,
    mocks: {
        $route
      }
})

async function getWaiting() {
    const response = await axios.get("https://swen90013-ce-backend-staging.herokuapp.com/play/wait/bbbb");
    return response.status;
  }
  
  module.exports = getWaiting;

describe('ChooseYourRole.vue unit test suite', () => {
    test('check whether Waiting page title render correctly and make sure its class exists', async() => {
        const titleClass = wrapper.find('.my-10')
        const formClass = wrapper.find('.display-1')
        expect(titleClass.exists()).toBe(true)
        expect(formClass.exists()).toBe(true)
        expect(wrapper.html()).toContain('Game ID: <i>bbbb</i></h1>')
      })

      test('check whether Waiting page can render correctly guide to end users', () => {
        expect(wrapper.html()).toContain('Other players can use this Game ID to join this game.')
        expect(wrapper.html()).toContain('Waiting for all players')
      })

      test('check Next button going to the background page', async () => {
        const button1 = wrapper.find('.my-6')
        expect(button1.exists()).toBe(true)
        button1.trigger('click')
        await Vue.nextTick()
        expect(wrapper.vm.$route.path).toBe('/Background')
      })
})