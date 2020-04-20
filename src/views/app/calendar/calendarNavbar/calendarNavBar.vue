<template>
	<b-card body-class="calendar-navbar-body" class="calendar-navbar">
		<div id="options_headers" class="d-flex justify-content-between align-items-center">
			<div class="d-lg-inline-flex
									d-xl-inline-flex
									d-md-flex
									d-sm-flex
									flex-md-wrap
									flex-sm-wrap
									justify-content-lg-around">
				<b-form-select v-model="selectedFilter" :options="options" @change="onChangeFilter"/>
				<button v-if="loggedInUser.admin" class="client-navbar-btn-equip btn mx-1">Ver Equipo</button>
			</div>

			<div id="calendar_selection" class="d-flex d-inline-block align-items-center">
				<p class="text-adjust font-weight-bold">{{getRangeText}}</p>
				<button type="button" class="btn btn-icon btn-action  move-day mr-50 px-50" data-action="move-prev">
					<i class="bx bx-chevron-left" data-action="move-prev"></i>
				</button>
				<button type="button" class="btn btn-icon btn-action move-day mr-50 px-50" data-action="move-next">
					<i class="bx bx-chevron-right" data-action="move-next"></i>
				</button>
			</div>
			<div class="d-lg-inline-flex
										d-xl-inline-flex
										d-md-flex
										d-sm-flex
										flex-md-wrap
										flex-sm-wrap
										justify-content-lg-around">
				<div class="navbar-options-items">
					<label>
						<input type="checkbox" v-model="expirada" class="tui-full-calendar-checkbox-square">
						<span :style="{'border-color': '#292B2A', 'background-color': active ? '#292B2A' : 'transparent'}"/>
						<span class="font-weight-bold">Expirada</span>
					</label>
				</div>
				<div class="navbar-options-items">
					<label>
						<input type="checkbox" v-model="ahora" class="tui-full-calendar-checkbox-square">
						<span :style="{'border-color': '#D85557', 'background-color': ahora ? '#D85557' : 'transparent'}"/>
						<span class="font-weight-bold">Ahora</span>
					</label>
				</div>
				<div class="navbar-options-items">
					<label>
						<input type="checkbox" v-model="pronto" class="tui-full-calendar-checkbox-square">
						<span
							:style="{'border-color': '#F9CD56', 'background-color': pronto ? '#F9CD56' : 'transparent'}"/>
						<span class="font-weight-bold">Pronto</span>
					</label>
				</div>
				<div class="navbar-options-items">
					<label>
						<input type="checkbox" v-model="temprano" class="tui-full-calendar-checkbox-square">
						<span
							:style="{'border-color': '#C7D963', 'background-color': temprano ? '#C7D963' : 'transparent'}"/>
						<span class="font-weight-bold">Temprano</span>
					</label>
				</div>
				<div class="navbar-options-items">
					<label>
						<input type="checkbox" v-model="pendiente" class="tui-full-calendar-checkbox-square">
						<span
							:style="{'border-color': '#D2D4D6', 'background-color': pendiente ? '#D2D4D6' : 'transparent'}"/>
						<span class="font-weight-bold">Pendiente</span>
					</label>
				</div>
			</div>

			<a class="text-adjust" @click="showNewClientForm()">
				<i class="i-Add mr-2 btn-add-plani"/>
				<span>Agregar nuevo cliente</span>
			</a>
			<b-form-input
				id="input-1"
				type="text"
				v-model="search"
				class="form-control-rounded col-3 mx-1"
				placeholder="Buscar tareas"
			/>
		</div>
	</b-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'calendarNavBar',
  data() {
    return {
      selectedFilter: 'month',
      options: [
        { value: 'day', text: 'Día' },
        { value: 'week', text: 'Semana' },
        { value: 'month', text: 'Mes' },
        { value: 'Tasks', text: 'Tareas' },
        { value: 'Map', text: 'Mapa' },
        { value: 'Custom', text: 'Customizar' }
      ],
    };
  },
  computed:{
    ...mapGetters(['getRangeText', 'loggedInUser']),
	  expirada: {
    	get(){},
		  set(value) {}
	  },
	  ahora: {
		  get(){},
		  set(value) {}
	  },
	  pronto: {
		  get(){},
		  set(value) {}
	  },
	  temprano: {
		  get(){},
		  set(value) {}
	  },
	  pendiente: {
		  get(){},
		  set(value) {}
	  },
  },
  methods: {
    ...mapActions(['setSelectedComponentView', 'setSelectedMapView', 'setShowNewTaskModal']),
    onChangeFilter() {
      if (this.selectedFilter === 'day' || this.selectedFilter === 'month' || this.selectedFilter === 'week') {
        this.setSelectedComponentView(this.selectedFilter);
        this.setSelectedMapView(this.selectedFilter);
      } else if (this.selectedFilter === 'Map') {
        this.setSelectedMapView('day');
        this.setSelectedComponentView(this.selectedFilter);
      } else {
        this.setSelectedComponentView(this.selectedFilter);
      }
    },
    showNewTaskModal() {
      this.setShowNewTaskModal(true);
    }
  }
};
</script>
<style lang="scss">
	.btn-add-plani {
		color: #00b3ee;
	}

	.calendar-navbar-btn-equip {
		background-color: #00b3ee;
		color: white;
	}

	.calendar-navbar-body{
		padding: 0.5rem 0.75rem;
	}

	.calendar-navbar{
		margin-bottom: 1rem;
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
