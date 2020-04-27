<template>
    <div>
        <b-progress class="mt-2" :height="height" :precision="precision" :max="max" show-value>
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
                max: 100,
                height: "2rem",
            }
        },
        computed: {
            ...mapGetters(['CLIENT_PROGRESS'])
        },
        mounted() {
            this.$store.dispatch('GET_CLIENTS_PROGRESS');
        },
        methods: {
            getBGColor(name) {
                var bgColor = 'bg-primary';
                console.log('color', name);
                switch (name) {
                    case 'active':
                        bgColor = 'bg-primary';
                        break;
                    case 'inactive':
                        bgColor = 'bg-danger';
                        break;
                    case 'without_contact':
                        bgColor = 'bg-dark';
                        break;
                }
                return bgColor
            },

        }

    }
</script>

<style scoped>

</style>
