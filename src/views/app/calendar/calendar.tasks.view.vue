<template>
    <div>
        <b-row>
            <b-col md="4">
                <b-card title="Expiradas">
                    <div class="task chip-primary mr-1" v-for="(item, task) in [1,2,3,4,5]">
                        <div class="task-body">
                            <span class="task-text">Primary chip</span>
                            <div class="avatar ml-auto">
                                <div class="avatar-content">
                                    LD
                                </div>
                            </div>
                        </div>
                    </div>
                </b-card>
            </b-col>
            <b-col md="4">
                <b-card title="Agendadas">
                    <div class="task chip-primary mr-1" v-for="(item, task) in [1,2,3,4,5]">
                        <div class="task-body">
                            <span class="task-text">Primary chip</span>
                            <div class="avatar ml-auto">
                                <div class="avatar-content">
                                    LD
                                </div>
                            </div>
                        </div>
                    </div>
                </b-card>
            </b-col>
            <b-col md="4">
                <b-card title="Pendientes">
                    <div class="task chip-primary mr-1" v-for="(item, task) in [1,2,3,4,5]">
                        <div class="task-body">
                            <span class="task-text">Primary chip</span>
                            <div class="avatar ml-auto">
                                <div class="avatar-content">
                                    LD
                                </div>
                            </div>
                        </div>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "calendar_task_view"
    }
</script>

<style scoped>

</style>
