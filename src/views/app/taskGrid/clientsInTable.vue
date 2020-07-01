<template>
    <div>
        <b-table striped hover :items="getTableData" :fields="fields" :per-page="perPage" :current-page="currentPage">
            <template v-slot:cell(actions)="row">

                <b-button variant="primary" size="sm" @click="showClientModal(row.item.client)">
                    Ver detalles
                </b-button>
                <div>
                </div>
            </template>
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
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: "clientsInTable",
        data() {
            return {
                currentPage: 1,
                rows: 1,
                perPage: 8,
                fields: [
                    {
                        key: 'id',
                        sortable: true
                    },
                    {
                        key: 'nombre',
                        sortable: true
                    },
                    {
                        key: 'razon_social',
                        sortable: true
                    },
                    {
                        key: 'direccion',
                        sortable: true
                    },
                    {
                        key: 'notas',
                        sortable: true
                    },
                    {
                        key: 'estado',
                        sortable: true
                    },
                    {
                        key: 'nombre',
                        sortable: true
                    },
                    { key: 'actions', label: 'Acciones' }

                ]

            }
        },
        mounted() {
            this.$store.dispatch('GET_CLIENTS_LIST', {limit: 10000, addVendor: true});
            this.$store.dispatch('GET_VENDOR_LIST', {limit: 10000});
        },
        computed: {
            ...mapGetters(['CLIENTS_LIST', 'loggedInUser']),

            getTableData() {
                const isAdmin = this.loggedInUser.admin;
                // filtering data
                function clientsFilterCallback(client) {
                    const condition1 = client.additionalInfo.social_reason !== '_private_';
                    const condition2 = isAdmin ? true : client.additionalInfo.activated;
                    return condition1 && condition2
                }
                const filters = this.filterSearch(this.CLIENTS_LIST);
                const clientsFiltered = filters.filter( clientsFilterCallback);

                // mapping data
                const th = this;
                function tableMappingCallback(client, index) {
                    return {
                        id: index,
                        nombre: client.additionalInfo.name || 'N/A',
                        razon_social: client.additionalInfo.social_reason || 'N/A',
                        direccion: client.additionalInfo.address || 'N/A',
                        notas: client.additionalInfo.additionalInfo,
                        estado: th.mapClientStates(client.additionalInfo.status),
                        client: client
                    }
                }
                this.rows = clientsFiltered.length;
                return clientsFiltered.map(tableMappingCallback);
            },


        },
        methods: {
            ...mapGetters(['getSearchText',
                'getActiveClients',
                'getInactiveClients',
                'getNotContactClients',
            'showClientForm']),

            mapClientStates(state) {
                switch (state) {
                    case 'Active':
                        return 'Activo';
                    case 'Inactive':
                        return 'Inactivo';
                    case 'Without contact':
                        return 'Sin Contactar'
                }
            },
            showClientModal(client) {
              this.$store.dispatch('SET_CLIENT_SELECTED_ACTION', client);
              const vendorName = client.vendor ? client.vendor.additionalInfo.firstName : 'N/A';
              this.$store.dispatch('showClientForm', {vendor: vendorName, client: client.additionalInfo});
            },


            filterSearch(list) {
                return list.filter(client => {
                    let active = this.getActiveClients();
                    let inactive = this.getInactiveClients();
                    let not_contact = this.getNotContactClients();

                    switch (client.additionalInfo.status) {
                        case 'Active': {
                            if (!active) {
                                return false;
                            }
                        }
                            break;
                        case 'Inactive': {
                            if (!inactive) {
                                return false;
                            }
                        }
                            break;
                        case 'Without contact': {
                            if (!not_contact) {
                                return false;
                            }
                        }
                            break;
                    }
                    return this.CLIENTS_LIST.find(x => x.id.id === client.id.id).additionalInfo.social_reason.toLowerCase().match(this.getSearchText().toLowerCase());
                });
            }

        }
    }
</script>

<style scoped>

</style>
