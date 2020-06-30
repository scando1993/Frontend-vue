<template>
    <b-modal id="new_task_form_1" @show="onShow" @hide="hideNewTaskForm" hide-footer  centered hide-header size="lg">
        <div class="client-modal">
            <div class="card-header p-1" style="background: #00b3ee"></div>
            <div class="client-modal-header">
                <div class="d-flex flex-row justify-content-between">
                    <button v-on:click="hideForm(); createClickGAEvent('CALENDAR_X_CLOSE_MODAL', 'CLICK', 'TASK', null)" class="btn client-modal-close-btn">X</button>
                    <p class="client-modal-heading">{{getModalTitle}}</p>
                    <div></div>
                </div>

            </div>
            <b-form ref="formNewTask" @submit.stop.prevent @submit="getConditionalSubmit" @reset="hideNewTaskForm">
                <div>
                    <b-row>
                        <b-col md="7">
                            <b-form-group
                                    label="Categoria de tarea"
                            >
                                <b-form-select required
                                               placeholder="Escoja una categoria"
                                               v-model="newTaskForm.category" :options="taskOptions"/>
                            </b-form-group>

                            <b-form-group
                                    label="Actividad"
                            >
                                <b-form-input
                                        required
                                        placeholder="Escriba el nombre de la actividad"
                                        type="text" v-model="newTaskForm.name"/>
                            </b-form-group>
                            <b-form-group
                                    label="Ubicación"
                            >
                                <b-form-input
                                        placeholder="Ubicación de la actividad"
                                        type="text" v-model="newTaskForm.address"/>
                            </b-form-group>
                            <b-form-group
                                    label="Vendedor Asignado"
                            >
                                <b-form-input
                                        disabled="true"
                                        placeholder="Este cliente no tiene vendedor asignado"
                                        type="text"
                                        :value="getVendorName"
                                />
                            </b-form-group>
                            <b-form-group
                                    label="Notas"
                            >
                                <b-form-textarea
                                        placeholder="..."
                                        class="pb-4"
                                        v-model="newTaskForm.notes"/>
                            </b-form-group>


                        </b-col>
                        <b-col md="5">
                            <b-form-group
                                    label="Cliente"
                                    :invalid-feedback="clientSeletection_invalidFeedback"
                                    :state="clientSelection_state"
                            >
                                <model-select
                                        required
                                        :isError="clientSelection_state"
                                        placeholder="Busca y selecciona a un cliente"
                                        v-model="newTaskForm.client_id"
                                               :options="clientsFiltered.map(function (x) { return {value: x.id.id, text: x.additionalInfo.name}})"/>
                            </b-form-group>
                            <b-form-group
                                    label="Fecha"
                            >
                                <b-form-datepicker
                                        :min="new Date()"
                                        today-variant="primary"
                                        id="example-datepicker"
                                        v-model="newTaskForm.start_date"
                                                   class="mb-2"></b-form-datepicker>
                            </b-form-group>
                            <b-form-group
                                    label="Hora"
                            >
                                <b-form-timepicker
                                        :disabled="!timeStateEnable"
                                        v-model="newTaskForm.start_time" locale="en"></b-form-timepicker>
                            </b-form-group>
                            <b-form-group
                                    label="Recordatorio"
                            >
                                <div class="d-flex align-content-between align-items-center">
                                    <b-form-input
                                            :disabled="!durationStateEnable"
                                            type="number"
                                            min="1"
                                            trim="true"
                                            class="px-2"
                                            placeholder="Ingrese un valor"
                                            v-model="reminder_value" locale="en"></b-form-input>
                                    <b-form-select
                                                   class="px-2"
                                                   v-model="reminder_option_selected"
                                                   :disabled="!durationStateEnable"
                                                   placeholder="Escoja una categoria"
                                                    :options="reminder_options"/>

                                </div>
                                <div class="mt-1 d-flex justify-content-end text-bold">
                                    <h6>{{getReminderDisplay || 'Sin recordatorio'}}</h6>
                                </div>
                            </b-form-group>
                            <b-form-group
                                    label="Duracion"
                            >
                                <b-form-timepicker
                                        :required="!durationStateEnable"
                                        :disabled="!durationStateEnable"
                                         v-model="newTaskForm.duration"
                                        :hour12="false"
                                />
                                <!--<vue-timepicker v-model="newTaskForm.duration" ></vue-timepicker>-->

                            </b-form-group>
                            <b-form-group v-if="isEditModal"
                                          label="Tarea completada"
                            >
                                <div class="d-flex d-inline  justify-content-center">
                                    <div class="align-items-center justify-content-center" >
                                        <b-form-radio v-model="newTaskForm.completed" name="completed_radios" :value="true" v-on:input="setTaskState()">
                                            <p class="text-13">Tarea completada</p>
                                        </b-form-radio>
                                        <b-form-radio v-model="newTaskForm.completed" name="completed_radios" :value="false" v-on:input="setTaskState()">
                                            <p class="text-13">Tarea sin completar</p>
                                        </b-form-radio>
                                    </div>
                                </div>
                            </b-form-group>

                        </b-col>
                    </b-row>
                </div>
                <div class=" d-flex justify-content-around">
                    <div v-if="!isEditModal">
                        <button class="btn client-modal-btn" type="reset" >Cancelar</button>
                        <button class="btn client-modal-btn" type="submit" >Crear Tarea</button>
                    </div>
                    <div v-else>
                        <button class="btn client-modal-btn" @click="deteteTask()">Eliminar</button>
                        <button class="btn client-modal-btn" type="submit" v-if="!newTaskForm.completed">Editar</button>
                    </div>
                </div>
            </b-form>
        </div>
    </b-modal>
