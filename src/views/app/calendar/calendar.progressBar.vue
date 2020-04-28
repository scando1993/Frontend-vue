<template>
  <div>
    <b-progress class="mt-2" :height="height" :precision="precision" :max="max" show-value>
      <b-progress-bar :style="{'background': getBGColor(key)}" :value="value * 100 " :label="`${(value * 100).toFixed(0)}%`"
                      v-for="(value, key) in TASKS_PROGRESS " :key="key"/>
    </b-progress>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { calendarList } from './data/calendarConfiguration';

export default {
  name: 'calendar_progressBar',
  data() {
    return {
      max: 100,
      precision: 0,
      height: '2rem'

    };
  },
  computed: {
    ...mapGetters([ 'TASKS_PROGRESS' ]),
  },
  mounted() {
    this.$store.dispatch('GET_TASKS_PROGRESS');
  },
  methods: {
    getBGColor(colorName) {
      return calendarList.find(({ name }) => name === colorName).color;
    },
    randomValue() {
      this.value = Math.random() * this.max;
    }
  }
};
</script>

<style scoped>

</style>
