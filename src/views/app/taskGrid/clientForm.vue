<template>
  <div class="client-modal">
    <div class="card-header p-1" style="background: #00b3ee"></div>
    <div class="client-modal-header">
      <div class="d-flex flex-row justify-content-between">
        <button v-on:click="hideForm" class="btn client-modal-close-btn">X</button>
        <p class="client-modal-heading">{{getFormTitle}}</p>
        <button v-if="!getNewClientForm()" class="btn client-modal-btn-history" v-on:click="showHistory(); createClickGAEvent('CLIENT_FORM_HISTORY', 'CLICK', 'CLIENT')">Ver
          Historial
        </button>
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
                placeholder="Nombre del cliente"
                type="text"
                v-model="formData.name"
                required
                :readonly="!isEditing && !getNewClientForm()"
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
                placeholder="Razón social"
                type="text"
                v-model="formData.social_reason"
                required
                :readonly="!isEditing && !getNewClientForm()"
              />
            </b-form-group>

            <b-form-group
                    label-for="clientRUC"
                    invalid-feedback="Llene este campo"
                    label="RUC"
                    class="mb-1"
            >
              <b-form-input
                      id="clientRUC"
                      placeholder=""
                      type="number"
                      min="0"
                      v-model="formData.ruc"
                      :readonly="!isEditing && !getNewClientForm()"
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
                :readonly="!isEditing && !getNewClientForm()"
              />
            </b-form-group>

            <div v-if="loggedInUser.admin">
              <div v-if="!isEditing && !getNewClientForm()">
                <b-form-group
                  label-for="showVendor"
                  label="Vendedor"
                  class="mb-1"
                >
                  <b-form-input
                    id="showVendor"
                    type="text"
                    v-model="formData.vendor.text"
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
                  class="mb-1">
                  <b-form-select
                    v-model="vendorSelected"
                    :options="vendorList"
                    id="clientVendor"
                  >
                    <option slot="first" :value="null">Choose...</option>
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
                :readonly="!isEditing && !getNewClientForm()"
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
                  :readonly="!isEditing && !getNewClientForm()"
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
                  :readonly="!isEditing && !getNewClientForm()"
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
                  mim="0"
                  v-model="formData.contacts[0].phoneNumber"
                  :readonly="!isEditing && !getNewClientForm()"
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
                  :readonly="!isEditing && !getNewClientForm()"
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
                  :readonly="!isEditing && !getNewClientForm()"
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
                  mim="0"
                  v-model="formData.contacts[1].phoneNumber"
                  :readonly="!isEditing && !getNewClientForm()"
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
            <div id="noEditButtons" v-if="!isEditing">
              <button class="btn client-modal-btn" type="button" @click="deleteClient">Eliminar</button>
              <button class="btn client-modal-btn"
                      type="button"
                      @click="onEditPress"
                      :class="{'client-modal-btn-pressed': editButton}">Editar
              </button>
              <button class="btn client-modal-btn" type="button" @click="showNewTaskForm()">Crear Tarea</button>
            </div>
            <div id="Editbuttons" v-else>
              <button class="btn client-modal-btn" type="button" @click="cancelEdit">Cancelar</button>
              <button class="btn client-modal-btn" type="button" @click="editClient">Guardar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ClientForm',
  data: function () {
    return {
      editButton: false,
      vendorSelected: '',
      isEditing: false
    };
  },
  computed: {
    ...mapGetters([ 'PROFILE', 'getShowClientForm', 'getFormTitle', 'loggedInUser', 'CLIENTS_LIST', 'VENDOR_LIST', 'CLIENT_SELECTED' ]),
    formData: {
      get() {
        if ( this.getFormClientId() === '' ) {
          return this.validateUserForm();
        } else {
          console.log('id client', this.getFormClientId());
          // const client = this.CLIENTS_LIST.find(x => x.id.id === this.getFormClientId());
          const data = this.getFormClientId();
          console.log('client_selected', data);
          console.log(this.validateUserForm(data));
          return this.validateUserForm(data);
        }
      },
      set(value) {
        console.log(value);
      }
    },
    vendorSelectList: function () {
      var options = {};
      for ( const i in this.vendors ) {
        options[this.vendors[i].id] = this.vendors[i].name;
      }
      return options;
    },
    vendorList: function () {
      const profile_email = this.PROFILE.additionalInfo.email


      function vendorDisplayMap(vendor) {
        if(vendor.additionalInfo.email === profile_email) {
          vendor.additionalInfo.firstName = '(YO)';
          vendor.additionalInfo.lastName = '';
        }
        return {
          value: vendor.id.id,
          text: vendor.additionalInfo.firstName + ' ' + vendor.additionalInfo.lastName
        }
      }
      return this.VENDOR_LIST.map(vendorDisplayMap)

    }
  },
  methods: {
    ...mapGetters([ 'getFormClientId', 'getNewClientForm' ]),
    ...mapActions([
      'showNewClientForm',
      'showClientForm',
      'hideClientForm',
      'setFormClientId',
      'showClientHistoryForm'
    ]),
    validateUserForm: function(data){
      if (data !== undefined){
        try{
          let client = data.client;
          let contacts = data.client.contacts;
          while ( contacts.length <= 2 ){
            contacts.push({
              name: '',
              email: '',
              phoneNumber: null
            });
          }
          return {
            name: client.name || '',
            lat: 0,
            lng: 0,
            ruc: client.ruc || null,
            social_reason: client.social_reason || '',
            address: client.address,
            vendor: data.vendor === 'N/A' ? { value: 0, text: 'N/A' } : this.VENDOR_LIST.map(x => {
              return { value: x.id.id, text: x.additionalInfo.firstName  + ' ' + x.additionalInfo.lastName};
            }).find(x => x.text === data.vendor),
            notes: client.notes,
            contacts: contacts
          };
        }catch ( e ) {
          console.log(e);
        }
      }
      return {
        name: '',
        lat: 0,
        lng: 0,
        ruc: null,
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
    },
    showHistory() {
      const payload = {
        client_id: this.CLIENT_SELECTED.id.id,
        limit: 10000
      };
      this.$store.dispatch('GET_CLIENT_HISTORY', payload);
      this.$store.dispatch('SET_SHOW_NEW_TASK_CLIENT_FORM_ACTION', false);
      this.showClientHistoryForm();

    },
    addNewClient: function () {
      this.formData.ruc = Number(this.formData.ruc);
      this.$store.dispatch('POST_CLIENT', this.formData)
        .then(response => {
          const payload = {
            limit: 1000,
            addTasks: true
          };
          const client = response.data.data;
          console.log('cliet........', client);
          const client_id = client.id.id;
          const setClientVendorPayload = {
            client_id: client_id,
            vendor_id: this.vendorSelected
          };
          this.$store.dispatch('SET_CLIENT_VENDOR', setClientVendorPayload)
                  .finally(response2 => {
                    const payload = {
                      limit: 1000,
                      addTasks: true,
                      addVendor: true
                    };
                    this.$store.dispatch('GET_CLIENTS_LIST', payload);
                  })
        });
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
      const self = this;
      this.$confirm("Confirmar eliminar tarea").then(() => {
        this.$store.dispatch('DELETE_CLIENT', this.CLIENT_SELECTED.id.id)
                .then(response => {
                  const payload = {
                    limit: 1000,
                    addTasks: true,
                    addVendor: true
                  };
                  setTimeout(function() {
                    self.$store.dispatch('GET_CLIENTS_LIST', payload);
                  }, 500)
                });
        this.hideForm();
      });
    },
    hideForm: function () {
      this.isEditing = false;
      this.resetModal();
      this.hideClientForm();
    },
    onEditPress() {
      this.isEditing = true;
      var task = this.membersTasks[this.vendorSelectedInGrid].tasks[this.clientSelecteIndex];
      this.updateTask(task);
    },
    editClient: function () {

        // seccond edit
      this.formData.ruc = Number(this.formData.ruc);

        this.formData.client_id = this.CLIENT_SELECTED.id.id;
        this.$store.dispatch('UPDATE_CLIENT', this.formData)
          .then(response => {
            const setClientVendorPayload = {
              client_id: this.CLIENT_SELECTED.id.id,
              vendor_id: this.vendorSelected
            };
            this.$store.dispatch('SET_CLIENT_VENDOR', setClientVendorPayload)
              .finally(response2 => {
                const payload = {
                  limit: 1000,
                  addTasks: true,
                  addVendor: true
                };
                this.$store.dispatch('GET_CLIENTS_LIST', payload);
              });
          });
        this.hideForm();
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
    },
    showNewTaskForm() {
      // this.$store.dispatch('RESET_CLIENT_HISTORY');
      // this.$store.dispatch('hideClientTaskHistory');
      // this.$store.dispatch('SET_SHOW_NEW_TASK_CLIENT_FORM_ACTION', true);
      this.$bvModal.show("new_task_form")
    },
    cancelEdit() {
      this.hideForm();
    },

    createClickGAEvent(action, category, label, value) {
      this.$gtag.event(action, {
        'event_category': category,
        'event_label': label,
        'value': value || null
      })
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
