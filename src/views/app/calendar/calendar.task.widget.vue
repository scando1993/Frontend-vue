<template>
	<div class="task" :style="{'background-color': getBackgroundColor()}">
		<span id="banner" class="banner" :style="{'background-color': getTaskColor()}"/>
		<div class="task-body mr-auto" >
			<p><strong>{{!task.additionalInfo.client_data ? 'N/A' :task.additionalInfo.client_data.additionalInfo.social_reason}}</strong></p>
			<p>{{task.additionalInfo.name}}</p>
			<p>Último contacto: {{task.additionalInfo.start_date || 'N/A'}}</p>
		</div>
		<div class="avatar">
			<div class="avatar-content">
				{{!task.additionalInfo.client_data ? 'N/A' : task.additionalInfo.client_data.additionalInfo.name.slice(0,2)}}
			</div>
		</div>
	</div>
</template>

<script>
import { calendarTasksColors } from './data/calendarConfiguration';
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
  	getTaskColor(){
  		console.log(this.task.additionalInfo.status);
  		return calendarTasksColors[this.task.additionalInfo.status].color;
	  },
	  getBackgroundColor(){
		  return calendarTasksColors[this.task.additionalInfo.status].bgColor;
	  }
  }
};
</script>

<style scoped lang="scss">
	.task {
		background-color: #f0f0f0;
		font-size: 0.8rem;
		border-radius: 6px;
		display: inline-flex;
		/*padding: 0 10px;*/
		margin-bottom: 5px;
		vertical-align: middle;
		justify-content: space-between;
		width: 100%;
		max-width: 18.857rem;
		min-height: 2.857rem;
	}

	.task .banner {
		padding: 0.75rem;
		-moz-border-radius-topleft: 6px;
		-moz-border-radius-bottomleft: 6px;
		border-bottom-left-radius: 6px;
		border-top-left-radius: 6px;
	}

	.task .task-body {
		color: rgba(0, 0, 0, 0.7);
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		align-self: center;
		/*justify-content: space-between;*/
		/*min-height: 2.857rem;*/
	}

	.task > * p{
		padding-left: 0.5em;
		font-size: 0.8em;
		margin-bottom: 0.1em;
		line-height: 1.2em;
	}

	.task > * b{
		font-size: 0.8em;
		line-height: 1.2em;
	}

	.task .avatar {
		background-color: #c3c3c3;
		display: flex;
		width: 2.857rem;
		height: 2.857rem;
		margin: 2px 0;
		border-radius: 50%;
		justify-content: center;
		align-items: center;
		align-self: center;
		color: #FFFFFF;
		//transform: translate(-8px);
	}

	.task .avatar .avatar-content {
		top: 0;
	}

	.task .task-body .avatar img {
		border-radius: 50%;
		height: 24px;
		width: 24px;
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

	.expiredChip {
		position: relative;
	}

	.expiredChip:after {
		content: '\A';
		position: absolute;
		background: black;
		border-radius: 0.8rem 0rem 0rem 0.8rem;
		top: 0;
		bottom: 0;
		left: 0;
		width: 10%;
	}

	.pendingChip {
		position: relative;
	}

	.pendingChip:after {
		content: '\A';
		position: absolute;
		background: grey;
		border-radius: 0.8rem 0rem 0rem 0.8rem;
		top: 0;
		bottom: 0;
		left: 0;
		width: 10%;
	}

	.soonChip {
		position: relative;
	}

	.soonChip:after {
		content: '\A';
		position: absolute;
		background: yellow;
		border-radius: 0.8rem 0rem 0rem 0.8rem;
		top: 0;
		bottom: 0;
		left: 0;
		width: 10%;
	}

	.earlyChip {
		position: relative;
	}

	.earlyChip:after {
		content: '\A';
		position: absolute;
		background: greenyellow;
		border-radius: 0.8rem 0rem 0rem 0.8rem;
		top: 0;
		bottom: 0;
		left: 0;
		width: 10%;
	}

	.nowChip {
		position: relative;
	}

	.nowChip:after {
		content: '\A';
		position: absolute;
		background: darkred;
		border-radius: 0.8rem 0rem 0rem 0.8rem;
		top: 0;
		bottom: 0;
		left: 0;
		width: 10%;
	}

</style>
