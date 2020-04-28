const axios = require('axios');

export default {
    state: {
        tasks_priority_report: {},
        tasks_type_report: {},
        client_report: {}
    },
    getters: {
        TASKS_PRIORITY_REPORT: state => state.tasks_priority_report,
        TASKS_TYPE_REPORT: state => state.tasks_type_report,
        CLIENT_REPORT: state => state.client_report,

    },
    mutations: {
        SET_TASKS_PRIORITY_REPORT(state, data) {
            state.tasks_priority_report = data;
        },
        SET_TASKS_TYPE_REPORT(state, data) {
            state.tasks_type_report = data;
        },
        SET_CLIENT_REPORT(state, data) {
            state.client_report = data;
        }
    },
    actions: {
        GET_TASKS_PRIORITY_REPORT: async ({ commit }) => {
            const config = {
                headers: { 'x-authorization': 'Bearer ' + localStorage.getItem('token') }
            };
            const response = await axios.get(process.env.VUE_APP_API + '/Report/getPriorityTaskReport', config);
            if (!response.data.error) {
                console.log(response.data.data);
                commit('SET_TASKS_PRIORITY_REPORT', response.data.data);
            } else {
                console.log(response);
            }
        },
        GET_TASKS_TYPE_REPORT: async ({ commit }) => {
            const config = {
                headers: { 'x-authorization': 'Bearer ' + localStorage.getItem('token') }
            };
            const response = await axios.get(process.env.VUE_APP_API + '/Report/getTypeTaskReport', config);
            if (!response.data.error) {
                console.log(response.data.data);
                commit('SET_TASKS_TYPE_REPORT', response.data.data);
            } else {
                console.log(response);
            }
        },
        GET_CLIENT_REPORT: async ({ commit }) => {
            const config = {
                headers: { 'x-authorization': 'Bearer ' + localStorage.getItem('token') }
            };
            const response = await axios.get(process.env.VUE_APP_API + '/Report/getClientsReport', config);
            if (!response.data.error) {
                console.log(response.data.data);
                commit('SET_CLIENT_REPORT', response.data.data);
            } else {
                console.log(response);
            }
        },
    }
};
