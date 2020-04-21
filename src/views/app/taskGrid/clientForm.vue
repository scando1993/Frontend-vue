<template>
	<div class="client-modal">
		<div class="card-header p-1" style="background: #00b3ee"></div>
		<div class="client-modal-header">
			<div class="d-flex flex-row justify-content-between">
				<button v-on:click="hideForm" class="btn client-modal-close-btn">X</button>
				<p class="client-modal-heading">{{getFormTitle}}</p>
				<button v-if="!getNewClientForm()" class="btn client-modal-btn-history" v-on:click="showHistory()">Ver Historial</button>
			</div>
		</div>
		<div class="card-body">
			<form ref="formNewAdmin" @submit.stop.prevent @submit="addNewClient" @reset="hideForm">
				<b-row class="mb-2">
					<b-col sm="6" md="6" lg="6" xl="6" class="d-flex flex-column justify-content-between">
						<b-form-group
							label-for="clientName"
							invalid-feedback="llene este campo"
							label="Nombre"
							class="mb-1"
						>
							<b-form-input
								id="clientName"
								placeholder=""
								type="text"
								v-model="formData.name"
								required
								:readonly="editForm"
							/>
						</b-form-group>
						<b-form-group
							label-for="clientSocial"
							invalid-feedback="Llene este campo"
							label="Razón Social"
							class="mb-1"
						>
							<b-form-input
								id="clientSocial"
								placeholder=""
								type="text"
								v-model="formData.social_reason"
								required
								:readonly="editForm"
							/>
						</b-form-group>
						<b-form-group
							label-for="clientUbication"
							invalid-feedback="Llene este campo"
							label="Ubicación"
							class="mb-1"
						>
							<b-form-input
								id="clientUbication"
								placeholder=""
								type="text"
								v-model="formData.address"
								required
								:readonly="editForm"
							/>
						</b-form-group>

						<div v-if="loggedInUser.admin">
							<div v-if="editForm">
								<b-form-group
									label-for="showVendor"
									label="Vendedor"
									class="mb-1"
								>
									<b-form-input
										id="showVendor"
										type="text"
										v-model="formData.vendor.name"
										required
										readonly
									/>
								</b-form-group>
							</div>
							<div v-else>
								<b-form-group
									label-for="clientVendor"
									invalid-feedback="clientVendor"
									label="Asignar vendedor"
									class="mb-1"
								>
									<b-form-select
										v-model="vendorSelected"
										:options="VENDOR_LIST.map(function(x) {
										  return {value: x.id.id, text: x.additionalInfo.firstName}
										} )"
										id="clientVendor"
										required
									>
										<option slot="first" :value="null">Choose...</option>
										>
									</b-form-select>
								</b-form-group>
							</div>
						</div>

					</b-col>
					<b-col sm="6" md="6" lg="6" xl="6">
						<b-form-group
							label-for="clientVendor"
							invalid-feedback="clientVendor"
							label="Notas"
						>
							<b-form-textarea
								v-model="formData.notes"
								placeholder="..."
								rows="3"
								max-rows="6"
								:readonly="editForm"
							/>
						</b-form-group>

					</b-col>
				</b-row>
				<b-row>
					<b-col sm="6" md="6" lg="6" xl="6" class="d-flex flex-column justify-content-between">
						<div class="client-modal-contact">
							<label class="p-0">Contacto 1:</label>
							<b-form-group
								label-for="contactName1"
								invalid-feedback="LLene este campo"
							>
								<b-form-input
									id="contactName1"
									placeholder="Nombre"
									type="text"
									v-model="formData.contacts[0].name"
									:readonly="editForm"
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
									:readonly="editForm"
								/>
							</b-form-group>
							<b-form-group
								label-for="contactNumber1"
								invalid-feedback="Número inválido"
							>
								<b-form-input
									id="contactNumber1"
									placeholder="Teléfono"
									type="tel"
									v-model="formData.contacts[0].phoneNumber"
									:readonly="editForm"
								/>
							</b-form-group>
						</div>
					</b-col>
					<b-col sm="6" md="6" lg="6" xl="6" class="d-flex flex-column justify-content-between">
						<div class="client-modal-contact">
							<label class="p-0">Contacto 2:</label>
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
									:readonly="editForm"
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
									:readonly="editForm"
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
									:readonly="editForm"
								/>
							</b-form-group>
						</div>
					</b-col>
				</b-row>

				<div class="mt-5 d-flex justify-content-around">
					<div v-if="getNewClientForm()">
						<button class="btn client-modal-btn" type="reset">Cancelar</button>
						<button class="btn client-modal-btn" type="submit"> Agregar</button>
					</div>
					<div v-else>
						<button class="btn client-modal-btn" type="button" @click="deleteClient">Eliminar</button>
						<button class="btn client-modal-btn"
						        type="button"
						        @click="editClient"
						        :class="{'client-modal-btn-pressed': editButton}">Editar</button>
						<button class="btn client-modal-btn" type="button">Crear Tarea</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { taskGridDummyData, clienteDummyData, vendorDummyData } from './data/taskGridData';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ClientForm',
  data: function() {
    return {
      editButton: false,
      vendorSelected: '',
	    membersTasks: taskGridDummyData,
      clients: clienteDummyData,
      vendors: vendorDummyData,
    };
  },
  computed: {
    ...mapGetters(['getShowClientForm', 'getFormTitle', 'loggedInUser', 'CLIENTS_LIST', 'VENDOR_LIST']),
	  formData: {
      get() {
        if (this.getFormClientId() === ''){
          return {
            name: '',
			  lat: "0",
			  lng: "0",
            social_reason: '',
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
        else {
        	console.log("id client", this.getFormClientId());
          const client = this.CLIENTS_LIST.find(x => x.id.id === this.getFormClientId());
          console.log('client_selected', client);
          const form = {
			  name: client.additionalInfo.name,
			  lat: "0",
			  lng: "0",
			  social_reason: client.additionalInfo.social_reason,
			  address: client.additionalInfo.address || 'N/A',
			  vendor: {
				  id: '',
				  name: ''
			  },
			  notes: client.additionalInfo.notes,
			  contacts: client.additionalInfo.contacts
		  };
          if(client.additionalInfo.contacts.length < 2) {
          	while (form.contacts.length != 2) {
          		form.contacts.push({
					name: 'N/A',
					phone: '',
					email: ''
				})
			}
		  }
          return form;
        }
      },
		  set(value){
        console.log(value);
		  }
	  },
    vendorSelectList: function () {
      var options = {};
      for (const i in this.vendors) {
        options[this.vendors[i].id] = this.vendors[i].name;
      }
      return options;
    },
	  editForm: function(){
      if (!this.getNewClientForm()) {
        if (!this.editButton)
          return true;
      }
      return false;
	  }
  },
  methods: {
    ...mapGetters(['getFormClientId', 'getNewClientForm']),
    ...mapActions(['showNewClientForm', 'showClientForm', 'hideClientForm', 'setFormClientId', 'showClientHistoryForm']),
	showHistory() {
    	const payload = {
    		client_id: this.getFormClientId(),
			limit: 10000
		};
    	this.$store.dispatch('GET_CLIENT_HISTORY', payload);
		this.showClientHistoryForm();
	},
    addNewClient: function () {
    	this.$store.dispatch('POST_CLIENT', this.formData)
				.then(response => {
					const payload = {
						limit: 1000,
						addTasks: true
					};
					this.$store.dispatch('GET_CLIENTS_LIST', payload);
				});
      /*console.log(this.formData.vendor);
      this.formData.vendor = this.vendors[this.vendorSelected];
      this.clients.push(this.formData);
      const clientId = this.clients.length - 1;
      this.addNewTask(this.vendorSelected, clientId);*/
      this.hideForm();
    },
    addNewTask: function (vendorId, clientId) {
      const newTask = {
        client_id: clientId,
        company_name: this.formData.businessName,
        client_name: this.formData.name,
        activity: {
          name: 'N/A',
          state: 'Without contact'
        },
        last_activity: new Date()
      };
      this.membersTasks[vendorId].tasks.push(newTask);
    },
    updateTask: function (task) {
      const clientId = task.client_id;
      var clientData = this.clients[clientId];
      clientData = this.formData;
      console.log(clientData);
      task.company_name = this.formData.bussinessName;
      task.client_name = this.formData.name;
    },
    formatDate: function (dateToFormat) {
      return dateToFormat.toString().split(' ', 4).join(' ');
    },
    deleteClient: function () {
      // this.membersTasks[this.vendorSelectedInGrid].tasks.splice(this.clientSelecteIndex, 1);
      this.$store.dispatch('DELETE_CLIENT', this.getFormClientId())
			  .then(response => {
			  	const payload = {
			  		limit: 1000,
					addTasks: true,
					addVendor: true
				};
			  	this.$store.dispatch('GET_CLIENTS_LIST', payload)
			  });
		this.hideForm();
    },
    hideForm: function () {
      this.resetModal();
      this.hideClientForm();
    },
    editClient: function () {
      if (this.editButton) {
      	// seccond edit
		  this.formData.client_id = this.getFormClientId();
		this.$store.dispatch('UPDATE_CLIENT', this.formData)
				.then(response => {
					const setClientVendorPayload = {
						client_id: this.getFormClientId(),
						vendor_id: this.vendorSelected
					};
					this.$store.dispatch('SET_CLIENT_VENDOR',setClientVendorPayload )
							.then(response2 => {
								const payload = {
									limit: 1000,
									addTasks: true,
									addVendor: true
								};
								this.$store.dispatch('GET_VENDOR_LIST', payload)
							});
				});
		  this.hideForm();
        //this.clients[this.getFormClientId()] = this.formData;
      }
      this.editButton = !this.editButton;
      var task = this.membersTasks[this.vendorSelectedInGrid].tasks[this.clientSelecteIndex];
      this.updateTask(task);
      // if (this.vendorSelectedInGrid !== this.vendorSelected) {
      //   task = this.membersTasks[this.vendorSelectedInGrid].tasks.splice(this.clientSelecteIndex, 1)[0];
      //   console.log(task);
      //   this.membersTasks[this.vendorSelected].tasks.push(task);
      // }
      // console.log(task);
      // console.log(this.clients);
      // this.hideForm();
    },
    resetModal: function () {
      this.editButton = true;
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
};
</script>

<style scoped lang="scss">
	@import 'src/assets/styles/vendor/bootstrap/bootstrap';

	.client-modal-contact {
		border-radius: 3px;
		border: 1px solid gray;
		padding: 0.5rem;
	}

	.client-modal-btn{
		background-color: #00b3ee;
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
