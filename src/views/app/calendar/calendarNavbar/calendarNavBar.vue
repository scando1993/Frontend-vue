<template>
    <div>
        <b-card>
            <div id="header">
                <div id="pageTitle">
                    <h3>Calendario</h3>
                    <br>
                </div>
            </div>
            <div id="options_headers" class="d-flex justify-content-between align-items-center">
                <span>
                    <b-form-select v-model="selectedFilter" :options="options" @change="onChangeFilter"></b-form-select>
                </span>
                <span>
                    <button class="planiButton btn mx-1">Ver Equipo</button>
                </span>

                <div id="calendar_selection" class="d-flex d-inline-block align-items-center">
                    <p class="text-16 font-weight-bold">05 Abril</p>
                    <span>
                        <button class="btn planiButton mx-1 my-0">&#60</button>
                    </span>
                    <span>
                        <button class="btn planiButton mx-1 my-0">></button>
                    </span>
                </div>
                <spam class="">
                    <i class="i-Stop-2" style="font-size: 25px; background-color: black"></i>
                </spam>
                <p class="text-15 font-weight-bold">Expirada</p>
                <spam class="">
                    <i class="i-Stop-2" style="font-size: 25px; background-color: darkred"></i>
                </spam>
                <p class="text-15 font-weight-bold">Ahora</p>
                <spam class="">
                    <i class="i-Stop-2" style="font-size: 25px; background-color: #a24608"></i>
                </spam>
                <p class="text-15 font-weight-bold">Pronto</p>
                <spam class="">
                    <i class="i-Stop-2" style="font-size: 25px; background-color: lawngreen"></i>
                </spam>
                <p class="text-15 font-weight-bold">Temprano</p>
                <spam class="">
                    <i class="i-Stop-2" style="font-size: 25px; background-color: darkgrey"></i>
                </spam>
                <p class="text-15 font-weight-bold">Pendiente</p>


                <div class="btn d-flex mt-0" @click="showNewTaskModal()">
                    <span class="">
                        <i class="i-Add mr-2" style="font-size: 25px;color: #00b3ee"></i>
                    </span>
                        <p class="text-15 font-weight-bold">Nueva Tarea</p>
                </div>

                <b-form-group
                    class=""
                    id="input-group-1"
                    label-for="input-1"
            >
                <b-form-input
                        class="form-control-rounded"
                        id="input-1"
                        type="text"
                        placeholder="Buacar..."
                ></b-form-input>
            </b-form-group>
            </div>
        </b-card>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: "calendarNavBar",
        data() {
            return {
                selectedFilter: "month",
                options: [
                    { value: 'day', text: 'Día' },
                    { value: 'week', text: 'Semana' },
                    { value: 'month', text: 'Mes' },
                    { value: 'Tasks', text: 'Tareas' },
                    { value: 'Map', text: 'Mapa' },
                    { value: 'Custom', text: 'Customizar' }
                ]
            }
        },
        methods: {
            ...mapActions(["setSelectedComponentView", "setSelectedMapView", "setShowNewTaskModal"]),
            onChangeFilter() {
                if(this.selectedFilter === "day" || this.selectedFilter === "month" || this.selectedFilter === "week") {
                    this.setSelectedComponentView(this.selectedFilter);
                    this.setSelectedMapView(this.selectedFilter);
                }
                else if(this.selectedFilter === "Map") {
                    this.setSelectedMapView("day");
                    this.setSelectedComponentView(this.selectedFilter);
                }
                else {
                    this.setSelectedComponentView(this.selectedFilter);
                }
            },
            showNewTaskModal() {
                this.setShowNewTaskModal(true);
            }
        }
    }
</script>
