<template>
    <div>
        <task-grid-navbar/>
        <br>
        <br>
        <div id="body" class="d-flex">
            <vue-perfect-scrollbar class="scrollable d-flex justify-content-betweend-flex justify-content-between mr-3" ref="scrollable_content">
                <div v-for="(vendor, indexVendor) in VENDOR_TASKS" class="mr-4" style="min-width: 550px" v-bind:key="indexVendor">
                    <h3 class="text-center">{{vendor.additionalInfo.firstName + '' + vendor.additionalInfo.lastName}}</h3>
                    <div style="max-width: 1000px" class="text-13">
                        <b-row>
                            <b-col md="6" v-for="(task, indextask) in vendor.Tasks" :key="indextask">
                                <b-card
                                        header=" " Contac
                                        header-text-variant="white"
                                        header-tag="card_header"
                                        v-on:click="showFormClientB(indexVendor, indextask)"
                                        class="mb-2 mr-0"
                                >
                                    <div slot="header"
                                         :style="{'background-color': getHeaderNgVariant('Active')}"
                                         class="p-2">
                                    </div>
                                    <b-row>
                                        <b-col md="8">
                                            <p>
                                                <b class="font-weight-bold">{{task.Client.social_reason}}</b>
                                                <br>{{task.Client.client_name}}
                                            </p>
                                        </b-col>
                                        <b-col md="4">
                                            <button  class="btn planiButton p-1">Historial</button>
                                        </b-col>
                                    </b-row>
                                    <p class="mt-0">
                                        <b>Proxima actividdad</b>
                                        <i class="i-Circular-Point"
                                           :style="{'background-color': getHeaderNgVariant('Active')}"
                                        />
                                        <br>{{task.name}}
                                    </p>
                                    <p class="mb-0">Ultima acción: {{formatDate(task.additionalInfo.start_date)}}</p>
                                </b-card>
                            </b-col>
                        </b-row>
                    </div>
                </div>
            </vue-perfect-scrollbar>

            <div v-show="getFormClientShow" class=" w-100">
                <b-card style="min-width: 300px">
                    <template v-slot:header class="bg-success">
                        <div class="d-flex justify-content-between">
                            <button v-on:click="hideForm" class="btn font-weight-bold" style="background: none; color: #00b3ee; font-size: 20px">X</button>
                            <h3 class="font-weight-bold">{{getFormTitle}}</h3>
                            <button v-if="!getFormClientNewClient" class="btn py-0 planiButton">Ver Historial</button>
                            <div v-else></div>
                        </div>
                    </template>
                    <form ref="formNewAdmin" @submit.stop.prevent @submit="addNewCliente" @reset="hideForm">
                        <b-row>
                            <b-col md="7">
                                <b-form-group
                                        label-for="clientName"
                                        invalid-feedback="llene este campo"
                                        label= "Nombre"
                                >
                                    <b-form-input
                                            id="clientName"
                                            placeholder=""
                                            type="text"
                                            v-model="formData.name"
                                            required
                                    />
                                </b-form-group>
                                <b-form-group
                                        label-for="clientSocial"
                                        invalid-feedback="Llene este campo"
                                        label = "Razón Social"
                                >
                                    <b-form-input
                                            id="clientSocial"
                                            placeholder=""
                                            type="text"
                                            v-model="formData.bussinessName"
                                            required
                                    />
                                </b-form-group>
                                <b-form-group
                                        label-for="clientUbication"
                                        invalid-feedback="Llene este campo"
                                        label = "Ubicación"
                                >
                                    <b-form-input
                                            id="clientUbication"
                                            placeholder=""
                                            type="text"
                                            v-model="formData.address"
                                            required
                                    />
                                </b-form-group>
                                <b-form-group
                                        label-for="clientVendor"
                                        invalid-feedback="clientVendor"
                                        label = "Asignar vendedor"
                                >
                                    <b-form-select
                                            v-model="vendorSelected"
                                            :options="VENDOR_TASKS.map( function(element, index) {return {value: index, text: element.name}})"
                                            id="inline-form-custom-select-pref"
                                            required
                                    >
                                        <option slot="first" :value="null">Choose...</option>
                                        ></b-form-select>
                                </b-form-group>
                                <b-form-group
                                        label-for="clientVendor"
                                        invalid-feedback="clientVendor"
                                        label = "Notas"
                                >
                                    <b-form-textarea
                                            v-model="formData.notes"
                                            placeholder="..."
                                            rows="3"
                                            max-rows="6"
                                    >></b-form-textarea>
                                </b-form-group>

                            </b-col>
                            <b-col md="4">
                                <b-card style="border: #0a0a0a" class="mb-2">
                                    <p class="ml-0">Contacto 1:</p>
                                    <b-form-group
                                            label-for="contactName1"
                                            invalid-feedback="LLene este campo"
                                    >
                                        <b-form-input
                                                id="contactName1"
                                                placeholder="Nombre"
                                                type="text"
                                                v-model="formData.contacts[0].name"
                                                required
                                        />
                                    </b-form-group>
                                    <b-form-group
                                            label-for="contactEmail1"
                                            invalid-feedback="Email no valido"
                                    >
                                        <b-form-input
                                                id="contactEmail1"
                                                placeholder="E-mail"
                                                type="email"
                                                v-model="formData.contacts[0].email"
                                                required
                                        />
                                    </b-form-group>
                                    <b-form-group
                                            label-for="contactNumber1"
                                            invalid-feedback="Número inválido"
                                    >
                                        <b-form-input
                                                id="contactNumber1"
                                                placeholder="Teléfono"
                                                type="number"
                                                v-model="formData.contacts[0].phoneNumber"
                                                required
                                        />
                                    </b-form-group>
                                </b-card>
                                <b-card style="border: #0a0a0a">
                                    <p class="ml-0">Contacto:</p>
                                    <b-form-group
                                            label-for="contactName2"
                                            invalid-feedback="LLene este campo"
                                    >
                                        <b-form-input
                                                id="contactName2"
                                                placeholder="Nombre"
                                                type="text"
                                                v-model="formData.contacts[1].name"
                                                required
                                        />
                                    </b-form-group>
                                    <b-form-group
                                            label-for="contactEmail2"
                                            invalid-feedback="Email no valido"
                                    >
                                        <b-form-input
                                                id="contactEmail2"
                                                placeholder="E-mail"
                                                type="email"
                                                v-model="formData.contacts[1].email"
                                                required
                                        />
                                    </b-form-group>
                                    <b-form-group
                                            label-for="contactNumber2"
                                            invalid-feedback="Número inválido"
                                    >
                                        <b-form-input
                                                id="contactNumber2"
                                                placeholder="Teléfono"
                                                type="number"
                                                v-model="formData.contacts[1].phoneNumber"
                                                required
                                        />
                                    </b-form-group>
                                </b-card>
                            </b-col>
                        </b-row>

                        <div md="12" class="mt-5 d-flex justify-content-around">
                            <div v-if="getFormClientNewClient" >
                                <button class="btn planiButton" type="reset">Cancelar</button>
                                <button class="btn planiButton" type="submit"> Agregar</button>
                            </div>
                            <div v-else >
                                <button class="btn planiButton" type="button" @click="deleteClient">Eliminar</button>
                                <button class="btn planiButton" type="reset">Cancelar</button>
                                <button class="btn planiButton" type="button" @click="editForm">Editar</button>
                                <button class="btn planiButton" type="button">Crear Tarea</button>
                            </div>
                        </div>
                    </form>

                </b-card>
            </div>
        </div>

    </div>
