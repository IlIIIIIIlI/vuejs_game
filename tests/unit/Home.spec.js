import { shallowMount, createLocalVue} from '@vue/test-utils'
import Home from '@/views/Home.vue'
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
      gameID: "abcd",
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
  path1: '/NewGame',
  path2: '/JoinGame'
  }

const wrapper = shallowMount(Home, {
	localVue,
    store,
    mocks: {
        $route
      }
})

describe('home.vue unit test suite', () => {
  
  test('check whether title and button list classes exists', () => {
    const titleClass = wrapper.find('.my-10')
    const buttonListClass = wrapper.find('.my-6')
    expect(titleClass.exists()).toBe(true)
    expect(buttonListClass.exists()).toBe(true)
  })

  // test('check if home page can render first title correctly', () => {
  //   const class1 = wrapper.find('.display-2')
  //   expect(class1.exists()).toBe(true)
  //   expect(wrapper.html()).toContain('Air Crash Investigations')
  // })
  //
  // test('check if home page can render second title correctly', () => {
  //   const class2 = wrapper.find('.display-1')
  //   expect(class2.exists()).toBe(true)
  //   expect(wrapper.html()).toContain('A Game of Ethics')
  // })

  test('check if home page can render New Game button and it is clickable', async () => {
    const button1 = wrapper.find('.newgame1')
    expect(button1.exists()).toBe(true)
    button1.trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).toContain('New Game')
    expect(wrapper.vm.$route.path1).toBe('/NewGame')
  })

  test('check if home page can render Join Game button and it is clickable', async () => {
    const button2 = wrapper.find('.newgame2')
    expect(button2.exists()).toBe(true)
    button2.trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).toContain('Join Game')
    expect(wrapper.vm.$route.path2).toBe('/JoinGame')
  })

  test('check if home page can render Help button', () => {
    const help1 = wrapper.find('.headline')
    const help2 = wrapper.find('.justify-center')
    expect(help1.exists()).toBe(true)
    expect(help2.exists()).toBe(true)
    // expect(wrapper.html()).toContain('Instuctions')
  })

  test('check if home page can render Help button content correctly', () => {
    expect(wrapper.html()).toContain('This is a round-based game. Each game will have 5 players who can choose different roles. At the beginning you can read the background of the game as well as some description about the responsibility and individual stories of every role.')
    expect(wrapper.html()).toContain('In each chapter (round), there is a particular events and context. You should make a decision based on your understanding and responsibility. Every player will see the same question and enter their preferred option.')
    expect(wrapper.html()).toContain('At the end of the game, you will see the conclusion and you can discuss together about what each player thought during the game')
    expect(wrapper.html()).toContain('Go and find your own outcome with your friends!')
  })

  test('check if home page can render Help Got it button and check whether it is clickable', async () => {
    const button3 = wrapper.find('.newgame3')
    expect(button3.exists()).toBe(true)
    button3.trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).toContain('Got It')
  })

})

