<template>
	<div class="client-card shadow mb-2 mr-0" v-on:click="showClientInfo(task.client_id)">
		<div class="card-header p-1" :style="{'background-color': getHeaderNgVariant(task.activity.state)}"/>
		<div class="client-card-body">
			<div class="d-flex flex-row justify-content-between mb-2">
				<div class="mr-auto">
					<b>{{client.businessName}}</b>
					<p>{{client.name}}</p>
				</div>
				<div class="">
					<button class="client-task-btn-history">Historial</button>
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
					<span class="client-dot-activity" :style="{'background-color': getHeaderNgVariant(task.activity.state)}"/>
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
</template>

<script>
import { mapActions } from 'vuex';

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
		}
	},
	data: function (){
    return {};
	},
	computed:{},
	methods:{
    ...mapActions(['showClientForm', 'setFormClientId', 'hideClientForm']),

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
      return dateToFormat.toString().split(' ', 4).join(' ');
    },

    showClientInfo: function (client_id){
      this.showClientForm(client_id);
    }
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

</style>
