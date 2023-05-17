<template>
  <v-col align="center" class="text-center">

    <Menu/>

    <router-link v-if="!reveal" :to="this.$route.query.skip ? '/ChapterBackground' : '/IndividualBackground'"
                 class="back-button">
      <v-icon>mdi-arrow-left</v-icon>
    </router-link>

    <!-- Title -->
    <div class="my-10 mx-auto" style="width:300px;">
      <h1 class='display-1'>Group Discussion</h1>
    </div>

    <!-- Discussion Content -->

    <div v-if="!questionID || loadingOutcome" class="loading">
      <div class="transform-me">
        <v-progress-circular indeterminate color="primary"/>
      </div>
    </div>

    <div v-else class="my-6">
      <v-card class="mx-auto" max-width="600" outlined>
        <v-card-text>
          <p v-if="!reveal && !waiting && questionID>=6061 && questionID<=6131" class="my-1 body-2 font-weight-regular">As a
            group, discuss the following decision. You have 150s to finish your choice.</p>
          <p v-else-if="!reveal && !waiting && questionID > 100 && questionID < 6061" class="my-1 body-2 font-weight-regular">Below is a
            personal question, you have 60s to finish your choice.</p>

          <p v-else-if="!reveal && waiting" class="my-1 body-2 font-weight-regular">
            <v-progress-circular indeterminate color="primary"/>
            Waiting for other players to enter their choice.
          </p>

          <p v-else-if="reveal">
            The outcome for the team is:
          </p>


          <h3 class="mt-8 mb-3 font-weight-medium">
            {{ Question }}
          </h3>

          <template v-if="!reveal">

            <v-form @submit.prevent="enterChoice">
              <v-radio-group class="my-1" v-model="myChoice" :disabled="waiting" mandatory>
                <v-radio
                    v-for="option in options"
                    :key="option.id"
                    :label="(option.i) + ': ' + option.text"
                    :value="option.id"
                    class="my-3 option"
                ></v-radio>
              </v-radio-group>


              <v-btn class="mt-1 mb-5" color="primary" type="submit" :disabled="waiting">Submit my choice</v-btn>


              <Timer v-slot="timeObj" :time=150 v-if="questionID >= 6061 && questionID <= 6131">
                <div class="timer"/>
                <div class="count-down">
                  <div class="icon"></div>
                  <img class='timer' src="~@/assets/timer.png">
                  <span>{{ timeObj.mm }} m {{ timeObj.ss }} s</span>
                </div>
              </Timer>

              <Timer v-elseif v-slot="timeObj" :time=60 v-else>

                <div class="count-down">
                  <div class="icon"></div>
                  <img class='timer' src="~@/assets/timer.png">
                  <span>{{ timeObj.mm }} m {{ timeObj.ss }} s</span>
                </div>
              </Timer>


            </v-form>
          </template>

          <template v-else>

            <p class="font-weight-medium body-1 my-6">
              {{ resultIndex }}: {{ resultText }}
            </p>

            <p class="body-2 mt-8">
              {{ outcome }}
            </p>
          </template>


        </v-card-text>

      </v-card>
    </div>

    <div class="text-center-right" v-if="reveal && !loadingOutcome">
      <router-link to="/ChapterBackground" v-if="!isEnd">
        <v-btn rounded class="ma-2" color="primary" dark>
          Next Chapter
          <v-icon dark>mdi-arrow-right</v-icon>
        </v-btn>

      </router-link>
      <router-link to="/Outcome" v-if="isEnd">
        <v-btn rounded class="ma-2" color="primary" dark>
          End of Game
          <v-icon dark>mdi-arrow-right</v-icon>
        </v-btn>
      </router-link>
    </div>

    <div class="my-6">
      <v-dialog v-model="showModal" width="600px">
        <v-card class="popup">
          <v-card-title class="justify-center">
            <span class="headline">Alert</span>
          </v-card-title>
          <v-card-text>
            <p class="popup-content">{{ alertMessage }}</p>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="showModal = false">Ok</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

  </v-col>


</template>

<script>
import axios from "axios";
import Menu from "../components/Menu";
import Timer from "@/components/Timer";

