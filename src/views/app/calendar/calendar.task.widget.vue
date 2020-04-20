<template>
	<div class="card">
		<div class="card-body d-flex flex-row">
			<span :style="{'background-color': getTaskColor(task)}"/>
			<div class="d-flex flex-column flex-nowrap">
				<label>{{task.additionalInfo.client_data.additionalInfo.social_reason}}</label>
				<label>{{task.additionalInfo.name}}</label>
				<label>Último contacto: {{task.additionalInfo.start_date}}</label>
			</div>
			<div class="task-client-avatar">
				{{task.additionalInfo.client_data.additionalInfo.social_reason.slice(0,2)}}
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'calendarTaskWidget',
  props:{
  	task:{
  		required: true,
		  type: Object
	  }
  },
  data: function () {
    return {};
  },
  methods:{
  	getTaskColor(task){
  		return '';
	  },
  }
};
</script>

<style scoped lang="scss">
	.task {
		background-color: #f0f0f0;
		font-size: 0.8rem;
		border-radius: 0.8rem;
		display: inline-flex;
		padding: 0 10px;
		margin-bottom: 5px;
		vertical-align: middle;
		justify-content: center;
	}

	.task .task-body {
		color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: space-between;
		min-height: 2.857rem;
		min-width: 14.857rem;
	}

	.task .task-body .avatar {
		background-color: #c3c3c3;
		display: flex;
		width: 2.857rem;
		height: 2.857rem;
		margin: 2px 0;
		border-radius: 50%;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		transform: translate(-8px);
	}

	.task .task-body .avatar .avatar-content {
		top: 0;
	}

	.task .task-body .avatar img {
		border-radius: 50%;
		height: 24px;
		width: 24px;
	}

	.task .task-body .task-text {
		vertical-align: middle;
		align-self: center;
	}

	.task .task-body i {
		font-size: 1rem;
	}

	.task .task-body .chip-closeable {
		min-height: 24px;
		min-width: 24px;
		margin: 0 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		align-self: center;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.15);
		color: #FFFFFF;
		transform: translate(10px);
		cursor: pointer;
	}

	@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
		.task .task-closeable i {
			position: relative;
			top: 3px;
		}
	}

</style>
