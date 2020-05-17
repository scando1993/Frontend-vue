<template>
    <b-modal id="bulk_client_modal" @show="onShow" @hide="hideForm" hide-footer  centered hide-header size="lg">
        <div class="client-modal">
            <div id="modal-header">
                <div class="card-header p-1" style="background: #00b3ee"></div>
                <div class="client-modal-header">
                    <div class="d-flex flex-row justify-content-between">
                        <button v-on:click="hideForm" class="btn client-modal-close-btn">X</button>
                        <p class="client-modal-heading">Importar Clientes</p>
                        <div></div>
                    </div>
                </div>
            </div>

            <div id="client-modal-body" v-if="readyToShow">
                <form-wizard
                        :title="title"
                        :subtitle="subtitle"
                        :color="color"
                        shape="tab"
                        back-button-text="Retroceder"
                        next-button-text="Siguiente Paso"
                        finish-button-text="Finalizar"
                        headers="true"
                        inputClass="client-modal-btn"
                >
                    <tab-content title="Subir Archivo" :before-change="validateNext">
                        <div class="mb-32">
                            <vue-csv-import headers="true" v-model="file" :map-fields="map_fields">
                                <template slot="next" slot-scope="{load}">
                                    <div  class="d-flex justify-content-end">
                                        <button style="cursor: pointer;" class="client-modal-btn text-bold" @click.prevent="reset_basic_upload(); load() ">Cargar archivo</button>
                                    </div>
                                </template>

                                <template slot="submit" slot-scope="{submit}">
                                    <div  class="d-flex justify-content-center">
                                        <button style="cursor: pointer;" class="client-modal-btn text-bold" @click.prevent="submit2">Enviar</button>
                                    </div>
                                </template>

                                <template slot="hasHeaders" slot-scope="{headers, toggle}">
                                    <h4 class="d-flex justify-content-center" style="color: #00b3ee">Escoja el archivo que desee subir</h4>
                                </template>
                                <template slot="thead">
                                    <tr>
                                        <th>Campos</th>
                                        <th>Campos en el archivo</th>
                                    </tr>
                                </template>
                            </vue-csv-import>

                            <div v-if="file">
                                <div  class="d-flex justify-content-center">
                                    <div>

                                    <button :disabled="blockWhileUpload" style="cursor: pointer;" class="client-modal-btn text-bold" @click.prevent="submit2">Subir archivo</button>

                                        <h5 v-if="show_error" class="justify-content-center" style="color: darkred">Error al cargar el archivo, aseguerece de tener el formato correcto</h5>
                                        <h5 v-if="show_success" class="justify-content-center" style="color: seagreen">Archivo enviado correctamente</h5>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </tab-content>
                    <tab-content title="Revisión de la petición">
                        <b-row>
                            <b-col md="12">
                                <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Clientes creados" label-for="input-lg">
                                    <b-form-input readonly id="input-lg" size="lg" v-model="upload_response.clients_created"></b-form-input>
                                </b-form-group>

                                <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Clientes no creados" label-for="input-lg">
                                    <b-form-input readonly id="input-lg" size="lg" v-model="upload_response.clients_error"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="12">
                                <client_bulkCreation_ErrorTable :errors="upload_response.errors"></client_bulkCreation_ErrorTable>
                            </b-col>
                        </b-row>
                    </tab-content>

                    <template slot="footer" slot-scope="props">
                        <div class="wizard-footer-left">
                            <wizard-button  v-if="props.activeTabIndex > 0 " @click.native="props.prevTab()" :style="props.fillButtonStyle">Retroceder</wizard-button>
                        </div>
                        <div class="wizard-footer-right">
                            <wizard-button :disabled="blockWhileUpload" v-if="!props.isLastStep && file && show_success"@click.native="props.nextTab()" class="wizard-footer-right" :style="props.fillButtonStyle">Siguiente</wizard-button>

                            <wizard-button v-if="props.isLastStep" @click.native="alert('Done')" class="wizard-footer-right finish-button" :style="props.fillButtonStyle">  {{props.isLastStep ? 'Finalizar' : 'Siguiente'}}</wizard-button>
                        </div>
                    </template>
                </form-wizard>

            </div>

        </div>
    </b-modal>
    
</template>

<script>
    import {FormWizard, TabContent} from 'vue-form-wizard'
    import 'vue-form-wizard/dist/vue-form-wizard.min.css'
    import { VueCsvImport } from 'vue-csv-import';
    import  {mapGetters} from 'vuex';
    import client_bulkCreation_ErrorTable from './client.bulkCreation.ErrorTable'
    export default {
        name: "client_bulkCreation_modal",
        components: {
            FormWizard,
            TabContent,
            VueCsvImport,
            client_bulkCreation_ErrorTable
        },
        data() {
            return {
                title: "",
                color: "#00b3ee",
                subtitle: "",
                file: null,
                fileUploaded: false,
                show_error: false,
                show_success: false,
                err_message: null,
                readyToShow: false,
                nextStepValidation: false,
                blockWhileUpload: false,
                upload_response: {},
                map_fields: {
                    name: "Nombre",
                    social_reason: "Razón Social",
                    address: "Dirección",
                    notes: 'Notas',
                    contact1_name: 'Nombre Contacto',
                    contact1_email: 'Email Contacto',
                    contact1_phone: 'Teléfono Contacto'

                }

            }
        },
        computed: {
        },
        methods: {
            onShow() {
                this.readyToShow = true;
            },
            hideForm() {
                this.$bvModal.hide("bulk_client_modal");
                this.restart_form();
            },
            submit2(a,b ) {
                const that = this;
                this.nextStepValidation = false;
                this.blockWhileUpload = true;
                this.$store.dispatch('POST_BULK_CLIENTS', this.file)
                    .then(response => {
                        that.fileUploaded = true;
                        that.show_error = false;
                        that.show_success = true;
                        that.nextStepValidation = true;
                        that.upload_response = response.data.data.data;
                    })
                    .catch(error => {
                        that.show_success= false;
                        that.show_error = true;
                        that.nextStepValidation = true;

                    })
                    .finally(something => {
                        that.blockWhileUpload = false;
                    })

            },
            validateNext() {
                return this.nextStepValidation;
            },
            reset_basic_upload(){
                this.fileUploaded = false;
                this.file = null;
                this.show_error = false;
                this.show_success = false;
                this.err_message = null;
                this.nextStepValidation = false;

            },
            restart_form() {
                this.fileUploaded = false;
                this.file = null;
                this.fileUploaded = false;
                this.show_error = false;
                this.show_success = false;
                this.err_message = null;
                this.readyToShow = false;
                this.nextStepValidation = false;
                this.blockWhileUpload = false;
            },
        }
    }
</script>

<style scoped>
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
