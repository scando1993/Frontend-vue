<template>
	<div class="box">
		<task-grid-navbar/>
		<div id="body" class="view-content">
			<div class="client-view">
				<div class="client-content"
					:class="[ getFormClientShow ? 'col-sm-6 col-md-6 col-xl-7 col-lg-7' : '', 'col-12' ]">
<!--					<div class="d-flex justify-content-between mr-3">-->
					<vue-perfect-scrollbar class="scrollable d-flex flex-row flew-wrap justify-content-between mr-3"
					                       ref="scrollable_content">
						<div v-if="admin" class="d-flex flex-lg-row flex-xl-row flex-sm-column flex-md-column">
<!--							<clients-by-vendor/>-->
							<template v-for="(vendor, indexVendor) in membersTasks">
								<div v-bind:key="indexVendor" v-if="indexVendor !== 0"
								     class="mx-xl-3 mx-lg-3 my-md-3 my-sm-3" style="border: 1px solid gray;" />
								<div v-bind:key="indexVendor" class="flex-grow col-lg-6 col-xl-6">
									<h3 class="text-center">{{vendor.memberName}}</h3>
									<div style="min-width:300px;">
										<b-row>
											<b-col md="6" sm="6" xl="6" lg="6" v-for="(task, indextask) in filterSearch(vendor.tasks)" :key="indextask">
												<div class="card shadow mb-2 mr-0" v-on:click="showFormClientB(indexVendor, indextask)">
													<div class="card-header p-2" :style="{'background-color': getHeaderNgVariant(task.activity.state)}"/>
													<div class="client-card-body">
														<div class="d-flex flex-row justify-content-between">
															<div class="mr-auto">
																<b class="font-weight-bold">{{clients[task.client_id].bussinessName}}</b>
																<p>{{clients[task.client_id].name}}</p>
															</div>
															<div class="">
																<button class="client-task-btn-history p-1">Historial</button>
															</div>
														</div>
														<div class="row">
															<div class="col-12">
																<b>Proxima actividad</b>
																<span class="client-dot-activity" :style="{'background-color': getHeaderNgVariant(task.activity.state)}"/>
															</div>
														</div>
														<div class="row">
															<div class="col-12">
																<p class="text-wrap">{{task.activity.name}}</p>
															</div>
														</div>
														<div class="row">
															<p class="mb-0 col-12 text-italic">Ultima acción: {{formatDate(task.last_activity)}}</p>
														</div>
													</div>
												</div>
											</b-col>
										</b-row>
									</div>
								</div>
							</template>
						</div>
						<div v-else></div>
					</vue-perfect-scrollbar>
<!--					</div>-->
				</div>
				<div v-if="getFormClientShow" class="ml-2 flex-fill"
					:class="{ getFormClientShow: 'col-sm-6 col-md-6 col-xl-5 col-lg-5' }">
					<div class="card">
						<div class="card-header" style="background: #00b3ee"></div>
						<div class="client-modal-header">
							<div class="d-flex justify-content-between align-content-center">
								<button v-on:click="hideForm" class="btn font-weight-bold" style="background: none; color: #00b3ee; font-size: 20px">X
								</button>
								<h3 class="font-weight-bold">{{getFormTitle}}</h3>
								<button v-if="!getFormClientNewClient" class="btn py-0 client-task-btn-history">Ver Historial</button>
								<div v-else></div>
							</div>
						</div>
						<div class="card-body">
							<form ref="formNewAdmin" @submit.stop.prevent @submit="addNewCliente" @reset="hideForm">
								<b-row>
									<b-col sm="6" md="6" lg="6" xl="6" class="d-flex flex-column justify-content-between">
										<b-form-group
											label-for="clientName"
											invalid-feedback="llene este campo"
											label="Nombre"
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
											label="Razón Social"
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
											label="Ubicación"
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
											label="Asignar vendedor"
										>
											<b-form-select
												v-model="vendor_id_selected"
												:options="VENDOR_TASKS.map( function(element, index) {return {value: element.id.id, text: element.name}})"
												id="inline-form-custom-select-pref"
												required
											>
												<option slot="first" :value="null">Choose...</option>
												>
											</b-form-select>
										</b-form-group>
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
											>>
											</b-form-textarea>
										</b-form-group>

									</b-col>
									<b-col sm="6" md="6" lg="6" xl="6" class="d-flex flex-column justify-content-between">
										<div class="client-modal-contact">
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
										</div>
										<div class="client-modal-contact">
											<p class="ml-0">Contacto 2:</p>
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
										</div>
									</b-col>
								</b-row>

								<div class="mt-5 d-flex justify-content-around">
									<div v-if="getFormClientNewClient">
										<button class="btn client-btn" type="reset">Cancelar</button>
										<button class="btn client-btn" type="submit"> Agregar</button>
									</div>
									<div v-else>
										<button class="btn client-btn" type="button" @click="deleteClient">Eliminar</button>
										<button class="btn client-btn" type="reset">Cancelar</button>
										<button class="btn client-btn" type="button" @click="editForm">Editar</button>
										<button class="btn client-btn" type="button">Crear Tarea</button>
									</div>
								</div>
							</form>
						</div>
					</div>
