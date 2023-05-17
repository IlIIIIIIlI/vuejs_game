<template>
    <v-col align="center" class="text-center">

        <!-- Title -->
        <div class="my-10">
            <h1 class='display-1'>Ready for Discussion</h1>
        </div>

        <!-- Discussion Content -->
        <div class="my-6">
            <v-card class="mx-auto" max-width="600" outlined>
                <v-card-text>
                    <p>
                        Hi {{this.$store.state.playerName}}:
                    </p>
                    <div class="question-content">
                        <div class="question-title">
                            Are you ready for group discussion?
                        </div>
                    </div>
                    <br>
                </v-card-text>

            </v-card>
        </div>

        <!-- The time counter for discussion page-->


        <!-- Next button going to the ChooseDecision -->
        <div class="my-10">
            <router-link to="/Discussion">
                <v-btn x-large color="primary">Next</v-btn>
            </router-link>
        </div>


    </v-col>
</template>

<script>
    export default {
        name: "Ready"
    }
</script>

<style scoped>

</style>