import { shallowMount, createLocalVue} from '@vue/test-utils'
import Ready from '@/views/Ready.vue'
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
      gameID: "1243",
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


const wrapper = shallowMount(Ready, {
	localVue,
  store
})

describe('Ready.vue unit test suite', () => {
  
  test('check whether title and content exists', () => {
    const titleClass = wrapper.find('.my-10')
    const buttonListClass = wrapper.find('.display-1')
    expect(titleClass.exists()).toBe(true)
    expect(buttonListClass.exists()).toBe(true)
    expect(wrapper.html()).toContain('Ready for Discussion')
  })

  test('check whether title and content exists', () => {
    const class1 = wrapper.find('.my-10')
    const class2 = wrapper.find('.mx-auto')
    const class3 = wrapper.find('.question-content')
    const class4 = wrapper.find('.question-title')
    expect(class1.exists()).toBe(true)
    expect(class2.exists()).toBe(true)
    expect(class3.exists()).toBe(true)
    expect(class4.exists()).toBe(true)
    expect(wrapper.html()).toContain('Are you ready for group discussion?')
  })

})

