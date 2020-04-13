<template>
    <div>
        <calendar-nav-bar/>
        <calendar_task_view v-if="showTaskView"/>
        <div v-else class="main-content">


            <div class="wrapper">
                <div class="no-card-shadow container " id="card-drag-area-1" v-dragula bag="first-bag">
                    <div class="task chip mr-1"
                         v-bind:class="{nowChip: task.additionalInfo.status === 'now', soonChip: task.additionalInfo.status === 'soon', earlyChip: task.additionalInfo.status === 'early'}"
                         v-for="(task, indexTask) in TASKS_LIST.filter(x => x.additionalInfo.status === 'early' || x.additionalInfo.status === 'now')"
                    >
                        <div class="task-body">

                            <span class="task-text ml-4">
                                <b>{{task.additionalInfo.client_data.additionalInfo.social_reason}}</b>
                                <br>
                                {{task.additionalInfo.name}}
                                <br>
                                Último contacto: {{task.additionalInfo.start_date}}
                            </span>
                            <!--<div class="avatar ml-auto">
                                <div class="avatar-content">
                                    LD
                                </div>
                            </div>-->
                        </div>
                    </div>
                </div>
            </div>

            <b-row>
                <b-col lg="9" xl="9" md="8" sm="11">
                    <b-card>
                        <div class="d-flex">
                            <calendar style="height: 800px;"
                                      class="w-100"
                                      ref="tuiCalendar"
                                      :calendars="calendarList"
                                      :schedules="TASKS_LIST.map( x => x.additionalInfo.tui_data)"
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
                        <div>

                        </div>
                    </b-card>
                </b-col>
                <b-col lg="2" xl="2" md="3" sm="11">
                    <b-row class="d-flex flex-column">
                        <b-card class="box-shadow-1 card flex-fill">
                            <b-card-header class="align-items-center d-flex">
                                <h4 class="card-title flex-grow-1">
                                    Expiradas
                                </h4>
                                <b-dropdown
                                        id="dropdown-2"
                                        left
                                        class="m-md-2  ml-auto"
                                        toggle-class="text-decoration-none"
                                        no-caret
                                        variant="button"
                                >
                                    <template slot="button-content">
                                        <i class="i-Bell text-muted header-icon"/>
                                        <span>New order received</span>
                                    </template>
                                    <div class="dropdown-item d-flex">
                                        <div class="notification-icon">
                                            <i class="i-Speach-Bubble-6 text-primary mr-1"/>
                                        </div>
                                    </div>
                                    <div class="dropdown-item d-flex">
                                        <div class="notification-icon">
                                            <i class="i-Receipt-3 text-success mr-1"/>
                                        </div>
                                        <div class="notification-details flex-grow-1">
                                            <p class="m-0 d-flex align-items-center">
                                                <span>New order received</span>
                                                <!-- <span class="badge badge-pill badge-success ml-1 mr-1">new</span> -->
                                                <span class="flex-grow-1"/>
                                                <span class="text-small text-muted ml-auto">2 hours ago</span>
                                            </p>
                                            <p class="text-small text-muted m-0">1 Headphone, 3 iPhone x</p>
                                        </div>
                                    </div>
                                    <div class="dropdown-item d-flex">
                                        <div class="notification-icon">
                                            <i class="i-Empty-Box text-danger mr-1"/>
                                        </div>
                                        <div class="notification-details flex-grow-1">
                                            <p class="m-0 d-flex align-items-center">
                                                <span>Product out of stock</span>
                                                <!-- <span class="badge badge-pill badge-danger ml-1 mr-1">3</span> -->
                                                <span class="flex-grow-1"/>
                                                <span class="text-small text-muted ml-auto"
                                                >10 hours ago</span
                                                >
                                            </p>
                                            <p class="text-small text-muted m-0">
                                                Headphone E67, R98, XL90, Q77
                                            </p>
                                        </div>
                                    </div>
                                    <div class="dropdown-item d-flex">
                                        <div class="notification-icon">
                                            <i class="i-Data-Power text-success mr-1"/>
                                        </div>
                                        <div class="notification-details flex-grow-1">
                                            <p class="m-0 d-flex align-items-center">
                                                <span>Server Up!</span>
                                                <!-- <span class="badge badge-pill badge-success ml-1 mr-1">3</span> -->
                                                <span class="flex-grow-1"/>
                                                <span class="text-small text-muted ml-auto"
                                                >14 hours ago</span
                                                >
                                            </p>
                                            <p class="text-small text-muted m-0">
                                                Server rebooted successfully
                                            </p>
                                        </div>
                                    </div>
                                </b-dropdown>
                            </b-card-header>
                            <b-card-body >

                                <div class="card-body wrapper" >
                                    <ul id="card-drag-area-2" class="list-group list-group-flush container" v-dragula bag="first-bag">


                                        <div class="task chip mr-1 expiredChip" v-for="(task, indexTask) in TASKS_LIST.filter(x => x.additionalInfo.status === 'expired')">
                                            <div class="task-body">
                                                <span class="task-text ml-4">
                                                    <b>{{task.additionalInfo.client_data.additionalInfo.social_reason}}</b>
                                                    <br>
                                                    {{task.additionalInfo.name}}
                                                    <br>
                                                    Último contacto: {{task.additionalInfo.start_date}}
                                                </span>
                                                <!--<div class="avatar ml-auto">
                                                    <div class="avatar-content">
                                                        LD
                                                    </div>
                                                </div>-->
                                            </div>
                                        </div>
                                    </ul>
                                </div>

                            </b-card-body>
                        </b-card>
                    </b-row>
                    <b-row class="d-flex flex-column">
                        <b-card class="box-shadow-1 card flex-fill">
                            <b-card-header class="align-items-center d-flex">
                                <h4 class="card-title flex-grow-1">
                                    Pendientes
                                </h4>
                            </b-card-header>
                            <b-card-body>
                                <div class="card-body wrapper">
                                    <ul id="card-drag-area-2 container" class="list-group list-group-flush" v-dragula  bag="first-bag">
                                        <div class="task chip mr-1 pendingChip"  v-for="(task, indexTask) in TASKS_LIST.filter(x => x.additionalInfo.status === 'pending')">
                                            <div class="task-body">
                                                <span class="task-text ml-4">
                                                    <b>{{task.additionalInfo.client_data.additionalInfo.social_reason}}</b>
                                                    <br>
                                                    {{task.additionalInfo.name}}
                                                    <br>
                                                    Último contacto: {{task.additionalInfo.start_date}}
                                                </span>

                                                <!--<div class="avatar ml-auto">
                                                    <div class="avatar-content">
                                                        LD
                                                    </div>
                                                </div>-->
                                            </div>
                                        </div>
                                    </ul>
                                </div>

                            </b-card-body>
                        </b-card>
                    </b-row>
                </b-col>
            </b-row>




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
                                <b-form-input type="text" v-model="newTaskForm.name" />
                            </b-form-group>
                            <b-form-group
                                    label="Ubicación"
                            >
                                <b-form-input type="text" v-model="newTaskForm.address" />
                            </b-form-group>
                            <b-form-group
                                    label="Asignar vendedr"
                            >
                                <b-form-select :change="getVendorClients()" v-model="newTaskForm.vendor_id" :options="VENDOR_LIST.map(function (x) { return {value: x.id.id, text: x.additionalInfo.firstName + ' ' + x.additionalInfo.lastName}})"/>
                            </b-form-group>
                            <b-form-group
                                    label="Notas"
                            >
                                <b-form-textarea v-model="newTaskForm.notes"/>
                            </b-form-group>

                        </b-col>
                        <b-col md="5">
                            <b-form-group
                                    label="Cliente"
                            >
                                <b-form-select placeholder="Select a vendor first" v-model="newTaskForm.client_id"  :options="CLIENTS_LIST.map(function (x) { return {value: x.id.id, text: x.name}})"/>
                            </b-form-group>
                            <b-form-group
                                    label="Fecha"
                            >

                                <b-form-datepicker id="example-datepicker" v-model="newTaskForm.start_date" class="mb-2"></b-form-datepicker>
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
                            <b-form-group
                                    label="Rutina"
                            >
                                <b-form-select v-model="newTaskForm.routine" :options="routineOptions"/>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </div>
                <template  v-slot:modal-footer="{ ok, cancel, hide }">
                    <div class="d-flex justify-content-around" >
                        <b-button size="sm" variant="danger" @click="deleteOrCancel()">
                            {{isEditModal ? "Eliminar" : "Cancelar"}}
                        </b-button>
                        <b-button size="sm" variant="success" @click="createOrUpdate()">
                            {{isEditModal ? "Editar" : "Crear tarea"}}
                        </b-button>
                    </div>



                </template>
            </b-modal>
        </div>


    </div>
