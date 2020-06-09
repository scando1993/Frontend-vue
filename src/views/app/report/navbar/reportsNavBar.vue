<template>
  <b-card body-class="p-2">
    <div id="calendar" class="d-flex flex-row flex-nowrap align-items-stretch">
      <b-form-select style="cursor: pointer;"
                     v-model="selectedFilter"
                     :options="options"
                     @change="onChangeFilter(); createClickGAEvent('REPORT_DATE_VIEW', 'FILTER', 'REPORT')"
                     class="report-navbar-select"/>
      <button class="btn report-navbar-btn mx-1" @click="toggleGeneratePDF(); createClickGAEvent('REPORT_DOWNLOAD_PDF', 'CLICK', 'REPORT')">Descargar PDF</button>
      <button class="btn report-navbar-btn mx-1" @click="toggleSendEmail(); createClickGAEvent('REPORT_SEND_EMAIL', 'CLICK', 'REPORT')">Enviar Email</button>
      <label class="text-range-date flex-grow-0 flex-shrink-1 mx-2">{{getCurrentDate}}</label>
      <button type="button" class="btn btn-icon btn-action" @click.prevent="togglePrevCalendar(); createClickGAEvent('REPORT_NEXT_DATE', 'FILTER', 'REPORT')">
        <i class="bx bx-chevron-left" style="font-size: 2em;"/>
      </button>
      <button type="button" class="btn btn-icon btn-action" @click.prevent="toggleNextCalendar(); createClickGAEvent('REPORT_PREV_DATE', 'FILTER', 'REPORT')">
        <i class="bx bx-chevron-right" style="font-size: 2em;"/>
      </button>
    </div>
  </b-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'reportsNavBar',
  data(){
    return {
      selectedFilter: 'day',
      options: [
        { value: 'day', text: 'Día' },
        { value: 'week', text: 'Semana' },
        { value: 'month', text: 'Mes' },
        { value: 'Custom', text: 'Customizar' }
      ],
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentDate',
    ])
  },
  methods: {
    ...mapActions([
      'toggleGeneratePDF',
      'toggleSendEmail',
      'toggleNextCalendar',
      'togglePrevCalendar',
      'setSelectedCurrentView'
    ]),
    onChangeFilter() {
      this.setSelectedCurrentView(this.selectedFilter);
    },
    createClickGAEvent(action, category, label, value) {
      this.$gtag.event(action, {
        'event_category': category,
        'event_label': label,
        'value': value || null
      })
    }
  }
};
</script>

<style scoped lang="scss">
  .report-navbar-select {
    align-self: center;
    width: auto;
    height: calc(1em + 1vmin);
    padding: 0.25em 1.5rem;
    line-height: 1;
  }
  .btn-action {
    border: 1px solid lightgrey;
    padding: 0.2em 0.5em;
  }
  .text-range-date {
    font-size: calc(0.75em + 1vmin);
    white-space: normal;
    align-self: center;
    text-transform: capitalize;
    margin-bottom: 0;
    margin-right: 1em;
  }
  .report-navbar-btn {
    background-color: #4399B6;
    color: white;
    border-radius: 10px;
    font-size: 0.85rem;
    padding: 0 1.5rem;
    border: 0;
    align-self: center;
  }
</style>
