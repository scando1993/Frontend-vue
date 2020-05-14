<template>
  <div>
    <reports-nav-bar/>
    <div id="body" ref="report_body">
      <b-row class="mb-2">
        <b-col md="12" sm="12" lg="4">
          <h3 class="text-center">Cumplimiento de tareas</h3>
          <p>Dentro del control de linea roja durante x cantidad de tiempo</p>
          <div class="chart-wrapper">
            <apexchart type="donut" :options="calendarPriorityOptions" :series="calendarPriorityOptions.series"
                       :autoresize="true"/>
          </div>
        </b-col>
        <b-col md="12" sm="12" lg="4">
          <h3 class="text-center">Interacción con el cliente</h3>
          <p>Cantidades de veces que se interactuo con el cliente durante x cantidad de tiempo</p>
          <div class="chart-wrapper">
            <apexchart type="donut" :options="clientPriorityOptions" :series="clientPriorityOptions.series"
                       :autoresize="true"/>
          </div>
        </b-col>
        <b-col md="12" sm="12" lg="4">
          <h3 class="text-center">Tipos de tarea</h3>
          <p>Dentro de las horas de actividad durante x cantidad de tiempo</p>
          <div class="chart-wrapper">
            <apexchart type="donut" :options="tasksPriorityOptions" :series="tasksPriorityOptions.series"
                       :autoresize="true"/>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <h3 class="text-center">Estatus del Cliente</h3>
          <p class="mx-auto">Total de clientes activos o inactivos durante x cantidad de tiempo</p>
          <div class="chart-wrapper mx-auto" style="width: 50%">
            <apexchart type="bar" :options="clientsColumnOptions" :series="clientsColumnOptions.series"
                       :autoresize="true"/>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { basicPie, stackedArea } from '@/data/echarts';
import reportSetup from './data/report-analytics';
import ReportsNavBar from './navbar/reportsNavBar';
import { mapActions, mapGetters } from 'vuex';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import {format} from 'date-fns'

export default {
  name: 'report',
  components: { ReportsNavBar },
  data: () => ({
    basicPie,
    stackedArea,
    tasks: {
      'expired': 80,
      'now': 20,
      'soon': 40,
      'early': 10,
      'pending': 50
    },
    categories: {
      'Llamada': 5,
      'Reunion': 15,
      'Mail': 20,
      'Informe': 20,
      'Otro': 40
    },
    clients_interaction: {
      'clients_w_tasks': 12,
      'clients_w_o_tasks': 18
    },
    clients_column: {
      'active': 80,
      'inactive': 20
    }
  }),
  computed: {
    // tasks: {
    //   get(){
    //     return this.TASKS_PROGRESS;
    //   },
    //   set(value){}
    // },
    // clients_column: {
    //   get(){
    //     return this.CLIENT_PROGRESS;
    //   },
    //   set(value){}
    // },
    tasksPriorityOptions() {
      return reportSetup.tasksPriorityOptions(this.TASKS_TYPE_REPORT);
    },
    clientPriorityOptions() {
      return reportSetup.clientPriorityOptions(this.CLIENT_REPORT);
    },
    calendarPriorityOptions() {
      return reportSetup.calendarPriorityOptions(this.TASKS_PRIORITY_REPORT);
    },
    clientsColumnOptions() {
      return reportSetup.clientsOptions(this.CLIENT_COLUMN_REPORT);
    },
    clientsTimeseriesOptions() {

    },
    ...mapGetters([
      'getSelectedFilter',
      'TASKS_PRIORITY_REPORT',
      'TASKS_TYPE_REPORT',
      'CLIENT_REPORT',
      'CLIENT_COLUMN_REPORT'

    ])
  },
  mounted() {
    this.$store.dispatch('GET_TASKS_PRIORITY_REPORT');
    this.$store.dispatch('GET_TASKS_TYPE_REPORT');
    this.$store.dispatch('GET_CLIENT_REPORT');
    this.$store.dispatch('GET_CLIENT_COLUMN_REPORT');

    this.$store.subscribe((mutation, state) => {
      if ( mutation.type === 'setGeneratePDF' ) {
        console.log('pdf clicked');
        setTimeout(() => {
          this.generatePDF();
        }, 0);
      } else if ( mutation.type === 'setSendEmail' ) {
        console.log('email clicked');
        setTimeout(() => {
          this.sendEmail();
        }, 0);
      }
    });
  },
  methods: {
    ...mapGetters([
      'TASKS_PROGRESS',
      'CLIENT_PROGRESS'
    ]),
    ...mapActions([
      'toggleGeneratePDF',
      'toggleSendEmail',
      'getStartDate',
      'getEndDate',
      'TASKS_PROGRESS',
      'CLIENT_PROGRESS'
    ]),
    generatePDF: function () {
      let currentDate = format(new Date(), 'dd-MMMM');
      /** WITH CSS */
      var node = document.getElementById('body');
      domtoimage.toPng(node)
        .then(function (dataUrl) {
          let img = new Image();
          img.src = dataUrl;
          const doc = new jsPDF({
            orientation: 'portrait',
            format: [ 900, 1400 ]
          });
          doc.addImage(img, 'JPEG', 20, 20);
          const filename = currentDate + '.pdf';
          doc.save(filename);
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
      // console.log(currentDate);
      // html2canvas(this.$refs.report_body, { canvas: canvasElement }).then(function (canvas) {
      //   const img = canvas.toDataURL('image/jpeg', 1.0);
      //   doc.addImage(img, 'JPEG', 20, 20);
      //   doc.save(currentDate + '.pdf');
      // });
    },
    sendEmail: function () {
    }
  }
};
</script>

<style lang="scss" scoped>
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