</template>

<script>
    import { Calendar } from '@toast-ui/vue-calendar';
    import 'tui-calendar/dist/tui-calendar.css';
    import VueTimepicker from 'vue2-timepicker'


    import 'tui-date-picker/dist/tui-date-picker.css';
    import 'tui-time-picker/dist/tui-time-picker.css';
    import CalendarNavBar from './calendarNavbar/calendarNavBar';
    import { mapGetters, mapActions } from 'vuex';
    import { LMap, LTileLayer } from 'vue2-leaflet';
    import  { calendarList,
        scheduleList,
        view,
        taskView,
        scheduleView,
        theme,
        week,
        month,
        timezones,
        disableDblClick,
        isReadOnly,
        template,
        useCreationPopup,
        useDetailPopup } from './data/calendarConfiguration';
    import { taskCategories, vendors, clients, routines } from './data/formData';
    import Calendar_task_view from './calendar.tasks.view';

    export default {
        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: 'Calendar v1'
        },
        name: 'calendar.dashboard.v1',
        components: {
            VueTimepicker,
            // eslint-disable-next-line vue/no-unused-components
            Calendar_task_view,
            CalendarNavBar,
            Calendar,
            'calendar': Calendar,
            LMap,
            LTileLayer,
        },
        computed: {
            ...mapGetters(['getSelectedMapView', 'getSelectedComponentView', 'getShowNewTaskModal', 'getSearchText', 'VENDOR_LIST', 'CLIENTS_LIST', "TASKS_LIST"]),
            showMap() {
                return this.getSelectedComponentView === 'Map';
            },
            showTaskView() {
                return this.getSelectedComponentView === 'Tasks';
            },
            getModalTitle() {
                return this.isEditModal ? 'Editar o eliminar tarea' : 'Agregar nueva tarea';
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
                    center: [ -1.224882, -78.601685],
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
                    routine: ''
                },
                tuiCalendar: '',
                calendarList,
                scheduleList,
                view,
                taskView,
                scheduleView,
                theme,
                week,
                month,
                timezones,
                disableDblClick,
                isReadOnly,
                template,
                useCreationPopup,
                useDetailPopup

            };
        },
        mounted() {
            this.$store.dispatch('GET_VENDOR_LIST');
            this.$store.dispatch('GET_TASKS_LIST');
            this.setTuiCalendarRef();
            // this.view = this. this.getSelectedMapView();
            // eslint-disable-next-line no-unused-vars
            this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'setSelectedMapView') {
                    setTimeout(() => {
                        this.setTuiCalendarRef();
                        // var options = this.tuiCalendar.invoke("getOptions");
                        this.tuiCalendar.invoke('changeView', this.getSelectedMapView);
                    }, 0 );
                }
                else if(mutation.type === 'setShowNewTaskModal') {
                    if(mutation.payload){
                        this.$bvModal.show('newTask_modal');
                    }
                    else {
                        this.$bvModal.hide('newTask_modal');
                    }
                }
            });
        },
        methods: {
            ...mapActions(['GET_VENDOR_LIST', 'GET_CLIENTS_LIST', 'setShowNewTaskModal']),
            getVendorClients() {
                console.log('IN getVendors clients', this.newTaskForm.client_id);
                console.log('sss', this.newTaskForm);
                const vendor_id = this.newTaskForm.vendor_id;
                const payload = {vendor_id: vendor_id, limit: 10000, textSearch: null};
                this.$store.dispatch('GET_VENDOR_CLIENTS', payload);
            },
            saveTask() {
                console.log('form', this.newTaskForm);
                this.$store.dispatch('POST_TASK', this.newTaskForm)
                    .then(result => {
                        console.log(result);
                        this.$store.dispatch('GET_TASKS_LIST');
                    });
                this.hideModal();
            },

            // map functions
            zoomUpdated (zoom) {
                this.mapConfigurations.zoom = zoom;
            },
            centerUpdated (center) {
                this.mapConfigurations.center = center;
            },
            boundsUpdated (bounds) {
                this.mapConfigurations.bounds = bounds;
            },
            //
            setTuiCalendarRef() {
                this.tuiCalendar = this.$refs.tuiCalendar;
            },
            findCalendar(id) {
                var found;
                console.log(id);
                console.log(this.CalendarList);
                this.calendarList.forEach(function (calendar) {
                    if (calendar.id === id) {
                        found = calendar;
                    }
                });

                return found || this.CalendarList[0];
            },
            saveNewSchedule(scheduleData) {
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
                    raw: {
                        class: scheduleData.raw['class']
                    },
                    state: scheduleData.state
                };
                if (calendar) {
                    schedule.calendarId = calendar.id;
                    schedule.color = calendar.color;
                    schedule.bgColor = calendar.bgColor;
                    schedule.borderColor = calendar.borderColor;
                }

                this.tuiCalendar.invoke('createSchedules',[schedule]);

                this.refreshScheduleVisibility();
            },
            refreshScheduleVisibility() {
                console.log('en render refresh');
                var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));

                this.calendarList.forEach((calendar) => {
                    this.tuiCalendar.invoke('toggleSchedules', [calendar.id, !calendar.checked, false]);
                });

                this.tuiCalendar.invoke('render', true);
                calendarElements.forEach(function (input) {
                    var span = input.nextElementSibling;
                    span.style.backgroundColor = input.checked ? span.style.borderColor : 'transparent';
                });
            },
            onAfterRenderSchedule(e) {
                // implement your code
                console.log('AfterRender', e);
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
            onBeforeUpdateSchedule(e) {
                // implement your code
                console.log('Update', e);
                e.schedule.start = e.start;
                e.schedule.end = e.end;
                if(e.changes.title)
                    e.schedule.title = e.changes.title;
                if(e.changes.location)
                    e.schedule.location = e.changes.location;
                if(e.changes.state)
                    e.schedule.state = e.changes.state;
                this.tuiCalendar.invoke('updateSchedule', e.schedule.id, e.schedule.calendarId, e.schedule);
            },
            // eslint-disable-next-line no-unused-vars
            onClickDayname(e) {
                console.log('On click onClickDayname')
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
                this.newTaskForm = {
                    category: taskSelected.additionalInfo.category,
                    name: taskSelected.additionalInfo.name,
                    address: taskSelected.additionalInfo.address,
                    lat: taskSelected.additionalInfo.category,
                    lng: taskSelected.additionalInfo.category,
                    vendor_id: taskSelected.customerId.id,
                    notes: taskSelected.additionalInfo.notes,
                    client_id: taskSelected.additionalInfo.category,
                    start_date: taskSelected.additionalInfo.start_date,
                    start_time: taskSelected.additionalInfo.start_time,
                    duration: taskSelected.additionalInfo.duration,
                    reminder: taskSelected.additionalInfo.reminder,
                    routine: taskSelected.additionalInfo.routine
                };
                this.setShowNewTaskModal(true);

                console.log(e);
                // implement your code
            },
            // eslint-disable-next-line no-unused-vars
            onClickTimezonesCollapseBtn(e) {
                console.log('On click onClickTimezonesCollapseBtn')
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
                    routine: ''
                }
            },
            hideModal() {
                this.setShowNewTaskModal(false);
                this.clearFormData();
                this.isEditModal = false;
            },
            resetModal() {
                this.hideModal();
            },
            deteteTask(schedule) {
                console.log("in delete x2" , schedule);

                const task = this.TASKS_LIST[schedule.id];
                const task_id = task.id.id;
                this.$store.dispatch('DELETE_TASK', task_id)
                    .then(x => {
                        this.$store.dispatch('GET_TASKS_LIST');
                    });

                this.tuiCalendar.invoke('deleteSchedule', schedule.id, schedule.calendarId);
            },
            deleteOrCancel() {
                if(this.isEditModal) { // delete is avaliable
                    console.log("in delete");
                    this.deteteTask(this.scheduleSelected);
                    this.resetModal();
                }
                else {
                    this.resetModal();
                }
            },
            editTask(task_id) {
                const payload = {
                    task_id: task_id,
                    data: this.newTaskForm
                };
                this.$store.dispatch('UPDATE_TASK', payload)
                    .then(response => {
                        this.$store.dispatch('GET_TASKS_LIST');
                    })
            },
            createOrUpdate() {
                console.log("is edit", this.isEditModal);

                if(this.isEditModal) {
                    console.log('In edit task');
                    const schedule_id = this.scheduleSelected.id;
                    const task_id = this.TASKS_LIST[schedule_id].id.id;
                    this.editTask(task_id);
                    this.resetModal();
                }
                else {
                    console.log('IN save task');
                    this.saveTask();
                }
            }

        },
    };
