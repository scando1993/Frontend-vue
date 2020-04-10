const axios = require('axios');
export default {
    state: {
        tasks_list: []
    },
    getters: {
        TASKS_LIST: state => state.tasks_list
    },
    mutations: {
        SET_TASK_LIST(state, payload) {
            state.tasks_list = payload;
        }
    },
    actions: {
        GET_TASKS_LIST: async ({commit}) => {
            const config = {
                headers: {'x-authorization': 'Bearer ' + localStorage.getItem('token')}
            };
            const response = await axios.get(process.env.VUE_APP_API + '/Task/getAll?limit=1000&textSearch=', config);
            if (!response.data.error) {
                console.log('tasks list', response.data.data.data);
                commit('SET_TASK_LIST', response.data.data.data)
            } else {
                console.log(response);
            }
        },
        POST_TASK: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                const config = {
                    headers: {'x-authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'},
                };
                axios
                    .post(process.env.VUE_APP_API + '/Task/create', data, config)
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
        DELETE_TASK: ({commit}, task_id) => {
            return new Promise((resolve, reject) => {
                const config = {
                    headers: {
                        'x-authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                };
                console.log('in set vendor')
                axios
                    .delete(process.env.VUE_APP_API + '/Task/delete?task_id=' + task_id, config)
                    .then(({data, status}) => {
                        console.log(data, status);
                        resolve({data, status});
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        },
        UPDATE_TASK: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                const config = {
                    headers: {
                        'x-authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                };
                const {task_id, data} = payload;

                console.log('in set vendor');
                axios
                    .put(process.env.VUE_APP_API + '/Task/edit?task_id=' + task_id, data, config)
                    .then(({data, status}) => {
                        console.log(data, status);
                        resolve({data, status});
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        },

    }
}
