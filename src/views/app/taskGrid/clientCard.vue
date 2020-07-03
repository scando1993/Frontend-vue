<template>
  <div style="cursor: pointer" class="client-card shadow mb-2 mr-0"
       v-on:click="showClientInfo({vendor: task.vendor, client: client.additionalInfo}, client); createClickGAEvent('CLIENT_CARD', 'CLICK', 'CLIENT')">
    <div class="lock-overlay" v-if="lock" >
      <img src="@/assets/images/svg/lock.png" class="lock-image"/>
    </div>
    <div v-blur="blurConfigs">
      <div class="card-header p-1" :style="{'background-color': getHeaderNgVariant(task.activity.state)}"/>
      <div class="client-card-body">
        <div class="d-flex flex-row justify-content-between mb-2">
          <div class="mr-auto">
            <b>{{client.additionalInfo.social_reason}}</b>
            <p>{{client.additionalInfo.name}}</p>
          </div>
          <div style="cursor: pointer">
            <button style="cursor: pointer" class="btn btn-primary client-task-btn-history" v-on:click="showClientHistoryForm(); createClickGAEvent('CLIENT_CARD_HISTORY', 'CLICK', 'CLIENT')">Historial</button>
          </div>
        </div>
        <div v-if="show_vendor" class="row mb-2">
          <div class="col-12">
            <p><b>Vendedor: </b>{{task.vendor}}</p>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-12">
            <b>Proxima actividad</b>
            <span v-if="task.hasNextTask" class="client-dot-activity" :style="{'background-color': getTaskColor(task.additionalInfo.status)}"/>
          </div>
        </div>
        <div class="row mb-1">
          <div class="col-12">
            <p>{{task.activity.name}}</p>
          </div>
        </div>
        <div class="row">
          <p class="mb-2 col-12 text-italic">Ultima acción: {{formatDate(task.last_activity)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { calendarTasksColors } from '../calendar/data/calendarConfiguration';

export default {
  name: 'clientCardWidget',
  props: {
    task_id: {
      type: Number,
      required: true
    },
    show_vendor: {
      type: Boolean,
      required: false,
      default: false
    },
    task: {
      type: Object
    },
    client: {
      type: Object
    },
    lock: {
      type: Boolean,
      default: false
    }
  },
  data: function (){
    return {
    };
  },
  computed:{
    blurConfigs: function(){
      return {
        isBlurred: this.lock,
        opacity: 0.7,
        filter: 'blur(5px)',
        transition: 'all .3s linear'
      };
    },
    imageLockDimensions: function(){
      return {
        width: '100px',
        height: '100px'
      };
    },
  },
  mounted() {
    console.log(this.client.additionalInfo);
    this.lock = !this.client.additionalInfo.activated;
  },
  methods:{
    ...mapActions(['showClientForm', 'setFormClientId', 'hideClientForm','GET_CLIENTS_TASK', 'showClientHistoryForm']),
    showNewTaskState() {
      return this.task.activity.state !== 'N/A'
    },

    getTaskName(tasks) {
      let name = 'N/A';
      try {
        name = tasks[0].task_info.name;
      }
      catch (e) {
      }
      return name;
    },
    getTaskLastStatus(tasks) {
      let name = 'N/A';
      try {
        name = tasks[0].task_info.start_date;
      }
      catch (e) {
      }
      return name;
    },
    getHeaderNgVariant: function (state) {
      switch (state) {
      case 'Active':
        return '#00b3ee';
      case 'Inactive':
        return 'gray';
      case 'Without contact':
        return 'gainsboro';
      }
    },

    formatDate: function (dateToFormat) {
    	try {
        return dateToFormat.toString().split(' ', 4).join(' ');
      }
      catch (e) {
        return 'N/A';
      }
    },

    showClientInfo: function (client, real_client){
      this.$store.dispatch('SET_CLIENT_SELECTED_ACTION', real_client );
      this.showClientForm(client);
    },
    createClickGAEvent(action, category, label, value) {
      this.$gtag.event(action, {
        'event_category': category,
        'event_label': label,
        'value': value || null
      })
    },
    getTaskColor(state) {
      return calendarTasksColors[state].color;
    },
  }
};
</script>

<style scoped lang="scss">
	@import 'src/assets/styles/vendor/bootstrap/bootstrap';

	.client-card-text {
		font-size: 1rem;
		margin-bottom: 0.25rem;
	}

	.client-task-btn-history {
		background-color: #00b3ee;
		color: white;
		border-radius: 3px;
		font-size: 0.75rem;
		padding: 0 0.5rem;
		border: 0;
	}

	.client-dot-activity {
		border-radius: 50%;
		width: 1em;
		height: 1em;
		margin-left: 0.50rem;
		display: inline-block;
	}

	.client-card{
		@extend .card !optional;
		/*padding-top: 56.25%; //Aspect ratio 16:9*/
		border-radius: 3px;
		height: auto;
		width: 250px;
	}
	.client-card-body {
		@extend .card-body !optional;
		padding: 0.25rem 1.25rem 0.25rem 1.25rem;
	}

	div.client-card-body > * p{
		font-size: 0.8rem;
		margin-bottom: 0.05rem;
		line-height: 0.9em;
	}
	div.client-card-body > * b{
		font-size: 0.8rem;
		line-height: 0.75em;
	}

  .lock-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #fff;
    background-color: rgba(231, 232, 236, 0.3);
    z-index: 9;
  }

  .lock-image {
    margin: 0 auto;
    width: 50px;
    height: 60px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

</style>
