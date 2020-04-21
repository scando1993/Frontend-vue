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
        <!--				<button v-if="loggedInUser.admin" class="client-navbar-btn-equip btn mx-1">Ver Equipo</button>-->
      </div>

      <div id="calendar_selection" class="d-flex d-inline-block align-items-center">
        <p class="text-adjust font-weight-bold">{{getRangeText}}</p>
        <button type="button" class="btn btn-icon btn-action" data-action="move-prev">
          <i class="bx bx-chevron-left" style="font-size: 2em;"/>
        </button>
        <button type="button" class="btn btn-icon btn-action" data-action="move-next">
          <i class="bx bx-chevron-right" style="font-size: 2em;"/>
        </button>
      </div>
      <div class="d-inline-flex
										flex-nowrap
										flex-md-row
										flex-lg-row
										flex-xl-row
										flex-sm-column
										flex-md-wrap
										justify-content-lg-around">
        <div class="calendar-navbar-options-items">
          <label class="d-flex flex-row mb-0 task-option-list">
            <input type="checkbox" v-model="expired" class="tui-full-calendar-checkbox-square">
            <span :style="{'border-color': '#292B2A', 'background-color': expired ? '#292B2A' : 'transparent'}"
                  class="task-option-list"/>
            <span class="task-option-list">Expirada</span>
          </label>
        </div>
        <div class="calendar-navbar-options-items">
          <label class="d-flex flex-row mb-0 task-option-list">
            <input type="checkbox" v-model="now" class="tui-full-calendar-checkbox-square">
            <span :style="{'border-color': '#D85557', 'background-color': now ? '#D85557' : 'transparent'}"
                  class="task-option-list"/>
            <span class="task-option-list">Ahora</span>
          </label>
        </div>
        <div class="calendar-navbar-options-items">
          <label class="d-flex flex-row mb-0 task-option-list">
            <input type="checkbox" v-model="soon" class="tui-full-calendar-checkbox-square">
            <span :style="{'border-color': '#F9CD56', 'background-color': soon ? '#F9CD56' : 'transparent'}"
                  class="task-option-list"/>
            <span class="task-option-list">Pronto</span>
          </label>
        </div>
        <div class="calendar-navbar-options-items">
          <label class="d-flex flex-row mb-0 task-option-list">
            <input type="checkbox" v-model="early" class="tui-full-calendar-checkbox-square">
            <span :style="{'border-color': '#C7D963', 'background-color': early ? '#C7D963' : 'transparent'}"
                  class="task-option-list"/>
            <span class="task-option-list">Temprano</span>
          </label>
        </div>
        <div class="calendar-navbar-options-items">
          <label class="d-flex flex-row mb-0 task-option-list">
            <input type="checkbox" v-model="pending" class="tui-full-calendar-checkbox-square">
            <span :style="{'border-color': '#D2D4D6', 'background-color': pending ? '#D2D4D6' : 'transparent'}"
                  class="task-option-list"/>
            <span class="task-option-list">Pendiente</span>
          </label>
        </div>
      </div>

      <a class="d-flex flex-row" @click="showNewTaskModal()">
        <i class="i-Add mr-1 btn-add-plani align-self-center"/>
        <span class="text-adjust align-self-center">Nueva Tarea</span>
      </a>
      <b-form-input
        id="input-1"
        type="text"
        v-model="search"
        class="form-control-rounded col-2 mx-1"
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
  computed: {
    ...mapGetters([
      'getRangeText',
      'loggedInUser'
    ]),
    expired: {
      get() {
        return this.getExpiredTasks();
      },
      set() {
        console.log('expired');
        this.toggleExpiredTasks();
      }
    },
    now: {
      get() {
        return this.getNowTasks();
      },
      set() {
        this.toggleNowTasks();
      }
    },
    soon: {
      get() {
        return this.getSoonTasks();
      },
      set() {
        this.toggleSoonTasks();
      }
    },
    early: {
      get() {
        return this.getEarlyTasks();
      },
      set() {
        this.toggleEarlyTasks();
      }
    },
    pending: {
      get() {
        return this.getPendingTasks();
      },
      set() {
        this.togglePendingTasks();
      }
    },
    search: {
      get(){
        return this.getSearchText();
      },
      set(value){
        this.setSearchText(value);
      }
    }
  },
  methods: {
    ...mapGetters([
      'getExpiredTasks',
      'getNowTasks',
      'getSoonTasks',
      'getEarlyTasks',
      'getPendingTasks',
      'getSearchText'
    ]),
    ...mapActions([
      'setSelectedComponentView',
      'setSelectedMapView',
      'setShowNewTaskModal',
      'setSearchText',
      'toggleExpiredTasks',
      'toggleNowTasks',
      'toggleSoonTasks',
      'toggleEarlyTasks',
      'togglePendingTasks'
    ]),
    onChangeFilter() {
      if ( this.selectedFilter === 'day' || this.selectedFilter === 'month' || this.selectedFilter === 'week' ) {
        this.setSelectedComponentView(this.selectedFilter);
        this.setSelectedMapView(this.selectedFilter);
      } else if ( this.selectedFilter === 'Map' ) {
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
    vertical-align: center;
  }

  .btn-action {
    border: 1px solid lightgrey;
    padding: 0.2em 0.5em;
  }

  .calendar-navbar-btn-equip {
    background-color: #00b3ee;
    color: white;
  }

  .calendar-navbar-body {
    padding: 0.5rem 0.75rem;
  }

  .calendar-navbar {
    margin-bottom: 1rem;
  }

  .task-option-list {
    font-size: 1em;
    white-space: normal;
    align-self: center;
    text-transform: capitalize;
  }

  .text-adjust {
    font-size: 1em;
    white-space: normal;
    align-self: center;
  }

  .calendar-navbar-options-items {
    align-self: center;
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
    margin-right: 4px;
    border: 2px solid;
    background: transparent;
  }
</style>
