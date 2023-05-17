<template>
    <v-col align="center" class="text-center">
      <!-- Return button going to the home page -->
      <div class="text-left">
          <router-link to="/">
              <v-btn rounded class="ma-2" color="primary" dark>
                <v-icon dark>mdi-arrow-left</v-icon>
              </v-btn>
          </router-link>
      </div>
      
        <!-- Title -->
        <div class="my-10">
            <h1 class='display-1'>Join Game</h1>
        </div>

        <!-- Form -->
        <div class="my-6">
            <v-card class="mx-auto" max-width="400" outlined>
                <v-card-text>
                    <v-form @submit.prevent="submitForm" ref="form" v-model="isFormValid">
                        <v-text-field v-model="gameID" :rules="gameIdRules" :counter="4" label="Game ID" required></v-text-field>
                        <v-text-field v-model="playerName" :rules="playerNameRules" :counter="12" label="Your name" required></v-text-field>
                        <v-btn type="submit" class="mr-4" :disabled="!isFormValid" v-if="!loading">submit</v-btn>
                        <v-progress-circular indeterminate color="primary" v-if="loading" />
                    </v-form>
                </v-card-text>
            </v-card>
        </div>

        <!--Error popup box -->
        <div class="my-6">
            <v-dialog v-model="errored" width="600px">
                <v-card class="popup">
                    <v-card-title class="justify-center">
                        <span class="headline">Error</span>
                    </v-card-title>
                    <v-card-text>
                        <p class="popup-content">{{ErrorMessage}}</p>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="errored = false">Ok</v-btn>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </v-col>
</template>

<script>
import axios from "axios";

function submitForm() {
    this.loading = true;
    let vm = this;
    return axios
        .post(
            process.env.VUE_APP_BACKEND_URL + "play/join/" + vm.gameID, { name: vm.playerName }, {
                headers: {
                    "Content-type": "application/json",
                },
            }
        )
        .then((response) => {
            if (response.status === 200) {
                vm.$store.commit("setGame", {
                    playerName: response.data.playerName,
                    gameID: response.data.gameID
                });
                vm.$router.push("/Waiting");
            }
        })
        .catch((error) => {
            console.log("error: " + error);
            this.loading = false;

            if(error.response.status === 500){ //when input the invalid game ID, the error status is 500
                this.errored = true;
                this.ErrorMessage = "This is an invalid Game ID, please input an valid game ID";
            } else if(error.response.status === 400) {//The duplicate name and zoom full alert are both 400
                this.errored = true;
                this.ErrorMessage = error.response.data;
            }
        });
}

export default {
    data() {
        return {
            gameID: "",
            playerName: "",
            isFormValid: false,
            playerNameRules: [
                v => !!v || 'Please enter your name',
                v => (v && v.length <= 12) || 'Name cannot be longer than 12 characters',
            ],
            gameIdRules: [
                v => !!v || 'Game ID is required',
                v => (v && v.length <= 4) || 'Game ID cannot be longer than 4 characters',
            ],

            ErrorMessage:"",
            errored:false,
            loading: false
        };
    },
    methods: {
        submitForm
    },
};
</script>

<style>
    .popup-content {
        font-size: 20px;
        position: relative;
        padding: 20px 10px;
        color: #444;
    }
</style>
