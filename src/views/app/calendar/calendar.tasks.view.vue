<template>
	<div>
		<b-row>
			<b-col sm="12" md="12" lg="4" xl="4" class="mx-auto">
				<h3 class="text-center">Expiradas</h3>
				<b-card body-class="mx-1">
					<template v-for="(task, taskIndex) in TASKS_LIST.filter(x=> x.additionalInfo.status === 'expired')">
						<calendar-task-widget v-on:chip_click="onClickChip"  :task="task" :key="taskIndex" class="mx-auto"/>
					</template>
				</b-card>
			</b-col>
			<b-col sm="12" md="12" lg="4" xl="4">
				<h3 class="text-center">Agendadas</h3>
				<b-card body-class="mx-1">
					<template v-for="(task, taskIndex) in TASKS_LIST.filter(x => x.additionalInfo.status === 'early' || x.additionalInfo.status === 'now' || x.additionalInfo.status === 'soon')">
						<calendar-task-widget v-on:chip_click="onClickChip" :task="task" :key="taskIndex" class="mx-auto"/>
					</template>
				</b-card>
			</b-col>
			<b-col sm="12" md="12" lg="4" xl="4">
				<h3 class="text-center">Pendientes</h3>
				<b-card body-class="mx-1">
					<template v-for="(task, taskIndex) in TASKS_LIST.filter(x=> x.additionalInfo.status === 'pending')">
						<calendar-task-widget v-on:chip_click="onClickChip" :task="task" :key="taskIndex" class="mx-auto"/>
					</template>
				</b-card>
			</b-col>
		</b-row>



		<b-modal id="newTask_modal" :title="getModalTitle" centered size="lg" @hidden="resetModal">
			<div>
				<b-row>
					<b-col md="7">
						<b-form-group
								label="Categoria de tarea"
						>
							<b-form-select v-model="newTaskForm.category" :options="taskOptions"/>
						</b-form-group>

						<b-form-group
								label="Actividad"
						>
							<b-form-input type="text" v-model="newTaskForm.name"/>
						</b-form-group>
						<b-form-group
								label="Ubicación"
						>
							<b-form-input type="text" v-model="newTaskForm.address"/>
						</b-form-group>
						<b-form-group
								label="Asignar vendedor"
						>
							<b-form-select :change="getVendorClients()" v-model="newTaskForm.vendor_id"
										   :options="VENDOR_LIST.map(function (x) { return {value: x.id.id, text: x.additionalInfo.firstName + ' ' + x.additionalInfo.lastName}})"/>
						</b-form-group>
						<b-form-group
								label="Notas"
						>
							<b-form-textarea style="height: 100px;"v-model="newTaskForm.notes"/>
						</b-form-group>

					</b-col>
					<b-col md="5">
						<b-form-group
								required
								label="Cliente"
						>
							<b-form-select placeholder="Select a vendor first" v-model="newTaskForm.client_id"
										   :options="CLIENTS_LIST.map(function (x) { return {value: x.id.id, text: x.name}})"/>
						</b-form-group>
						<b-form-group
								label="Fecha"
						>

							<b-form-datepicker id="example-datepicker" v-model="newTaskForm.start_date"
											   class="mb-2"></b-form-datepicker>
						</b-form-group>
						<b-form-group
								label="Hora"
						>
							<b-form-timepicker v-model="newTaskForm.start_time" locale="en"></b-form-timepicker>
						</b-form-group>
						<b-form-group
								label="Recordatorio"
						>
							<b-form-timepicker v-model="newTaskForm.reminder" locale="en"></b-form-timepicker>

						</b-form-group>
						<b-form-group
								label="Duracion"
						>
							<b-form-timepicker id="ex-disabled-readonly" v-model="newTaskForm.duration"></b-form-timepicker>

							<!--<vue-timepicker v-model="newTaskForm.duration" ></vue-timepicker>-->

						</b-form-group>
						<!--
                        <b-form-group
                          label="Rutina"
                        >
                          <b-form-select v-model="newTaskForm.routine" :options="routineOptions"/>
                        </b-form-group>-->
						<b-form-group v-if="isEditModal"
									  label="Tarea completada"
						>
							<div class="d-flex d-inline  justify-content-center">
								<b-form-checkbox v-model="newTaskForm.completed"/>
								<div class="text-21 align-items-center justify-content-center" >
									{{newTaskForm.completed ? 'Completado!' : 'Sin completar'}}
								</div>
							</div>
						</b-form-group>
					</b-col>
				</b-row>
			</div>
			<template v-slot:modal-footer="{ ok, cancel, hide }">
				<div class="d-flex justify-content-around">
					<b-button size="sm" variant="danger" @click="deleteOrCancel()">
						{{isEditModal ? 'Eliminar' : 'Cancelar'}}
					</b-button>
					<b-button size="sm" variant="success" @click="createOrUpdate()">
						{{isEditModal ? 'Editar' : 'Crear tarea'}}
					</b-button>
				</div>
			</template>
		</b-modal>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CalendarTaskWidget from './calendar.task.widget';