</script>

<style scoped>
    @import '~vue2-timepicker/dist/VueTimepicker.css';
    .expiredChip {
        position:relative;
    }
    .expiredChip:after {
        content:'\A';
        position:absolute;
        background:black;
        border-radius: 0.8rem;
        border-bottom-right-radius: 0rem;
        border-top-right-radius: 0rem;
        top:0; bottom:0;
        left:0;
        width:10%;
    }

    .pendingChip {
        position:relative;
    }
    .pendingChip:after {
        content:'\A';
        position:absolute;
        background:grey;
        border-radius: 0.8rem;
        border-bottom-right-radius: 0rem;
        border-top-right-radius: 0rem;
        top:0; bottom:0;
        left:0;
        width:10%;
    }

    .soonChip {
        position:relative;
    }
    .soonChip:after {
        content:'\A';
        position:absolute;
        background:yellow;
        border-radius: 0.8rem;
        border-bottom-right-radius: 0rem;
        border-top-right-radius: 0rem;
        top:0; bottom:0;
        left:0;
        width:10%;
    }

    .earlyChip {
        position:relative;
    }
    .earlyChip:after {
        content:'\A';
        position:absolute;
        background: greenyellow;
        border-radius: 0.8rem;
        border-bottom-right-radius: 0rem;
        border-top-right-radius: 0rem;
        top:0; bottom:0;
        left:0;
        width:10%;
    }

    .nowChip {
        position:relative;
    }
    .nowChip:after {
        content:'\A';
        position:absolute;
        background: darkred;
        border-radius: 0.8rem;
        border-bottom-right-radius: 0rem;
        border-top-right-radius: 0rem;
        top:0; bottom:0;
        left:0;
        width:10%;
    }

</style>
