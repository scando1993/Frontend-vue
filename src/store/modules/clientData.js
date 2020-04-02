const axios = require('axios');

export default {
    state: {
        client_list: [],
        vendor_task_list: []
    },
    getters: {
        CLIENTS_LIST: state => state.client_list,
        VENDOR_TASKS: state => state.vendor_task_list
    },
    mutations: {
        SET_CLIENTS(state, payload) {
            state.client_list = payload;
        },
        ADD_CLIENT(state, payload) {
            state.client_list.push(payload);
        },
        SET_VENDOR_TASKS(state, paylodad) {
            console.log('DTA', paylodad)
          state.vendor_task_list = paylodad;
        }
    },
    actions: {
        GET_CLIENTS_LIST: async ({commit}) => {
            const headers = {
                headers: {'x-authorization': 'Bearer ' + localStorage.getItem('token')}
            };
            const response = await axios.get(process.env.VUE_APP_API + '/Client/getAll', headers);
            if (!response.data.error) {
                console.log('clients', response.data.data);
                commit('SET_CLIENTS', response.data.data)
            } else {
                console.log(response);
            }
        },
        GET_CLIENTS_TASK: async ({commit}) => {
            const headers = {
                headers: {'x-authorization': 'Bearer ' + localStorage.getItem('token')}
        };
            const response = await axios.get(process.env.VUE_APP_API + '/Vendor/getClientsAndTasks', headers);
            if(!response.data.error) {
                console.log(response.data.data);
                commit('SET_VENDOR_TASKS', response.data.data.data)
            }
            else{
                console.log(response);
            }
        },
        POST_CLIENT: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                const config = {
                    headers: {'x-authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'},
                };
                axios
                    .post(process.env.VUE_APP_API + '/Client/create', data, config)
                    .then(({data, status}) => {
                        console.log(data, status);
                        // commit('ADD_CLIENT', data);
                        resolve({data, status});
                    })
                    .catch( error => {
                        reject(error);
                    })
            })
        },
        SET_CLIENT_VENDOR: ({commit}, data) => {
            const config = {
                headers: {'x-authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'},
            };
            console.log('in set vendor')
            axios
                .post(process.env.VUE_APP_API + '/Client/setVendor', data, config)
                .then(({data, status}) => {
                    console.log(data, status);
                    resolve({data, status});
                })
                .catch( error => {
                    reject(error);
                })
        },
        DELETE_CLIENT: ({commit}, client_id) => {
            const config = {
                headers: {'x-authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'},
            };
            console.log('in set vendor')
            axios
                .delete(process.env.VUE_APP_API + '/Client/delete?client_id=' + client_id, config)
                .then(({data, status}) => {
                    console.log(data, status);
                    resolve({data, status});
                })
                .catch( error => {
                    reject(error);
                })
        },
        UPDATE_CLIENT: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                const config = {
                    headers: {'x-authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'},
                };
                axios
                    .post(process.env.VUE_APP_API + '/Client/update', data, config)
                    .then(({data, status}) => {
                        console.log(data, status);
                        // commit('ADD_CLIENT', data);
                        resolve({data, status});
                    })
                    .catch( error => {
                        reject(error);
                    })
            })
        }

    }
}
