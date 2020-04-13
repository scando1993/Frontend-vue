<template>
	<div class="d-flex flex-row flex-wrap justify-content-between m-2">
		<template v-for="(task, indexTask) in filterSearch(orderClientsByName(orderClientByVendors(membersTasks)))">
			<client-card-widget :task_id="indexTask"
			                    :show_vendor="true"
			                    :task="task"
			                    :client="clients[task.client_id]"
			                    v-bind:key="indexTask"/>
		</template>
	</div>
</template>

<script>
import { taskGridDummyData, clienteDummyData, vendorDummyData } from './data/taskGridData';
import { mapActions, mapGetters } from 'vuex';
import ClientCardWidget from './clientCard';

export default {
  name: 'clientsByOrder',
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
  computed: {
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

    orderClientByVendors(list) {
      let clients = [];
      for(let i = 0; i < list.length; i++){
        for(let j = 0; j < list[i].tasks.length; j++){
          let tmp = list[i].tasks[j];
          tmp['vendor'] = list[i].memberName;
          clients.push(tmp);
        }
      }
      return clients;
    },

    orderClientsByName(list){
      return list.slice().sort(function(a, b) {
        let textA = a.company_name.toUpperCase();
        let textB = b.company_name.toUpperCase();
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
      });
    },
  }
};
</script>

<style scoped lang="scss">

</style>
