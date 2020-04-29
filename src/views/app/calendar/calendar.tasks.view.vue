<template>
	<div>
		<b-row>
			<b-col sm="12" md="12" lg="4" xl="4" class="mx-auto">
				<h3 class="text-center">Expiradas</h3>
				<b-card body-class="mx-1">
					<template v-for="(task, taskIndex) in TASKS_LIST.filter(x=> x.additionalInfo.status === 'expired')">
						<calendar-task-widget :task="task" :key="taskIndex" class="mx-auto"/>
					</template>
				</b-card>
			</b-col>
			<b-col sm="12" md="12" lg="4" xl="4">
				<h3 class="text-center">Agendadas</h3>
				<b-card body-class="mx-1">
					<template v-for="(task, taskIndex) in TASKS_LIST.filter(x => x.additionalInfo.status === 'early' || x.additionalInfo.status === 'now' || x.additionalInfo.status === 'soon')">
						<calendar-task-widget :task="task" :key="taskIndex" class="mx-auto"/>
					</template>
				</b-card>
			</b-col>
			<b-col sm="12" md="12" lg="4" xl="4">
				<h3 class="text-center">Pendientes</h3>
				<b-card body-class="mx-1">
					<template v-for="(task, taskIndex) in TASKS_LIST.filter(x=> x.additionalInfo.status === 'pending')">
						<calendar-task-widget :task="task" :key="taskIndex" class="mx-auto"/>
					</template>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CalendarTaskWidget from './calendar.task.widget';

export default {
  name: 'calendar_task_view',
  components: {
    CalendarTaskWidget
  },
  computed: {
    ...mapGetters(['TASKS_LIST'])
  },

};
</script>

<style scoped>

</style>
