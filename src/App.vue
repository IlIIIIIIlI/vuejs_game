<template>
    <v-app :style="{background: $vuetify.theme.themes.light.background}">
        <v-content>
          <PlayerInfo v-show="showPlayerInfo" /> <!-- 使用 v-show 控制显示隐藏 -->
            <div id="background-wrap">
                <div class="x1">
                    <div class="cloud"></div>
                </div>

                <div class="x2">
                    <div class="cloud2"></div>
                </div>

                <div class="x3">
                    <div class="cloud"></div>
                </div>


                <template>
                    <div class="text-center">
                        <v-dialog
                                v-model="credits"
                                width="800"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <div class="x4"
                                 v-bind="attrs"
                                 v-on="on">
                                    <div class="plane">

                                    </div>
                            </div>
                            </template>

                            <!-- Easter egg when you click on the plane -->
                            <v-card style="background-color:#000;" class="pa-7">
                                <v-btn
                                        icon
                                        color="white"
                                        @click="credits = showVideo = false"
                                        class="float-right"
                                >
                                    <v-icon>mdi-close-box</v-icon>
                                </v-btn>

                                <v-card-text style="color:#fff;">
                                    <h3>Software project COMP90082</h3>

                                    <!-- <div class="my-6">
                                        <v-img v-if="!showVideo"
                                               src="@/assets/team.png"
                                               max-width="593"
                                               max-height="250"
                                               class="mx-auto"
                                               style="cursor: pointer;"
                                               @click="showVideo = true" />

                                        <div v-if="showVideo">
                                            <iframe width="444" height="245"
                                                    src="https://www.youtube.com/embed/0NEeB4z40Lk"
                                                    frameborder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowfullscreen
                                                    class="mx-auto"></iframe>
                                        </div>
                                    </div> -->

                                    <div max-width="20">
                                        <strong>Development team: (Version 2.0)</strong><br />
                                        Eryi Zhou ·
                                        Jiazhe Hou ·
                                        Decheng Xu ·
                                        Yujie Bai ·
                                        Haiyu Hao<br />

                                        <br /><br />

                                        <strong>Development team: (Version 1.0)</strong><br />
                                        Yu Guo ·
                                        Heather Huang ·
                                        Angus Hudson ·
                                        Peiwen Jin ·
                                        Akhmetzhan Kussainov<br />
                                        Lu Lei ·
                                        Yuhen Li ·
                                        Eric Sciberras ·
                                        Rainer Selby ·
                                        Christina Xu


                                        <br /><br />
                                        <strong>Supervisor:</strong> Dr Mauro Mello Jr (Version 2.0)<br />
                                        <strong>Supervisor:</strong> Dr Eduardo Oliveira (Version 1.0)<br />
                                        <strong>Client:</strong> Dr Simon Coghlan

                                        <br /><br />

                                        The University of Melbourne<br />
                                        COMP90082<br />
                                        2020
                                    </div>
                                </v-card-text>
                                <!-- end easter egg -->

                            </v-card>
                        </v-dialog>
                    </div>
                </template>

                <div class="x5">
                    <div class="cloud"></div>
                </div>
            </div>
            <div id="content">
                <transition name="slide-fade" mode="out-in">
                  <router-view></router-view>
                </transition>
            </div>
        </v-content>
    </v-app>
</template>

<style>

html {
  overflow-y: auto !important
}

/* Transitions For the vue router */

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all .3s ease;
}

/* Transitions For the vue router */

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(3em);
    opacity: 0;
}

#content {
    position: relative;
}

/* Pure CSS Animated Clouds - By Mark Bowley */

/* http://codepen.io/Mark_Bowley/pen/xEbuI */

/* http://codepen.io/Mark_Bowley/pen/xEbuI/license */

/* body {
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow-y: hidden;
    z-index: -1;
} */

#background-wrap {
    bottom: 0;
    left: 0;
    padding-top: 50px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
}

/* KEYFRAMES */

@-webkit-keyframes animateCloud {
    0% {
        margin-left: -1000px;
    }
    100% {
        margin-left: 100%;
    }
}