</template>

<script>
    import {taskCategories} from './data/formData';
    import {mapGetters} from 'vuex';
    import { ModelSelect } from 'vue-search-select'
    import {format, differenceInHours, differenceInMinutes} from 'date-fns';
    export default {
        name: "calendar_newTask_modal",
        props: {
          isEditModal: {
              type: Boolean,
              required: true
          },
            initialDate: {
              type: Date,
                required: false
            },
            initialEndDate: {
              type: Date,
                required: false
            }
        },
        components: {
            ModelSelect
        },
        data() {
            return {
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
                    completed: '',
                    reminder_form_selection: ''
                },
                taskCategories,
                taskOptions: taskCategories,
                initial_date: new Date(),
                reminder_options: [
                    {value: 'minutes', text: "minutos"},
                    {value: 'hours', text: "horas"},
                    {value: 'days', text: "días"},
                    {value: 'weeks', text: "semanas"}
                ],
                reminder_option_selected: 'minutes',
                reminder_value: ''

            }
        },
        computed: {
            ...mapGetters(['TASK_SELECTED', 'CLIENT_VENDOR', 'CLIENTS_LIST', 'loggedInUser', 'PROFILE']),
            timeStateEnable: function () {
                if (this.newTaskForm.start_date) {
                    return true
                }
                return false
            },
            durationStateEnable: function () {
                if (this.newTaskForm.start_time) {
                    if (this.newTaskForm.duration===''){
                        this.newTaskForm.duration = '01:00:00';
                    }
                    return true
                }else {
                    return false
                }

            },
            clientsFiltered: function () {
                // filter no active clients
                const onlyActiveClients = this.CLIENTS_LIST.filter( x => x.additionalInfo.activated);

                if(this.loggedInUser.admin) {

                    var noPrivate = onlyActiveClients.filter(x => x.additionalInfo.social_reason !== '_private_')

                    if(this.PROFILE) {
                        const profileInfo = this.PROFILE.additionalInfo;
                        const privateName = '_private_' + this.PROFILE.additionalInfo.firstName + ' ' + this.PROFILE.additionalInfo                                                                                     .lastName;
                        const ownClient = onlyActiveClients.find(x => x.additionalInfo.name === privateName);
                        if(ownClient) {
                            ownClient.additionalInfo.name = '(YO)'
                            noPrivate.push(ownClient);
                        }
                    }

                    return noPrivate

                }
                else {
                    return onlyActiveClients.map( function (x) {
                        if(x.additionalInfo.social_reason === '_private_') {
                            x.additionalInfo.name = '(YO)';
                        }
                        return x;
                    })
                }
            },
            getModalTitle: function () {
                return this.isEditModal ? 'Editar Tarea' : 'Nueva Tarea'
            },
            getVendorName: function () {
                if(!this.CLIENT_VENDOR) {
                    return '';
                }
                return this.CLIENT_VENDOR.additionalInfo.firstName + ' ' + this.CLIENT_VENDOR.additionalInfo.lastName
            },
            clientSelection_state: function () {
                return this.newTaskForm.client_id === '';
            },
            clientSeletection_invalidFeedback: function () {
                if(this.newTaskForm.client_id ) {
                    return ''
                }
                return 'Por favor selecciona a un cliente'

            },
            getReminderDisplay: function () {
                const option_selected = this.reminder_option_selected;
                if(!option_selected || !this.reminder_value )
                    return '';
                return this.reminder_value + " " + this.reminder_options.find( x=> x.value === option_selected).text + " antes"
            },
        },
        mounted: {

        },
        updated: function () {
            /*
            this.$nextTick(function () {
                if(!this.isEditModal) {
                    console.log("en el watch de isEdit");
                    const now = new Date();
                    const date_fomated = format(now, 'yyyy-MM-dd');
                    const hour_formated = format(now, 'hh:mm:ss');
                    this.newTaskForm.start_date = date_fomated;
                    this.newTaskForm.start_time = hour_formated;

                }
            })
            */
        },
        methods: {

            getVendorClients() {
                // console.log('IN getVendors clients', this.newTaskForm.client_id);
                // console.log('sss', this.newTaskForm);
                const vendor_id = this.newTaskForm.vendor_id;
                const payload = { vendor_id: vendor_id, limit: 10000, textSearch: null };
                this.$store.dispatch('GET_VENDOR_CLIENTS', payload);
            },
            getClientVendor() {
                // console.log('IN getVendors clients', this.newTaskForm.client_id);
                // console.log('sss', this.newTaskForm);
                const client_id = this.newTaskForm.client_id;
                this.$store.dispatch('GET_CLIENT_VENDOR', client_id);
            },
            hideForm() {
                // console.log('en hide fomr');
                // this.$store.dispatch('SET_SHOW_NEW_TASK_CLIENT_FORM_ACTION', false);
                this.$bvModal.hide("new_task_form_1");
                this.clearFormData();

            },
            async createTask() {
                this.newTaskForm.category = new Number(this.newTaskForm.category);
                this.newTaskForm.reminder = this.getReminderPost();
                this.newTaskForm.reminder_form_selection = this.get_Reminder_form_selection();

                const data = JSON.parse(JSON.stringify(this.newTaskForm));
                const client_id = this.newTaskForm.client_id;
                const vendor_id = this.newTaskForm.vendor_id;

                delete data.client_id;
                delete data.vendor_id;

                var task;
                try {
                    task = (await this.$store.dispatch('POST_TASK', data)).data.data;
                }
                catch (e) {
                    return
                }
                // setting client
                var payload = {
                    task_id: task.id.id,
                    client_id: client_id
                };
                var clientReslation;
                try {
                    clientReslation = await this.$store.dispatch('SET_TASK_CLIENT', payload);
                } catch (e) {
                    this.deteteTask(task.id.id);
                    return
                }
                if(clientReslation && vendor_id) {
                    payload = {
                        task_id: task.id.id,
                        vendor_id: vendor_id
                    };
                    var vendorRelation;
                    try {
                        vendorRelation = await this.$store.dispatch('SET_TASK_VENDOR', payload);
                    } catch (e) {
                        this.deteteTask(task.id.id);
                    }
                }
                this.fetchTaskData();


            },
            hideNewTaskForm() {
                this.$bvModal.hide("new_task_form_1");
                this.clearFormData();
                this.$emit('close2', true);
            },
            getConditionalSubmit(e) {
                if(!this.newTaskForm.client_id) {
                    e.preventDefault();
                    return false
                }


                if(this.isEditModal) {
                    this.editTask();
                }
                else
                    this.createTask();
                this.hideNewTaskForm();

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
                    completed: '',
                };
                this.reminder_option_selected = 'minutes';
                this.reminder_value = '';
                this.$store.dispatch('SET_CLIENT_VENDOR_ACTION', null);
                this.$store.dispatch('SET_TASK_SELECTED_ACTION', null);
            },
            setFormData(taskSelected) {
                this.newTaskForm = {
                    category: (taskSelected.additionalInfo.category).toString(),
                    name: taskSelected.additionalInfo.name || '',
                    address: taskSelected.additionalInfo.address || '',
                    lat: taskSelected.additionalInfo.lat,
                    lng: taskSelected.additionalInfo.lng,
                    vendor_id: taskSelected.customerId.id || '',
                    notes: taskSelected.additionalInfo.notes|| '',
                    client_id: taskSelected.additionalInfo.client_data.id.id || '',
                    start_date: taskSelected.additionalInfo.start_date || '',
                    start_time: taskSelected.additionalInfo.start_time || '',
                    duration: taskSelected.additionalInfo.duration || '',
                    reminder: taskSelected.additionalInfo.reminder || '',
                    completed: typeof taskSelected.additionalInfo.completed === 'undefined' ? false :  taskSelected.additionalInfo.completed
                };
                const remiderArray = taskSelected.additionalInfo.reminder_form_selection.split(":");

                this.reminder_option_selected = remiderArray[1];
                this.reminder_value = remiderArray[0];

            },
            async editTask() {
                const task_id = this.TASK_SELECTED.id.id;
                this.newTaskForm.category = Number(this.newTaskForm.category);
                this.newTaskForm.reminder = this.getReminderPost();
                this.newTaskForm.reminder_form_selection = this.get_Reminder_form_selection();

                const newData = JSON.parse(JSON.stringify(this.newTaskForm));
                const vendor_id = this.newTaskForm.vendor_id;
                const client_id = this.newTaskForm.client_id;

                delete newData.vendor_id;
                delete  newData.client_id;

                var client_relation_payload = {
                    task_id: task_id,
                    client_id: client_id
                };
                const vendor_relation_payload = {
                    task_id: task_id,
                    vendor_id: vendor_id
                };
                const update_payload = {
                    task_id: task_id,
                    data: newData
                };

                /*const changeStatusPayload = {
                    task_id: task_id,
                    completed: this.newTaskForm.completed
                };*/

                try {
                    await this.$store.dispatch('UPDATE_TASK', update_payload)
                } catch (e) {
                }

                // setting client
                var clientRelation;
                try {
                    clientRelation = await this.$store.dispatch('SET_TASK_CLIENT', client_relation_payload);
                } catch (e) {
                }
                if(clientRelation && vendor_id) {
                    var vendorRelation;
                    try {
                        vendorRelation = await this.$store.dispatch('SET_TASK_VENDOR', vendor_relation_payload);
                    } catch (e) {
                    }
                }
                this.fetchTaskData();


            },
            async setTaskState(){
                const task_id = this.TASK_SELECTED.id.id;
                const changeStatusPayload = {
                    task_id: task_id,
                    completed: this.newTaskForm.completed
                };
                await this.$store.dispatch('SET_TASK_STATE', changeStatusPayload)
                    .then(response2 => {
                        this.fetchTaskData();
                    });
                //this.fetchTaskData();
                //this.hideNewTaskForm();


            },
            deteteTask(task_id) {
                task_id = task_id ? task_id : this.TASK_SELECTED.id.id;
                this.$store.dispatch('DELETE_TASK', task_id)
                    .then(x => {
                        this.fetchTaskData();
                    });
                this.hideForm();

                // this.$refs.tuiCalendar.invoke('deleteSchedule', schedule.id, schedule.calendarId);
            },
            async fetchTaskData() {
               await this.$store.dispatch('GET_TASKS_LIST').then(response12 => {
                   console.log("YA SE TERMINO DE HACER");
                   this.hideNewTaskForm();
               });
               await  this.$store.dispatch('GET_TASKS_PROGRESS');
            },
            formatReminder(hours, minutes, seconds) {
                if (hours === 0 && minutes === 0 && seconds === 0)
                    return '';
                return hours.toString() + ":" +  minutes.toString() + ":"  + seconds.toString();
            },
            getReminderPost() {
                const reminder_value = this.reminder_value;
                const reminder_selection = this.reminder_option_selected;
                var minutes = 0;
                var hours = 0 ;
                var seconds = 0;

                if(reminder_value) {
                    if(reminder_selection === this.reminder_options[0].value) {
                        minutes = reminder_value;
                    }
                    else if(reminder_selection === this.reminder_options[1].value) {
                        hours = reminder_value;
                    }
                    else if(reminder_selection === this.reminder_options[2].value) {
                        hours = reminder_value * 24;
                    }
                    else if(reminder_selection === this.reminder_options[3].value) {
                        hours = reminder_value * 24 * 7;
                    }
                }

                return this.formatReminder(hours, minutes, seconds);
            },
            basicPrevent(e) {
                if(!this.newTaskForm.client_id) {
                    e.preventDefault();
                    return false
                }
                else {
                    this.hideNewTaskForm();
                }
            },
            onShow() {
                if(this.TASK_SELECTED)
                    this.setFormData(this.TASK_SELECTED);

            },
            get_Reminder_form_selection: function () {
                return this.reminder_value + ":" + this.reminder_option_selected;
            },

        },
        watch: {
            'newTaskForm.client_id': function (oldVal, newVal) {
                if(this.newTaskForm.client_id){
                    this.getClientVendor();
                    const client = this.CLIENTS_LIST.find( x =>  x.id.id === this.newTaskForm.client_id);
                    this.newTaskForm.address = client.additionalInfo.address || '';
                    this.newTaskForm.lat = client.additionalInfo.lat || 0;
                    this.newTaskForm.lng = client.additionalInfo.lng || 0;

                }
            },
            'CLIENT_VENDOR': function (oldVal, newVal) {
                this.newTaskForm.vendor_id = this.CLIENT_VENDOR.id.id;
            },
            'initialDate': function (oldVal, newVal) {
                if(this.initialDate) {

                    // formatting date
                    const startDate_formated = format(this.initialDate, 'yyyy-MM-dd');
                    const startTime_formated = format(this.initialDate, 'HH:mm:ss');

                    this.newTaskForm.start_date = startDate_formated;
                    this.newTaskForm.start_time = startTime_formated
                }
                if(this.initialEndDate) {
                    const differenceInMinutes1 = differenceInMinutes(this.initialEndDate, this.initialDate);
                    const differencesInHours1 = differenceInHours(this.initialEndDate, this.initialDate);
                    console.log('differences hours', differencesInHours1 );
                    console.log('differences minutes', differenceInMinutes1 );
                    this.newTaskForm.duration = differencesInHours1 + ":" + differenceInMinutes1 + ":00";

                }

            }
        }
    }
