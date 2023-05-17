<template>
    <v-col align="center" class="text-center">

      <!-- drawer of the game menu content -->
        <Menu />

        <!-- Title -->
        <div class="my-10">
            <h1 class='display-1'>The End</h1>
        </div>

        <!-- GameOutcome Text -->
        <div class="my-6">
            <v-card class="mx-auto" max-width="600" outlined>
                <v-card-text>
                    {{ gameOutcome }}
                </v-card-text>
            </v-card>
        </div>

        <!-- Title -->
        <div class="my-10">
            <h1 class='display-1'>Your Outcome</h1>
        </div>

        <!-- RoleOutcome Text -->
        <div class="my-6">
            <v-card class="mx-auto" max-width="600" outlined>
                <v-card-text>
                    {{ roleOutcome }}
                </v-card-text>
            </v-card>
        </div>

        <!-- next button going to the see all decisions page-->
        <div class="text-center-right">
            <router-link to="/Reflection">
                <v-btn rounded class="ma-2" color="primary" dark>
                    Reflection  <v-icon dark>mdi-arrow-right</v-icon>
                </v-btn>
            </router-link>
        </div>

    </v-col>
</template>

<script>
import axios from "axios";
import Menu from '../components/Menu.vue'

function getGameOutcome() {
    let vm = this;
    return axios
        .get(process.env.VUE_APP_BACKEND_URL + "play/" + vm.$store.state.gameID + "/game-outcome")
        .then((response) => {
            if (response.status === 200) {
                vm.gameOutcome = response.data.outcome;
                vm.roleOutcome = response.data.roleOutcome[vm.$store.state.roleID];
            }
        })
        .catch((error) => {
            console.log("error: " + error);
        });
}

export default {
    components: {
        Menu
    },
    data() {
        return {
            gameOutcome: "",
            roleOutcome: "",
        };
    },
    created() {
        this.getGameOutcome();
    },
    methods: {
        getGameOutcome
    },
    props: {
      source: String,
    },

};
</script>
