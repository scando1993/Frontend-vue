<template>
    <div class="mb-30">
        <header class=" card d-flex p-2 justify-content-between header-topnav">
            <div class="header-toggle">
                <div id="header" class="mb-3">
                    <div id="Title">
                        <h1>Plani</h1>
                    </div>
                    <div id="pageTitle">
                        <h3>Monitoreo de rutas</h3>
                    </div>
                </div>
                <div id="calendar">
                    <b-dropdown v-if="!showDatePicker" variant="outline-primary" id="dropdown-1" text="Escoge un filtro" class="mb-1 d-inline ">
                        <b-dropdown-item>Dia</b-dropdown-item>
                        <b-dropdown-item>Semana</b-dropdown-item>
                        <b-dropdown-item>Mes</b-dropdown-item>
                        <b-dropdown-item v-on:click="openPicker">Customizar</b-dropdown-item>

                    </b-dropdown>
                    <div class="d-inline" v-else style="width: 100px">
                        <FunctionalCalendar
                                ref="Calendar"
                                v-model="calendarData"
                                v-on:choseDay = "checkCloseDatePicker()"
                                :sundayStart="true"
                                :date-format="'dd/mm/yyyy'"
                                :is-date-range="true"
                                :isDark="false"
                                :isModal="false"
                                :transition="true"
                        ></FunctionalCalendar>
                    </div>
                    <div class="date d-inline" style="margin-left: 20px">
                        <div class="d-inline" id="display_date">{{displayDate}}</div>
                        <div class="date d-inline" style="margin-left: 20px">
                            <div class="d-inline" style="margin-right: 10px" id="display_date">May-12</div>
                            <div id="navigate_dates" class="d-inline">
                                <b-button class="font-weight-bold" id="left_button"><</b-button>
                                <b-button class="font-weight-bold"  id="rifgt_button">></b-button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </header>
    </div>
</template>

<script>
    export default {
        name: "monitoringNavbar",
        data() {
            return {
                showDatePicker: false
            }
        },
        methods: {
            openPicker () {
                this.showDatePicker = true;
            },
            hidePicker(data){
                this.showDatePicker = false;
                console.log(data);
                console.log("!!!!!!");
            },
            checkCloseDatePicker(){
                console.log(this.calendarData);

                if(this.calendarData.dateRange.start.date && this.calendarData.dateRange.end.date ){
                    this.displayDate = this.calendarData.dateRange.start.date + "-" + this.calendarData.dateRange.end.date ;
                    setTimeout(() => {
                        this.showDatePicker = false;
                    }, 300);
                }

            }
        }
    }
</script>

<style scoped>

</style>
