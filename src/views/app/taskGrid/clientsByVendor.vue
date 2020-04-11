<template>
	<vue-perfect-scrollbar class="scrollable d-flex flex-row flew-wrap justify-content-between mr-3"
	                       ref="scrollable_content">
		<div class="d-flex flex-lg-row flex-xl-row flex-sm-column flex-md-column">
			<template v-for="(vendor, indexVendor) in orderVendors(membersTasks)">
				<div v-bind:key="'_' + indexVendor" v-if="indexVendor !== 0"
				     class="mx-xl-3 mx-lg-3 my-md-3 my-sm-3" style="border: 1px solid gray;" />
				<div v-bind:key="indexVendor" class="flex-grow col-lg-6 col-xl-6">
					<h3 class="text-center">{{vendor.memberName}}</h3>
					<div>
						<b-row>
							<b-col md="6" sm="6" xl="6" lg="6" v-for="(task, indextask) in filterSearch(vendor.tasks)" :key="indexVendor + '_' + indextask">
								<client-card-widget :task_id="indextask"
								                    :task="task"
								                    :client="clients[task.client_id]"/>
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
    vendorSelectList: function () {
      var options = {};
      for (const i in this.vendors) {
        options[this.vendors[i].id] = this.vendors[i].name;
      }
      return options;
    }
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
					  if (active) {
	            return this.clients[task.client_id].businessName.toLowerCase().match(this.getSearchText().toLowerCase());
					  }
	        }break;
	        case 'Inactive': {
	          if (inactive){
	            return this.clients[task.client_id].businessName.toLowerCase().match(this.getSearchText().toLowerCase());
	          }
	        }break;
	        case 'Without contact': {
	          if (not_contact){
	            return this.clients[task.client_id].businessName.toLowerCase().match(this.getSearchText().toLowerCase());
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
        let textA = a.memberName.toUpperCase();
        let textB = b.memberName.toUpperCase();
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
		overflow: scroll;
	}
</style>
