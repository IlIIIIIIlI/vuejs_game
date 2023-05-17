<template>
  <v-col align="center" class="text-center">

    <!-- drawer of the game menu content -->
    <Menu/>

    <router-link to="/ChapterBackground" class="back-button">
      <v-icon>mdi-arrow-left</v-icon>
    </router-link>

    <!-- Title -->
    <div class="my-10 mx-auto" style="width:300px;">
      <h1 v-if="roleStory" class='display-1'>Your Information</h1>
    </div>

    <div v-if="!roleStory" class="loading">
      <v-progress-circular indeterminate color="primary"/>
    </div>

    <!-- RoleStory Text -->
    <div v-if="roleStory" class="my-6">
      <v-card class="mx-auto" max-width="600" outlined>
        <v-card-text class="body-1">
          {{ roleStory }}
        </v-card-text>
      </v-card>
    </div>

    <!-- next button going to the see all decisions page-->
    <div v-if="roleStory" class="text-center-right">
      <router-link to="/Discussion">
        <v-btn rounded class="ma-2" color="primary" dark>
          <v-icon dark>mdi-arrow-right</v-icon>
        </v-btn>
      </router-link>
    </div>

  </v-col>
</template>

<script>
import axios from "axios";
import Menu from '../components/Menu.vue';

function getRoleStory() {
  let vm = this;
  return axios
      .get(process.env.VUE_APP_BACKEND_URL + "play/" + vm.$store.state.gameID + "/round", {params: {roleID: vm.$store.state.roleID}})
      .then((response) => {
        if (response.status === 200) {
          if (!response.data.roleinfo || response.data.roleinfo === '' || response.data.roleinfo === "No new information for this round.") {
            vm.$router.push('/Discussion?skip=true');
          } else {
            vm.roleStory = response.data.roleinfo;
          }
        }
      })
      .catch((error) => {
        console.log("error: " + error);
      });
}

export default {
  components: {
    Menu,
  },
  data() {
    return {
      roleStory: ""
    };
  },
  created() {
    this.getRoleStory();
  },
  methods: {
    getRoleStory,
  },
  props: {
    source: String,
  },

};
</script>

<style lang="less">
.loading {
  height: 200px;
  padding: 30px 0;
}

.back-button {
  float: left;
  padding-left: 25px;
  text-decoration: none;
  margin-top: 5px;
}

</style>
