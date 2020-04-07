<template>
	<div>
		<b-card>
			<div id="options_headers" class="d-flex justify-content-between align-items-center">
				<div
					class="d-lg-inline-flex d-xl-inline-flex d-md-flex d-sm-flex flex-md-wrap flex-sm-wrap justify-content-lg-around">
					<b-form-select
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
				/>
				<div
					class="d-lg-inline-flex d-xl-inline-flex d-md-flex d-sm-flex flex-md-wrap flex-sm-wrap justify-content-lg-around">
					<div class="navbar-options-items">
						<label>
							<input type="checkbox" v-model="active" class="tui-full-calendar-checkbox-square">
							<span :style="{'border-color': '#00b3ee', 'background-color': active ? '#00b3ee' : 'transparent'}"/>
							<span class="font-weight-bold">Activos</span>
						</label>
					</div>
					<div class="navbar-options-items">
						<label>
							<input type="checkbox" v-model="inactive" class="tui-full-calendar-checkbox-square">
							<span :style="{'border-color': 'gray', 'background-color': inactive ? 'gray' : 'transparent'}"/>
							<span class="font-weight-bold">Inactivos</span>
						</label>
					</div>
					<div class="navbar-options-items">
						<label>
							<input type="checkbox" v-model="not_contact" class="tui-full-calendar-checkbox-square">
							<span
								:style="{'border-color': 'gainsboro', 'background-color': not_contact ? 'gainsboro' : 'transparent'}"/>
							<span class="font-weight-bold">Sin Contactar</span>
						</label>
					</div>
				</div>

				<a class="text-adjust" @click="showNewClientForm()">
					<i class="i-Add mr-2 btn-add-plani"/>
					<span>Agregar nuevo cliente</span>
				</a>

			</div>
		</b-card>
	</div>
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
        { value: 'custom', text: 'Customizar' }
      ],
      group_options_user: [
        { value: 'priority', text: 'Prioridad' },
        { value: 'clients', text: 'Alfabetico' },
        { value: 'custom', text: 'Customizar' }
      ]
    };
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
      ['getFormClientShow',
        'getSearchText',
        'getActiveClients',
        'getInactiveClients',
        'getNotContactClients',
        'getGroupByFilter'
      ]),
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
      }
    },
    inactive: {
      get() {
        return this.getInactiveClients();
      },
      set() {
        this.toggleInactiveClients();
      }
    },
    not_contact: {
      get() {
        return this.getNotContactClients();
      },
      set() {
        this.toggleNotContactClients();
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
      }
    },
    ...mapGetters(['loggedInUser']),
  }
};
</script>

<style scoped>
	.planiButton {
		background-color: #00b3ee;
		color: white;
	}

	.btn-add-plani {
		color: #00b3ee;
	}

	.client-navbar-btn-equip {
		background-color: #00b3ee;
		color: white;
	}

	.btn-outline-plani {
		color: #3765c9 !important;
		border-color: #3765c9;
		background: rgba(238, 238, 238, 0.6);
	}

	.btn-outline-plani:hover {
		background: #315bb5;
		border-color: #315bb5;
		color: #fff !important;
	}

	.task-option-list {

	}

	.text-adjust {
		font-size: 1rem;
		white-space: normal;
	}

	.navbar-options-items {
		margin-left: 1.2rem;
		margin-right: 1.2rem;
	}

	input[type=checkbox].tui-full-calendar-checkbox-square {
		display: none;
	}

	input[type=checkbox].tui-full-calendar-checkbox-square + span {
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
