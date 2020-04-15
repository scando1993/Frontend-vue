<template>
	<div class="box">
		<client-navbar/>
		<breadcumb :page="'Clientes'" :folder="'Main menu'"/>
		<div id="body" class="view-content">
			<div class="client-view">
				<div class="client-content"
				     :class="[ getShowClientForm ? 'col-sm-6 col-md-6 col-xl-7 col-lg-7' : '', 'col-12' ]">
					<div v-if="getGroupByFilter === 'vendor'">
						<clients-by-vendor/>
					</div>
					<div v-else-if="getGroupByFilter === 'priority'">
						<clients-by-task/>
					</div>
					<div v-else-if="getGroupByFilter === 'clients'">
						<clients-by-order/>
					</div>
					<div v-else>No hay contenido</div>
				</div>
				<div v-if="getShowClientForm" class="ml-2 flex-fill"
					:class="[ getShowClientForm ? 'col-sm-6 col-md-6 col-xl-5 col-lg-5' : '' ]">
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

export default {
  name: 'taskGrid',
  components: {
    ClientForm,
	  ClientNavbar,
	  ClientsByVendor,
	  ClientsByOrder,
	  ClientsByTask
  },
  data() {
    return {};
  },
  created() {
    console.log(this.getShowClientForm);
    console.log('grouby',this.getGroupByFilter)
  },
  computed: {
    ...mapGetters(['getShowClientForm', 'getGroupByFilter']),
  },
  methods: {}
};
</script>

<style scoped lang="scss">
	.client-view {
		display: flex;
		flex-flow: row;
		height: 100%;
		width: 100%;
	}

	.client-content{
		flex: 1 1 auto;
	}

	.client-modal {
		flex-grow: 1;
	}
</style>
