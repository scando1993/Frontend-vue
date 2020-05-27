<template>
  <div class="box">
    <calendar-nav-bar/>
    <calendar-task-view v-if="showTaskView" class="view-content"/>
    <div v-else class="view-content">

      <div class="wrapper">
        <div class="no-card-shadow d-flex flex-row flex-wrap " id="card-drag-area-1" v-dragula bag="first-bag">
          <template
            v-for="(task, taskIndex) in getTopTasks()">
            <calendar-task-widget style=" cursor: pointer" v-on:chip_click="onClickChip" :task="task" :key="taskIndex" class="mx-auto"/>
          </template>
        </div>
      </div>

      <div class="row" style="height: 100%">
        <b-col lg="8" xl="8" md="12" sm="12">
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
              <calendar_map v-show="showMap"></calendar_map>
            </div>
          </div>
        </b-col>
        <b-col lg="4" xl="4" md="12" sm="12" class="d-flex flex-column pl-0">
          <div class="box-shadow-1 card flex-grow-0 flex-shrink-1 mb-1" style="flex-basis: 50%;">
            <div class="card-header align-items-center py-2" :style="{background: '#ffffff'}">
              <p class="text-center mb-0 card-task-header-text">Expiradas</p>
            </div>
            <div class="card-body p-2">
              <vue-perfect-scrollbar class="card-scrollable" ref="scrollable_content_2">
                <template v-for="(task, taskIndex) in tasksFiltered.filter(x => x.additionalInfo.status === 'expired')">
                  <calendar-task-widget v-on:chip_click="onClickChip" :task="task" :key="taskIndex" class="mx-auto"/>
                </template>
              </vue-perfect-scrollbar>
            </div>
          </div>
          <div class="box-shadow-1 card flex-grow-0 flex-shrink-1 mb-0" style="flex-basis: 50%;">
            <div class="card-header align-items-center py-2" :style="{background: '#ffffff'}">
              <p class="text-center mb-0 card-task-header-text">Pendientes</p>
            </div>
            <div class="card-body p-2">
              <vue-perfect-scrollbar class="card-scrollable" ref="scrollable_content_3">
                <template v-for="(task, taskIndex) in tasksFiltered.filter(x => x.additionalInfo.status === 'pending')">
                  <calendar-task-widget v-on:chip_click="onClickChip" :task="task" :key="taskIndex" class="box-shadow-1 mx-auto"/>
                </template>
              </vue-perfect-scrollbar>
            </div>
          </div>
        </b-col>
      </div>
    </div>
    <calendar_newTask_modal :initialDate="initialModalDate" :initialEndDate="initialModalEndDate" :isEditModal="isEditModal" v-on:close2="restartModal"/>

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
import calendar_newTask_modal from './calendar.newTask.modal';
import calendar_map from './calendar.map';
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
import CalendarInnerTaskWidget from './calendar.inner.task.widget';
import Vue from 'vue';
import {set, getHours, getMinutes, getSeconds} from 'date-fns';

