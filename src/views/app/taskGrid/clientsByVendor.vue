<template>
  <div v-if="renderComponent">
    <vue-perfect-scrollbar class="scrollable" ref="scrollable_content">
      <div class="d-flex flex-lg-row flex-xl-row flex-sm-column flex-md-column">
        <template  v-for="(vendor, indexVendor) in orderVendors(vendorList)">
          <div v-bind:key="'_' + indexVendor" v-if="indexVendor !== 0"
               class="mx-xl-3 mx-lg-3 my-md-3 my-sm-3" style="border: 1px solid gray;"/>
          <div v-bind:key="indexVendor" class="flex-grow col-lg-6 col-xl-6">
            <h3 class="text-center">{{vendor_name(vendor)}}</h3>
            <div>
              <b-row>
                <b-col md="6" sm="6" xl="6" lg="6"
                       v-for="(task, indextask) in filterSearch(prepareTask(vendor.Clients, vendor))"
                       :key="indexVendor + '_' + indextask">
                  <client-card-widget :task_id="indextask"
                                      :task="task"
                                      :client="task.client"/>
                </b-col>
              </b-row>
            </div>
          </div>
        </template>
      </div>
    </vue-perfect-scrollbar>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ClientCardWidget from './clientCard';

export default {
  name: 'ClientsByVendor',
  components: { ClientCardWidget },
  data() {
    return {
      vendorList: [],
      renderComponent: false,
    };
  },
  created() {
  },
  asyncComputed: {

  },
  computed: {
    ...mapGetters(['CLIENTS_LIST', 'VENDOR_LIST']),


  },
  watch: {
    'VENDOR_LIST': function ()  {
      if(this.VENDOR_LIST.length !== 0) {
        this.addVendosClients();
      }
    },
  },
  mounted() {
    const vendorPayload = {
      limit: 1000,
      addClients: false
    };
    const clientPayload = {
      limit: 1000
    };
    this.$store.dispatch('GET_VENDOR_LIST', vendorPayload);
  },
  methods: {
    ...mapGetters(['getSearchText',
      'getActiveClients',
      'getInactiveClients',
      'getNotContactClients']),
    rerender() {
      this.renderComponent = true;
    },
    addVendosClients: async function () {
      if (this.VENDOR_LIST) {
        var newVendorList = JSON.parse(JSON.stringify(this.VENDOR_LIST));
        for (var i = 0; i < newVendorList.length; i++) {
          const vendor = newVendorList[i];
          await this.addVendorsClient(vendor);
        }
        this.vendorList =  newVendorList
        this.rerender();

      }

    },
    vendor_name(vendor) {
      try {
        return vendor.additionalInfo.firstName + ' ' + vendor.additionalInfo.lastName;
      } catch ( e ) {
        return '';
      }
    },

    parseStatus(status) {
      var newStatus = '';
      switch (status) {
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
    prepareTask(list, vendor) {

      console.log('Vendor', vendor);
      console.log('Vendor clients', list);
      var new_tasks = [];
      for(var i = 0; i < list.length; i++) {
        const client = list[i];
        if(client.additionalInfo.social_reason === '_private_'){
          continue
        }
        const tasks = client.Tasks;
        if(tasks.length === 0) {
          const empty = {
            vendor: vendor.additionalInfo.firstName + ' ' + vendor.additionalInfo.lastName,
            last_activity: this.getLastActivityDate(client),
            client: client,
            activity: {
              state: 'Without contact',
              name: 'N/A'
            }
          };
          new_tasks.push(empty);
          continue;
        }
        //for (var j = 0; j < tasks.length; j++) {
        //const task = tasks[j];
        let task = this.getNextTask(new Date(), tasks);
        if(!task) task = { hasNextTask: false}
        else task['hasNextTask'] = true;

        task.activity = {
          state: client.additionalInfo.status,
          name: task.hasNextTask ? task.additionalInfo.name : 'N/A',
          status: task.hasNextTask ? task.additionalInfo.status : null,
          date: task.hasNextTask ? task.additionalInfo.start : null
        };
        task['vendor'] = vendor ? vendor.additionalInfo.firstName + ' ' + vendor.additionalInfo.lastName :  'N/A';
        task['last_activity'] = this.getLastActivityDate(client);
        task['client'] = client;
        console.log('task', task);
        new_tasks.push(task);
        // }
      }
      console.log('new list', new_tasks);
      return new_tasks;
    },

    filterSearch(list) {
      return list.filter(task => {
        let active = this.getActiveClients();
        let inactive = this.getInactiveClients();
        let not_contact = this.getNotContactClients();

        switch (task.activity.state) {
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
        return task.client.additionalInfo.social_reason.toLowerCase().match(this.getSearchText().toLowerCase());
      });
    },

    orderVendors(list) {
      const listCopy = JSON.parse(JSON.stringify(list))
      return listCopy.slice().sort(function (a, b) {
        let textA = a.additionalInfo.firstName.toUpperCase();
        let textB = b.additionalInfo.firstName.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      }).filter(vendor => {
        return vendor.Clients.length !== 0;
      });
    },
    getLastActivityDate(client) {
      return client.additionalInfo.last_activity ? new Date(client.additionalInfo.last_activity) : 'N/A';
    },
    async addVendorsClient(vendor) {
      const clients = await this.$store.dispatch('GET_VENDOR_CLIENTS', {
        vendor_id: vendor.id.id,
        limit: 10000,
        addTasks: true
      });
      vendor['Clients'] = clients;
    },
    settingDateFloatingTask(task) {
      if (this.isFloatingTask(task)) {
        const start = this.$moment(task.additionalInfo.start_date, 'YYYY-MM-DD').endOf('date').toDate();
        task.additionalInfo.start = start;
      }
      return task
    },
    getNextTask(fromDate, taskList) {
      return  taskList
              .filter( x => x.additionalInfo.status !== 'pending' && x.additionalInfo.status !== 'expired' && !x.additionalInfo.completed)
              .map(this.settingDateFloatingTask)
              .sort( x => new Date(x.additionalInfo.start) )[0];
    },
    isFloatingTask(task) {
      return !task.additionalInfo.start_time && task.additionalInfo.start_date
    }
  },
};
</script>

<style scoped lang="scss">
  .scrollable {
    width: 100%;
    /*height: 500px;*/
    position: relative;
    overflow-x: scroll;
    overflow-y: scroll;
    height: 100%
  }
</style>
