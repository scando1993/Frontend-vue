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
                        finish-button-text="Subir"
                        headers="true"
                        inputClass="client-modal-btn"
                >
                    <tab-content title="Subir Archivo" :before-change="validateNext">
                        <div class="mb-32">
                            <vue-csv-import  v-model="file" :map-fields="map_fields">
                                <template slot="next" slot-scope="{load}">
                                    <div  class="d-flex justify-content-end">
                                        <button style="cursor: pointer;" class="client-modal-btn text-bold" @click.prevent="load(); restart_form()">Cargar archivo</button>
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

                                    <button style="cursor: pointer;" class="client-modal-btn text-bold" @click.prevent="submit2">Subir archivo</button>

                                        <h5 v-if="show_error" class="justify-content-center" style="color: darkred">Error al cargar el archivo, aseguerece de tener el formato correcto</h5>

                                    </div>
                                </div>
                            </div>

                        </div>


                    </tab-content>
                    <tab-content title="Revisión de la petición">
                        <b-row>
                            <b-col md="12">
                                <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Clientes creados" label-for="input-lg">
                                    <b-form-input readonly id="input-lg" size="lg" ></b-form-input>
                                </b-form-group>

                                <b-form-group label-cols="4" label-cols-lg="2" label-size="lg" label="Clientes no creados" label-for="input-lg">
                                    <b-form-input readonly id="input-lg" size="lg" ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </tab-content>
                    <tab-content title="Finalizar">
                        Yuhuuu! This seems pretty damn simple
                    </tab-content>
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
    export default {
        name: "client_bulkCreation_modal",
        components: {
            FormWizard,
            TabContent,
            VueCsvImport
        },
        data() {
            return {
                title: "",
                color: "#00b3ee",
                subtitle: "",
                file: null,
                fileUploaded: false,
                show_error: false,
                err_message: null,
                readyToShow: false,
                map_fields: {
                    name: "Nombre",
                    social_reason: "Razón Social",
                    address: "Dirección",

                }

            }
        },
        computed: {
          ...mapGetters(['CLIENT_BULK_RESPONSE'])
        },
        methods: {
            onShow() {
                this.readyToShow = true;
            },
            hideForm() {
                this.$bvModal.hide("bulk_client_modal");
                this.file = null;
                this.readyToShow = false;
            },
            submit2(a,b ) {
                const that = this;
                this.$store.dispatch('POST_BULK_CLIENTS', this.file)
                    .then(response => {
                        that.fileUploaded = true;
                        that.show_error = false;
                    })
                    .catch(error => {
                        that.show_error = true;

                    })

            },
            validateNext() {
                return this.fileUploaded;
            },
            restart_form() {
                this.fileUploaded = false;
            }
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
