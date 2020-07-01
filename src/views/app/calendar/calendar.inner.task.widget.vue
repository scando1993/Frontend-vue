<template>
  <div class="task" :style="{'background-color': getBackgroundColor()}">
    <span id="banner" class="rounded banner align-self-strech text-bold d-flex align-items-center"
          :style="{'background-color': getTaskColor(), 'color': '#FFFFFF'}">
      <p>{{ startDate }}</p>
    </span>
    <div class="task-body align-self-strech mr-auto d-flex align-items-center">
      <b-row>
        <b-col>
          <p>{{task.additionalInfo.client_data.social_reason || task.additionalInfo.client_data.name}}</p>
          <p>{{task.additionalInfo.name}}</p>
        </b-col>
      </b-row>
    </div>
    <span class="avatar mx-2 d-flex align-items-center"
          :style="{ 'background': task.additionalInfo.status === 'expired' ? '#FFFFFF': '#e1e4e1',
                    'color' : task.additionalInfo.status === 'expired' ? '#e1e4e1':'#FFFFFF'}">
      <div class="avatar-content">
          {{!task.additionalInfo.vendor_data ? 'N/A' : task.additionalInfo.vendor_data.additionalInfo.firstName.slice(0,1) +  task.additionalInfo.vendor_data.additionalInfo.lastName.slice(0,1)}}
      </div>
    </span>
  </div>
</template>

<script>
import { calendarTasksColors } from './data/calendarConfiguration';

export default {
  name: 'calendarInnerTaskWidget',
  props: {
    task: {
      required: true,
      type: Object
    },
    startDate: {
      required: true,
      type: String
    }
  },
  data: function () {
    return {};
  },
  methods: {
    getTaskColor() {
      return calendarTasksColors[this.task.additionalInfo.status].color;
    },
    getBackgroundColor() {
      return calendarTasksColors[this.task.additionalInfo.status].bgColor;
    }
  }
};
</script>

<style scoped lang="scss">
  .task {
    background-color: #f0f0f0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    /*padding: 0 10px;*/
    margin-bottom: 5px;
    vertical-align: middle;
    justify-content: space-between;
    height: 100%;
  }

  .task .banner {
  }

  .task .task-body {
    color: rgba(0, 0, 0, 0.7);
    flex-grow: 1;
    /*align-self: center;*/
    flex-basis: 100%;
    /*justify-content: space-between;*/
    /*min-height: 2.857rem;*/
  }

  .task > * p {
    padding-left: 0.5em;
    font-size: 0.8em;
    margin-bottom: 0.1em;
    line-height: 1.2em;
  }

  .task > * b {
    font-size: 0.8em;
    line-height: 1.2em;
  }

  .task .avatar {
    background-color: #e1e4e1;
    display: flex;
    width: 1.857em;
    height: 1.857em;
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
    font-size: 0.85em;
    text-transform: uppercase;
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
    min-height: 8px;
    min-width: 8px;
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
