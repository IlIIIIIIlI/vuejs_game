<template>
    <nav>

        <!-- drawer of the game menu content -->
        <v-navigation-drawer
                v-model="drawer"
                app
        >
            <v-card>
                <v-card-title>Game ID</v-card-title>
            </v-card>
                <v-list>
                    <v-list-item>
                        <v-list-item-title>{{ this.$store.state.gameID }}</v-list-item-title>
                    </v-list-item>
                </v-list>

            <v-card>
                <v-card-title>Players</v-card-title>
            </v-card>
                    <v-list>
                        <v-list-item two-line v-for="player in players" v-bind:key="player._id">
                            <v-list-item-content>
                                <v-list-item-title>{{ player.player }}</v-list-item-title>
                                <v-list-item-subtitle>{{ player.role }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>

            <v-btn small color="warning" @click="showModal = true" class="my-3" style="text-decoration:none">Exit Game</v-btn>

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


        </v-navigation-drawer>


            <v-app-bar-nav-icon style="float:left;" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>



    </nav>
</template>

<script>
    import axios from "axios";

    function updateInfo() {
        // only update if menu is visible
        if (this.drawer) {
            let vm = this;
            return axios
                .get(process.env.VUE_APP_BACKEND_URL + "play/" + vm.$store.state.gameID + "/status")
                .then((response) => {
                    if (response.status === 200) {
                        vm.players = response.data.players;
                    }
                })
                .catch((error) => {
                    console.log("error: " + error);
                });
        }
    }

    export default {
        name: "Menu",
        data() {
            return {
                drawer: false,
                gameID: "",
                players: [],
                timer: "",
                ready: false,
                showModal: false,
                confirmMessage:"Are you sure you want to exit the game?",
            };
        },
        created() {
            this.updateInfo();
            this.timer = setInterval(this.updateInfo, 1000);
        },
        methods: {
            updateInfo,
        }
    };
</script>