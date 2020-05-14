<template>
    <b-modal id="task_form_history" @show="onShow2" @hide="onhide" hide-footer  centered hide-header size="lg">
        <div class="client-modal">
            <div class="card-header p-1" style="background: #00b3ee"></div>
            <div class="client-modal-header">
                <div class="d-flex flex-row justify-content-between">
                    <button v-on:click="onhide" class="btn client-modal-close-btn">X</button>
                    <p class="client-modal-heading">Historial de Tarea</p>
                    <div></div>
                </div>

            </div>
            <b-form ref="formNewTask" @submit.stop.prevent @submit="savePDF" @reset="onhide">
                <div>
                    <b-row>
                        <b-col md="7">
                            <b-form-group
                                    label="Categoria de tarea"
                            >
                                <b-form-input
                                        readonly
                                        placeholder="Sin categoria"
                                               v-model="getTaskCategory"/>
                            </b-form-group>

                            <b-form-group
                                    label="Actividad"
                            >
                                <b-form-input
                                        readonly
                                        placeholder="Sin nombre"
                                        type="text" v-model="newTaskForm.name"/>
                            </b-form-group>
                            <b-form-group
                                    label="Ubicación"
                            >
                                <b-form-input
                                        readonly
                                        placeholder="Sin ubicacion"
                                        type="text" v-model="newTaskForm.address"/>
                            </b-form-group>
                            <b-form-group
                                    label="Vendedor Asignado"
                            >
                                <b-form-input
                                        readonly
                                        placeholder="Este cliente no tiene vendedor asignado"
                                        type="text"
                                        :value="getVendorName"
                                />
                            </b-form-group>
                            <b-form-group
                                    label="Notas"
                            >
                                <b-form-textarea
                                        readonly
                                        placeholder="..."
                                        v-model="newTaskForm.notes"/>
                            </b-form-group>


                        </b-col>
                        <b-col md="5">
                            <b-form-group
                                    label="Cliente"
                            >
                                <b-form-input
                                        readonly
                                        placeholder="Sin cliente"
                                        v-model="getClientName"
                                        />
                            </b-form-group>
                            <b-form-group
                                    label="Fecha"
                            >
                                <b-form-datepicker
                                        readonly
                                        id="example-datepicker"
                                        v-model="newTaskForm.start_date"
                                        class="mb-2"></b-form-datepicker>
                            </b-form-group>
                            <b-form-group
                                    label="Hora"
                            >
                                <b-form-timepicker
                                        readonly
                                        no-close-button="true"
                                        v-model="newTaskForm.start_time" locale="en"></b-form-timepicker>
                            </b-form-group>
                            <b-form-group
                                    label="Recordatorio"
                            >
                                <b-form-timepicker
                                        readonly
                                        no-close-button="true"
                                        v-model="newTaskForm.reminder" locale="en"></b-form-timepicker>

                            </b-form-group>
                            <b-form-group
                                    label="Duracion"
                            >
                                <b-form-timepicker
                                        readonly
                                        no-close-button="true"
                                        form="formNewTask"
                                        v-model="newTaskForm.duration"/>

                                <!--<vue-timepicker v-model="newTaskForm.duration" ></vue-timepicker>-->

                            </b-form-group>
                        </b-col>
                    </b-row>
                </div>
                <div class="mt-5 d-flex justify-content-around">
                        <button class="btn client-modal-btn" type="reset" >Cancelar</button>
                        <button class="btn client-modal-btn" type="submit" >Enviar PDF</button>
                </div>
            </b-form>
        </div>
    </b-modal>
</template>

<script>
    import {taskCategories} from '../calendar/data/formData';
    import {mapGetters} from 'vuex';
    import { ModelSelect } from 'vue-search-select'

    export default {
        name: "client_history_detail_modal",
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
            }
        },
        computed: {
            ...mapGetters(['TASK_SELECTED', 'CLIENT_VENDOR', 'CLIENTS_LIST', 'loggedInUser', 'CLIENT_SELECTED']),
            getVendorName: function () {
                if(!this.CLIENT_VENDOR) {
                    return '';
                }
                return this.CLIENT_VENDOR.additionalInfo.firstName + ' ' + this.CLIENT_VENDOR.additionalInfo.lastName
            },
            getTaskCategory() {
                return this.taskOptions[this.newTaskForm.category]
            },
            getClientName() {
                return this.CLIENT_SELECTED.additionalInfo.name;
            }
        },
        methods: {

            onhide() {
                this.$bvModal.hide("task_form_history");
                this.clearFormData();
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
                this.$store.dispatch('SET_CLIENT_SELECTED_ACTION', null);
            },
            setFormData(taskSelected) {
                this.newTaskForm = {
                    category: (taskSelected.additionalInfo.category).toString(),
                    name: taskSelected.additionalInfo.name || '',
                    address: taskSelected.additionalInfo.address || '',
                    lat: taskSelected.additionalInfo.lat,
                    lng: taskSelected.additionalInfo.lng,
                    vendor_id: '',
                    notes: taskSelected.additionalInfo.notes|| '',
                    client_id: this.CLIENT_SELECTED.id.id || '',
                    start_date: taskSelected.additionalInfo.start_date || '',
                    start_time: taskSelected.additionalInfo.start_time || '',
                    duration: taskSelected.additionalInfo.duration || '',
                    reminder: taskSelected.additionalInfo.reminder || '',
                };
            },
            getClientVendor() {
                const client_id = this.newTaskForm.client_id;
                this.$store.dispatch('GET_CLIENT_VENDOR', client_id);
            },
            onShow2() {
              if(this.TASK_SELECTED) {
                  console.log("seteando", this.TASK_SELECTED)
                  this.setFormData(this.TASK_SELECTED);
                  this.getClientVendor();

              }
              else {
                  console.log("no?");
              }
            },
            savePDF() {
                this.onhide();
            }
        },

    }
</script>

<style scoped>

    .client-modal-contact {
        border-radius: 3px;
        border: 1px solid gray;
        padding: 0.5rem;
    }

    .client-modal-btn{
        background-color: #4399B6;
        color: white;
        border-radius: 3px;
        font-size: 1rem;
        padding: 0 0.5rem;
        border: 0;
        align-self: center;
    }

    .client-modal-btn-pressed{
        background-color: gray;
        color: white;
        border-radius: 3px;
        font-size: 1rem;
        padding: 0 0.5rem;
        border: 0;
        align-self: center;
    }

    .client-modal-close-btn{
        background: none;
        color: #4399B6;
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
        background-color: #4399B6;
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