<!--					<b-card style="min-width: 400px">-->
<!--						<template v-slot:header class="bg-success">-->
<!--							<div class="d-flex justify-content-between">-->
<!--								<button v-on:click="hideForm" class="btn font-weight-bold" style="background: none; color: #00b3ee; font-size: 20px">X-->
<!--								</button>-->
<!--								<h3 class="font-weight-bold">{{getFormTitle}}</h3>-->
<!--								<button v-if="!getFormClientNewClient" class="btn py-0 client-task-btn-history">Ver Historial</button>-->
<!--								<div v-else></div>-->
<!--							</div>-->
<!--						</template>-->
<!--						<form ref="formNewAdmin" @submit.stop.prevent @submit="addNewCliente" @reset="hideForm">-->
<!--							<b-row>-->
<!--								<b-col sm="6" md="6" lg="6" xl="6" class="d-flex flex-column justify-content-between">-->
<!--									<b-form-group-->
<!--										label-for="clientName"-->
<!--										invalid-feedback="llene este campo"-->
<!--										label="Nombre"-->
<!--									>-->
<!--										<b-form-input-->
<!--											id="clientName"-->
<!--											placeholder=""-->
<!--											type="text"-->
<!--											v-model="formData.name"-->
<!--											required-->
<!--										/>-->
<!--									</b-form-group>-->
<!--									<b-form-group-->
<!--										label-for="clientSocial"-->
<!--										invalid-feedback="Llene este campo"-->
<!--										label="Razón Social"-->
<!--									>-->
<!--										<b-form-input-->
<!--											id="clientSocial"-->
<!--											placeholder=""-->
<!--											type="text"-->
<!--											v-model="formData.bussinessName"-->
<!--											required-->
<!--										/>-->
<!--									</b-form-group>-->
<!--									<b-form-group-->
<!--										label-for="clientUbication"-->
<!--										invalid-feedback="Llene este campo"-->
<!--										label="Ubicación"-->
<!--									>-->
<!--										<b-form-input-->
<!--											id="clientUbication"-->
<!--											placeholder=""-->
<!--											type="text"-->
<!--											v-model="formData.address"-->
<!--											required-->
<!--										/>-->
<!--									</b-form-group>-->
<!--									<b-form-group-->
<!--										label-for="clientVendor"-->
<!--										invalid-feedback="clientVendor"-->
<!--										label="Asignar vendedor"-->
<!--									>-->
<!--										<b-form-select-->
<!--											v-model="vendorSelected"-->
<!--											:options="vendorSelectList"-->
<!--											id="inline-form-custom-select-pref"-->
<!--											required-->
<!--										>-->
<!--											<option slot="first" :value="null">Choose...</option>-->
<!--											>-->
<!--										</b-form-select>-->
<!--									</b-form-group>-->
<!--									<b-form-group-->
<!--										label-for="clientVendor"-->
<!--										invalid-feedback="clientVendor"-->
<!--										label="Notas"-->
<!--									>-->
<!--										<b-form-textarea-->
<!--											v-model="formData.notes"-->
<!--											placeholder="..."-->
<!--											rows="3"-->
<!--											max-rows="6"-->
<!--										>>-->
<!--										</b-form-textarea>-->
<!--									</b-form-group>-->

                </b-card>
            </div>
        </div>

    </div>
