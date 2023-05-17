<template>
  <v-col align="center" class="text-center">

    <Menu/>

    <!-- Title -->
    <div class="my-10">
      <h1 class='display-1'>About You</h1>
    </div>


    <!-- Background Text -->
    <div v-if="!background" class="loading">
      <v-progress-circular indeterminate color="primary"/>
    </div>
    <div v-else class="my-6">
      <v-card class="mx-auto" max-width="600" outlined>
        <v-card-text class="body-1">
          {{ background }}
        </v-card-text>
      </v-card>
    </div>

    <!-- Next button going to the SeeAllDecision page -->
    <div v-if="background" class="my-10">
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
import Menu from "../components/Menu";

function getRoleBackground() {
  let vm = this;
  return axios
      .get(process.env.VUE_APP_BACKEND_URL + "roles/introduction", {params: {roleID: vm.$store.state.roleID}})
      .then((response) => {
        if (response.status === 200) {
          vm.background = response.data.goal;
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
      background: "",
    };
  },
  created() {
    this.getRoleBackground();
  },
  methods: {
    getRoleBackground,
  },
};
</script>

<style lang="less">
.loading {
  height: 200px;
  padding: 30px 0;
}
</style>
