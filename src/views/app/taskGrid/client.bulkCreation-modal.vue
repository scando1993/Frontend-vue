<template>
    <b-modal id="bulk_client_modal" @hide="hideForm" hide-footer  centered hide-header size="lg">
        <div class="client-modal">
            <div class="card-header p-1" style="background: #00b3ee"></div>
            <div class="client-modal-header">
                <div class="d-flex flex-row justify-content-between">
                    <button v-on:click="hideForm" class="btn client-modal-close-btn">X</button>
                    <p class="client-modal-heading">Importar Clientes</p>
                    <div></div>
                </div>
            </div>
            <div id="client-modal-body">

            </div>

        </div>
    </b-modal>
    
</template>

<script>
    export default {
        name: "client_bulkCreation_modal",
        data() {
            return {

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

</style>
