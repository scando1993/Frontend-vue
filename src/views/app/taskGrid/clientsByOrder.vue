<template>
  <div class="d-flex flex-row flex-wrap m-0">
    <template v-for="(task, indexTask) in filterSearch(orderClientsByName(orderClientByVendors(CLIENTS_LIST)))">
      <client-card-widget :task_id="indexTask"
                          :show_vendor="true"
                          :task="task"
                          :client="task.client"
                          v-bind:key="indexTask"
                          v-if="task.client.additionalInfo.social_reason !== '_private_'"

      />
      <span v-bind:key="'_span_' + indexTask" class="mx-auto" v-if="task.client.additionalInfo.social_reason !== '_private_'"/>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ClientCardWidget from './clientCard';

export default {
  name: 'clientsByOrder',
  components: { ClientCardWidget },
  data() {
    return {};
  },
  mounted() {
    const vendorPayload = {
      limit: 1000,
      addTasks: true
    };
    const clientPayload = {
      limit: 1000,
      addTasks: true,
      addVendor: true
    };
    // this.$store.dispatch('GET_VENDOR_LIST', vendorPayload);
    this.$store.dispatch('GET_CLIENTS_LIST', clientPayload);
  },
  created() {
  },
  computed: {
    ...mapGetters([ 'VENDOR_LIST', 'CLIENTS_LIST' ])
  },
  methods: {
    ...mapGetters([ 'getSearchText',
      'getActiveClients',
      'getInactiveClients',
      'getNotContactClients' ]),

    filterSearch(list) {
      return list.filter(task => {
        let active = this.getActiveClients();
        let inactive = this.getInactiveClients();
        let not_contact = this.getNotContactClients();

        switch ( task.activity.state ) {
        case 'Active': {
          if ( !active ) {
            return false;
          }
        }
          break;
        case 'Inactive': {
          if ( !inactive ) {
            return false;
          }
        }
          break;
        case 'Without contact': {
          if ( !not_contact ) {
            return false;
          }
        }
          break;
        }
        return this.CLIENTS_LIST.find(x => x.id.id === task.client.id.id).additionalInfo.social_reason.toLowerCase().match(this.getSearchText().toLowerCase());
      });
    },

    orderClientByVendors(list) {

      let clients = [];
      for ( let i = 0; i < list.length; i++ ) {
        try {
          const client = list[i];
          if (client.additionalInfo.social_reason === '_private_') {
            continue
          }
          if (list[i].tasks.length === 0) {
            let tmp = {
              activity: {
                state: 'Without contact',
                name: 'N/A'
              },
              last_activity: this.getLastActivityDate(client),
              vendor: 'N/A',
              client: list[i],
              company_name: 'N/A'
            };
            clients.push(tmp);
            continue
          }
          //for (let j = 0; j < list[i].tasks.length; j++) {
          const tasks = list[i].tasks;
          let tmp = tasks[tasks.length - 1];
          tmp['vendor'] = list[i].vendor.additionalInfo.firstName + ' ' + list[i].vendor.additionalInfo.lastName || 'N/A';
          tmp['last_activity'] = this.getLastActivityDate(client);
          tmp.activity = {
            state: list[i].additionalInfo.status,
            name: tmp.additionalInfo.name
          };
          tmp.client = list[i];
          tmp.company_name = list[i].additionalInfo.social_reason;
          console.log('tem2', tmp);
          //tmp['vendor'] = list[i].memberName;
          clients.push(tmp);
        } catch (e) {

        }
      }
      // }
      console.log('clients list', clients);

      return clients;
    },

    orderClientsByName(list) {
      return list.slice().sort(function (a, b) {
        let textA = a.company_name.toUpperCase();
        let textB = b.company_name.toUpperCase();
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
      });
    },

    parseStatus(status) {
      let newStatus = '';
      switch ( status ) {
      case 'expired':
        newStatus = 'Inactive';
        break;
      case 'now':
        newStatus = 'Active';
        break;
      case 'pending':
        newStatus = 'Without contact';
        break;
      case 'soon':
        newStatus = 'Without contact';
        break;
      case 'early':
        newStatus = 'Without contact';
        break;
      }
      console.log('state', newStatus);
      return newStatus;
    },
    getLastActivityDate(client) {
      return client.additionalInfo.last_activity ? new Date(client.additionalInfo.last_activity) : 'N/A';
    },
  }
};
</script>

<style scoped lang="scss">

</style>
