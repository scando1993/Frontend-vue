<template>
    <b-modal id="bulk_client_modal" @hide="hideForm" hide-footer  centered hide-header size="lg">
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

            <div id="client-modal-body">
                <form-wizard
                        :title="title"
                        :subtitle="subtitle"
                        :color="color"
                        shape="tab"
                        back-button-text="Retroceder"
                        next-button-text="Siguiente!"
                        finish-button-text="Subir"
                >
                    <tab-content title="Personal details">
                        <vue-csv-import url="/url/to/post"  v-model="csv" :map-fields="['name', 'age']"></vue-csv-import>


                    </tab-content>
                    <tab-content title="Additional Info">
                        My second tab content
                    </tab-content>
                    <tab-content title="Last step">
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
                file: null

            }
        },
        methods: {
            hideForm() {
                this.$bvModal.hide("bulk_client_modal");

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
