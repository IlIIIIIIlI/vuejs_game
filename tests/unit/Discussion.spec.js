import { shallowMount, createLocalVue} from '@vue/test-utils'
import Discussion from '@/views/Discussion.vue'
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
      gameID: "jpwi",
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
  path2: '/IndividualBackground',
  query: {skip: false}
  }

const wrapper = shallowMount(Discussion, {
	localVue,
    store,
    mocks: {
        $route
      }
})

// put some content in variables, so that the page does not just show as loading
wrapper.setData({questionID: 1, loadingOutcome: false})

describe('Discussion.vue unit test suite', () => {
  
  test('check whether title  and class of Discussion page shows correctly', () => {
    const titleClass = wrapper.find('.my-10')
    const titleClass2 = wrapper.find('.display-1')
    expect(wrapper.html()).toContain('Group Discussion')
    expect(titleClass.exists()).toBe(true)
    expect(titleClass2.exists()).toBe(true)
  })

  test('check whether Discussion Content class show correctly', () => {
    const class1 = wrapper.find('.my-6')
    const class2 = wrapper.find('.mx-auto')
    expect(class1.exists()).toBe(true)
    expect(class2.exists()).toBe(true)
  })

  // test('check if discussion information can render correctly', async () => {
  //    expect(wrapper.html()).toContain('As a group, discuss the following decision. You have 150s to finish your choice.')
  // })

  test('check if menu button go to IndividualBackground page', async () => {
    
    const button2 = wrapper.find('.back-button')
    expect(button2.exists()).toBe(true)
    button2.trigger('click')
    await Vue.nextTick()
    expect(wrapper.vm.$route.path2).toBe('/IndividualBackground')
  })

})