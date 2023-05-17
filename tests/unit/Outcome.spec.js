import { shallowMount, createLocalVue} from '@vue/test-utils'
import Outcome from '@/views/Outcome.vue'
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
      gameID: "jjjj",
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
  path: '/Reflection'
  }

const wrapper = shallowMount(Outcome, {
	localVue,
    store,
    mocks: {
        $route
      }
})

describe('Outcome.vue unit test suite', () => {
  
  test('check whether title of drawer of the game menu content show correctly', () => {
    const titleClass = wrapper.find('.my-10')
    const titleClass2 = wrapper.find('.display-1')
    const buttonListClass = wrapper.find('.my-6')
    expect(wrapper.html()).toContain('The End')
    expect(titleClass.exists()).toBe(true)
    expect(titleClass2.exists()).toBe(true)
    expect(buttonListClass.exists()).toBe(true)
  })

  test('check whether GameOutcome Text class show correctly', () => {
    const class1 = wrapper.find('.my-6')
    const class2 = wrapper.find('.mx-auto')
    expect(class1.exists()).toBe(true)
    expect(class2.exists()).toBe(true)
  })

  test('check whether title of drawer of the game menu content show correctly2', () => {
    const titleClass = wrapper.find('.my-10')
    const titleClass2 = wrapper.find('.display-1')
    expect(titleClass.exists()).toBe(true)
    expect(titleClass2.exists()).toBe(true)
    expect(wrapper.html()).toContain('Your Outcome')
  })

  test('check if RoleOutcome Text class can show correctly', () => {
    const class2 = wrapper.find('.display-1')
    expect(class2.exists()).toBe(true)
  })

  test('check if Outcome page router works well', async () => {
    const button2 = wrapper.find('.text-center-right')
    const button3 = wrapper.find('.ma-2')
    expect(button2.exists()).toBe(true)
    expect(button3.exists()).toBe(true)
    button2.trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).toContain('Reflection')
    expect(wrapper.vm.$route.path).toBe('/Reflection')
  })

})