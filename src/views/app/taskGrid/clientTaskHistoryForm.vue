<template>
	<div class="client-modal">
		<div class="card-header p-1" style="background: #00b3ee"></div>
		<div class="client-modal-header">
			<div class="d-flex flex-row justify-content-between">
				<button v-on:click="hideForm" class="btn client-modal-close-btn">X</button>
				<p class="client-modal-heading">Historial</p>
			</div>
		</div>
		<div class="card-body">
			<template v-for="(task, indexTask) in prepareData(history)">
				<client-task-widget :task="task" v-bind:key="indexTask"/>
			</template>
		</div>
	</div>
</template>

<script>
import { taskHistories } from './data/historyTasks';
import ClientTaskWidget from './clientTask';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'clientTaskHistoryForm',
	components: {
  	ClientTaskWidget
	},
	props:{
  	tasks_list_id: {
  		required: true,
		  default: 0
	  }
	},
	data: function (){
    return {
      historyTasks: taskHistories
    };
	},
	computed: {
		...mapGetters(['getFormClientId']),
		history:  {
			get() {
				return this.CLIENT_HISTORY();

			},
			set(value) {
				console.log(value);
			}
		}

	},
	methods:{
		...mapActions(['hideClientTaskHistory']),
		...mapGetters(['getFormClientId', 'CLIENT_HISTORY']),
		hideForm: function () {
			this.$store.dispatch('RESET_CLIENT_HISTORY');
			this.hideClientTaskHistory();
		},
		prepareData(list) {
			console.log("hhhhhhhhhhhhhhhhhhhhhhh", list);
			for(var i = 0; i < list.length; i++){
				let task = list[i];
				task.last_activity = task.additionalInfo.start;
				task.activity = {
					name: task.additionalInfo.name
				};
			};
			console.log('new data', list);
			return list;
		}
	}
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
		background-color: #4399B6;
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
		color: #4399B6;
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
		background-color: #4399B6;
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
