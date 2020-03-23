<template>
    <div>
        <b-card>
            <div id="header">
                <div id="pageTitle">
                    <h3>Reportes</h3>
                </div>
            </div>

            <div id="calendar">

                <b-dropdown variant="outline-primary" id="dropdown-1" text="Día" class="mb-1 d-inline  ">
                    <b-dropdown-item>Día</b-dropdown-item>
                    <b-dropdown-item>Semana</b-dropdown-item>
                    <b-dropdown-item>Mes</b-dropdown-item>
                    <b-dropdown-item>Customizar</b-dropdown-item>

                </b-dropdown>
                <div class="d-inline accionsButtons">
                    <b-button variant="primary ripple m-1">Descargar PDF</b-button>
                    <b-button variant="primary ripple m-1">Enviar Emai</b-button>

                </div>
                <div class="date d-inline" style="margin-left: 20px">
                    <div class="d-inline" style="margin-right: 10px" id="display_date">May-12</div>
                    <div id="navigate_dates" class="d-inline">
                        <b-button id="left_button">&#60;</b-button>
                        <b-button id="rifgt_button">&#62;</b-button>
                    </div>
                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
export default {
  name: 'reportsNavBar'
};
</script>

<style scoped>

</style>
