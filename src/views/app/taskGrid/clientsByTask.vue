<template>
	<div class="d-flex flex-row flex-wrap" style="justify-content: space-between;">
		<template v-for="(task, indexTask) in filterSearch(orderClientByPriority(orderClientByVendors(CLIENTS_LIST)))">
			<client-card-widget :task_id="indexTask"
			                    :show_vendor="true"
			                    :task="task"
			                    :client="task.client"
			                    v-bind:key="indexTask"/>
			<span v-bind:key="'_span_' + indexTask" class="mx-auto"/>
		</template>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import ClientCardWidget from './clientCard';
export default {
  name: 'clientsByTask',
  components: { ClientCardWidget },
  data() {
    return {
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
     this.$store.dispatch('GET_VENDOR_LIST', vendorPayload);
    this.$store.dispatch('GET_CLIENTS_LIST', clientPayload);
  },
  computed: {
  	...mapGetters(['VENDOR_LIST', 'CLIENTS_LIST'])
  },
  methods: {
    ...mapGetters(['getSearchText',
      'getActiveClients',
      'getInactiveClients',
      'getNotContactClients']),

    filterSearch(list) {
      return list.filter(task => {
        let active = this.getActiveClients();
        let inactive = this.getInactiveClients();
        let not_contact = this.getNotContactClients();

        switch (task.activity.state) {
	        case 'Active':{
	          if (!active) {
	            return false;
	          }
	        }break;
	        case 'Inactive': {
	          if (!inactive){
	            return false;
	          }
	        }break;
	        case 'Without contact': {
	          if (!not_contact){
	            return false;
	          }
	        }break;
        }
	      return this.CLIENTS_LIST.find(x => x.id.id === task.client.id.id).additionalInfo.social_reason.toLowerCase().match(this.getSearchText().toLowerCase());
      });
    },

    orderClientByVendors(list) {
    	console.log('aca en order' , list);
      let clients = [];
      for(let i = 0; i < list.length; i++){
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
					client: list[i]
				};
				if (list[i].vendor) {
					tmp.vendor = list[i].vendor.additionalInfo.firstName;
				} else {
					tmp.vendor = 'N/A';
				}
				clients.push(tmp);
				continue
			}
			// for(let j = 0; j < list[i].tasks.length; j++){
			const tasks = list[i].tasks;
			let tmp = this.getNextTask(new Date(), tasks);
			if(!tmp)
				tmp = { hasNextTask: false}
			else
				tmp['hasNextTask'] = true;
			tmp['vendor'] = list[i].vendor.additionalInfo.firstName || 'N/A';
			tmp['last_activity'] = this.getLastActivityDate(client);
			tmp.activity = {
				state: list[i].additionalInfo.status,
				name: tmp.additionalInfo ? tmp.additionalInfo.name : 'N/A'
			};
			tmp.client = list[i];
			console.log('tem2', tmp);
			clients.push(tmp);
		} catch (e) {
      		console.log('crash in ', list[i])
			continue
		}

        }
     // }
      console.log('cleints list', clients);
      return clients;
    },
	  parseStatus(status) {
    	let newStatus = '';
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
	  getLastActivityDate(client) {
    	return client.additionalInfo.last_activity ? new Date(client.additionalInfo.last_activity) : 'N/A';
	  },

    orderClientByPriority(list) {
      return list.slice().sort(function(a, b) {
        return a.last_activity - b.last_activity;
      });
    },
	  getNextTask(fromDate, taskList) {
    	return taskList
				.filter( x => x.additionalInfo.status !== 'pending' && x.additionalInfo.status !== 'expired' && !x.additionalInfo.completed)
				.sort( x => new Date(x.additionalInfo.start) )[0];
	  }
  }
};
</script>

<style scoped lang="scss">

</style>
