<template>
    <l-map
            style="height: 800px; width: 100%"
            :zoom="mapConfigurations.zoom"
            :center="mapConfigurations.center"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @update:bounds="boundsUpdated"
    >
        <l-tile-layer :url="mapConfigurations.url"/>
            <l-marker :lat-lng="item.coords" :name="item.name" v-for="item in mapMarkers" v-bind:key="item">
                <l-icon
                        style="background-color: red;"
                        :icon-anchor="[0, 240]"
                        :icon-size="[320, 370]"
                        :label-anchor="[-6, 0]"
                        :popupAnchor="[0, -36]"
                         />
                <l-tooltip>
                    Actividad: {{item.name}}
                    <br>
                    Direccion: {{item.address}}

                </l-tooltip>
                >
            </l-marker>

    </l-map>
    
</template>

<script>
    import { LMap, LTileLayer, LIcon, LTooltip} from 'vue2-leaflet';
    import { mapGetters } from 'vuex';
    export default {
        name: "calendar_map",
        components: {
            LMap,
            LTileLayer,
            LIcon,
            LTooltip
        },
        data() {
            return {
                mapConfigurations: {
                    currentZoom: 11.5,
                    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                    zoom: 6,
                    center: [ -1.224882, -78.601685 ],
                    bounds: null,
                },
            }
        },
        computed: {
            ...mapGetters(['TASKS_LIST']),
            mapMarkers() {
                return this.TASKS_LIST.map(this.mapTaskLocation)
            }
        },
        mounted() {
        },
        methods: {
            mapTaskLocation(task) {
                try {
                    const lat = task.additionalInfo.lat;
                    const lng = task.additionalInfo.lng;
                    const coords = [lat, lng];
                    const name = task.additionalInfo.name;
                    return {
                        coords: coords,
                        name: name,
                        address: task.additionalInfo.address
                    }

                }
                catch (e) {

                }
            },
            // map functions
            zoomUpdated(zoom) {
                this.mapConfigurations.zoom = zoom;
            },
            centerUpdated(center) {
                this.mapConfigurations.center = center;
            },
            boundsUpdated(bounds) {
                this.mapConfigurations.bounds = bounds;
            },
        }
    }
</script>

<style scoped>
    .mm {
        background-color: red;
    }

</style>
