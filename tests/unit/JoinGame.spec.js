import { shallowMount, createLocalVue} from '@vue/test-utils'
import JoinGame from '@/views/JoinGame.vue'
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.config.silent = true
Vue.use(Vuetify);

import VueRouter from 'vue-router'
Vue.use(Vuetify);
Vue.config.silent = true
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

shallowMount(JoinGame, {
  stubs: ['router-link', 'router-view']
})

shallowMount(JoinGame, {
  localVue
})

const $route = {
  path: '/'
}

const wrapper = shallowMount(JoinGame, {
  mocks: {
    $route
  }
})

describe('JoinGame.vue unit test suite', () => {
    test('check whether title and form classes exists', () => {
        const titleClass = wrapper.find('.my-10')
        const formClass = wrapper.find('.my-6')
        expect(titleClass.exists()).toBe(true)
        expect(formClass.exists()).toBe(true)
      })

    test('check if JoinGame page can render main title correctly', () => {
        const title = wrapper.find('.display-1')
        expect(title.exists()).toBe(true)
        expect(wrapper.html()).toContain('Join Game')
  })

  test('check if JoinGame page can render submit button correctly', async () => {
    const submitButton = wrapper.find('.mr-4')
    expect(submitButton.exists()).toBe(true)
    submitButton.trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).toContain('submit')
  })

  test('check if JoinGame page can display a left arrow button and it is clickable', async () => {
    const button1 = wrapper.find('.ma-2')
    expect(button1.exists()).toBe(true)
    button1.trigger('click')
    await Vue.nextTick()
    expect(wrapper.html()).toContain('mdi-arrow-left')
    expect(wrapper.vm.$route.path).toBe('/')
  })

})