export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Calendar v1'
  },
  name: 'calendar.dashboard.v1',
  components: {
    calendar_newTask_modal,
    CalendarProgressBar,
    VueTimepicker,
    CalendarTaskView,
    CalendarNavBar,
    'calendar': Calendar,
    LMap,
    LTileLayer,
    CalendarTaskWidget,
    calendar_map
  },
  computed: {
    ...mapGetters([
      'getSelectedMapView',
      'getSelectedComponentView',
      'getShowNewTaskModal',
      'getSearchTaskText',
      'VENDOR_LIST', 'CLIENTS_LIST',
      'TASKS_LIST',
            'getExpiredTasks',
            'getNowTasks',
            'getSoonTasks',
            'getEarlyTasks',
            'getPendingTasks'
    ]),
    showMap() {
      return this.getSelectedComponentView === 'Map';
    },
    showTaskView() {
      return this.getSelectedComponentView === 'Tasks';
    },
    scheduleList() {
      return this.tasksFiltered.map(x => {return x.additionalInfo.tui_data;});
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
    },
    tasksFiltered: function () {
      return this.filterTASKSearch(this.TASKS_LIST);
    }


  },
  data() {
    return {
      scheduleSelected: null,
      initialModalDate: null,
      initialModalEndDate: null,
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
  created() {
  },
  mounted() {
    const client_params = {
      limit: 1000
    };

    this.$store.dispatch('GET_PROFILE');

    this.$store.dispatch('GET_CLIENTS_LIST', client_params);

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
      'togglePrevCalendar',
      'toggleNextCalendar'
    ]),
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
      let start = this.$moment(schedule.start.toUTCString());

      if ( taskSelected === null || taskSelected === undefined ){
        return '';
      }

      let ComponentClass = Vue.extend(CalendarInnerTaskWidget);
      let instance = new ComponentClass({
        propsData: { task: taskSelected, startDate: start.format('HH:mm') }
      });
      instance.$mount();
      let tmpNode = document.createElement( 'div' );
      tmpNode.appendChild( instance.$el.cloneNode( true ) );
      let str = tmpNode.innerHTML;
      tmpNode = null; // prevent memory leaks in IE
      return str;
      // let calendar = calendarList.find(({ name }) => name === taskSelected.additionalInfo.status);
      //
      // console.log('schedule Tui', schedule);
      // console.log('schedule Plani', taskSelected);
      //
      // if ( !isAllDay ) {
      //   // html.push('<span style="background:' + schedule.borderColor + '">' + start.format('HH:mm') + '</span> ');
      //   html.push(`<span class="align-self-strech" style="background:${calendar.color}; color: #fff;">`
      //     + start.format('HH:mm') + '</span> ');
      // }
      // html.push(`<span class="align-self-stretch" style="background:${calendar.bgColor}; flex-basis: 100%; color: #000;">` + schedule.title + '</span> ');
      // html.push(`<div class="avatar mr-2" style="'background': ${taskSelected.additionalInfo.status === 'expired' ? '#FFFFFF': '#e1e4e1'};` +
      //     `'color': ${taskSelected.additionalInfo.status === 'expired' ? '#e1e4e1': '#FFFFFF'};">`+
      //     `<div class="avatar-content">${!taskSelected.additionalInfo.client_data ? 'N/A' : taskSelected.additionalInfo.client_data.additionalInfo.name.slice(0,2)}</div></div>`);
      // html.push('' + '</div>');
      // return html.join(' ');
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
      this.initialModalDate = new Date(e.start);
      if(this.getSelectedMapView === 'month') {
        console.log("en el if---------------------");
        const now = new Date();
        this.initialModalDate = set(this.initialModalDate,
                {
                  hours: getHours(now),
                  minutes: getMinutes(now),
                  seconds: getSeconds(now)
                }
        )
      }
      else {
        console.log("en el else---------------------", this.getSelectedMapView);
        this.initialModalEndDate = new Date(e.end);
      }
      this.showNewTaskModal();
      this.refreshScheduleVisibility();
      // this.saveNewSchedule(e);
    },
    onBeforeDeleteSchedule(e) {
      // implement your code
      console.log('En el delete');
      console.log('beforeDeleteSchedule', e);
      this.deleteTask(e.schedule);
    },
    onClickChip(task) {
      this.isEditModal = true;
      this.$store.dispatch('SET_TASK_SELECTED_ACTION', task);
      this.$bvModal.show("new_task_form_1")
    },
    onBeforeUpdateSchedule(e) {
      // implement your code
      console.log('Update', e);
      e.schedule.start = e.start;
      e.schedule.end = e.end;
      const id = e.schedule.id;
      const taskSelected = this.TASKS_LIST[id];
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
      console.log('On click onClickSchedule', e);
      const id = e.schedule.id;
      const taskSelected = this.TASKS_LIST[id];
      this.isEditModal = true;
      this.$store.dispatch('SET_TASK_SELECTED_ACTION', taskSelected);
      this.$bvModal.show("new_task_form_1")
      // this.setShowNewTaskModal(true);
    },
    // eslint-disable-next-line no-unused-vars
    onClickTimezonesCollapseBtn(e) {
      console.log('On click onClickTimezonesCollapseBtn');
      console.log(e);
      // implement your code
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
      const newArray = this.tasksFiltered.filter( x => !x.additionalInfo.start_time && x.additionalInfo.start_date);
      console.log('newArray--------------', newArray);
      //const a = this.TASKS_LIST.filter(x => x.additionalInfo.status === 'early' || x.additionalInfo.status === 'now' || x.additionalInfo.status === 'soon');
      const final = newArray.sort(this.sortTop);
      console.log('final!!!!!!!!!!!!!!!!!!!!!!!!!', final);
      return final;

    },
    filterTASKSearch (list) {
      return list.filter(task => {
        let expired = this.getExpiredTasks;
        let now = this.getNowTasks;
        let soon = this.getSoonTasks;
        let early = this.getEarlyTasks;
        let pending = this.getPendingTasks;

        switch (task.additionalInfo.status) {
          case 'expired':{
            if (!expired) {
              return false;
            }
          }break;
          case 'now': {
            if (!now){
              return false;
            }
          }break;
          case 'soon': {
            if (!soon){
              return false;
            }
          }break;
          case 'early': {
            if (!early){
              return false;
            }
          }break;
          case 'pending': {
            if (!pending){
              return false;
            }
          }break;
        }
        return this.TASKS_LIST.find(x => x.id.id === task.id.id).additionalInfo.name.toLowerCase().match(this.getSearchTaskText.toLowerCase());
      });
    },

    restartModal() {
      console.log("cambiando isEditModal");
      this.isEditModal = false;
      this.initialModalDate = null;
      this.initialModalEndDate = null;
    },
    showNewTaskModal() {
      //this.setShowNewTaskModal(true);
      console.log("aqui en el boton");
      this.$bvModal.show('new_task_form_1');
    },


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

  .card-tasks-scrollable{
    width: auto;
    height: 100%;
    position: relative;
    overflow-x: scroll;
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

  .tui-full-calendar-time-schedule-content{
    border-left-style: none;
    padding: 0;
    border-left-width: 0;
  }

  .task .avatar {
    background-color: #e1e4e1;
    display: flex;
    width: 2.857em;
    height: 2.857em;
    margin: 2px 0;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    align-self: center;
    color: #FFFFFF;
    //transform: translate(-8px);
  }

  .task .avatar .avatar-content {
    top: 0;
    font-size: 1.5em;
    text-transform: uppercase;
  }

  .task .task-body .avatar img {
    border-radius: 50%;
    height: 24px;
    width: 24px;
  }

</style>
