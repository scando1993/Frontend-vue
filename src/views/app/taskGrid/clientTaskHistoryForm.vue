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

		</div>
	</div>
</template>

<script>
export default {
  name: 'clientTaskHistoryForm',
	data: function (){
    return {
      historyTasks: []
    }
	}
};
</script>

<style scoped>

</style>
