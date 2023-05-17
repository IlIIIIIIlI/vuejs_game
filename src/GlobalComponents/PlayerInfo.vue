<template>
  <div id="player-info-wrapper">
    <VueDragResize
        class="player-info"
        v-cloak
        :active="true"
        :parent="true"
        :adjustResize="true"
    >
      <div class="card">
        <div class="handle">
          <!-- 添加一个可以拖动的把手 -->
          <p>Game Status</p>
        </div>
        <p>Current Player: {{ playerName }}</p>
        <p>Current Role: {{ roleName }}</p>
        <p>Current Round Level: {{ currentLevel }}</p>
        <div class="round-info">
          <div v-for="rs in roundStatus" :key="rs.roleID">
            <p>Role ID {{ rs.roleID }}: {{ rs.status }}</p>
          </div>
        </div>
      </div>
    </VueDragResize>
  </div>
</template>

<script>
import axios from "axios";
import VueDragResize from "vue-drag-resize";

export default {
  name: "PlayerInfo",
  components: {
    VueDragResize,
  },
  data() {
    return {
      playerName: '',
      roleName: 'Not Selected',
      roundStatus: '',
      currentLevel: '',
      timer: null,
    };
  },
  mounted() {
    this.fetchRole();
    this.fetchRoundStatus();
    this.fetchRoundLevel();
    this.timer = setInterval(() => {
      this.fetchRoundStatus();
      this.fetchRoundLevel();
    }, 5000); // 每隔 1000 毫秒（1 秒）刷新一次
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    fetchRole() {
      let vm = this;
      axios
          .get(process.env.VUE_APP_BACKEND_URL + "play/" + vm.$store.state.gameID + "/roles")
          .then((response) => {
            if (response.status === 200) {
              console.log(vm.$store.state)
              console.log("Response:", response.data);
              const roleID = vm.$store.state.roleID;
              vm.playerName = vm.$store.state.playerName;
              console.log(vm.$store.state.playerName);
              if (roleID >= 0 && roleID < response.data.roles.length) {
                vm.roleName = response.data.roles[roleID].title + roleID;
              }
            }
          })
          .catch((error) => {
            console.log("error: " + error);
          });
    },
    fetchRoundStatus() {
      let vm = this;
      vm.roundStatus = [];
      for (let roleID = 0; roleID <= 4; roleID++) {
        axios
            .get(process.env.VUE_APP_BACKEND_URL + "play/" + vm.$store.state.gameID + "/round-status", {params: {roleID: roleID}})
            .then((response) => {
              if (response.status === 200) {
                vm.roundStatus.push({
                  roleID: roleID,
                  status: response.data.status
                });
              }
            })
            .catch((error) => {
              console.log("error: " + error);
              console.log("Error response:", error.response.data); // 添加这一行
            });
      }
    },

    fetchRoundLevel() {
      let vm = this;
      const roleID = vm.$store.state.roleID;
      axios
          .get(process.env.VUE_APP_BACKEND_URL + "play/" + vm.$store.state.gameID + "/round-level", {params: {roleID: roleID}})
          .then((response) => {
            if (response.status === 200) {
              console.log("Round level response:", response.data);
              vm.currentLevel = response.data.currentLevel;
            }
          })
          .catch((error) => {
            console.log("error: " + error);
            console.log("Error response:", error.response.data);
          });
    },
  },
  watch: {
    '$store.state.roleID': function (newRoleID, oldRoleID) {
      if (newRoleID !== oldRoleID) {
        this.fetchRole();
        this.fetchRoundStatus();
        this.fetchRoundLevel();
      }
    }
  }
};
</script>

<style scoped>
#player-info-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 10%;
  height: 5%;
  z-index: 999999;
}

.player-info {
  width: 100%;
  height: 100%;
  margin: 0;
}

.card {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.handle {
  cursor: move;
  user-select: none;
}

.round-info {
  margin-top: 10px;
}

.card p {
  color: rgba(255, 105, 180, 0.8); /* 修改这行，设置为粉色透明 */
}


::v-deep [v-cloak] {
  display: none;
}


</style>