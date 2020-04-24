<template>
    <div>
        <b-progress class="mt-2" :precision="precision" :max="max" show-value>
            <b-progress-bar :class="getBGColor(key)" :value="value * 100 " v-for="(value, key) in CLIENT_PROGRESS "></b-progress-bar>
        </b-progress>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "client_progressBar",
        data() {
            return {
                precision: 2,
                max: 100
            }
        },
        computed: {
            ...mapGetters(['CLIENT_PROGRESS'])
        },
        mounted() {
            this.$store.dispatch('GET_CLIENTS_PROGRESS');
        },
        methods: {

        }

    }
</script>

<style scoped>

</style>
