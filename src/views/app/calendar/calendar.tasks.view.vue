<template>
    <div>
        <b-row>
            <b-col md="4" class="mx-auto">
                <b-card title="Expiradas">
                    <div class="task chip mr-1 expiredChip" v-for="(task, taskIndex) in TASKS_LIST.filter(x=> x.additionalInfo.status === 'expired')" :key="item">
                        <div class="task-body ml-5">

                            <span class="task-text">
                                {{task.additionalInfo.client_data.additionalInfo.social_reason}}
                                <br>
                                {{task.additionalInfo.name}}
                            </span>
                            <div class="avatar ml-4">
                                <div class="avatar-content">
                                    {{task.additionalInfo.client_data.additionalInfo.social_reason.slice(0,2)}}
                                </div>
                            </div>
                            <span class="task-text ml-4">Expiró: {{task.additionalInfo.start_date}}</span>
                        </div>
                    </div>
                </b-card>
            </b-col>
            <b-col md="4">
                <b-card title="Agendadas">
                    <div class="task chip mr-1 expiredChip"
                         v-bind:class="{nowChip: task.additionalInfo.status === 'now', soonChip: task.additionalInfo.status === 'soon', earlyChip: task.additionalInfo.status === 'early'}"
                         v-for="(task, indexTask) in TASKS_LIST.filter(x => x.additionalInfo.status === 'early' || x.additionalInfo.status === 'now')"
                         :key="item">
                        <div class="task-body ml-5">
                            <span class="task-text">
                                <b>{{task.additionalInfo.client_data.additionalInfo.social_reason}}</b>
                                <br>
                                {{task.additionalInfo.name}}
                            </span>
                            <div class="avatar ml-4">
                                <div class="avatar-content">
                                    {{task.additionalInfo.client_data.additionalInfo.social_reason.slice(0,2)}}
                                </div>
                            </div>
                            <span class="task-text ml-4">Último contacto: {{task.additionalInfo.start_date}}</span>
                        </div>
                    </div>
                </b-card>
            </b-col>
            <b-col md="4">
                <b-card title="Pendientes">
                    <div class="task chip mr-1 pendingChip" v-for="(task, taskIndex) in TASKS_LIST.filter(x=> x.additionalInfo.status === 'pending')" :key="item">
                        <div class="task-body ml-5">
                            <span class="task-text">
                                <b>{{task.additionalInfo.client_data.additionalInfo.social_reason}}</b>
                                <br>
                                {{task.additionalInfo.name}}
                                <br>
                            </span>
                            <div class="avatar ml-4">
                                <div class="avatar-content">
                                    {{task.additionalInfo.client_data.additionalInfo.social_reason.slice(0,2)}}
                                </div>
                            </div>
                            <span class="task-text ml-4">Último contacto: {{task.additionalInfo.start_date}}</span>

                        </div>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'calendar_task_view',
  computed: {
    ...mapGetters(['TASKS_LIST'])
  },

};
</script>

<style scoped>
    .expiredChip {
        position:relative;
    }
    .expiredChip:after {
        content:'\A';
        position:absolute;
        background:black;
        border-radius: 0.8rem;
        border-bottom-right-radius: 0rem;
        border-top-right-radius: 0rem;
        top:0; bottom:0;
        left:0;
        width:10%;
    }

    .pendingChip {
        position:relative;
    }
    .pendingChip:after {
        content:'\A';
        position:absolute;
        background:grey;
        border-radius: 0.8rem;
        border-bottom-right-radius: 0rem;
        border-top-right-radius: 0rem;
        top:0; bottom:0;
        left:0;
        width:10%;
    }

    .soonChip {
        position:relative;
    }
    .soonChip:after {
        content:'\A';
        position:absolute;
        background:yellow;
        border-radius: 0.8rem;
        border-bottom-right-radius: 0rem;
        border-top-right-radius: 0rem;
        top:0; bottom:0;
        left:0;
        width:10%;
    }

    .earlyChip {
        position:relative;
    }
    .earlyChip:after {
        content:'\A';
        position:absolute;
        background: greenyellow;
        border-radius: 0.8rem;
        border-bottom-right-radius: 0rem;
        border-top-right-radius: 0rem;
        top:0; bottom:0;
        left:0;
        width:10%;
    }

    .nowChip {
        position:relative;
    }
    .nowChip:after {
        content:'\A';
        position:absolute;
        background: darkred;
        border-radius: 0.8rem;
        border-bottom-right-radius: 0rem;
        border-top-right-radius: 0rem;
        top:0; bottom:0;
        left:0;
        width:10%;
    }

</style>
