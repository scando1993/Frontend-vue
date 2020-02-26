<template>
    <div>
       <reports-nav-bar></reports-nav-bar>
        <div id="body">
            <br>
            <br><br>
            <br>
            <b-row>
                <b-col md="4">
                    <h3 class="text-center">Cumplimiento de tareas</h3>
                    <div class="chart-wrapper" style="height: 300px">
                        <v-chart :options="basicDoughnut" :autoresize="true"></v-chart>
                    </div>
                </b-col>
                <b-col md="4">
                    <h3 class="text-center">Iteracción con clintes</h3>
                    <div class="chart-wrapper" style="height: 300px">
                        <v-chart :options="basicDoughnut" :autoresize="true"></v-chart>
                    </div>
                </b-col>
                <b-col md="4">
                    <h3 class="text-center">Tipos de tareas</h3>
                    <div class="chart-wrapper" style="height: 300px">
                        <v-chart :options="basicDoughnut" :autoresize="true"></v-chart>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="12">
                    <h3 class="text-center">Status del Cliente</h3>
                    <div class="chart-wrapper" style="height: 300px">
                        <v-chart :options="stackedArea" :autoresize="true"></v-chart>
                    </div>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import {basicPie,basicDoughnut, stackedArea} from "@/data/echarts";
    import ReportsNavBar from "./navbar/reportsNavBar";
    export default {
        name: "report",
        components: {ReportsNavBar},
        data: () => ({
            basicPie,
            stackedArea,
            basicDoughnut
        })
    }
</script>

<style lang="scss" scoped>
    .echarts {
        width: 100%;
        height: 100%;
    }
</style>
