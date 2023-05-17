<template>
  <v-row align="center">
    <v-col class="text-center">
      <!-- Title -->
      <div class="my-10">
        <h1 class='display-1'>
          <div id="app">
            <p class="loading">
              <span>A</span>
              <span>&nbsp;</span>
              <span>G</span>
              <span>a</span>
              <span>m</span>
              <span>e</span>
              <span>&nbsp;</span>
              <span>o</span>
              <span>f </span>
              <span>&nbsp;</span>
              <span>E</span>
              <span>t</span>
              <span>h</span>
              <span>i</span>
              <span>c</span>
              <span>s</span>
            </p>
          </div>
        </h1>
      </div>
      <!-- List of Buttons -->
      <!--      Rejoin the game button-->
      <div class="my-6">
        <v-dialog v-model="rejoinDialog" width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="transform-me" v-bind="attrs" v-on="on" x-large min-width="180" color="success">Re-Join Game
            </v-btn>
          </template>
          <!-- Rejoin Dialog content goes here -->
          <v-card>
            <v-card-title>
              <span class="headline">Re-Join Game</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="gameID" label="Game ID" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="playerName" label="Player Name" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="roleID" label="Role ID" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="rejoinDialog = false">Cancel</v-btn>
              <v-btn color="green darken-1" text @click="rejoinGame">Re-Join</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>


      <sequential-entrance fromTop>
        <div class="my-6">
          <router-link to="/NewGame">
            <v-btn class="newgame1" x-large min-width="180" color="primary">New Game</v-btn>
          </router-link>
        </div>
        <div class="my-6">
          <router-link to="/JoinGame">
            <v-btn class="newgame2" x-large min-width="180" color="primary">Join Game</v-btn>
          </router-link>
        </div>
        <!-- Help Dialog -->
        <div class="my-6">
          <v-dialog v-model="helpDialog" width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="transform-me" v-bind="attrs" v-on="on" x-large min-width="180">Help</v-btn>
            </template>
            <v-card>
              <v-card-title class="justify-center">
                <span class="headline">Instructions</span>
              </v-card-title>
              <v-card-text>
                <p>
                  This is a round-based game. Each game will have 5 players who can choose different roles. At the
                  beginning you can read the background of the game as well as some description about the responsibility
                  and individual stories of every role. After every player
                  select a role, the game will start.
                </p>
                <p>
                  In each chapter (round), there is a particular events and context. You should make a decision based on
                  your understanding and responsibility. Every player will see the same question and enter their
                  preferred option. A final outcome will be decided for
                  the group, based on the combination of selections made by each role. The story of the game will be
                  different according to the different decisions.
                </p>
                <p>
                  At the end of the game, you will see the conclusion and you can discuss together about what each
                  player thought during the game
                </p>
                <p>Go and find your own outcome with your friends!</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="newgame3" color="green darken-1" text @click="helpDialog = false">Got It</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </sequential-entrance>
    </v-col>
    <v-snackbar v-model="playerNotFoundSnackbar" color="error" timeout="3000" right top>
      Player not found in the specified game.
      <v-btn color="white" text @click="playerNotFoundSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      helpDialog: false,
      rejoinDialog: false,
      gameID: "",
      // player: "",
      playerName: "",
      roleID: "",
      playerNotFoundSnackbar: false,
    }
  },
  methods: {
    rejoinGame() {
      // You can add some validation logic here to ensure the user has entered a valid gameID, playerName, and roleID.

      let vm = this;
      axios
          .get(process.env.VUE_APP_BACKEND_URL + "play/" + vm.gameID + "/status")
          .then((response) => {
            const gameData = response.data;

            const playerExists = gameData.players.some(player => player.player === vm.playerName);

            if (!playerExists) {
              vm.playerNotFoundSnackbar = true;
              return;
            }

            vm.$store.commit("setGame", {
              playerName: vm.playerName,
              gameID: vm.gameID,
            });

            // Assuming the roleID and checkpoint from the user input are correct, you can update them directly here.
            // Note that the code here assumes the roleID is a number; if not, make the necessary adjustments.
            const roleID = parseInt(vm.roleID, 10);
            const checkpoint = "Discussion"; // Assuming the checkpoint is "discussion"

            vm.$store.commit("setRole", {roleID});
            vm.$store.commit("setCheckpoint", {checkpoint});

            vm.rejoinDialog = false;
            vm.$router.push({path: vm.$store.state.checkpoint});
          })
          .catch((error) => {
            console.error(error);
            // Handle error, show an error message or do something else
          });
    },
  },
};

</script>

<style lang="scss">
a {
  text-decoration: none;
}

.newgame1:hover {
  transform: scale(1.2);
}

.newgame2:hover {
  transform: scale(1.2);
}

.transform-me:hover {
  transform: scale(1.2);
}

@import url('https://fonts.googleapis.com/css?family=Press+Start+2P');
$t: 7s;
$n: 16;

.loading {
  font-family: 'Press Start 2P', sans-serif;
  color: #000;
  text-transform: uppercase;
  padding: 1.2em;
  position: relative;

  &::after {
    content: '';
    display: block;
    height: 5px;
    bottom: 0;
    left: 0;
    right: 0%;
    background-color: #000;
    position: absolute;
    animation: line $t ease-in-out infinite;
  }

  span {
    display: inline-block;
    animation-name: char;
    animation-duration: $t;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
    animation-fill-mode: backwards;
    @for $i from 1 through $n {
      &:nth-child(#{$i}) {
        animation-delay: #{ ($i * $t * 0.25 / $n) };
      }
    }
  }
}

@keyframes line {
  0% {
    right: 70%;
    left: 30%;
    opacity: .1;
  }
  50% {
    right: 30%;
    left: 30%;
    opacity: 1;
  }
  100% {
    left: 70%;
    right: 30%;
    opacity: .1;
  }
}

@keyframes char {
  0% {
    transform: translateY(1.8em);
    opacity: 0;
  }
  25%, 50% {
    transform: none;
    opacity: 1;
  }
  75%, 100% {
    transform: translateY(-1.8em);
    opacity: 0;
  }
}
</style>
