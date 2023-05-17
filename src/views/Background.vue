<template>
    <v-col align="center" class="text-center">

        <!-- Title -->
        <div class="my-10">
            <h1 class='display-1'>Background</h1>
        </div>

        <!-- Background Text -->
        <div v-if="!background" class="loading">
            <v-progress-circular indeterminate color="primary" />
        </div>
        <div v-else class="my-6">
            <v-card class="mx-auto" max-width="600" outlined>
                <v-card-text class="body-1">
                    <p>{{ background }}</p>
                </v-card-text>
            </v-card>
        </div>
    
        <!-- Next button going to the role selection page -->
        <div v-if="background" class="text-center-right">
            <router-link to="/ChooseYourRole">
                <v-btn rounded class="ma-2" color="primary" dark>
                    <v-icon dark>mdi-arrow-right</v-icon>
                </v-btn>
            </router-link>
        </div>

    </v-col>
</template>

<script>
import axios from "axios";

function getBackground() {
    let vm = this;
    return axios
        .get(process.env.VUE_APP_BACKEND_URL + "play/background/" + vm.$store.state.gameID)
        .then((response) => {
            if (response.status === 200) {
                vm.background = response.data;
            }
        })
        .catch((error) => {
            console.log("error: " + error);
        });
}

export default {
    data() {
        return {
            background: "",
        };
    },
    created() {
        this.getBackground();
    },
    methods: {
        getBackground,
    },
};
</script>

<style lang="less">
    .loading {
        height: 200px;
        padding: 30px 0;
    }
</style>
