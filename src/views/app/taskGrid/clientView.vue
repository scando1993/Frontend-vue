<template>
	<div class="box">
		<client-navbar/>
		<div id="body" class="view-content">

			<div ref ="cards_container" class="client-view flex-lg-row flex-xl-row flex-md-column flex-sm-column">
<!--				:class="[ getShowClientForm ? 'col-sm-6 col-md-6 col-xl-7 col-lg-7' : '', 'col-12' ]"-->
					<div class="client-content order-lg-first order-xl-first order-sm-last order-sm-last"
						 v-if="!getShowHistoryForm">
						<b-overlay :show="!FULL_LOADED"
								   variant="transparent"
								   opacity="0.80"
								   spinner-variant="danger"
								   spinner-type="grow"
								   rounded="sm">

							<template v-slot:overlay>
								<div class="text-center">
									<b-icon icon="stopwatch" font-scale="3" animation="cylon"></b-icon>
									<p id="cancel-label">Please wait...</p>
								</div>
							</template>

							<div class="scroll-container">

								<clients-by-vendor v-if="getGroupByFilter === 'vendor'"/>
								<clients-by-task v-else-if="getGroupByFilter === 'priority'"/>
								<clients-by-order v-else-if="getGroupByFilter === 'clients'"/>
								<clientsInTable v-else-if="getGroupByFilter === 'table'"/>
								<div v-else>No hay contenido</div>
							</div>
						</b-overlay>
					</div>
				<client-task-history-form class="client-content order-lg-first order-xl-first order-sm-last order-sm-last"
										  v-else
										  :tasks_list_id="0"/>
				<div v-if="getShowClientForm" class="client-content order-lg-last order-xl-last order-sm-first order-md-first">
					<client-form/>
				</div>
			</div>
		</div>
		<client_new-task_form/>
		<client_bulkCreation_modal/>

		<div id ="progressBar">
			<client_progressBar/>
		</div>
	</div>
</template>

<script>
import ClientNavbar from './navbar/clientNavbar';
import ClientsByOrder from './clientsByOrder';
import ClientsByTask from './clientsByTask';
import ClientsByVendor from './clientsByVendor';
import { mapGetters } from 'vuex';
import ClientForm from './clientForm';
import ClientTaskHistoryForm from './clientTaskHistoryForm';
import client_progressBar from './client.progressBar';
import client_newTask_form from './client.newTask.form';
import clientsInTable from './clientsInTable';
import client_bulkCreation_modal from './client.bulkCreation-modal'
export default {
	name: 'taskGrid',
	components: {
		ClientForm,
		ClientNavbar,
		ClientsByVendor,
		ClientsByOrder,
		ClientsByTask,
		ClientTaskHistoryForm,
		client_progressBar,
		client_newTask_form,
		clientsInTable,
		client_bulkCreation_modal
	},
	data() {
		return {};
	},
	mounted() {
		this.$store.dispatch('GET_PROFILE');
	},
	created() {

		console.log(this.getShowClientForm);
		console.log('grouby', this.getGroupByFilter)
	},
	computed: {
		...mapGetters(['getShowClientForm', 'getGroupByFilter', 'getShowHistoryForm', 'SHOW_NEW_TASK_CLEINT_FORM', 'FULL_LOADED']),
	},
	destroyed() {
		// reseting store data
		this.$store.dispatch('RESET_CLIENT_STORE');
		this.$store.dispatch('RESET_PROFILE_STORE');
	},
	methods: {}
};
</script>

<style scoped lang="scss">
	.client-view {
		display: flex;
		flex-flow: row;
		flex-wrap: nowrap;
		height: 100%;
		width: 100%;
		align-self: stretch;
	}

	.client-content{
		flex: 1 1 auto;
		flex-shrink: 1;
		flex-grow: 1;
		flex-basis: 50%;
	}

	.client-modal {
		flex-grow: 1;
	}

	.scroll-container{
		max-height: 70vh;
		height: 70vh;
		overflow-y: scroll;
	}

	::-webkit-scrollbar {
		width: 10px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
