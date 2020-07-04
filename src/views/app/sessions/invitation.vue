<template>
    <div>
        <div id="header" class="header">
            <b-row>
                <b-col class="col-3">
                    <b-img :src="require('../../../assets/images/logo.png')" block style="height: 50px; width: 50px; margin-left: 20px" rounded="circle"></b-img>
                </b-col>

                <b-col class="col-9 d-flex justify-content-end align-items-center">
                    <div class="">
                        <b-button variant="primary">Login</b-button>
                        <b-button variant="secondary">Register</b-button>
                    </div>
                </b-col>
            </b-row>
        </div>
        <div id="body" class="body w-50 mx-auto" ref="bodyCard">
            <div v-if="showNotFoundMessage">
                <b-card>
                    <b-card-body>
                        <b-row>
                            <b-col>
                                <h3>{{'Ticket Invalido'}}</h3>
                                <p>{{'Este ticket no existe o ya ha expirado'}}</p>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>
            </div>
            <div v-else>
                <b-card class="h-75 shadow-bottom box-shadow-1">
                    <b-overlay
                            :show="loading"
                            variant="transparent"
                            opacity="0.80"
                            spinner-variant="danger"
                            spinner-type="grow"
                            rounded="sm">
                        <b-card-body>

                            <div v-if="!showDeleteMessage && !showSuccessMessage" ref="bodyActions">

                                <b-row>
                                    <div class="">
                                        <h3>{{'Ticket de invitacion'}}</h3>
                                    </div>
                                </b-row>
                                <b-row class="mt-12" >
                                    <b-button class="col-6" variant="success" v-on:click="sendResponse(true)">{{'Acceptar'}}</b-button>
                                    <b-button class="col-6" variant="danger" v-on:click="sendResponse(false)">{{'Rechazar'}}</b-button>
                                </b-row>
                            </div>

                            <div v-else-if="showDeleteMessage">
                                <h2>{{'Has rechazado la invitación'}}</h2>
                                <h4>{{'Gracias por tu respuesta!'}}</h4>
                            </div>

                            <div v-else-if="showSuccessMessage">
                                <h2>{{'Gracias por su respuesta afirmativa!'}}</h2>
                                <h3>{{'Te enviamos el resto de la infomacion por correo electronico'}}</h3>

                            </div>

                            <template v-slot:overlay>
                                <div class="text-center">
                                    <b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
                                    <p id="cancel-label">Please wait...</p>
                                </div>
                            </template>

                        </b-card-body>
                    </b-overlay>

                </b-card>
            </div>
        </div>
    </div>



</template>

<script>
    export default {
        name: "invitation",
        data() {
            return {
                ticket_id: this.$route.params.idTicket,
                ticket_tenant: this.$route.params.idTenant,
                ticket: null,
                deleteMessage: 'Gracias por tu respuesta',
                showSuccessMessage: false,
                showDeleteMessage: false,
                showNotFoundMessage: false,
                loading: false
            }
        },
        created() {
            this.getInvitationTicket(this.ticket_tenant, this.ticket_id);
        },
        methods: {
            sendResponse(value) {
                const data = {
                    accepted: value,
                    ticketId: this.ticket_id,
                    tenantId: this.ticket_tenant
                }
                // this.showLoaderOn('bodyActions');
                let self = this;
                this.loading = true;
                this.$store.dispatch('RESPONSE_TICKET_INVITATION', data)
                .then(response => {
                    if(!value) {
                        self.showDeleteMessage = true;
                    }
                    else {
                        self.showSuccessMessage = true;
                    }
                    // this.hideLoader();
                })
                .finally(() => {
                    this.loading = false;
                })
            },
            getInvitationTicket(idTenant, idTicket) {
                const payload = {
                    idTenant: idTenant,
                    idTicket: idTicket
                }
                this.$store.dispatch('VERIFY_TICKET_INVITATION', payload)
                .then(response  => {
                   this.ticket = response.data.data;
                })
                .catch(err => {
                    this.showNotFoundMessage = true;
                })
            },
            showLoaderOn(referenceHTML) {
                this.loader = this.$loading.show({
                    // Optional parameters
                    container: this.$refs['referenceHTML'],
                    canCancel: false,
                    color: "#00b3ee",
                });
            },
            hideLoader() {
                if(this.loader)
                    this.loader.hide
            },
        }

    }
</script>

<style scoped>
    .header {
        padding-top: 10px;
        padding-bottom: 10px;
        box-shadow: 5px 5px #888888
    }
    .body {
        margin-bottom: 30px;
        margin-top: 90px;
    }

</style>
