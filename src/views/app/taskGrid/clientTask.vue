<template>
	<div class="card">
		<div class="card-content">
			<div class="row no-gutters">
				<div class="col-1">
					{{task_date}}
				</div>
				<div class="col-9">
					{{task_name}}
				</div>
				<div class="col-2">
					<button class="btn client-task-btn">Ver</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'clientTask',
	data: () => {
    return {
      task_name: '',
	    task_date: '',
	    task_id: 0
    };
	}
};
</script>

<style scoped lang="scss">
	.client-task-btn {
		background-color: #00b3ee;
		color: white;
		border-radius: 3px;
		font-size: 0.85rem;
		padding: 0 0.5rem;
		border: 0;
		align-self: center;
	}
</style>
