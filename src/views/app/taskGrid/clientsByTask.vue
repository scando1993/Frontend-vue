<template>
	<div class="d-flex flex-row flex-wrap m-3">
		<!--							<clients-by-vendor/>-->
		<template v-for="(task, indexTask) in filterSearch(orderClientByPriority(orderClientByVendors(CLIENTS_LIST)))">
			<client-card-widget :task_id="indexTask"
			                    :show_vendor="true"
			                    :task="task"
			                    :client="task.client"
			                    v-bind:key="indexTask"
			                    class="mx-3"/>
		</template>
	</div>
</template>

<script>
import { taskGridDummyData, clienteDummyData, vendorDummyData } from './data/taskGridData';
import { mapActions, mapGetters } from 'vuex';
import ClientCardWidget from './clientCard';
export default {
  name: 'clientsByTask',
  components: { ClientCardWidget },
  data() {
    return {
      membersTasks: taskGridDummyData,
      clients: clienteDummyData,
      vendors: vendorDummyData,
    };
  },
  created() {
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
		this.$store.dispatch('GET_CLIENTS_LIST', clientPayload)
	},
  computed: {
  	...mapGetters(['VENDOR_LIST', "CLIENTS_LIST"])
  },
  methods: {
    ...mapGetters(['getSearchText',
      'getActiveClients',
      'getInactiveClients',
      'getNotContactClients']),

    filterSearch(list) {
      // return list.filter(task => {
      //   let active = this.getActiveClients();
      //   let inactive = this.getInactiveClients();
      //   let not_contact = this.getNotContactClients();
      //
      //   let status = '';
      //   if (active) {
      //     status = 'Active';
      //   } else if (inactive) {
      //     status = 'Inactive';
      //   } else if (not_contact) {
      //     status = 'Without contact';
      //   }
      //   return this.clients[task.client_id].businessName.toLowerCase().match(this.getSearchText().toLowerCase()) &&
      //     task.activity.state.toLowerCase().match(status.toLowerCase());
      // });

      return list.filter(task => {
        let active = this.getActiveClients();
        let inactive = this.getInactiveClients();
        let not_contact = this.getNotContactClients();

        switch (task.activity.state) {
        case 'Active':{
          if (active) {
            return this.CLIENTS_LIST.find(x => x.id.id === task.client.id.id).additionalInfo.social_reason.toLowerCase().match(this.getSearchText().toLowerCase());
          }
        }break;
        case 'Inactive': {
          if (inactive){
            return this.CLIENTS_LIST.find(x => x.id.id === task.client.id.id).additionalInfo.social_reason.toLowerCase().match(this.getSearchText().toLowerCase());
          }
        }break;
        case 'Without contact': {
          if (not_contact){
            return this.CLIENTS_LIST.find(x => x.id.id === task.client.id.id).additionalInfo.social_reason.toLowerCase().match(this.getSearchText().toLowerCase());
          }
        }break;
        }
        // return this.clients[task.client_id].businessName.toLowerCase().match(this.getSearchText().toLowerCase()) &&
        //   task.activity.state.toLowerCase().match(status.toLowerCase());
        return false;
      });
    },

    orderClientByVendors(list) {
    	console.log('aca en order' , list);
      let clients = [];
      for(let i = 0; i < list.length; i++){
      	if(list[i].tasks.length === 0) {
      		let tmp = {
      			activity: {
					state: 'Without contact',
					name: 'N/A'
				},
				last_activity: 'N/A',
				vendor: 'N/A',
				client: list[i]
			};
			clients.push(tmp);
		}
        for(let j = 0; j < list[i].tasks.length; j++){
          let tmp = list[i].tasks[j];
          tmp['vendor'] = list[i].vendor.additionalInfo.firstName || 'N/A';
          tmp['last_activity'] = new Date(tmp.additionalInfo.tui_data.start);
          tmp.activity = {
			  state: this.parseStatus(tmp.additionalInfo.status),
			  name: tmp.additionalInfo.name
		  };
          tmp.client = list[i];
          console.log("tem2", tmp);
          clients.push(tmp);
        }
      }
      console.log('cleints list', clients);
      return clients;
    },
	  parseStatus(status) {
    	var newStatus = '';
    	switch (status) {
			case 'expired':
				newStatus = "Inactive";
				break;
			case 'now':
				newStatus = "Active";
				break;
			case 'pending':
				newStatus = "Without contact";
				break;
			case 'soon':
				newStatus = "Without contact";
				break;
			case 'early':
				newStatus = 'Without contact';
				break;
		}
		console.log("state", newStatus);
		return newStatus;
	  },

    orderClientByPriority(list) {
      return list.slice().sort(function(a, b) {
        return a.last_activity - b.last_activity;
      });
    },
  }
};
</script>

<style scoped lang="scss">

</style>
