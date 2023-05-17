<template>
    <v-col align="center" class="text-center">

        <!-- Title -->
        <div class="my-10">
            <h1 class='display-1'>Reflection</h1>
        </div>

        <!-- All Decisions Table -->
        <div v-if="questions.length == 0" class="loading">
            <v-progress-circular indeterminate color="primary" />
        </div>

        <div v-else class="my-6">
            <v-card class="mx-auto" max-width="600" outlined>
                <div class="mt-10 mb-15 ml-10 mr-8 text-left" v-for="(question,i) in questions" :key="question.id">
                    <h4 class="font-weight-medium">{{i + 1}}: {{question.text}}</h4>
                    <div class="my-3 mx-5">
                        <div class="" v-for="(option,j) in question.options" :key="option.id">
                            <div class="body-2 my-1 text-left" :class="(option.id == question.result) ? 'selectedOption' : ''">
                                {{j + 1}}: {{option.text}}
                            </div>
                            <div class="my-3 ml-16">
                                <div class="body-2 font-weight-light" width="100%" v-for="user in option.users" :key="user.name">
                                    <div :class="(user.name === $store.state.playerName) ? 'user' : ''" style="width:150px;float:left;">{{user.name}}</div>
                                    <div class="role">{{user.role}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-card>
        </div>

        <v-col cols="12" class="my-6">
            <v-btn x-large color="primary" @click="showModal = true">Exit Game</v-btn>
        </v-col>

        <div class="my-6">
            <v-dialog v-model="showModal" width="600px">
                <v-card class="popup">
                    <v-card-title class="justify-center">
                        <span class="headline">Confirm</span>
                    </v-card-title>
                    <v-card-text>
                        <p class="popup-content">
                            {{confirmMessage}}
                        </p>
                        <v-spacer></v-spacer>
                        <router-link to="/" style="text-decoration:none">
                            <v-btn rounded class="ma-2">Yes</v-btn>
                        </router-link>
                        <v-btn rounded class="ma-2" @click="showModal = false">No</v-btn>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>


    </v-col>
</template>

<script>
    import axios from "axios";
    function getAllDecisions() {
        let vm = this;
        return axios
            .get(process.env.VUE_APP_BACKEND_URL + "play/make-decision/" + vm.$store.state.gameID)
            .then((response) => {
                if (response.status === 200) {
                    vm.questions = response.data.reflection;
                }
            })
            .catch((error) => {
                console.log("error: " + error);
            });
    }

    export default {
        name: "Reflection",
        data () {
            return {
                questions: [],
                result:0,
                showModal: false,
                confirmMessage:"Are you sure you want to exit the game?",
            }
        },
        created() {
            this.getAllDecisions();
        },
        methods: {
            getAllDecisions,
        },
    }
</script>

<style scoped>
    .selectedOption {
        color: green;
        font-weight: bold;
    }

    .role {
        color: #696969;
        font-size: 85%;
    }

    .user {
        font-weight: bolder;
    }
</style>