<template>
	<vue-perfect-scrollbar class="scrollable" ref="scrollable_content">
		<div class="d-flex flex-lg-row flex-xl-row flex-sm-column flex-md-column">
			<template v-for="(vendor, indexVendor) in orderVendors(VENDOR_LIST)">
				<div v-bind:key="'_' + indexVendor" v-if="indexVendor !== 0"
				     class="mx-xl-3 mx-lg-3 my-md-3 my-sm-3" style="border: 1px solid gray;" />
				<div v-bind:key="indexVendor" class="flex-grow col-lg-6 col-xl-6">
					<h3 class="text-center">{{vendor.additionalInfo.firstName + " " + vendor.additionalInfo.lastName}}</h3>
					<div>
						<b-row>
							<b-col md="6" sm="6" xl="6" lg="6" v-for="(task, indextask) in filterSearch(prepareTask(vendor.tasks, vendor))" :key="indexVendor + '_' + indextask">
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
import { taskGridDummyData, clienteDummyData, vendorDummyData } from './data/taskGridData';
import { mapActions, mapGetters } from 'vuex';
import ClientCardWidget from './clientCard';

export default {
  name: 'ClientsByVendor',
  components: { ClientCardWidget },
  data() {
    return {
      membersTasks: taskGridDummyData,
      clients: clienteDummyData,
      vendors: vendorDummyData,
    };
  },
  created() {
    console.log(this.getFormClientShow);
  },
  computed: {
  	...mapGetters(['CLIENTS_LIST', 'VENDOR_LIST']),
    vendorSelectList: function () {
      var options = {};
      for (const i in this.vendors) {
        options[this.vendors[i].id] = this.vendors[i].name;
      }
      return options;
    }
  },
	mounted() {
  	console.log('mounted in client by vendor');
  	const vendorPayload = {
  		limit: 1000,
		addTasks: true
	};
  	const clientPayload = {
  		limit: 1000
	};
  	this.$store.dispatch('GET_VENDOR_LIST', vendorPayload);
		this.$store.dispatch('GET_CLIENTS_LIST', clientPayload);
	},
  methods: {
    ...mapGetters(['getSearchText',
      'getActiveClients',
      'getInactiveClients',
      'getNotContactClients']),
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
	  prepareTask(list, vendor) {
    	for(var i = 0; i<list.length; i++) {
    		const task = list[i];
    		task.activity = {
				state: this.parseStatus(task.additionalInfo.status),
				name: task.additionalInfo.name
			};
			task['vendor'] = vendor.additionalInfo.firstName || 'N/A';
			task['last_activity'] = new Date(task.additionalInfo.tui_data.start);
			// task['client'] = this.CLIENTS_LIST[0]
			console.log('task', task)
		}
    	console.log('new list', list)
    	return list;
	  },

    filterSearch(list) {
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

    orderVendors(list) {
      return list.slice().sort(function(a, b) {
      	/*
        let textA = a.memberName.toUpperCase();
        let textB = b.memberName.toUpperCase();
        */
		  let textA = (a.additionalInfo.firstName + " " + a.additionalInfo.lastName).toUpperCase();
		  let textB = (b.additionalInfo.firstName + " " + b.additionalInfo.lastName).toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
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
