import { shallowMount, createLocalVue} from '@vue/test-utils'
import RoleBackground from '@/views/RoleBackground.vue'
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
        playerName: "Boeing Executive",
        gameID: "2zt9",
        players: ["Pei","2","3","4","5"],
        timer: "5",
        ready: true
    },
    mutations: {
      setGame(state, payload) {
        state.playerName = payload.playerName;
        state.gameID = payload.gameID;
      },
    },
  });
  
const $route = {
    path: '/ChapterBackground'
  }

const wrapper = shallowMount(RoleBackground, {
	localVue,
    store,
    mocks: {
        $route
      }
})


describe('RoleBackground.vue unit test suite', () => {
    test('check whether RoleBackground page title render correctly and make sure its class exists', () => {
        const titleClass = wrapper.find('.my-10')
        const formClass = wrapper.find('.display-1')
        expect(titleClass.exists()).toBe(true)
        expect(formClass.exists()).toBe(true)
        expect(wrapper.html()).toContain('About You')
      })

    //   test('check RoleBackground page can get correct data from backend', async () => {
    //     const contentclass = wrapper.find('.my-6')
    //     const backendreturnClass = wrapper.find('.mx-auto')
    //     expect(contentclass.exists()).toBe(true)
    //     expect(backendreturnClass.exists()).toBe(true)
    //     const data = await getRoleBackgroundInfo();
    //     expect(data).toContain("Boeing, the biggest aircraft producer in the world, now faces the most serious challenge you have ever faced in the company's history. Your competitor, Airbus, had little market share back in 1990s, but it splits the market nearly evenly with you. Moreover, Airbus prepares to launch a new aircraft model, which they claim it can carry more payload but consume less fuel. It would cause that Boeing 737's demand decreases and more worst, lower stock price. To turn the situation around, you, a group of people from different areas, are gathered and assigned a task: develop a new aircraft model which can beat Airbus.");
    //   })

      test('check Next button going to the ChapterBackground page', async () => {
        const buttonClass = wrapper.find('.my-10')
        expect(buttonClass.exists()).toBe(true)
        buttonClass.trigger('click')
        await Vue.nextTick()
        expect(wrapper.vm.$route.path).toBe('/ChapterBackground')
      })
})