</template>

<script>
    import TaskGridNavbar from './navbar/taskGridNavbar';
    import { mapActions, mapGetters } from 'vuex';
    import { taskGridDummyData, clienteDummyData, vendorDummyData } from './data/taskGridData';
    export default {
        name: 'taskGrid',
        components: { TaskGridNavbar },
        data() {
            return {
                socialState: '',
                nameState: '',
                newClientSocial: '',
                newClientName: '',
                clientFormTitle: 'Cliente',
                newClientForm: false,
                formTitle: '',
                vendorSelected: '',
                clientSelecteIndex: '',
                vendorSelectedInGrid: '',
                //task Data
                membersTasks: taskGridDummyData,
                clients: clienteDummyData,
                vendors: vendorDummyData,
                formData: {
                    name: '',
                    social_reason: '',
                    address: '',
                    vendor: {
                        id: '1',
                        name: 'Jose Jose'
                    },
                    notes: '',
                    lat: '',
                    lng: '',
                    contacts: [
                        {
                            name: '',
                            email: '',
                            phoneNumber: null
                        },
                        {
                            name: '',
                            email: '',
                            phoneNumber: null
                        },
                    ]
                }
            };
        },
        created() {
            console.log(this.getFormClientShow);
        },
        computed: {
            ...mapGetters(['getFormClientShow', 'getFormClientNewClient','getFormTitle', 'VENDOR_TASKS']),
            vendorSelectList: function () {
                var options = {};
                for (const i in this.vendors){
                    options[this.vendors[i].id] = this.vendors[i].name;
                }
                return options;
            }
        },
        methods: {
            ...mapActions(['showNewClientForm','showClientForm', 'hideClientForm', 'GET_CLIENTS_TASK', 'POST_CLIENT', 'SET_CLIENT_VENDOR']),
            addNewCliente() {
                // console.log(this.vendorSelected);
                // this.vendorSelectedInGrid.
                //this.clients.push(this.formData);
                console.log(this.formData);
                this.$store.dispatch('POST_CLIENT', this.formData)
                    .then(response => {
                        console.log('response, post', response);
                        const toSent = {
                            client_id: response.data.data.id.id,
                            vendor_id: this.vendorSelected
                        };
                        this.$store.dispatch(('SET_CLIENT_VENDOR', toSent))
                            .then(response2 => {
                                this.$store.dispatch('GET_CLIENTS_TASK');
                            })
                            .catch(e => {
                                console.log(e);
                            })
                    });
                // const clientId = this.clients.length - 1;
                //this.addNewTask(this.vendorSelected, clientId);
                this.hideForm();
            },
            addNewTask(vendoId, clientId) {
                const newTask =  {
                    client_id: clientId,
                    company_name: this.formData.bussinessName,
                    client_name: this.formData.name,
                    activity: {
                        name: 'N/A',
                        state: 'Without contact'
                    },
                    last_activity: new Date()
                };
                this.membersTasks[vendoId].tasks.push(newTask);
            },
            formatDate: function (dateToFormat) {
                return dateToFormat.toString().split(' ', 4).join(' ');
            },
            getHeaderNgVariant(state) {
                switch (state) {
                    case 'Active':
                        return '#00b3ee';
                    case 'Inactive':
                        return 'gray';
                    case 'Without contact':
                        return 'gainsboro';
                }
            },
            setFormClientData(data) {
                this.formData = data;
            },
            showFormClientB(vendorIndex, taskIndex) {
                this.vendorSelectedInGrid = vendorIndex;
                this.clientSelecteIndex = taskIndex;
                this.vendorSelected = vendorIndex;
                const clientId = this.membersTasks[vendorIndex].tasks[taskIndex].client_id;
                const clientData = this.clients[clientId];
                this.setFormClientData(clientData);
                this.showClientForm();
            },
            deleteClient() {
                this.membersTasks[this.vendorSelectedInGrid].tasks.splice(this.clientSelecteIndex, 1);
                this.hideForm();
            },
            hideForm() {
                this.resetModal();
                this.hideClientForm();
            },
            editForm() {
                var task = this.membersTasks[this.vendorSelectedInGrid].tasks[this.clientSelecteIndex];
                this.updateTask(task);
                console.log(this.vendorSelectedInGrid);
                console.log(this.vendorSelected);
                console.log(this.clientSelecteIndex);
                if (this.vendorSelectedInGrid !== this.vendorSelected){
                    task = this.membersTasks[this.vendorSelectedInGrid].tasks.splice(this.clientSelecteIndex, 1)[0];
                    console.log(task);
                    this.membersTasks[this.vendorSelected].tasks.push(task);
                }
                console.log(task);
                console.log(this.clients);
                this.hideForm();
            },
            updateTask(task) {
                const clientId = task.client_id;
                var clientData = this.clients[clientId];
                clientData = this.formData;
                console.log(clientData);
                task.company_name = this.formData.bussinessName;
                task.client_name = this.formData.name;
            },
            resetModal() {
                this.vendorSelected = '';
                this.formData = {
                    name: '',
                    bussinessName: '',
                    address: '',
                    vendor: {
                        id: '',
                        name: ''
                    },
                    notes: '',
                    contacts: [
                        {
                            name: '',
                            email: '',
                            phoneNumber: null
                        },
                        {
                            name: '',
                            email: '',
                            phoneNumber: null
                        },
                    ]
                };
            }
        },
        mounted() {
            this.$store.dispatch('GET_CLIENTS_TASK');
        }
    };
</script>

<style scoped>
    .scrollable{
        width: 100%;
        height: 500px;
        position: relative;
        overflow: scroll;
    }
    .planiButton {
        background-color: #00b3ee;
        color: white;
    }
</style>
