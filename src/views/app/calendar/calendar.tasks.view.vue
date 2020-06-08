<template>
	<div>
		<b-row>
			<b-col sm="12" md="12" lg="4" xl="4" class="mx-auto">
				<h3 class="text-center">Expiradas</h3>
				<b-card body-class="mx-1">
					<template v-for="(task, taskIndex) in tasksFiltered.filter(x=> x.additionalInfo.status === 'expired')">
						<calendar-task-widget v-on:chip_click="onClickChip; createClickGAEvent('CALENDAR_EXPIRED_CHIP', 'CLICK', 'TASK')"  :task="task" :key="taskIndex" class="mx-auto"/>
					</template>
				</b-card>
			</b-col>
			<b-col sm="12" md="12" lg="4" xl="4">
				<h3 class="text-center">Agendadas</h3>
				<b-card body-class="mx-1">
					<template v-for="(task, taskIndex) in getTopTasks()">
						<calendar-task-widget  style=" cursor: pointer" v-on:chip_click="onClickChip; createClickGAEvent('CALENDAR_SCHEDULED_CHIP', 'CLICK', 'TASK')" :task="task" :key="taskIndex" class="mx-auto"/>
					</template>
				</b-card>
			</b-col>
			<b-col sm="12" md="12" lg="4" xl="4">
				<h3 class="text-center">Pendientes</h3>
				<b-card body-class="mx-1">
					<template v-for="(task, taskIndex) in tasksFiltered.filter(x=> x.additionalInfo.status === 'pending')">
						<calendar-task-widget v-on:chip_click="onClickChip; createClickGAEvent('CALENDAR_PENDING_CHIP', 'CLICK', 'TASK')" :task="task" :key="taskIndex" class="mx-auto"/>
					</template>
				</b-card>
			</b-col>
		</b-row>


		<calendar_newTask_modal :isEditModal="isEditModal" v-on:close2="toggleIsEditModal"/>


	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CalendarTaskWidget from './calendar.task.widget';
import { taskCategories, vendors, clients, routines } from './data/formData';
import calendar_newTask_modal from './calendar.newTask.modal';

export default {
  name: 'calendar_task_view',
  components: {
    CalendarTaskWidget,
	  calendar_newTask_modal
  },
	computed: {
		...mapGetters([
			'getSelectedMapView',
			'getSelectedComponentView',
			'getShowNewTaskModal',
			'getSearchTaskText',
			'VENDOR_LIST', 'CLIENTS_LIST',
			'TASKS_LIST',
			'getExpiredTasks',
			'getNowTasks',
			'getSoonTasks',
			'getEarlyTasks',
			'getPendingTasks'
		]),

		tasksFiltered: function () {
			return this.filterTASKSearch(this.TASKS_LIST);
		}

	},
	data() {
		return {
			isEditModal: false,

		};
	},
	mounted() {
		const vendor_params = {
			limit: 1000
		};
		this.$store.dispatch('GET_VENDOR_LIST', vendor_params);
		this.$store.dispatch('GET_TASKS_LIST');
		// this.setTuiCalendarRef();

		this.setRangeText();


	},
	methods: {
		onClickChip(task) {
			this.isEditModal = true;
			this.$store.dispatch('SET_TASK_SELECTED_ACTION', task);
			this.$bvModal.show("new_task_form_1")
		},
		categoryCoder(x) {
			var value = 0;
			if(x === 'now')
				value = 1;
			else if(x==="soon")
				value = 2
			else if (x==="early")
				value = 3
			else if(x==="expired")
				value = 4;
			else
				value = 5
			return value
		},
		sortTop(a, b ) {
			var value1 = this.categoryCoder(a.additionalInfo.status);
			var value2 = this.categoryCoder(b.additionalInfo.status);
			return value1 - value2
		},
		getTopTasks() {
			// const newArray = this.TASKS_LIST.filter( x => !x.additionalInfo.start_time);
			/// console.log('newArray--------------', newArray);
			const a = this.tasksFiltered.filter(x => x.additionalInfo.status === 'early' || x.additionalInfo.status === 'now' || x.additionalInfo.status === 'soon');
			const b = a.filter( x=> x.additionalInfo.start_date && x.additionalInfo.start_time);
			const final = b.sort(this.sortTop);
			console.log('final!!!!!!!!!!!!!!!!!!!!!!!!!', final);
			return final;

		},
		filterTASKSearch (list) {
			return list.filter(task => {
				let expired = this.getExpiredTasks;
				let now = this.getNowTasks;
				let soon = this.getSoonTasks;
				let early = this.getEarlyTasks;
				let pending = this.getPendingTasks;

				switch (task.additionalInfo.status) {
					case 'expired':{
						if (!expired) {
							return false;
						}
					}break;
					case 'now': {
						if (!now){
							return false;
						}
					}break;
					case 'soon': {
						if (!soon){
							return false;
						}
					}break;
					case 'early': {
						if (!early){
							return false;
						}
					}break;
					case 'pending': {
						if (!pending){
							return false;
						}
					}break;
				}
				return this.TASKS_LIST.find(x => x.id.id === task.id.id).additionalInfo.name.toLowerCase().match(this.getSearchTaskText.toLowerCase());
			});
		},
		toggleIsEditModal() {
			console.log("cambiando isEditModal");
			this.isEditModal = false;
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

<style scoped>

</style>