</script>

<style scoped>

    .headerClass {
        background: #00b3ee
    }

    .client-modal-contact {
        border-radius: 3px;
        border: 1px solid gray;
        padding: 0.5rem;
    }

    .client-modal-btn {
        background-color: #00b3ee;
        color: white;
        border-radius: 3px;
        font-size: 1rem;
        padding: 0 0.5rem;
        border: 0;
        align-self: center;
    }

    .client-modal-btn-pressed {
        background-color: gray;
        color: white;
        border-radius: 3px;
        font-size: 1rem;
        padding: 0 0.5rem;
        border: 0;
        align-self: center;
    }

    .client-modal-close-btn {
        background: none;
        color: #00b3ee;
        font-size: 20px;
        margin: 0;
    }

    .client-modal {
        @extend .card;
        border-radius: 6px;
    }

    .client-modal-header {
        @extend .card-header;
        padding: 0.15rem 1rem;
    }

    .client-modal-btn-history {
        background-color: #00b3ee;
        color: white;
        border-radius: 3px;
        font-size: 0.85rem;
        padding: 0 0.5rem;
        border: 0;
        align-self: center;
    }

    .client-modal-heading {
        align-self: center;
        flex-grow: 1;
        margin: 0;
        font-size: 1.3rem;
        text-align: center;
    }

</style>
