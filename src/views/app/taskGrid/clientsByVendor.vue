<template>
  <vue-perfect-scrollbar class="scrollable" ref="scrollable_content">
    <div class="d-flex flex-lg-row flex-xl-row flex-sm-column flex-md-column">
      <template v-for="(vendor, indexVendor) in orderVendors(VENDOR_LIST)">
        <div v-bind:key="'_' + indexVendor" v-if="indexVendor !== 0"
             class="mx-xl-3 mx-lg-3 my-md-3 my-sm-3" style="border: 1px solid gray;"/>
        <div v-bind:key="indexVendor" class="flex-grow col-lg-6 col-xl-6">
          <h3 class="text-center">{{vendor.additionalInfo.firstName + ' ' + vendor.additionalInfo.lastName}}</h3>
          <div>
            <b-row>
              <b-col md="6" sm="6" xl="6" lg="6"
                     v-for="(task, indextask) in filterSearch(prepareTask(vendor.tasks, vendor))"
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ClientCardWidget from './clientCard';

export default {
  name: 'ClientsByVendor',
  components: { ClientCardWidget },
  data() {
    return {};
  },
  created() {
  },
  computed: {
    ...mapGetters(['CLIENTS_LIST', 'VENDOR_LIST']),

  },
  mounted() {
    console.log('mounted in client by vendor');
    const vendorPayload = {
      limit: 1000,
		addClients: true
    };
    const clientPayload = {
      limit: 1000
    };
    this.$store.dispatch('GET_VENDOR_LIST', vendorPayload);
    this.$store.dispatch('GET_CLIENTS_LIST', clientPayload);
  },
  methods: {
    ...mapGetters([ 'getSearchText',
      'getActiveClients',
      'getInactiveClients',
      'getNotContactClients' ]),

    vendor_name(vendor) {
      try {
        return vendor.additionalInfo.firstName + ' ' + vendor.additionalInfo.lastName;
      } catch ( e ) {
        return '';
      }
    },

    parseStatus(status) {
      var newStatus = '';
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
    prepareTask(list, vendor) {

    	console.log('Vendor', vendor);
    	console.log('Vendor clients', list);
    	var new_tasks = [];
    	for(var i = 0; i < list.length; i++) {
    		const client = list[i];
			const tasks = client.tasks;
			const aaa = tasks.length;
			if(tasks.length === 0) {
				const empty = {
					vendor: vendor.additionalInfo.firstName,
					last_activity: 'N/A',
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
				const task = tasks[tasks.length -1];

				task.activity = {
					state: client.additionalInfo.status,
					name: task.additionalInfo.name
				};
				task['vendor'] = vendor.additionalInfo ? vendor.additionalInfo.firstName :  'N/A';
				task['last_activity'] = task.additionalInfo.tui_data ?  new Date(task.additionalInfo.tui_data.start) : 'N/A';
				task['client'] = client;
				console.log('task', task);
				new_tasks.push(task);
			// }
		}
      console.log('new list', new_tasks);
      return new_tasks;
    },

    filterSearch(list) {
      let self = this;
      let active = self.getActiveClients();
      let inactive = self.getInactiveClients();
      let not_contact = self.getNotContactClients();

      return list.filter(task => {
        switch ( task.activity.state ) {
        case 'Active': {
          if ( !active ) {
            return false;
          }
        }break;
        case 'Inactive': {
          if ( !inactive ) {
            return false;
          }
        }break;
        case 'Without contact': {
          if ( !not_contact ) {
            return false;
          }
        }break;
        }
        console.log(task);
        if (task.client !== undefined && task.client !== null){
          let social_reason =  self.CLIENTS_LIST.find(x => x.id.id === task.client.id.id)
            .additionalInfo.social_reason.toLowerCase().match(this.getSearchText().toLowerCase());
          if (social_reason === null){
            let name = self.CLIENTS_LIST.find(x => x.id.id === task.client.id.id)
              .additionalInfo.name.toLowerCase().match(this.getSearchText().toLowerCase());
            return name !== null;
          }else {
            return true;
          }
        }
        return false;
      });
    },

    orderVendors(list) {
      console.log('vendor list', list);
      let self = this;
      return list.slice().sort(function (a, b) {
        let textA = self.vendor_name(a).toUpperCase();
        let textB = self.vendor_name(b).toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      }).filter(vendor => {
        return vendor.tasks !== undefined ? vendor.tasks.length !== 0 : false;
        return vendor.clients.length !== 0;
      });
    },
  }
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
