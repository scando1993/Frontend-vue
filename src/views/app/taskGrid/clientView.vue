<template>
	<div class="box">
		<client-navbar/>
		<div id="body" class="view-content">
			<div class="client-view flex-lg-row flex-xl-row flex-md-column flex-sm-column">
<!--				:class="[ getShowClientForm ? 'col-sm-6 col-md-6 col-xl-7 col-lg-7' : '', 'col-12' ]"-->
				<div class="client-content order-lg-first order-xl-first order-sm-last order-sm-last"
				     v-if="!getShowHistoryForm">
					<clients-by-vendor v-if="getGroupByFilter === 'vendor'"/>
					<clients-by-task v-else-if="getGroupByFilter === 'priority'"/>
					<clients-by-order v-else-if="getGroupByFilter === 'clients'"/>
					<div v-else>No hay contenido</div>
				</div>
				<client-task-history-form class="client-content order-lg-first order-xl-first order-sm-last order-sm-last"
				                          v-else
				                          :tasks_list_id="0"/>
				<div v-if="getShowClientForm" class="client-content order-lg-last order-xl-last order-sm-first order-md-first">
					<client-form/>
				</div>
			</div>
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

export default {
  name: 'taskGrid',
  components: {
    ClientForm,
	  ClientNavbar,
	  ClientsByVendor,
	  ClientsByOrder,
	  ClientsByTask,
	  ClientTaskHistoryForm
  },
  data() {
    return {};
  },
  created() {
    console.log(this.getShowClientForm);
    console.log('grouby',this.getGroupByFilter)
  },
  computed: {
    ...mapGetters(['getShowClientForm', 'getGroupByFilter', 'getShowHistoryForm']),
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
</style>
