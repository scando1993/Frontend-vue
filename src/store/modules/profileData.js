const axios = require('axios');

export default {
  state: {
      profile: {}
  },
  getters: {
      PROFILE: state => state.profile
  },
  mutations: {
      SET_PROFILE(state, data) {
          state.profile = data;
      }
  },
  actions: {
      GET_PROFILE: async ({commit}) => {
          const config = {
              headers: {'x-authorization': 'Bearer ' + localStorage.getItem('token')}
          };
          const response = await axios.get(process.env.VUE_APP_API + '/Profile/get', config);
          if(!response.data.error) {
              console.log(response.data.data);
              commit('SET_PROFILE', response.data.data);
          }
          else{
              console.log(response);
          }
      }
  }
};
