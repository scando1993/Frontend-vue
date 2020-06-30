<template>
    <div>
        <div id="header" class="header">
            <b-row>
                <b-col class="col-2">
                    <b-img :src="require('../../../assets/images/logo.png')" block style="height: 50px; width: 50px" rounded="circle"></b-img>
                </b-col>

                <b-col class="col-10 d-flex justify-content-end align-items-center">
                    <div class="">
                        <b-button variant="primary">Login</b-button>
                        <b-button variant="secondary">Register</b-button>
                    </div>
                </b-col>
            </b-row>
        </div>
        <div v-if="showNotFoundMessage" id="TicketNotFound" class="body w-50 mx-auto">
            <b-row>
                <b-col>
                    <h3>{{'Ticket Invalido'}}</h3>
                    <p>{{'Este ticket no existe o ya ha expirado'}}</p>
                </b-col>

            </b-row>
        </div>
        <div v-else id="body" class="body w-50 mx-auto">
            <div v-if="!showDeleteMessage && !showSuccessMessage">
                <b-row>
                    <div class="">
                        <h3>{{'Ticket de invitacion'}}</h3>
                    </div>
                </b-row>
                <b-row class="mt-12" >
                    <b-button class="col-6" variant="success">{{'Acceptar'}}</b-button>
                    <b-button class="col-6" variant="danger" v-on:click="sendResponse(false)">{{'Rechazar'}}</b-button>
                </b-row>
            </div>

            <div v-if="showDeleteMessage">
                <h2>{{'Has rechazado la invitación'}}</h2>
                <h4>{{'Gracias por tu respuesta'}}</h4>
            </div>

            <div v-if="showSuccessMessage">
                <h2>{{'Gracias por su respuesta Afirmatica'}}</h2>
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
                showNotFoundMessage: false
            }
        },
        created() {
            this.getInvitationTicket(this.ticket_tenant, this.ticket_id);
        },
        methods: {
            sendResponse(value) {
                const data = {
                    token: this.ticket,
                    accepted: value
                }
                this.$store.dispatch('RESPONSE_TICKET_INVITATION', data)
                .then(response => {
                    if(!value) {
                        this.showDeleteMessage = true;
                    }
                    else {
                        this.showSuccessMessage = true;
                    }
                })
            },
            getInvitationTicket(idTenant, idTicket) {
                const payload = {
                    idTenant: idTenant,
                    idTicket: idTicket
                }
                this.$store.dispatch('GET_TICKET_INVITATION', payload)
                .then(response  => {
                   this.ticket = response.data.data;
                })
                .catch(err => {
                    this.showNotFoundMessage = true;
                })
            }
        }
    }
</script>

<style scoped>
    .header {
        background-color: #0d7aff;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .body {
        margin-bottom: 30px;
        margin-top: 30px;
    }

</style>
