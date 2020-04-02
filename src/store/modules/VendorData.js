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
    }
}
