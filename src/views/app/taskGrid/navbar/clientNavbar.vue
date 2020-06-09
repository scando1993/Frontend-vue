<template>
	<b-card body-class="client-navbar-body" class="client-navbar">
		<div id="options_headers" class="d-flex justify-content-start align-items-center">
			<div class="d-lg-inline-flex
									d-xl-inline-flex
									d-md-flex
									d-sm-flex
									flex-md-wrap
									flex-sm-wrap
									justify-content-lg-around">
				<b-form-select
                    style="cursor: pointer"
					variant="outline-primary"
					text="Día"
					class="mx-1 mb-sm-1 mb-md-1 w-auto"
					v-model="groupBy"
					:options="loggedInUser.admin ? group_options_admin : group_options_user"
				/>
				<button v-if="loggedInUser.admin" class="client-navbar-btn-equip btn mx-1">Ver Equipo</button>
			</div>
			<b-form-input
				id="input-1"
				type="text"
				v-model="search"
				class="form-control-rounded col-3 mx-1"
				placeholder="Buscar cliente"
				@click="createClickGAEvent('CLIENT_SEARCH', 'FILTER', 'CLIENT')"
			/>
			<div class="d-inline-flex
									flex-nowrap
									flex-sm-column
									flex-md-column
									flex-lg-row
									flex-xl-row
									justify-content-lg-around">
				<div class="client-navbar-options-items">
					<label class="d-flex flex-row mb-0 client-option-list">
						<input type="checkbox" v-model="active" class="client-navbar-checkbox-square">
						<span :style="{'border-color': '#00b3ee', 'background-color': active ? '#00b3ee' : 'transparent'}"
                  class="client-option-list"/>
						<span class="client-option-list">Activos</span>
					</label>
				</div>
				<div class="client-navbar-options-items">
					<label class="d-flex flex-row mb-0 client-option-list">
						<input type="checkbox" v-model="inactive" class="client-navbar-checkbox-square">
						<span :style="{'border-color': 'gray', 'background-color': inactive ? 'gray' : 'transparent'}"
                  class="client-option-list"/>
						<span class="client-option-list">Inactivos</span>
					</label>
				</div>
				<div class="client-navbar-options-items">
					<label class="d-flex flex-row mb-0 client-option-list">
						<input type="checkbox" v-model="not_contact" class="client-navbar-checkbox-square">
						<span :style="{'border-color': 'gainsboro', 'background-color': not_contact ? 'gainsboro' : 'transparent'}"
                  class="client-option-list"/>
						<span class="client-option-list">Sin Contactar</span>
					</label>
				</div>
			</div>

				<a style="cursor: pointer" class="d-flex flex-row mx-2" @click="showNewClientForm(); createClickGAEvent('CLIENT_NEW', 'CLICK', 'CLIENT')">
					<i class="i-Add mr-1 btn-add-plani align-self-center"/>
					<span class="text-adjust align-self-center">Agregar nuevo cliente</span>
				</a>

				<a style="cursor: pointer" class="d-flex flex-row mx-2" @click="showNewBulkClientForm(); createClickGAEvent('CLIENT_BULK_NEW', 'CLICK', 'CLIENT')">
					<i class="i-Add mr-1 btn-add-plani align-self-center"/>
					<span class="text-adjust align-self-center">Importar nuevos clientes</span>
				</a>



		</div>
	</b-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'clientNavbar',
  data() {
    return {
      group_options_admin: [
        { value: 'vendor', text: 'Vendedores' },
        { value: 'priority', text: 'Prioridad' },
        { value: 'clients', text: 'Clientes' },
		  { value: 'table', text: 'Tabla' },
		  { value: 'custom', text: 'Customizar' },
	  ],
      group_options_user: [
        { value: 'priority', text: 'Prioridad' },
        { value: 'clients', text: 'Alfabetico' },
		  { value: 'table', text: 'Tabla' },
		  { value: 'custom', text: 'Customizar' }
      ]
    };
  },
  mounted: function() {
    let option = this.loggedInUser.admin ? this.group_options_admin[1].value : this.group_options_user[0].value;
    this.currentGroupByFilter(option);
  },
  methods: {
    ...mapActions(
      ['changeShowFormClient',
        'showNewClientForm',
        'setSearchText',
        'toggleActiveClients',
        'toggleInactiveClients',
        'toggleNotContactClients',
        'currentGroupByFilter'
      ]),
    ...mapGetters(
      ['getShowClientForm',
        'getSearchText',
        'getActiveClients',
        'getInactiveClients',
        'getNotContactClients',
        'getGroupByFilter'
      ]),
	  showNewBulkClientForm() {
    	this.$bvModal.show('bulk_client_modal')
	  },
	  createClickGAEvent(action, category, label, value) {
		  this.$gtag.event(action, {
			  'event_category': category,
			  'event_label': label,
			  'value': value || null
		  })
	  }
  },
  computed: {
    search: {
      get() {
        return this.getSearchText();
      },
      set(value) {
        this.setSearchText(value);
      }
    },
    active: {
      get() {
        return this.getActiveClients();
      },
      set() {
        this.toggleActiveClients();
		  this.createClickGAEvent('CLIENT_ACTIVE', 'FILTER', 'CLIENT', this.getActiveClients())
      }
    },
    inactive: {
      get() {
        return this.getInactiveClients();
      },
      set() {
        this.toggleInactiveClients();
        this.createClickGAEvent('CLIENT_INACTIVE', 'FILTER', 'CLIENT', this.getInactiveClients())
      }
    },
    not_contact: {
      get() {
        return this.getNotContactClients();
      },
      set() {
        this.toggleNotContactClients();
		  this.createClickGAEvent('CLIENT_WITHOUTCONTACT', 'FILTER', 'CLIENT', this.getNotContactClients());
	  }
    },
    groupBy: {
      get() {
        if (this.getGroupByFilter() === '')
          return this.group_options_admin[0].text;
        return this.getGroupByFilter();
      },
      set(value) {
        this.currentGroupByFilter(value);
        this.createClickGAEvent('CLIENT_VIEW', 'FILTER', 'CLIENT', value);
      }
    },
    ...mapGetters(['loggedInUser']),
  }
};
</script>

<style scoped lang="scss">
  .btn-add-plani {
    color: #FFFFFF;
    background: #00b3ee;
    border: 1px solid #00b3ee;
    border-radius: 50%;
    font-size: 1.5em;
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    line-height: 1.15;
  }

  .client-navbar-btn-equip {
		background-color: #00b3ee;
		color: white;
	}

  .client-option-list {
    font-size: 1em;
    white-space: normal;
    align-self: center;
    text-transform: capitalize;
  }

	.client-navbar-body{
		padding: 0.5rem 0.75rem;
	}

	.client-navbar{
		margin-bottom: 1rem;
	}

  .client-navbar-options-items {
    align-self: center;
    margin-left: 1.2rem;
    margin-right: 1.2rem;
  }

  .text-adjust {
    font-size: 1em;
    white-space: normal;
    align-self: center;
    text-transform: capitalize;
  }


	input[type=checkbox].client-navbar-checkbox-square {
		display: none;
	}

	input[type=checkbox].client-navbar-checkbox-square + span {
		display: inline-block;
		cursor: pointer;
		width: 14px;
		height: 14px;
		line-height: 14px;
		vertical-align: middle;
		margin-right: 8px;
		border: 2px solid;
		background: transparent;
	}
</style>
