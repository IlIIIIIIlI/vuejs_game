import { shallowMount, createLocalVue} from '@vue/test-utils'
import Reflection from '@/views/Reflection.vue'
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
      gameID: "peii",
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
  path: '/'
  }

const wrapper = shallowMount(Reflection, {
	localVue,
    store,
    mocks: {
        $route
      }
})

// put some content in variables, so that the page does not just show as loading
wrapper.setData({questions: [1]})

describe('Reflection.vue unit test suite', () => {
  
  test('check whether title  and class of reflection page shows correctly', () => {
    const titleClass = wrapper.find('.my-10')
    const titleClass2 = wrapper.find('.display-1')
    expect(wrapper.html()).toContain('Reflection')
    expect(titleClass.exists()).toBe(true)
    expect(titleClass2.exists()).toBe(true)
  })

  test('check whether All Decisions Table class show correctly', () => {
     const class1 = wrapper.find('.my-6')
     const class2 = wrapper.find('.mx-auto')
     expect(class1.exists()).toBe(true)
     expect(class2.exists()).toBe(true)
  })

  test('check if exit game button works well', async () => {
    const button2 = wrapper.find('.my-6')
    expect(button2.exists()).toBe(true)
    button2.trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).toContain('Exit Game')
    expect(wrapper.vm.$route.path).toBe('/')
  })

})