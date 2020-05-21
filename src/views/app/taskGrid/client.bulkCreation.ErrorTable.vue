<template>
    <div>
        <b-table striped hover :items="getError" :fields="fields" :per-page="perPage" :current-page="currentPage">
        </b-table>
        <div id="table_footer" class="d-flex justify-content-center">
            <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
            ></b-pagination>

        </div>
    </div>
</template>

<script>
    export default {
        name: "client_bulkCreation_ErrorTable",
        props: {
            errors: {
                required: true
            }
        },
        data() {
            return {
                currentPage: 1,
                rows: this.errors.length,
                perPage: 8,
                fields: [
                    {
                        key: 'line',
                        sortable: true
                    },
                    {
                        key: 'message',
                        sortable: true,
                        label: "Mensaje"
                    },
                    {
                        key: 'errors',
                        label: 'Errores'
                    },
                ]

            }
        },
        computed: {
            getError() {
                function mapErrorsCallback(error) {
                    return {
                        line: error.line,
                        message: error.message,
                        errors: error.errors.join(', ')
                    }

                }
                return this.errors.map(mapErrorsCallback)
            }

        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