</template>

<script>
import TaskGridNavbar from './navbar/taskGridNavbar';
import ClientsByVendor from './ClientsByVendor';
import { mapActions, mapGetters } from 'vuex';
import { taskGridDummyData, clienteDummyData, vendorDummyData } from './data/taskGridData';

export default {
  name: 'taskGrid',
  components: { TaskGridNavbar, ClientsByVendor },
  data() {
    return {
      admin: true,
      socialState: '',
      nameState: '',
      newClientSocial: '',
      newClientName: '',
      clientFormTitle: 'Cliente',
      newClientForm: false,
      client_id_selected: '',
      vendor_id_selected: '',
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
        businessName: '',
        address: '',
        vendor: {
          id: '1',
          name: 'Jose Jose'
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
      }
    };
  },
  created() {
    console.log(this.getFormClientShow);
  },
  computed: {
    ...mapGetters(['getFormClientShow', 'getFormClientNewClient', 'getFormTitle', 'VENDOR_TASKS']),

    vendorSelectList: function () {
      var options = {};
      for (const i in this.vendors) {
        options[this.vendors[i].id] = this.vendors[i].name;
      }
      return options;
    }
  },
  methods: {
    ...mapActions(['showNewClientForm', 'showClientForm', 'hideClientForm', 'GET_CLIENTS_TASK', 'POST_CLIENT', 'SET_CLIENT_VENDOR']),
    ...mapGetters(['getSearchText',
      'getActiveClients',
      'getInactiveClients',
      'getNotContactClients']),

    filterSearch(list) {
      return list.filter(task => {
        switch (task.activity.state) {
	        case 'Active': {
	          if (!this.getActiveClients())
	            return false;
	        }break;
	        case 'Inactive': {
	          if(!this.getInactiveClients())
	            return false;
	        }break;
	        case 'Without contact':{
	          if(!this.getNotContactClients())
	            return false;
	        }break;
        }
        return this.clients[task.client_id].bussinessName.toLowerCase().match(this.getSearchText().toLowerCase());
      });
    },
    getTaskName(tasks) {
      var name = 'N/A';
      try {
        name = tasks[0].task_info.name;
      }
      catch (e) {

      }
      return name;
    },
    getTaskLastStatus(tasks) {
      var name = 'N/A';
      try {
        name = tasks[0].task_info.start_date;
      }
      catch (e) {

      }
      return name;
    },
    async addNewCliente() {
      // console.log(this.vendorSelected);
      // this.vendorSelectedInGrid.
      //this.clients.push(this.formData);
      console.log(this.formData);
      console.log('asas', this.vendor_id_selected);
      const response = await this.$store.dispatch('POST_CLIENT', this.formData)
        .then(response => {
          return response;
        });
      console.log('response, post', response);
      const toSent = {
        client_id: response.data.data.id.id,
        vendor_id: this.vendor_id_selected
      };
      this.$store.dispatch('SET_CLIENT_VENDOR', toSent)
        .then(response2 => {
          this.$store.dispatch('GET_CLIENTS_TASK');
        })
        .catch(e2 => {
          console.log(e2);
        })
      // const clientId = this.clients.length - 1;
      //this.addNewTask(this.vendorSelected, clientId);
      this.hideForm();
    },
    addNewTask(vendoId, clientId) {
      const newTask = {
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
    async showFormClientB(vendorIndex, indexcClient) {
      console.log('index', vendorIndex, indexcClient)
      this.vendorSelectedInGrid = vendorIndex;
      const selectedVendor = this.VENDOR_TASKS[vendorIndex];
      const selectedClient = await selectedVendor.Clients[indexcClient];
      this.client_id_selected = selectedClient.client_info.id;
      const clientInfo = selectedClient.client_info.client_info;
      console.log(clientInfo.name);

      this.formData['name'] = clientInfo.name;
      this.formData['social_reason'] = clientInfo.social_reason;
      this.formData['address'] = clientInfo.lat.toString() + " " + clientInfo.lng.toString();
      this.formData['notes'] = clientInfo.notes;
      this.formData['contacts'] = clientInfo.contacts || this.formData['contacts'];
      this.formData['lat'] = clientInfo.lat;
      this.formData['lng'] = clientInfo.lng;
      this.vendor_id_selected = selectedVendor.id.id;



      /*
			this.clientSelecteIndex = taskIndex;
			this.vendorSelected = vendorIndex;
			const clientId = this.membersTasks[vendorIndex].tasks[taskIndex].client_id;
			const clientData = this.clients[clientId];
			this.setFormClientData(clientData);
			*/
      this.showClientForm();
    },
    deleteClient() {
      this.$store.dispatch('DELETE_CLIENT', this.client_id_selected)
        .then(response => {
          this.$store.dispatch('GET_CLIENTS_TASK');
        })
      //this.membersTasks[this.vendorSelectedInGrid].tasks.splice(this.clientSelecteIndex, 1);
      this.hideForm();
    },
    hideForm() {
      this.resetModal();
      this.hideClientForm();
    },
    async editForm() {
      this.formData['client_id'] = this.client_id_selected;
      const result = await this.$store.dispatch('UPDATE_CLIENT', this.formData)
        .then(result => {
          return result;
        });
      const toSent = {
        client_id: this.client_id_selected,
        vendor_id: this.vendor_id_selected
      };
      this.$store.dispatch('SET_CLIENT_VENDOR', toSent)
        .then(response2 => {
          this.$store.dispatch('GET_CLIENTS_TASK');
        })
        .catch(e2 => {
          console.log(e2);
        })

      /*var task = this.membersTasks[this.vendorSelectedInGrid].tasks[this.clientSelecteIndex];
			this.updateTask(task);
			console.log(this.vendorSelectedInGrid);
			console.log(this.vendorSelected);
			console.log(this.clientSelecteIndex);
			if (this.vendorSelectedInGrid !== this.vendorSelected) {
					task = this.membersTasks[this.vendorSelectedInGrid].tasks.splice(this.clientSelecteIndex, 1)[0];
					console.log(task);
					this.membersTasks[this.vendorSelected].tasks.push(task);
			}
			console.log(task);
			console.log(this.clients);
			*/
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
      this.vendor_id_selected = '';
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

<style scoped lang="scss">
	@import 'src/assets/styles/vendor/bootstrap/bootstrap';

	.scrollable {
		width: 100%;
		/*height: 500px;*/
		position: relative;
		overflow: scroll;
	}

	.client-card-text {

	}

	.client-view {
		display: flex;
		flex-flow: row;
		height: 100%;
		width: 100%;
	}

	.client-content{
		flex: 1 1 auto;
	}

	.client-modal {
		flex-grow: 1;
	}

	.client-modal-contact {
		border-radius: 10px;
		border: 5px #000000;
	}

	.client-modal-header {
		@extend .card-header;
		padding: 0.15rem 1rem;
	}

	.client-task-btn-history {
		background-color: #00b3ee;
		color: white;
		border-radius: 5px;
		font-size: 0.75rem;
	}

	.client-btn{
		background-color: #00b3ee;
		color: white;
		border-radius: 12px;
	}

	.client-dot-activity {
		border-radius: 50%;
		width: 1em;
		height: 1em;
		margin-left: 0.50rem;
		display: inline-block;
	}

	.client-card-body {
		@extend .card-body !optional;
		padding: 0.25rem 1.25rem 1.25rem 1.25rem;
	}

	@media(min-width: 1200px){
		.v-xl-divider{
			margin-left: 1.25rem;
			margin-right: 1.25rem;
			width: 0;
			border: 1px solid gray;
			flex-basis: 100%;
		}
	}

	@media(min-width: 992px){
		.v-lg-divider{
			margin-left: 1.25rem;
			margin-right: 1.25rem;
			width: 0;
			border: 1px solid gray;
			flex-basis: 100%;
		}
	}

	@media(min-width: 768px){
		.h-md-divider{
			margin-top: 1.25rem;
			margin-bottom: 1.25rem;
			height: 0;
			border: 1px solid gray;
			flex-basis: 100%;
		}
	}

	@media(min-width: 576px){
		.h-sm-column{
			margin-top: 1.25rem;
			margin-bottom: 1.25rem;
			height: 0;
			border: 1px solid gray;
			flex-basis: 100%;
		}
	}

	.vendor-list {

	}
</style>
