const axios = require('axios');
export default {
    state: {
        team_list: []
    },
    getters: {
        TEAM: state => state.team_list
    },
    mutations: {
        SET_TEAM(state, payload) {
            state.team_list = payload;
        }
    },
    actions: {
        GET_TEAM: async ({commit}) => {
            const headers = {
                headers: {'x-authorization': 'Bearer ' + localStorage.getItem('token')}
            };
            const response = await axios.get(process.env.VUE_APP_API + '/Vendor/getAll', headers);
            if (!response.data.error) {
                console.log(response.data.data);
                commit('SET_TEAM', response.data.data.data)
            } else {
                console.log(response);
            }
        },
        DELETE_MEMBER: async ({commit}, vendor_id) => {
            return new Promise((resolve, reject) => {
                const config = {
                    headers: {'x-authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'},
                };
                axios
                    .post(process.env.VUE_APP_API + '/Vendor/delete?vendorID=' + vendor_id, data, config)
                    .then(({data, status}) => {
                        console.log(data, status);
                        // commit('ADD_CLIENT', data);
                        resolve({data, status});
                    })
                    .catch( error => {
                        reject(error);
                    });
            })
        }
    },

}
