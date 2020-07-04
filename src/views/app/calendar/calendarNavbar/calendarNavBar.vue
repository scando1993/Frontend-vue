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
        <b-form-select style="cursor: pointer;" v-model="selectedFilter" :options="options" @change="onChangeFilter(); createClickGAEvent('CALENDAR_VIEW', 'FILTER', 'TASK')"/>
        <!--				<button v-if="loggedInUser.admin" class="client-navbar-btn-equip btn mx-1">Ver Equipo</button>-->
      </div>

      <div id="calendar_selection" class="d-inline-flex flex-row flex-nowrap align-items-center">
        <label class="text-range-date flex-grow-0 flex-shrink-1">{{getRangeText}}</label>
        <button type="button" class="btn btn-icon btn-action" v-on:click="changePrevCalendar(); createClickGAEvent('CALENDAR_PREV', 'FILTER', 'TASK', selectedFilter) ">
          <i class="bx bx-chevron-left" style="font-size: 2em;"/>
        </button>
        <button type="button" class="btn btn-icon btn-action" v-on:click="changeNextCalendar(); createClickGAEvent('CALENDAR_NEXT', 'FILTER', 'TASK', selectedFilter)">
          <i class="bx bx-chevron-right" style="font-size: 2em;"/>
        </button>
      </div>
      <div class="d-inline-flex
										flex-nowrap
										flex-lg-row
										flex-xl-row
										flex-md-column
										flex-sm-column
										align-content-lg-stretch
										align-content-xl-stretch
										align-content-sm-start
										align-content-md-start
										justify-content-lg-around">
        <div class="calendar-navbar-options-items">
          <label class="d-flex flex-row mb-0 task-option-list">
            <input type="checkbox" v-model="expired" class="tui-full-calendar-checkbox-square">
            <span :style="{'border-color': '#292B2A', 'background-color': expired ? '#292B2A' : 'transparent'}"
                  class="task-option-list"><i class="bx bx-check calendar-ticks" v-if="expired"/></span>
            <span class="task-option-list">Expirada</span>
          </label>
        </div>
        <div class="calendar-navbar-options-items">
          <label class="d-flex flex-row mb-0 task-option-list">
            <input type="checkbox" v-model="now" class="tui-full-calendar-checkbox-square">
            <span :style="{'border-color': '#D85557', 'background-color': now ? '#D85557' : 'transparent'}"
                  class="task-option-list"><i class="bx bx-check calendar-ticks" v-if="now"/></span>
            <span class="task-option-list">Ahora</span>
          </label>
        </div>
        <div class="calendar-navbar-options-items">
          <label class="d-flex flex-row mb-0 task-option-list">
            <input type="checkbox" v-model="early" class="tui-full-calendar-checkbox-square">
            <span :style="{'border-color': '#F9CD56', 'background-color': early ? '#F9CD56' : 'transparent'}"
                  class="task-option-list"><i class="bx bx-check calendar-ticks" v-if="early"/></span>
            <span class="task-option-list">Pronto</span>
          </label>
        </div>
        <div class="calendar-navbar-options-items">
          <label class="d-flex flex-row mb-0 task-option-list">
            <input type="checkbox" v-model="soon" class="tui-full-calendar-checkbox-square">
            <span :style="{'border-color': '#C7D963', 'background-color': soon ? '#C7D963' : 'transparent'}"
                  class="task-option-list"><i class="bx bx-check calendar-ticks" v-if="soon"/></span>
            <span class="task-option-list">Temprano</span>
          </label>
        </div>
        <div class="calendar-navbar-options-items">
          <label class="d-flex flex-row mb-0 task-option-list">
            <input type="checkbox" v-model="pending" class="tui-full-calendar-checkbox-square">
            <span :style="{'border-color': '#D2D4D6', 'background-color': pending ? '#D2D4D6' : 'transparent'}"
                  class="task-option-list"><i class="bx bx-check calendar-ticks" v-if="pending"/></span>
            <span class="task-option-list">Pendiente</span>
          </label>
        </div>
      </div>

      <a class="d-flex flex-row" style="cursor: pointer;" @click="showNewTaskModal(); createClickGAEvent('TASK_NEW', 'CLICK', 'TASK');">
        <i class="i-Add mr-1 btn-add-plani align-self-center"/>
        <span class="text-adjust align-self-center">Nueva Tarea</span>
      </a>
      <b-form-input
        id="input-1"
        type="text"
        v-model="search"
        class="form-control-rounded col-2 mx-1"
        placeholder="Buscar tareas"
        @click="createClickGAEvent('TASK_SEARCH', 'FILTER', 'TASK');"
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
        this.createClickGAEvent('TASK_NOW', 'FILTER', 'TASK', this.getNowTasks());
      }
    },
    soon: {
      get() {
        return this.getSoonTasks();
      },
      set() {
        this.toggleSoonTasks();
        this.createClickGAEvent('TASK_SOON', 'FILTER', 'TASK', this.getSoonTasks());
      }
    },
    early: {
      get() {
        return this.getEarlyTasks();
      },
      set() {
        this.toggleEarlyTasks();
        this.createClickGAEvent('TASK_EARLY', 'FILTER', 'TASK', this.getEarlyTasks());
      }
    },
    pending: {
      get() {
        return this.getPendingTasks();
      },
      set() {
        this.togglePendingTasks();
        this.createClickGAEvent('TASK_PENDING', 'FILTER', 'TASK', this.getPendingTasks());
      }
    },
    search: {
      get(){
        return this.getSearchTaskText();
      },
      set(value){
        this.setSearchTaskText(value);
      }
    },
  },
  destroyed() {
    this.setSelectedComponentView('month');
    this.setSelectedMapView('month');
  },
  methods: {
    ...mapGetters([
      'getExpiredTasks',
      'getNowTasks',
      'getSoonTasks',
      'getEarlyTasks',
      'getPendingTasks',
      'getSearchTaskText'
    ]),
    ...mapActions([
      'setSelectedComponentView',
      'setSelectedMapView',
      'setShowNewTaskModal',
      'setSearchTaskText',
      'toggleExpiredTasks',
      'toggleNowTasks',
      'toggleSoonTasks',
      'toggleEarlyTasks',
      'togglePendingTasks',
      'togglePrevCalendar',
      'toggleNextCalendar'
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
      //this.setShowNewTaskModal(true);
      console.log("aqui en el boton");
      this.$bvModal.show('new_task_form_1');
    },
    changePrevCalendar(){
      console.log('Prev calendar clicked');
      this.togglePrevCalendar();
    },
    changeNextCalendar(){
      console.log('Next calendar clicked');
      this.toggleNextCalendar();
    },

    createClickGAEvent(action, category, label, value) {
      this.$gtag.event(action, {
        'event_category': category,
        'event_label': label,
              'value': value || null
    })
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
    line-height: 1.15;
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
    text-transform: capitalize;
  }

  .text-range-date {
    font-size: calc(0.75em + 1vmin);
    white-space: normal;
    align-self: center;
    text-transform: capitalize;
    margin-bottom: 0;
    margin-right: 1em;
  }

  .calendar-navbar-options-items {
    align-self: start;
    margin-left: 0.5em;
    margin-right: 0.5em
  }

  input[type=checkbox].tui-full-calendar-checkbox-square {
    display: none;
  }

  input[type=checkbox].tui-full-calendar-checkbox-square + span {
    display: inline-block;
    cursor: pointer;
    width: 15px;
    height: 15px;
    line-height: 14px;
    vertical-align: middle;
    margin-right: 4px;
    border: 2px solid;
    background: transparent;
  }

  .calendar-ticks{
    font-size: 1.2em;
    color: #FFFFFF;
  }
</style>
