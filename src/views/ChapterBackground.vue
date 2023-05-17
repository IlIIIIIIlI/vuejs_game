<template>
  <v-col align="center" class="text-center">

    <!-- drawer of the game menu content -->
    <Menu/>

    <!-- Title -->
    <div class="my-10">

      <h1 v-if="chapterBackground" class='display-1'>Chapter Introduction</h1>

    </div>

    <!-- ChapterStory Text -->
    <div v-if="!chapterBackground" class="loading">
      <v-progress-circular indeterminate color="primary"/>
    </div>
    <div v-if="chapterBackground" class="my-6">
      <v-card class="mx-auto" max-width="600" outlined>
        <v-card-text class="body-1">
          {{ chapterBackground }}
        </v-card-text>
      </v-card>
    </div>

    <!-- next button going to the role background page-->
    <div v-if="chapterBackground" class="text-center-right">
      <router-link to="/IndividualBackground">
        <v-btn rounded class="ma-2" color="primary" dark>
          <v-icon dark>mdi-arrow-right</v-icon>
        </v-btn>
      </router-link>
    </div>

  </v-col>
</template>

<script>
import axios from "axios";
import Menu from '../components/Menu.vue'

function getChapterBackground() {
  let vm = this;
  return axios
      .get(process.env.VUE_APP_BACKEND_URL + "play/" + vm.$store.state.gameID + "/round", {params: {roleID: vm.$store.state.roleID}})
      .then((response) => {
        if (response.status === 200) {
          if (!response.data.background || response.data.background === '' || response.data.background === "No new information for this round.") {
            vm.$router.push('/IndividualBackground');
          } else {
            vm.chapterBackground = response.data.background;
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
      chapterBackground: ""
    };
  },
  created() {
    this.getChapterBackground();
  },
  methods: {
    getChapterBackground,
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
</style>