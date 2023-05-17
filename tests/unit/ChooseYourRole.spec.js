import { shallowMount, createLocalVue} from '@vue/test-utils'
import ChooseYourRole from '@/views/ChooseYourRole.vue'
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
      gameID: "m27x",
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
    path: '/ChapterBackground'
  }

const wrapper = shallowMount(ChooseYourRole, {
	localVue,
    store,
    mocks: {
        $route
      }
})

async function getChooseYourRole() {
    const response = await axios.get("https://swen90013-ce-backend-staging.herokuapp.com/play/eeee/roles");
    return response.data;
  }
  
  module.exports = getChooseYourRole;

const CheckRoleDescriptionFromBackend = {
  roles: [
    {description:"Oversees the whole 737 MAX project, as well as the other operations occurring within the Boeing company.", title: "Boeing Executive"},
    {description:"Acts as the project lead for the 737 MAX project, and is responsible for the continuous and stable operation of the 737 MAX in the future.", title:"Aeronautical Engineer"},
    {description:"Represents the software development team for the 737 MAX project, and is responsible for technical operation and development of the 737 MAX.", title:"Software Developer"},
    {description:"Acts as the regulatory body for the 737 MAX project, is responsible for ensuring the project adheres to guidelines.", title:"FAA Official"},
    {description:"A long-time pilot of Boeing, acts as a lead tester for the 737 MAX project and is responsible for ensuring practical effectiveness of the 737 MAX.", title:"Boeing Pilot"}
  ]
}

describe('ChooseYourRole.vue unit test suite', () => {
    test('check whether ChooseYourRole page title render correctly and make sure its class exists', () => {
        const titleClass = wrapper.find('.my-10')
        const formClass = wrapper.find('.display-1')
        expect(titleClass.exists()).toBe(true)
        expect(formClass.exists()).toBe(true)
        expect(wrapper.html()).toContain('Choose your role')
      })

      test('check ChooseYourRole page can get role object and check the backend role name and its description are correctly', async () => {
        const object = await getChooseYourRole();
        expect.objectContaining(object);
        expect(object).toMatchObject(CheckRoleDescriptionFromBackend);
      })

      test('check Next button going to the chapterBackground page', async () => {
        const button1 = wrapper.find('.my-3')
        expect(button1.exists()).toBe(true)
        button1.trigger('click')
        await Vue.nextTick()
        expect(wrapper.vm.$route.path).toBe('/ChapterBackground')
      })
})