import { taskCategories, vendors, clients, routines } from './data/formData';

export default {
  name: 'calendar_task_view',
  components: {
    CalendarTaskWidget
  },
	computed: {
		...mapGetters([
			'getSelectedMapView',
			'getSelectedComponentView',
			'getShowNewTaskModal',
			'getSearchText',
			'VENDOR_LIST', 'CLIENTS_LIST',
			'TASKS_LIST'
		]),

		getModalTitle() {
			return this.isEditModal ? 'Editar o eliminar tarea' : 'Agregar nueva tarea';
		},

	},
	data() {
		return {
			isEditModal: false,
			timeNow: (new Date()).toString(),
			taskOptions: taskCategories,
			vendorOptions: vendors,
			clientOptions: clients,
			routineOptions: routines,

			newTaskForm: {
				category: '',
				name: '',
				address: '',
				lat: 0,
				lng: 0,
				vendor_id: '',
				notes: '',
				client_id: '',
				start_date: '',
				start_time: '',
				duration: '',
				reminder: '',
				completed: ''
			},

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
		...mapActions([
			'GET_VENDOR_LIST',
			'GET_CLIENTS_LIST',
			'setShowNewTaskModal',
		]),
		getVendorClients() {
			// console.log('IN getVendors clients', this.newTaskForm.client_id);
			// console.log('sss', this.newTaskForm);
			const vendor_id = this.newTaskForm.vendor_id;
			const payload = { vendor_id: vendor_id, limit: 10000, textSearch: null };
			this.$store.dispatch('GET_VENDOR_CLIENTS', payload);
		},


		saveTask() {
			console.log('form', this.newTaskForm);
			this.newTaskForm.category = Number(this.newTaskForm.category)
			this.$store.dispatch('POST_TASK', this.newTaskForm)
					.then(result => {
						console.log(result);
						this.$store.dispatch('GET_TASKS_LIST');
					});
			this.hideModal();
		},




		onClickChip(task) {
			// const taskSelected = task;
			console.log('tarea', task);

			this.setFormData(task);
			this.isEditModal = true;

			this.setShowNewTaskModal(true);
		},
		setFormData(taskSelected) {
			this.newTaskForm = {
				category: new Number(taskSelected.additionalInfo.category),
				name: taskSelected.additionalInfo.name,
				address: taskSelected.additionalInfo.address,
				lat: taskSelected.additionalInfo.lat,
				lng: taskSelected.additionalInfo.lng,
				vendor_id: taskSelected.customerId.id,
				notes: taskSelected.additionalInfo.notes,
				client_id: taskSelected.additionalInfo.client_data.id,
				start_date: taskSelected.additionalInfo.start_date,
				start_time: taskSelected.additionalInfo.start_time,
				duration: taskSelected.additionalInfo.duration,
				reminder: taskSelected.additionalInfo.reminder,
				completed: taskSelected.additionalInfo.completed
			};
		},


		clearFormData() {
			this.newTaskForm = {
				category: '',
				name: '',
				address: '',
				lat: 0,
				lng: 0,
				vendor_id: '',
				notes: '',
				client_id: '',
				start_date: '',
				start_time: '',
				duration: '',
				reminder: '',
				completed: ''
			};
		},
		hideModal() {
			this.setShowNewTaskModal(false);
			this.clearFormData();
			this.isEditModal = false;
		},
		resetModal() {
			this.hideModal();
		},
		deteteTask(schedule) {
			console.log('in delete x2', schedule);

			const task = this.TASKS_LIST[schedule.id];
			const task_id = task.id.id;
			this.$store.dispatch('DELETE_TASK', task_id)
					.then(x => {
						this.$store.dispatch('GET_TASKS_LIST');
					});

			this.$refs.tuiCalendar.invoke('deleteSchedule', schedule.id, schedule.calendarId);
		},
		deleteOrCancel() {
			if ( this.isEditModal ) { // delete is avaliable
				console.log('in delete');
				this.deteteTask(this.scheduleSelected);
				this.resetModal();
			} else {
				this.resetModal();
			}
		},
		editTask(task_id) {
			this.newTaskForm.category = Number(this.newTaskForm.category);
			const payload = {
				task_id: task_id,
				data: this.newTaskForm
			};
			this.$store.dispatch('UPDATE_TASK', payload)
					.then(response => {
						this.$store.dispatch('GET_TASKS_LIST');
					});
		},
		createOrUpdate() {
			console.log('is edit', this.isEditModal);

			if ( this.isEditModal ) {
				console.log('In edit task');
				const schedule_id = this.scheduleSelected.id;
				const task_id = this.TASKS_LIST[schedule_id].id.id;
				this.editTask(task_id);
				this.resetModal();
			} else {
				console.log('IN save task');
				this.saveTask();
			}
		}


	},

};
</script>

<style scoped>

</style>
