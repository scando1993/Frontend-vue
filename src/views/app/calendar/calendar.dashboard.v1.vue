<template>
  <div class="box">
    <calendar-nav-bar/>
    <calendar-task-view v-if="showTaskView" class="view-content"/>
    <div v-else class="view-content">

      <div class="wrapper">
        <div class="no-card-shadow d-flex flex-row flex-wrap " id="card-drag-area-1" v-dragula bag="first-bag">
          <template
            v-for="(task, taskIndex) in getTopTasks()">
            <calendar-task-widget v-on:chip_click="onClickChip" :task="task" :key="taskIndex" class="mx-auto"/>
          </template>
        </div>
      </div>

      <div class="row" style="height: 100%">
        <b-col lg="9" xl="9" md="12" sm="12">
          <div class="card d-flex flex-row mb-1">
            <div class="card-body p-1">
              <calendar class="w-100"
                        ref="tuiCalendar"
                        :calendars="calendarList"
                        :schedules="scheduleList"
                        :view="view"
                        :taskView="taskView"
                        :scheduleView="scheduleView"
                        :theme="theme"
                        :week="week"
                        :month="month"
                        :timezones="timezones"
                        :disableDblClick="disableDblClick"
                        :isReadOnly="isReadOnly"
                        :template="template"
                        :useCreationPopup="useCreationPopup"
                        :useDetailPopup="useDetailPopup"
                        @afterRenderSchedule="onAfterRenderSchedule"
                        @beforeCreateSchedule="onBeforeCreateSchedule"
                        @beforeDeleteSchedule="onBeforeDeleteSchedule"
                        @beforeUpdateSchedule="onBeforeUpdateSchedule"
                        @clickDayname="onClickDayname"
                        @clickSchedule="onClickSchedule"
                        @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn"
              />
              <l-map
                v-show="showMap"
                style="height: 800px; width: 100%"
                :zoom="mapConfigurations.zoom"
                :center="mapConfigurations.center"
                @update:zoom="zoomUpdated"
                @update:center="centerUpdated"
                @update:bounds="boundsUpdated"
              >
                <l-tile-layer :url="mapConfigurations.url"/>
              </l-map>
            </div>
          </div>
        </b-col>
        <b-col lg="3" xl="3" md="12" sm="12" class="d-flex flex-column pl-0">
          <div class="box-shadow-1 card flex-grow-0 flex-shrink-1 mb-1" style="flex-basis: 50%;">
            <div class="card-header align-items-center py-2" :style="{background: '#ffffff'}">
              <p class="text-center mb-0 card-task-header-text">Expiradas</p>
            </div>
            <div class="card-body p-2">
              <vue-perfect-scrollbar class="card-scrollable" ref="scrollable_content">
                <div id="scrollable_content"
                     v-for="(task, taskIndex) in TASKS_LIST.filter(x => x.additionalInfo.status === 'expired')">
                  <calendar-task-widget v-on:chip_click="onClickChip" :task="task" :key="taskIndex" class="mx-auto"/>
                </div>
              </vue-perfect-scrollbar>
            </div>
          </div>
          <div class="box-shadow-1 card flex-grow-0 flex-shrink-1 mb-0" style="flex-basis: 50%;">
            <div class="card-header align-items-center py-2" :style="{background: '#ffffff'}">
              <p class="text-center mb-0 card-task-header-text">Pendientes</p>
            </div>
            <div class="card-body p-2">
              <vue-perfect-scrollbar class="card-scrollable" ref="scrollable_content_2">
                <div id="scrollable_content_2"
                     v-for="(task, taskIndex) in TASKS_LIST.filter(x => x.additionalInfo.status === 'pending')">
                  <calendar-task-widget v-on:chip_click="onClickChip" :task="task" :key="taskIndex" class="box-shadow-1 mx-auto"/>
                </div>
              </vue-perfect-scrollbar>
            </div>
          </div>
        </b-col>
      </div>

      <b-modal id="newTask_modal" :title="getModalTitle" centered size="lg" @hidden="resetModal">
        <div>
          <b-row>
            <b-col md="7">
              <b-form-group
                label="Categoria de tarea"
              >
                <b-form-select v-model="newTaskForm.category" :options="taskOptions"/>
              </b-form-group>

              <b-form-group
                label="Actividad"
              >
                <b-form-input type="text" v-model="newTaskForm.name"/>
              </b-form-group>
              <b-form-group
                label="Ubicación"
              >
                <b-form-input type="text" v-model="newTaskForm.address"/>
              </b-form-group>
              <b-form-group
                label="Asignar vendedor"
              >
                <b-form-select :change="getVendorClients()" v-model="newTaskForm.vendor_id"
                               :options="VENDOR_LIST.map(function (x) { return {value: x.id.id, text: x.additionalInfo.firstName + ' ' + x.additionalInfo.lastName}})"/>
              </b-form-group>
              <b-form-group
                label="Notas"
              >
                <b-form-textarea style="height: 100px;"v-model="newTaskForm.notes"/>
              </b-form-group>

            </b-col>
            <b-col md="5">
              <b-form-group
                required
                label="Cliente"
              >
                <b-form-select placeholder="Select a vendor first" v-model="newTaskForm.client_id"
                               :options="CLIENTS_LIST.map(function (x) { return {value: x.id.id, text: x.name}})"/>
              </b-form-group>
              <b-form-group
                label="Fecha"
              >

                <b-form-datepicker id="example-datepicker" v-model="newTaskForm.start_date"
                                   class="mb-2"></b-form-datepicker>
              </b-form-group>
              <b-form-group
                label="Hora"
              >
                <b-form-timepicker v-model="newTaskForm.start_time" locale="en"></b-form-timepicker>
              </b-form-group>
              <b-form-group
                label="Recordatorio"
              >
                <b-form-timepicker v-model="newTaskForm.reminder" locale="en"></b-form-timepicker>

              </b-form-group>
              <b-form-group
                label="Duracion"
              >
                <b-form-timepicker id="ex-disabled-readonly" v-model="newTaskForm.duration"></b-form-timepicker>

                <!--<vue-timepicker v-model="newTaskForm.duration" ></vue-timepicker>-->

              </b-form-group>
              <!--
              <b-form-group
                label="Rutina"
              >
                <b-form-select v-model="newTaskForm.routine" :options="routineOptions"/>
              </b-form-group>-->
              <b-form-group v-if="isEditModal"
                            label="Tarea completada"
              >
                <div class="d-flex d-inline  justify-content-center">
                  <b-form-checkbox v-model="newTaskForm.completed"/>
                  <div class="text-21 align-items-center justify-content-center" >
                    {{newTaskForm.completed ? 'Completado!' : 'Sin completar'}}
                  </div>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
        </div>
        <template v-slot:modal-footer="{ ok, cancel, hide }">
          <div class="d-flex justify-content-around">
            <b-button size="sm" variant="danger" @click="deleteOrCancel()">
              {{isEditModal ? 'Eliminar' : 'Cancelar'}}
            </b-button>
            <b-button size="sm" variant="success" @click="createOrUpdate()">
              {{isEditModal ? 'Editar' : 'Crear tarea'}}
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
    <calendar-progress-bar/>
  </div>
