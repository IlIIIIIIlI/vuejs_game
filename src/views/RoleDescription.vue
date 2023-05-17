<template>
    <v-col align="center" class="text-center">

        <!-- Title -->
        <div class="my-10">
            <h1 class='display-1'>Role Description</h1>
        </div>

        <!-- RoleDescription Text -->
        <div class="my-6">
            <v-card class="mx-auto" max-width="600" outlined>
                <v-card-text>
                    {{ RoleDescription }}
                </v-card-text>
            </v-card>
        </div>

        <!-- next button going to the chapter background page-->
        <div class="text-center-right">
            <router-link to="/ChapterBackground">
                <v-btn rounded class="ma-2" color="primary" dark>
                  <v-icon dark>mdi-arrow-right</v-icon>
                </v-btn>
            </router-link>
        </div>

    </v-col>
</template>

<script>
import axios from "axios";

// todo: revise the role description -> roles, play.js don't have role description
function getRoleDescription() {
    let vm = this;
    return axios
        .get(process.env.VUE_APP_BACKEND_URL + "play/" + vm.$store.state.gameID + "/roleDescription")
        .then((response) => {
            if (response.status === 200) {
                vm.RoleDescription = response.data;
            }
        })
        .catch((error) => {
            console.log("error: " + error);
        });
}

export default {
    data() {
        return {
            RoleDescription: "",
        };
    },
    created() {
        this.getRoleDescription();
    },
    methods: {
        getRoleDescription,
    },
};
</script>

<style lang="less">
.inputbox {
    height: 60px;
    width: 265px;
    text-align: left;
    padding: 0.5em;
    font-size: 2em;
}

.timerbox {
    margin-top: 2%;
}
</style>