@-moz-keyframes animateCloud {
    0% {
        margin-left: -1000px;
    }
    100% {
        margin-left: 100%;
    }
}

@keyframes animateCloud {
    0% {
        margin-left: -1000px;
    }
    100% {
        margin-left: 100%;
    }
}

/* ANIMATIONS */

.x1 {
    -webkit-animation: animateCloud 35s linear infinite;
    -moz-animation: animateCloud 35s linear infinite;
    animation: animateCloud 35s linear infinite;
    -webkit-transform: scale(0.65);
    -moz-transform: scale(0.65);
    transform: scale(0.65);
}

.x2 {
    -webkit-animation: animateCloud 20s linear infinite;
    -moz-animation: animateCloud 20s linear infinite;
    animation: animateCloud 20s linear infinite;
    -webkit-transform: scale(0.3);
    -moz-transform: scale(0.3);
    transform: scale(0.3);
}

.x3 {
    -webkit-animation: animateCloud 30s linear infinite;
    -moz-animation: animateCloud 30s linear infinite;
    animation: animateCloud 30s linear infinite;
    -webkit-transform: scale(0.5);
    -moz-transform: scale(0.5);
    transform: scale(0.5);
}

.x4 {
    -webkit-animation: animateCloud 18s linear infinite;
    -moz-animation: animateCloud 18s linear infinite;
    animation: animateCloud 18s linear infinite;
    -webkit-transform: scale(0.4);
    -moz-transform: scale(0.4);
    transform: scale(0.4);
    height:500px;
    width:300px;

}

.x5 {
    -webkit-animation: animateCloud 25s linear infinite;
    -moz-animation: animateCloud 25s linear infinite;
    animation: animateCloud 25s linear infinite;
    -webkit-transform: scale(0.55);
    -moz-transform: scale(0.55);
    transform: scale(0.55);
}

/* OBJECTS */

/*.cloud {*/
/*    background: #fff;*/
/*    background: -moz-linear-gradient(top, #fff 5%, #f1f1f1 100%);*/
/*    background: -webkit-gradient(linear, left top, left bottom, color-stop(5%, #fff), color-stop(100%, #f1f1f1));*/
/*    background: -webkit-linear-gradient(top, #fff 5%, #f1f1f1 100%);*/
/*    background: -o-linear-gradient(top, #fff 5%, #f1f1f1 100%);*/
/*    background: -ms-linear-gradient(top, #fff 5%, #f1f1f1 100%);*/
/*    background: linear-gradient(to bottom, #fff 5%, #f1f1f1 100%);*/
/*    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fff', endColorstr='#f1f1f1', GradientType=0);*/
/*    -webkit-border-radius: 100px;*/
/*    -moz-border-radius: 100px;*/
/*    border-radius: 100px;*/
/*    -webkit-box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);*/
/*    -moz-box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);*/
/*    box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1);*/
/*    height: 120px;*/
/*    position: relative;*/
/*    width: 350px;*/
/*}*/

.cloud {
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
  height: 130px;
  position: relative;
  width: 500px;
  background-image: url(~@/assets/cloud.png);
  background-size: 60%;
}

.cloud2 {
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
  height: 130px;
  position: relative;
  width: 500px;
  background-image: url(~@/assets/cloud2.png);
  background-size: 65%;
}

.plane {
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
    height: 500px;
    position: relative;
    width: 1000px;
    background-image: url(~@/assets/plane.png);
    background-size: 50%;
}

/*.cloud:after,*/
/*.cloud:before {*/
/*    background: #fff;*/
/*    content: '';*/
/*    position: absolute;*/
/*    z-index: 0;*/
/*}*/

.cloud:after,
.plane:after {
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
    height: 100px;
    left: 50px;
    top: -50px;
    width: 100px;
}

.cloud:before,
.plane:before {
    -webkit-border-radius: 200px;
    -moz-border-radius: 200px;
    border-radius: 200px;
    width: 180px;
    height: 180px;
    right: 50px;
    top: -90px;
}
</style>
<script>
    export default {
        data () {
            return {
                credits: false,
                showVideo: false
            }
        },
      computed: {
        showPlayerInfo() {
          return this.$store.state.showPlayerInfo;
        }
      }
    }
</script>