</template>

<script>
import { Calendar } from '@toast-ui/vue-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import VueTimepicker from 'vue2-timepicker';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import CalendarNavBar from './calendarNavbar/calendarNavBar';
import { mapGetters, mapActions } from 'vuex';
import { LMap, LTileLayer } from 'vue2-leaflet';
import {
  calendarList,
  view,
  taskView,
  scheduleView,
  theme,
  week,
  month,
  timezones,
  disableDblClick,
  isReadOnly,
  useCreationPopup,
  useDetailPopup
} from './data/calendarConfiguration';
import { taskCategories, vendors, clients, routines } from './data/formData';
import CalendarTaskView from './calendar.tasks.view';
import CalendarTaskWidget from './calendar.task.widget';
import CalendarProgressBar from './calendar.progressBar';

export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Calendar v1'
  },
  name: 'calendar.dashboard.v1',
  components: {
    CalendarProgressBar,
    VueTimepicker,
    CalendarTaskView,
    CalendarNavBar,
    'calendar': Calendar,
    LMap,
    LTileLayer,
    CalendarTaskWidget
  },

  computed: {
    ...mapGetters([
      'getSelectedMapView',
      'getSelectedComponentView',
      'getShowNewTaskModal',
      'getSearchText',
      'VENDOR_LIST', 'CLIENTS_LIST',
      'TASKS_LIST'
    ]),
    showMap() {
      return this.getSelectedComponentView === 'Map';
    },
    showTaskView() {
      return this.getSelectedComponentView === 'Tasks';
    },
    getModalTitle() {
      return this.isEditModal ? 'Editar o eliminar tarea' : 'Agregar nueva tarea';
    },
    scheduleList() {
      return this.TASKS_LIST.map(x => {return x.additionalInfo.tui_data;});
      let scheduleList = this.TASKS_LIST.map(x => {
        let schedule = x.additionalInfo;
        let calendarId = calendarList.find(x => x.name === schedule.status).id;
        return {
          id: schedule.tui_data.id,
          calendarId: calendarId,
          title: schedule.name,
          category: taskCategories[schedule.category],
          location: `${ schedule.lat }, ${ schedule.lng }`,
          dueDateClass: '',
          start: schedule.start,
          end: schedule.end
        };
      });
      console.log(scheduleList);
      return scheduleList;
    }
  },
  data() {
    return {
      scheduleSelected: null,
      isEditModal: false,
      timeNow: (new Date()).toString(),
      taskOptions: taskCategories,
      vendorOptions: vendors,
      clientOptions: clients,
      routineOptions: routines,
      mapConfigurations: {
        currentZoom: 11.5,
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        zoom: 6,
        center: [ -1.224882, -78.601685 ],
        bounds: null,
      },
      newTaskForm: {
        category: '',
        name: '',
        address: '',
        lat: 0,
        lng: 0,
        vendor_id: '',
        notes: '',
        client_id: '',
        start_date: '',
        start_time: '',
        duration: '',
        reminder: '',
        completed: ''
      },
      isChipModal: false,
      selected_task: {},
      calendarList,
      view,
      taskView,
      scheduleView,
      theme,
      week,
      month,
      timezones,
      disableDblClick,
      isReadOnly,
      template: this.calendarTemplate(),
      useCreationPopup,
      useDetailPopup,
    };
  },
  mounted() {
    const vendor_params = {
      limit: 1000
    };
    this.$store.dispatch('GET_VENDOR_LIST', vendor_params);
    this.$store.dispatch('GET_TASKS_LIST');
    // this.setTuiCalendarRef();

    this.setRangeText();

    console.log(this.$refs);
    this.$store.subscribe((mutation, state) => {
      if ( mutation.type === 'setSelectedMapView' ) {
        setTimeout(() => {
          this.changeView();
        }, 0);
      } else if ( mutation.type === 'setShowNewTaskModal' ) {
        if ( mutation.payload ) {
          this.$bvModal.show('newTask_modal');
        } else {
          this.$bvModal.hide('newTask_modal');
        }
      } else if ( mutation.type === 'toggleNextCalendar' ) {
        setTimeout(() => {
          this.changeViewNext();
        }, 0);
      } else if ( mutation.type === 'togglePrevCalendar' ) {
        setTimeout(() => {
          this.changeViewPrev();
        }, 0);
      }
    });
  },
  methods: {
    ...mapActions([
      'GET_VENDOR_LIST',
      'GET_CLIENTS_LIST',
      'setShowNewTaskModal',
      'togglePrevCalendar',
      'toggleNextCalendar'
    ]),
    getVendorClients() {
      // console.log('IN getVendors clients', this.newTaskForm.client_id);
      // console.log('sss', this.newTaskForm);
      const vendor_id = this.newTaskForm.vendor_id;
      const payload = { vendor_id: vendor_id, limit: 10000, textSearch: null };
      this.$store.dispatch('GET_VENDOR_CLIENTS', payload);
    },
    // Viewport, date and change functions
    changeView() {
      this.$refs.tuiCalendar.invoke('changeView', this.getSelectedMapView);
      this.setRangeText();
    },
    changeViewNext() {
      this.$refs.tuiCalendar.invoke('next');
      this.setRangeText();
    },
    changeViewPrev() {
      this.$refs.tuiCalendar.invoke('prev');
      this.setRangeText();
    },
    setRangeText() {
      let options = this.$refs.tuiCalendar.invoke('getOptions');
      let viewName = this.$refs.tuiCalendar.invoke('getViewName');
      this.$store.dispatch('toggleRangeText', this.setRenderRangeText(viewName, options));
    },
    setRenderRangeText: function (viewName, options) {
      let html = [];
      let dateRangeStart = this.$refs.tuiCalendar.invoke('getDateRangeStart');
      let dateRangeEnd = this.$refs.tuiCalendar.invoke('getDateRangeEnd');
      let date = this.$refs.tuiCalendar.invoke('getDate');
      if ( viewName === 'day' ) {
        html.push(this.$moment(date.getTime()).format('DD MMMM'));
      } else if ( viewName === 'month' &&
        (!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4) ) {
        html.push(this.$moment(date.getTime()).format('MMMM'));
      } else {
        html.push(this.$moment(dateRangeStart.getTime()).format('DD MMMM'));
        html.push('-');
        html.push(this.$moment(dateRangeEnd.getTime()).format('DD MMMM'));
      }
      return html.join('');
    },

    saveTask() {
      this.newTaskForm.category = Number(this.newTaskForm.category);
      console.log('form', this.newTaskForm);
      this.$store.dispatch('POST_TASK', this.newTaskForm)
        .then(result => {
          console.log(result);
          this.$store.dispatch('GET_TASKS_LIST');
        });
      this.hideModal();
    },

    // Calendar template functions
    calendarTemplate() {
      let self = this;
      return {
        milestone: function (schedule) {
          return `<span style="color:red;">${ schedule.title }</span>`;
        },
        milestoneTitle: function () {
          return 'MILESTONE';
        },
        time: function (schedule) {
          return self.getTimeTemplate(schedule, false);
        }
      };
    },
    // Create Event according to their Template
    getTimeTemplate(schedule, isAllDay) {
      const id = schedule.id;
      const taskSelected = this.TASKS_LIST.find(x => {return x.additionalInfo.name === schedule.title; });
      console.log('taskTemplate', taskSelected);
      let html = [ '<div class="d-flex flex-row flex-nowrap" style="height: 100%">' ];
      let start = this.$moment(schedule.start.toUTCString());
      let calendar = calendarList.find(({ name }) => name === taskSelected.additionalInfo.status);

      console.log('schedule Tui', schedule);
      console.log('schedule Plani', taskSelected);

      if ( !isAllDay ) {
        // html.push('<span style="background:' + schedule.borderColor + '">' + start.format('HH:mm') + '</span> ');
        html.push(`<span class="align-self-strech" style="background:${calendar.color}; color: #fff;">`
          + start.format('HH:mm') + '</span> ');
      }
      if ( schedule.isPrivate ) {
        html.push('<span class="bx bxs-lock-alt font-size-small align-middle"></span>');
        html.push(' Private');
      } else {
        // if ( schedule.isReadOnly ) {
        //   html.push('<span class="bx bx-block font-size-small align-middle"></span>');
        // } else if ( schedule.recurrenceRule ) {
        //   html.push('<span class="bx bx-repeat font-size-small align-middle"></span>');
        // } else if ( schedule.attendees.length ) {
        //   html.push('<span class="bx bxs-user font-size-small align-middle"></span>');
        // } else if ( schedule.location ) {
        //   html.push('<span class="bx bxs-map font-size-small align-middle"></span>');
        // }
        // html.push(' ' + schedule.title);
        html.push(`<span class="align-self-stretch" style="background:${calendar.bgColor}; flex-basis: 100%;">` + schedule.title + '</span> ');
      }
      html.push('' + '</div>');
      return html.join(' ');
    },

    // map functions
    zoomUpdated(zoom) {
      this.mapConfigurations.zoom = zoom;
    },
    centerUpdated(center) {
      this.mapConfigurations.center = center;
    },
    boundsUpdated(bounds) {
      this.mapConfigurations.bounds = bounds;
    },
    //
    setTuiCalendarRef() {
      this.tuiCalendar = this.$refs.tuiCalendar;
    },
    findCalendar(id) {
      let found = null;
      console.log(id);
      console.log(this.calendarList);
      if ( id === undefined )
        return this.calendarList[0];

      this.calendarList.forEach(function (calendar) {
        if ( calendar.id === id ) {
          found = calendar;
        }
      });

      return found !== null ? found : this.calendarList[0];
    },
    saveNewSchedule(scheduleData) {
      console.log(scheduleData);
      var calendar = scheduleData.calendar || this.findCalendar(scheduleData.calendarId);
      var schedule = {
        id: String(this.scheduleList.length + 1),
        title: scheduleData.title,
        isAllDay: scheduleData.isAllDay,
        start: scheduleData.start,
        end: scheduleData.end,
        category: scheduleData.isAllDay ? 'allday' : 'time',
        dueDateClass: '',
        color: calendar.color,
        bgColor: calendar.bgColor,
        dragBgColor: calendar.bgColor,
        borderColor: calendar.borderColor,
        location: scheduleData.location,
        // raw: {
        //   class: scheduleData.raw['class'] || ''
        // },
        state: scheduleData.state
      };
      if ( calendar ) {
        schedule.calendarId = calendar.id;
        schedule.color = calendar.color;
        schedule.bgColor = calendar.bgColor;
        schedule.borderColor = calendar.borderColor;
      }

      this.$refs.tuiCalendar.invoke('createSchedules', [ schedule ]);

      this.refreshScheduleVisibility();
    },
    refreshScheduleVisibility() {
      console.log('en render refresh');
      var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));

      this.calendarList.forEach((calendar) => {
        this.tuiCalendar.invoke('toggleSchedules', [ calendar.id, !calendar.checked, false ]);
      });

      this.$refs.tuiCalendar.invoke('render', true);
      calendarElements.forEach(function (input) {
        var span = input.nextElementSibling;
        span.style.backgroundColor = input.checked ? span.style.borderColor : 'transparent';
      });
    },
    onAfterRenderSchedule(e) {
      // implement your code
    },
    onBeforeCreateSchedule(e) {
      // implement your code
      console.log('BeforeCreate', e);
      this.saveNewSchedule(e);
    },
    onBeforeDeleteSchedule(e) {
      // implement your code
      console.log('En el delete');
      console.log('beforeDeleteSchedule', e);
      this.deleteTask(e.schedule);
    },
    onClickChip(task) {
      // const taskSelected = task;
      console.log('tarea', task);
      this.selected_task = task;

      this.setFormData(task);
      this.isChipModal = true;
      this.isEditModal = true;
      this.setShowNewTaskModal(true);
    },
    setFormData(taskSelected) {
      this.newTaskForm = {
        category: new Number(taskSelected.additionalInfo.category) || null,
        name: taskSelected.additionalInfo.name || '',
        address: taskSelected.additionalInfo.address || '',
        lat: taskSelected.additionalInfo.lat,
        lng: taskSelected.additionalInfo.lng,
        vendor_id: taskSelected.customerId.id || '',
        notes: taskSelected.additionalInfo.notes|| '',
        client_id: taskSelected.additionalInfo.client_data.id || '',
        start_date: taskSelected.additionalInfo.start_date || '',
        start_time: taskSelected.additionalInfo.start_time || '',
        duration: taskSelected.additionalInfo.duration || '',
        reminder: taskSelected.additionalInfo.reminder || '',
        completed: taskSelected.additionalInfo.completed || null
      };
    },
    onBeforeUpdateSchedule(e) {
      // implement your code
      console.log('Update', e);
      e.schedule.start = e.start;
      e.schedule.end = e.end;
      const id = e.schedule.id;
      const taskSelected = this.TASKS_LIST[id];
      console.log('update task', taskSelected);
      this.newTaskForm = {
        category: new Number(taskSelected.additionalInfo.category),
        name: taskSelected.additionalInfo.name,
        address: taskSelected.additionalInfo.address,
        lat: taskSelected.additionalInfo.lat,
        lng: taskSelected.additionalInfo.lng,
        vendor_id: taskSelected.customerId.id,
        notes: taskSelected.additionalInfo.notes,
        client_id: taskSelected.additionalInfo.client_data.id,
        start_date: taskSelected.additionalInfo.start_date,
        start_time: taskSelected.additionalInfo.start_time,
        duration: taskSelected.additionalInfo.duration,
        reminder: taskSelected.additionalInfo.reminder,
        completed: taskSelected.additionalInfo.completed
      };
      this.editTask(taskSelected.id.id);
      this.$refs.tuiCalendar.invoke('updateSchedule', e.schedule.id, e.schedule.calendarId, e.schedule);
    },
    // eslint-disable-next-line no-unused-vars
    onClickDayname(e) {
      console.log('On click onClickDayname');
      console.log(e);
      // implement your code
    },
    // eslint-disable-next-line no-unused-vars
    onClickSchedule(e) {
      this.scheduleSelected = e.schedule;
      this.isEditModal = true;
      console.log('On click onClickSchedule', e);
      const id = e.schedule.id;
      const taskSelected = this.TASKS_LIST[id];
      this.selected_task = taskSelected;
      this.setFormData(taskSelected);
      this.setShowNewTaskModal(true);
    },
    // eslint-disable-next-line no-unused-vars
    onClickTimezonesCollapseBtn(e) {
      console.log('On click onClickTimezonesCollapseBtn');
      console.log(e);
      // implement your code
    },
    clearFormData() {
      this.newTaskForm = {
        category: '',
        name: '',
        address: '',
        lat: 0,
        lng: 0,
        vendor_id: '',
        notes: '',
        client_id: '',
        start_date: '',
        start_time: '',
        duration: '',
        reminder: '',
        completed: ''
      };
    },
    hideModal() {
      this.setShowNewTaskModal(false);
      this.clearFormData();
      this.isEditModal = false;
    },
    resetModal() {
      this.hideModal();
    },
    deteteTask(task_id) {

      this.$store.dispatch('DELETE_TASK', task_id)
        .then(x => {
          this.$store.dispatch('GET_TASKS_LIST');
        });

      // this.$refs.tuiCalendar.invoke('deleteSchedule', schedule.id, schedule.calendarId);
    },
    deleteOrCancel() {
      if ( this.isEditModal ) { // delete is avaliable
        console.log('in delete');
        this.deteteTask(this.selected_task.id.id);
        this.resetModal();
      } else {
        this.resetModal();
      }
    },
    editTask(task_id) {
      this.newTaskForm.category = Number(this.newTaskForm.category);
      const payload = {
        task_id: task_id,
        data: this.newTaskForm
      };
      const changeStatusPayload = {
        task_id: task_id,
        completed: this.newTaskForm.completed
      };
      this.$store.dispatch('UPDATE_TASK', payload)
              .then(response => {

                this.$store.dispatch('SET_TASK_STATE', changeStatusPayload)
                        .then(response2 => {
                          this.$store.dispatch('GET_TASKS_LIST');

                        })
              });
    },
    createOrUpdate() {
      console.log('is edit', this.isEditModal);

      if (this.isEditModal) {
          this.editTask(this.selected_task.id.id);
          this.resetModal();
      } else {
        console.log('IN save task');
        this.saveTask();
      }
    },
    categoryCoder(x) {
      var value = 0;
      if(x === 'now')
        value = 1;
      else if(x==="soon")
        value = 2
      else if (x==="early")
        value = 3
      else if(x==="expired")
        value = 4;
      else
        value = 5
      return value
    },
    sortTop(a, b ) {
      var value1 = this.categoryCoder(a.additionalInfo.status);
      var value2 = this.categoryCoder(b.additionalInfo.status);
      return value1 - value2
    },
    getTopTasks() {
      const newArray = this.TASKS_LIST.filter( x => !x.additionalInfo.start_time && x.additionalInfo.start_date);
      console.log('newArray--------------', newArray);
      //const a = this.TASKS_LIST.filter(x => x.additionalInfo.status === 'early' || x.additionalInfo.status === 'now' || x.additionalInfo.status === 'soon');
      const final = newArray.sort(this.sortTop);
      console.log('final!!!!!!!!!!!!!!!!!!!!!!!!!', final);
      return final;

    }


  },
};
</script>

<style scoped lang="scss">
  @import 'src/assets/styles/vendor/bootstrap/bootstrap';

  .card-scrollable {
    width: 100%;
    height: 245px;
    position: relative;
    overflow-x: scroll;
    overflow-y: scroll;
  }

  .card-task-header-text {
    color: #4399B6;
    font-size: 1.5em;
    font-weight: bold;
  }

  .card-task-header {
    @extend card-header !optional;
    background: #FFFFFF;
  }
</style>
