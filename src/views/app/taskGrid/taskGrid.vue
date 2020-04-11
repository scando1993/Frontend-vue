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
  },
  computed: {
    ...mapGetters(['getShowClientForm', 'getGroupByFilter']),
  },
  methods: {}
};
</script>

<style scoped lang="scss">
	@import 'src/assets/styles/vendor/bootstrap/bootstrap';

	/*.scrollable {*/
	/*	width: 100%;*/
	/*	!*height: 500px;*!*/
	/*	position: relative;*/
	/*	overflow: scroll;*/
	/*}*/

	/*.client-card-text {*/
	/*	font-size: 1rem;*/
	/*	margin-bottom: 0.25rem;*/
	/*}*/

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
/*
	.client-modal-contact {
		border-radius: 10px;
		border: 5px #000000;
	}

	.client-modal-header {
		@extend .card-header;
		padding: 0.15rem 1rem;
	}
*/
	/*.client-task-btn-history {*/
	/*	background-color: #00b3ee;*/
	/*	color: white;*/
	/*	border-radius: 5px;*/
	/*	font-size: 0.75rem;*/
	/*}*/

	/*.client-btn{*/
	/*	background-color: #00b3ee;*/
	/*	color: white;*/
	/*	border-radius: 12px;*/
	/*}*/

	/*.client-dot-activity {*/
	/*	border-radius: 50%;*/
	/*	width: 1em;*/
	/*	height: 1em;*/
	/*	margin-left: 0.50rem;*/
	/*	display: inline-block;*/
	/*}*/
/*
	.client-card-body {
		@extend .card-body !optional;
		padding: 0.25rem 1.25rem 1.25rem 1.25rem;
	}
*/
	/*@media(min-width: 1200px){*/
	/*	.v-xl-divider{*/
	/*		margin-left: 1.25rem;*/
	/*		margin-right: 1.25rem;*/
	/*		width: 0;*/
	/*		border: 1px solid gray;*/
	/*		flex-basis: 100%;*/
	/*	}*/
	/*}*/

	/*@media(min-width: 992px){*/
	/*	.v-lg-divider{*/
	/*		margin-left: 1.25rem;*/
	/*		margin-right: 1.25rem;*/
	/*		width: 0;*/
	/*		border: 1px solid gray;*/
	/*		flex-basis: 100%;*/
	/*	}*/
	/*}*/

	/*@media(min-width: 768px){*/
	/*	.h-md-divider{*/
	/*		margin-top: 1.25rem;*/
	/*		margin-bottom: 1.25rem;*/
	/*		height: 0;*/
	/*		border: 1px solid gray;*/
	/*		flex-basis: 100%;*/
	/*	}*/
	/*}*/

	/*@media(min-width: 576px){*/
	/*	.h-sm-column{*/
	/*		margin-top: 1.25rem;*/
	/*		margin-bottom: 1.25rem;*/
	/*		height: 0;*/
	/*		border: 1px solid gray;*/
	/*		flex-basis: 100%;*/
	/*	}*/
	/*}*/

	/*.vendor-list {*/

	/*}*/
</style>