function getQuestion() {
  let vm = this;
  return axios
      .get(process.env.VUE_APP_BACKEND_URL + "play/" + vm.$store.state.gameID + "/round", {params: {roleID: vm.$store.state.roleID}})
      .then((response) => {
        if (response.status === 200) {

          vm.Question = response.data.question;
          vm.questionID = response.data.questionID;

          let responseObj = response.data.options;
          vm.options = {};

          let i = 1;
          for (let [, option] of Object.entries(responseObj)) {
            vm.options[option.optionID] = {i: i, id: option.optionID, text: option.description};
            i++;
          }
        }
      })
      .catch((error) => {
        console.log("error: " + error);
      });
}

function enterChoice() {

  let vm = this;
  vm.isActive = true;
  return axios
      .post(process.env.VUE_APP_BACKEND_URL + "play/make-decision/" + vm.$store.state.gameID, {
        optionID: vm.myChoice,
        roleID: vm.$store.state.roleID
      })
      .then((response) => {
            if (response.status === 200) {
              vm.waiting = true;
            }
          }
      )
      .catch((error) => {
        console.log("error: " + error);
      });
}

function roundStatus() {
  if (!this.reveal) {
    let vm = this;
    return axios
        .get(process.env.VUE_APP_BACKEND_URL + "play/" + vm.$store.state.gameID + "/round-status", {params: {roleID: vm.$store.state.roleID}})
        .then((response) => {
          if (response.status === 200) {
            if (!vm.outcomeRetrieved && vm.questionID !== '' && response.data.status === 'post') {
              vm.reveal = true;

              // when no round status, or if question ID is -1, this signals we are at end of game
              vm.isEnd = (!response.data.questionID || response.data.questionID == -1);

              getOutcome(vm);

            }
          }
        })
        .catch((error) => {
          console.log("error: " + error);
        });
  }
}

function getOutcome(vm) {
  vm.loadingOutcome = true;
  return axios
      .get(process.env.VUE_APP_BACKEND_URL + "play/" + vm.$store.state.gameID + "/round-outcome", {params: {roleID: vm.$store.state.roleID}})
      .then((response) => {
        if (response.status === 200) {
          let resultId = response.data.result.optionID;
          vm.resultIndex = vm.options[resultId].i;
          vm.resultText = response.data.result.description;
          vm.outcome = response.data.result.outcomeText;
          vm.loadingOutcome = false;
          vm.outcomeRetrieved = true;
        }
      })
      .catch((error) => {
        vm.loadingOutcome = false;
        console.log("error: " + error);
      });
}

export default {
  components: {
    Menu,
    Timer,
  },
  name: "Discussion",
  data() {
    return {
      //timerCount: 1000,
      showModal: false,
      alertMessage: "",
      checked: 0,
      isActive: false,

      //question info
      Question: "",
      questionID: "",
      reveal: false,

      outcome: "",
      resultIndex: 0,
      resultText: "",

      options: [],

      isEnd: false,

      myChoice: -1,
      waiting: false,

      loadingOutcome: false,
      outcomeRetrieved: false
    }
  },
  created() {
    this.getQuestion();
    this.roundStatus();
    this.timer = setInterval(this.roundStatus, 2000);
  },
  /**watch: {
            timerCount: {
                handler(value) {

                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }
                    else {

                        this.$router.push({path:'/RoundOutcome'});
                    }
                },
                immediate: true // This ensures the watcher is triggered upon creation
            }

        },**/

  //submit button will detect if user choose decision
  methods: {
    enterChoice,
    roundStatus,

    //getOptions,
    // getInfo,
    getQuestion,
    getOutcome

  },

}
</script>

<style>
.back-button {
  float: left;
  padding-left: 25px;
  text-decoration: none;
  margin-top: 5px;
}

.popup {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.popup-content {
  border-bottom: 1px solid #eeeeee;
  font-size: 15px;
  position: relative;
  padding: 20px 10px;
}

.v-label {
  font-size: 90%;
}

.transform-me:hover {
  transform: scale(1.2);
  position: relative;
  z-index: 99;
}

.timer {
  /*-webkit-border-radius: 100px;*/
  /*-moz-border-radius: 100px;*/
  /*border-radius: 100px;*/
  height: 25px;
  position: relative;
  width: 25px;
  background-size: 50%;
}

</style>