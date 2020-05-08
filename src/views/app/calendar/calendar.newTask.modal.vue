<template>
    <b-modal id="new_task_form_1" @hide="hideNewTaskForm" hide-footer  centered hide-header size="lg">
        <div class="client-modal">
            <div class="card-header p-1" style="background: #00b3ee"></div>
            <div class="client-modal-header">
                <div class="d-flex flex-row justify-content-between">
                    <button v-on:click="hideForm" class="btn client-modal-close-btn">X</button>
                    <p class="client-modal-heading">{{getModalTitle}}</p>
                    <div></div>
                </div>

            </div>
            <b-form ref="formNewTask" @submit.stop.prevent @submit="getConditionalSubmit" @reset="hideForm">
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
                                        v-model="newTaskForm.notes"/>
                            </b-form-group>


                        </b-col>
                        <b-col md="5">
                            <b-form-group
                                    label="Cliente"
                            >
                                <model-select
                                        required
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
                                <b-form-timepicker
                                        :disabled="!durationStateEnable"
                                        v-model="newTaskForm.reminder" locale="en"></b-form-timepicker>

                            </b-form-group>
                            <b-form-group
                                    label="Duracion"
                            >
                                <b-form-timepicker
                                        form="formNewTask"
                                        :required="!durationStateEnable"
                                        :disabled="!durationStateEnable"
                                         v-model="newTaskForm.duration"/>

                                <!--<vue-timepicker v-model="newTaskForm.duration" ></vue-timepicker>-->

                            </b-form-group>
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
                <div class="mt-5 d-flex justify-content-around">
                    <div v-if="!isEditModal">
                        <button class="btn client-modal-btn" type="reset" >Cancelar</button>
                        <button class="btn client-modal-btn" type="submit" >Crear Tarea</button>
                    </div>
                    <div v-else>
                        <button class="btn client-modal-btn" @click="deteteTask">Eliminar</button>
                        <button class="btn client-modal-btn" type="submit" >Editar</button>
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

    export default {
        name: "calendar_newTask_modal",
        props: {
          isEditModal: {
              type: Object,
              required: true
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
                    completed: ''
                },
                taskCategories,
                taskOptions: taskCategories,
                initial_date: new Date()

            }
        },
        computed: {
            ...mapGetters(['TASK_SELECTED', 'CLIENT_VENDOR', 'CLIENTS_LIST', 'loggedInUser']),
            timeStateEnable: function () {
                if (this.newTaskForm.start_date) {
                    return true
                }
                return false
            },
            durationStateEnable: function () {
                if (this.newTaskForm.start_time) {
                    return true
                }
                return false
            },
            clientsFiltered: function () {
                // filter no active clients
                const onlyActiveClients = this.CLIENTS_LIST.filter( x => x.additionalInfo.activated);

                if(this.loggedInUser.admin) {
                    return onlyActiveClients.filter(x => x.additionalInfo.social_reason !== '_private_')
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
            }

        },
        mounted: {

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
            createTask() {
                this.newTaskForm.category = new Number(this.newTaskForm.category);
                // this.newTaskForm.client_id = this.CLIENT_SELECTED.id.id;
                // this.newTaskForm.vendor_id = this.CLIENT_SELECTED.vendor.id.id;
                console.log('form', this.newTaskForm);
                this.$store.dispatch('POST_TASK', this.newTaskForm)
                    .then(result => {
                        console.log(result);
                        this.fetchTaskData();
                    });
            },
            hideNewTaskForm() {
                this.$bvModal.hide("new_task_form_1");
                this.clearFormData();
                this.$emit('close2', true);
            },
            getConditionalSubmit() {
                if(this.isEditModal) {
                    this.editTask();
                }
                else
                    this.createTask();
                this.hideForm();
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
                this.$store.dispatch('SET_CLIENT_VENDOR_ACTION', null);
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
            },
            editTask() {
                const task_id = this.TASK_SELECTED.id.id;
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
                                this.fetchTaskData();
                            })
                    });
            },
            deteteTask() {
                const task_id = this.TASK_SELECTED.id.id;
                this.$store.dispatch('DELETE_TASK', task_id)
                    .then(x => {
                        this.fetchTaskData();
                    });
                this.hideForm();

                // this.$refs.tuiCalendar.invoke('deleteSchedule', schedule.id, schedule.calendarId);
            },
            fetchTaskData() {
                this.$store.dispatch('GET_TASKS_LIST');
                this.$store.dispatch('GET_TASKS_PROGRESS');


            }

        },
        watch: {
            'newTaskForm.client_id': function (oldVal, newVal) {
                if(this.newTaskForm.client_id)
                    this.getClientVendor();
            },
            'TASK_SELECTED': function (oldVal, newVal) {
                this.setFormData(this.TASK_SELECTED);
                this.getVendorClients();
            },
            'CLIENT_VENDOR': function (oldVal, newVal) {
                this.newTaskForm.vendor_id = this.CLIENT_VENDOR.id.id;
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
