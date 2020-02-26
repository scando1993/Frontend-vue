<template>
    <div>
        <monitoring-navbar></monitoring-navbar>

        <div id="body_container">
            <b-row >
                <b-col md="9">
                    <b-card class="shadow-lg">
                        <b-row>
                            <b-col md="5" class="scrollable">
                                <h3 style="color: #00b3ee" class="text-center">Actividad</h3>
                                <div class="mt-3 mb-30 border-top"></div>
                                <div id="task_card" class="text-11 ">
                                    <div v-for="item in [1,2,3,4,5,6,7,8,9]">
                                        <b-card class="" style="margin-bottom: 5px">
                                            <div v-if="item % 2 === 0">
                                                <b-row>
                                                    <b-col md="2" class="d-flex align-items-center">
                                                        <i class="i-Yes font-weight-bold" style="font-size: 20px; color: green;" ></i>
                                                    </b-col>
                                                    <b-col md="6" class="">
                                                        <p>
                                                            Oficinias Semgroup <br>
                                                            Balsamos, algo
                                                        </p>
                                                    </b-col>
                                                    <b-col md="3">
                                                        <p>
                                                            No llego<br>
                                                            11/2/2020<br>
                                                            1332
                                                        </p>
                                                    </b-col>
                                                </b-row>
                                            </div>
                                            <div v-if="item % 2 !== 0">
                                                <p class="font-weight-bold mb-0">
                                                    <b>Visita a cliente</b>
                                                </p>
                                                <b-row>
                                                    <b-col md="4">
                                                        <p>
                                                            Cliente:<b/>
                                                            Pycca
                                                        </p>
                                                    </b-col>
                                                    <b-col md="4">
                                                        <p>
                                                            Dia de inicio<br>
                                                            <i class="i-Calendar mr-1"></i>Abril 3/2/2020
                                                        </p>
                                                    </b-col>
                                                    <b-col md="4">
                                                        <p>
                                                            Hora de inicio
                                                            <br><i class="i-Clock"></i> 16:20
                                                        </p>
                                                    </b-col>
                                                </b-row>
                                            </div>
                                        </b-card>
                                    </div>
                                </div>
                            </b-col>

                            <b-col md="7">
                                <div style="height: 600px; width: 100%">
                                    <l-map
                                        style="height: 100%; width: 100%"
                                        :zoom="zoom"
                                        :center="center"
                                        @update:zoom="zoomUpdated"
                                        @update:center="centerUpdated"
                                        @update:bounds="boundsUpdated"
                                    >
                                        <l-tile-layer :url="url"></l-tile-layer>
                                    </l-map>
                                </div>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>

                <b-col md="3">
                    <b-card id="teamContainer" class="scrollable">
                        <h3 style="color: #00b3ee" class="text-center">Equipo</h3>
                        <div class="mt-3 mb-30 border-top"></div>

                        <div id="task_card">
                            <div v-for="item in [1,2,3,4,5,6,7,8,9]">
                                <div class="ul-contact-page__profile">
                                    <div class="user-profile-img">
                                        <img class="profile-picture mb-12" src="@/assets/images/faces/1.jpg" alt="">
                                    </div>
                                    <div class="ul-contact-page__info">
                                        <p class="m-0 text-13">Timothy Carlson</p>
                                        <!--<p class="text-13 m-0">Digital Marketer</p>-->
                                        <p class="text-muted mt-3">josejose@ss.com</p>
                                    </div>
                                </div>
                                <div class="mt-3 mb-30 border-top"></div>
                            </div>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import SpaIcon from "vue-material-design-icons/Spa";
    import CheckCircleOutlineIcon from "vue-material-design-icons/CheckCircleOutline";
    import { FunctionalCalendar } from 'vue-functional-calendar';
    import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';
    import MonitoringNavbar from "./navbar/monitoringNavbar";
    export default {
        name: "monitor",
        components: {
            MonitoringNavbar,
            CheckCircleOutlineIcon,
            SpaIcon,
            FunctionalCalendar,
            LMap,
            LTileLayer,
            LMarker
        },
        data () {
            return {
                showDatePicker: false,
                calendarData: {},
                displayDate: "",
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                zoom: 6,
                center: [ -1.224882, -78.601685],
                bounds: null

            }
        },
        methods: {
            // map functions
            zoomUpdated (zoom) {
                this.zoom = zoom;
            },
            centerUpdated (center) {
                this.center = center;
            },
            boundsUpdated (bounds) {
                this.bounds = bounds;
            },
            //

        }
    }
</script>

<style scoped>
    .scrollable{
        width: 100%;
        height: 600px;
        position: relative;
        overflow-y: scroll;
    }
    #teamContainer {
        width: 100%;
        height: 640px;
        position: relative;
        overflow-y: scroll;
    }

</style>
