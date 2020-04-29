<template>
    <div class="client-modal">
        <div class="card-header p-1" style="background: #00b3ee"></div>
        <div class="client-modal-header">
            <div class="d-flex flex-row justify-content-between">
                <button v-on:click="hideForm" class="btn client-modal-close-btn">X</button>
                <p class="client-modal-heading">Nueva Tarea</p>
                <div></div>
            </div>

        </div>
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
                        <b-form-input readonly v-model="vendorName"/>
                    </b-form-group>
                    <b-form-group
                            label="Notas"
                    >
                        <b-form-textarea v-model="newTaskForm.notes"/>
                    </b-form-group>


                </b-col>
                <b-col md="5">
                    <b-form-group
                            required
                            label="Cliente"
                    >
                        <b-form-input readonly v-model="CLIENT_SELECTED.additionalInfo.name"/>
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

                </b-col>
            </b-row>
        </div>
        <div class="mt-5 d-flex justify-content-around">
            <div>
                <button class="btn client-modal-btn" @click="hideForm()">Cancelar</button>
                <button class="btn client-modal-btn" @click="createTask()">Crear Tarea</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { taskCategories, vendors, clients, routines } from '../calendar/data/formData';
import {mapGetters} from 'vuex';
    export default {
        name: "client_newTask_form",
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
                taskCategories, vendors, clients, routines,
                taskOptions: taskCategories,

            }
        },
        computed: {
            ...mapGetters(['CLIENT_SELECTED']),
            vendorName: function() {
                if(this.CLIENT_SELECTED.vendor) {
                    return this.CLIENT_SELECTED.vendor.additionalInfo.firstName + ' ' + this.CLIENT_SELECTED.vendor.additionalInfo.lastName;
                }
                return 'N/A';
            }
        },
        mounted: {

        },
        methods: {
            getName() {
                if( Object.keys(this.CLIENT_SELECTED).length === 0){
                    return 'N/A'
                }
                const name = this.CLIENT_SELECTED.name;
                console.log('name', name);
                return name;
            },
            hideForm() {
                console.log('en hide fomr');
                this.$store.dispatch('SET_SHOW_NEW_TASK_CLIENT_FORM_ACTION', false);
            },
            getVendorName() {
                if(this.CLIENT_SELECTED.vendor) {
                    return this.CLIENT_SELECTED.firstName + ' ' + this.CLIENT_SELECTED.lastName;
                }
                return 'N/A';
            },
            createTask() {
                this.newTaskForm.category = new Number(this.newTaskForm.category);
                this.newTaskForm.client_id = this.CLIENT_SELECTED.id.id;
                this.newTaskForm.vendor_id = this.CLIENT_SELECTED.vendor.id.id;
                console.log('form', this.newTaskForm);
                this.$store.dispatch('POST_TASK', this.newTaskForm)
                    .then(result => {
                        console.log(result);
                        this.$store.dispatch('GET_TASKS_LIST');
                    });
                this.hideForm();
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
