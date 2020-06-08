const axios = require('axios');
const gtag = require('vue-gtag');

export default {
  state: {
    profile: null,
    edit: false
  },
  getters: {
    PROFILE: state => state.profile,
    getEditProfile: state => state.edit
  },
  mutations: {
    SET_PROFILE: (state, data) => {
      state.profile = data;
    },
    toggleEditProfile: (state) => {
      state.edit = !state.edit;
    }
  },
  actions: {
    GET_PROFILE: async ({ commit }) => {
      const config = {
        headers: { 'x-authorization': 'Bearer ' + localStorage.getItem('token') }
      };
      const response = await axios.get(process.env.VUE_APP_API + '/Profile/get', config);
      if (!response.data.error) {
        console.log(response.data.data);
        commit('SET_PROFILE', response.data.data);
      } else {
        console.log(response);
      }
    },
    UPDATE_PROFILE: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        const config = {
          headers: {
            'x-authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
        };
        axios
          .put(process.env.VUE_APP_API + '/Profile/edit', data, config)
          .then(({ data, status }) => {
            console.log(data, status);
            // commit('ADD_CLIENT', data);
            gtag.event('RPOFILE', {
              'event_category': 'UPDATE',
            });
            commit('SET_PROFILE', data.data.data);
            resolve({ data, status });
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    CHANGE_PASSWORD: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        const config = {
          headers: {
            'x-authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
        };
        axios
            .post(process.env.VUE_APP_API + '/Profile/changePassword', data, config)
            .then(({ data, status }) => {
              console.log(data, status);
              // commit('ADD_CLIENT', data);
              gtag.event('PASSWORD', {
                'event_category': 'UPDATE',
              });
              resolve({ data, status });
            })
            .catch(error => {
              reject(error);
            });
      });
    },
    toggleEditProfile: ({ commit }) => {
      commit('toggleEditProfile');
    }
  }
};
