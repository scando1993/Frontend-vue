<template>
    <div>
        <b-card>
            <div id="header">
                <div id="Title">
                    <h1>Plani</h1>
                </div>
                <div id="pageTitle">
                    <h3>Clientes</h3>
                    <br>
                </div>
            </div>
            <div id="options_headers" class="d-flex justify-content-between align-items-center">
                <span>
                    <b-dropdown variant="outline-primary" id="dropdown-1" text="Día" class="">
                        <b-dropdown-item>Día</b-dropdown-item>
                        <b-dropdown-item>Semana</b-dropdown-item>
                        <b-dropdown-item>Mes</b-dropdown-item>
                        <b-dropdown-item>Customizar</b-dropdown-item>

                    </b-dropdown>
                </span>
                <span>
                    <button class="planiButton btn">Ver Equipo</button>
                </span>
                <b-form-group
                        class=""
                        id="input-group-1"
                        label-for="input-1"
                >
                    <b-form-input
                            class="form-control-rounded"
                            id="input-1"
                            type="search"
                            placeholder="Buscar cliente"
                    ></b-form-input>
                </b-form-group>
                <spam class="">
                    <i class="i-Stop-2" style="font-size: 25px; background-color: #00b3ee"></i>
                </spam>
                <p class="text-15 font-weight-bold">Activos</p>
                <spam class="">
                    <i class="i-Stop-2" style="font-size: 25px; background-color: gray"></i>
                </spam>
                <p class="text-15 font-weight-bold">Inactivos</p>
                <spam class="">
                    <i class="i-Stop-2" style="font-size: 25px; background-color: gainsboro"></i>
                </spam>
                <p class="text-15 font-weight-bold">Sin Contactar</p>
                <div class="btn d-flex mt-0" @click="showNewClientForm()">
                <span class="">
                    <i class="i-Add mr-2" style="font-size: 25px;color: #00b3ee"></i>
                </span>
                    <p class="text-15 font-weight-bold">Agregar nuevo cliente</p>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "taskGridNavbar",
        methods: {
            ...mapActions(["changeShowFormClient", "showNewClientForm"]),

        },
        computed: {
            ...mapGetters(["getFormClientShow",])
        }
    }
</script>

<style scoped>
    .planiButton {
        background-color: #00b3ee;
        color: white;
    }
</style>
