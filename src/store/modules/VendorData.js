const axios = require('axios');
export default {
    state: {
        vendor_list: []
    },
    getters: {
        VENDOR_LIST: state => state.vendor_list
    },
    mutations: {
        SET_VENDOR_LIST(state, payload) {
            state.vendor_list = payload;
        }
    },
    actions: {
        GET_VENDOR_LIST: async ({commit}) => {
            const config = {
                headers: {'x-authorization': 'Bearer ' + localStorage.getItem('token')}
            };
            const response = await axios.get(process.env.VUE_APP_API + '/Vendor/getAll', config);
            if(!response.data.error) {
                console.log('vendors',response.data.data.data);
                commit('SET_VENDOR_LIST', response.data.data.data)
            }
            else{
                console.log(response);
            }
        },
        GET_VENDOR_TASKS: async ({commit}, vendor_id, limit, textSearch) => {
            const config = {
                headers: {'x-authorization': 'Bearer ' + localStorage.getItem('token')}
            };
            var endponit = `/Vendor/getTasks?vendorID=${vendor_id}?limit=${limit}`;
            if(textSearch) {
                endponit += `?textSearch=` +  textSearch;
            }

            const response = await axios.get(process.env.VUE_APP_API + endponit, config);
            if(!response.data.error) {
                console.log('vendors',response.data.data.data);
                commit('SET_TASK_LIST', response.data.data.data)
            }
            else{
                console.log(response);
            }
        },
        GET_VENDOR_CLIENTS: async ({commit}, payload) => {
            const {vendor_id, limit, textSearch} = payload;
            const config = {
                headers: {'x-authorization': 'Bearer ' + localStorage.getItem('token')}
            };
            var endponit = `/Vendor/getClients?vendorID=${vendor_id}&limit=${limit}`;
            if(textSearch) {
                endponit += `?textSearch=` +  textSearch;
            }

            const response = await axios.get(process.env.VUE_APP_API + endponit, config);
            if(!response.data.error) {
                console.log('vendors',response.data.data.data);
                commit('SET_CLIENTS', response.data.data.data)
            }
            else{
                console.log(response);
            }
        }
    }
}
