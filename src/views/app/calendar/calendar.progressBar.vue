<template>
    <div>
        <b-progress class="mt-2" :height="height" :precision="precision" :max="max" show-value>
            <b-progress-bar :class="getBGColor(key)" :value="value * 100 " v-for="(value, key) in TASKS_PROGRESS "></b-progress-bar>
        </b-progress>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "calendar_progressBar",
        data() {
            return {
                max: 100,
                precision: 2,
                height: '2rem'

            }
        },
        computed : {
            ...mapGetters(['TASKS_PROGRESS']),
        },
        mounted() {
          this.$store.dispatch('GET_TASKS_PROGRESS');
        },
        methods: {
            getBGColor(name) {
                var bgColor = 'bg-primary';
                switch (name) {
                    case 'expired':
                        bgColor = 'bg-dark';
                        break;
                    case 'eary':
                        bgColor = 'bg-danger';
                        break;
                    case 'soon':
                        bgColor = 'bg-primary';
                        break;
                    case 'pending':
                        bgColor = 'bg-secondary';
                        break;
                }
                return bgColor
            },
            randomValue() {
                this.value = Math.random() * this.max
            }
        }
    }
</script>

<style scoped>

</style>
