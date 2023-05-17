<template>
  <div class="text-center">

    <!-- Title -->
    <div class="my-10">
      <h1 class='display-1'>Choose your role</h1>
    </div>

    <!-- List of Buttons -->

    <div class="loading" v-if="roles.length == 0">
      <v-progress-circular indeterminate color="primary"/>
    </div>

    <v-container v-else>
      <v-row align="center" justify="center" class="text-center">
        <v-col v-for="(roleObj, index) in roles" v-bind:key="roleObj.roleID" cols="12" md="4">
          <div class="transform-me">
            <!--          v-card display the roles      -->
            <v-card min-height="200" :color="(!roleObj.isAvailable || waiting) ? '#546E7A' : '#fff'"
                    :dark="(!roleObj.isAvailable || waiting)">
              <!--              title text button, three layers each card-->
              <v-card-title class="justify-center headline" v-text="roleObj.role"></v-card-title>
              <v-card-text v-text="roleTexts[roleObj.role]"></v-card-text>

              <v-progress-circular indeterminate color="primary" v-if="loading"/>

              <v-btn v-else min-width="100" color="primary" :disabled="(!roleObj.isAvailable || waiting)"
                     @click="chooseRole(index)">

                <template v-if="roleObj.isAvailable && !waiting">
                  Select
                </template>
                <template v-else-if="roleObj.isAvailable">
                  ...
                </template>
                <template v-else>
                  {{ roleObj.player }}
                </template>
              </v-btn>

            </v-card>
          </div>
        </v-col>
        <!-- TO BE DELETED AFTER BACKEND MERGED -->
        <!--Next Button: going to background page -->
        <!-- <v-col cols="12" class="my-6">
            <router-link to="/RoleBackground">
                <v-btn x-large color="red">Next</v-btn>
            </router-link>
        </v-col> -->

      </v-row>
    </v-container>

    <div class="my-3">
      <template v-if="waiting">
        <v-progress-circular indeterminate color="primary"/>
        <p class="my-2">Waiting for all players to select a role</p>
      </template>

      <router-link to="/RoleBackground" id="nextButton" v-if="showNext">
        <v-btn rounded class="ma-2" color="primary" dark>
          <v-icon dark>mdi-arrow-right</v-icon>
        </v-btn>
      </router-link>
    </div>

    <v-dialog v-model="errorDialog" max-width="400">
      <v-card>
        <v-card-title>Error</v-card-title>
        <v-card-text>
          This role has already been selected by another player. Please choose another role.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="errorDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import axios from "axios";

function getRoleTexts() {
  /*
          this.$store.commit("setGame", {
              playerName: 'a',
              gameID: '5f5d6a4328aa7a00176abf2e',
          });*/

  let vm = this;
  return axios
      .get(process.env.VUE_APP_BACKEND_URL + "play/" + vm.$store.state.gameID + "/roles")
      .then((response) => {
        if (response.status === 200) {
          response.data.roles.forEach(function (role) {
            vm.roleTexts[role.title] = role.description
          });
          //vm.roleTexts = response.data.roles;
        }
      })
      .catch((error) => {
        console.log("error: " + error);
      });

}

function checkReady(vm) {

  // check if all roles are allocated
  let allAllocated = true;

  vm.roles.forEach(function (role) {
    if (role.isAvailable) {
      allAllocated = false;
    }
  });

  if (allAllocated) {
    // we can now move on
    vm.waiting = false;
    vm.showNext = true;

    // all roles are allocated, stop looping now
    vm.checkStatus = false;
  }

}

function updateRoles() {

  if (this.checkStatus) {
    // get roles and assignment to players
    let vm = this;
    return axios
        .get(process.env.VUE_APP_BACKEND_URL + "play/choose-role/" + vm.$store.state.gameID)
        .then((response) => {
          if (response.status === 200) {
            vm.roles = response.data;
            checkReady(vm);
          }
        })
        .catch((error) => {
          console.log("error: " + error);
        });
  }
}


function chooseRole(roleButtonId) {
  this.loading = true;

  // request role
  let vm = this;
  return axios
      .post(
          process.env.VUE_APP_BACKEND_URL + "play/choose-role/" + vm.$store.state.gameID,
          {
            name: vm.$store.state.playerName,
            roleID: roleButtonId,
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
      )
      .then((response) => {
        if (response.status === 200) {
          //add roleID to vueX store
          vm.$store.commit("setRole", {
            roleID: roleButtonId,
          });

          vm.waiting = true;
          vm.loading = false;
          updateRoles();
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          // 403 error occurred
          vm.loading = false;
          updateRoles();

          // Show the error dialog
          vm.errorDialog = true;
        } else {
          console.log("error: " + error);
        }
      });
}


export default {
  data() {
    return {
      checkStatus: true,
      showNext: false,
      waiting: false,
      roles: [],
      roleTexts: {},
      timer: "",
      loading: false,
      errorDialog: false,
    };
  },

  created() {
    this.getRoleTexts();
    this.updateRoles();
    this.timer = setInterval(this.updateRoles, 5000);
  },
  methods: {
    getRoleTexts,
    updateRoles,
    chooseRole
  }
};
</script>


<style lang="less">
.loading {
  margin: 40px 0;
}

.transform-me:hover {
  transform: scale(1.2);
  position: relative;
  z-index: 99;
}

</style>

