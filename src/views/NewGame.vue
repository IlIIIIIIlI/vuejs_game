<template>
    <v-col class="text-center">
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
            <h1 class='display-1'>Start a new game</h1>
        </div>


        <!-- Form -->
        <div class="my-6">
            <v-card class="mx-auto" max-width="400" outlined>
                <v-card-text>
                    <v-form @submit.prevent="submitForm" ref="form" v-model="isFormValid">
                        <v-text-field v-model="playerName" :rules="playerNameRules" :counter="12" label="Your name" required></v-text-field>
                        <!--<v-checkbox v-model="timedGame" :rules="false" label="Timed Game?" required></v-checkbox>
                        <v-slider v-model="duration" :rules="false" label="Round Duration" :disabled="!timedGame" min="1" max="20" thumb-label="always" :thumb-size="24"></v-slider>-->
                        <v-btn type="submit" class="mr-4" :disabled="!isFormValid" v-if="!loading">submit</v-btn>
                        <v-progress-circular indeterminate color="primary" v-if="loading" />

                    </v-form>
                </v-card-text>
            </v-card>
        </div>


    </v-col>
</template>

<script>
import axios from "axios";

function submitForm() {
    this.loading = true;
    let vm = this;
    //let durationInput = vm.duration;
    //if (!vm.timedGame) {
    let durationInput = 0;
    //}
    return axios
        .post(
            process.env.VUE_APP_BACKEND_URL + "play/new", { name: vm.playerName, duration: durationInput }, {
                headers: {
                    "Content-type": "application/json",
                },
            }
        )
        .then((response) => {
            if (response.status === 200) {
                vm.$store.commit("setGame", {
                    playerName: response.data.playerName,
                    gameID: response.data.gameID,
                });
                vm.$router.push("/Waiting");
            }
        })
        .catch((error) => {
            console.log("error: " + error);
            vm.loading = false;
        });
}

export default {
    name: "NewGame",
    data() {
        return {
            playerName: "",
            //timedGame: false,
            //duration: 0,
            isFormValid: false,
            playerNameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 12) || 'Name can be at most 12 characters',
            ],
            loading: false
        };
    },
    methods: {
        submitForm,
    },
};

</script>

<style lang="scss">
    @import '../components/submit_button.scss'
</style>