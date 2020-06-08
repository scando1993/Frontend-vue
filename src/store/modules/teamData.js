const axios = require('axios');

const state = {
  team_list: [],
  leave: true,
  invite: true,
  new_admin: true
};
const getters = {
  TEAM: state => state.team_list,
  getLeaveTeam: state => state.leave,
  getInviteTeam: state => state.invite,
  getNewAdminTeam: state => state.new_admin
};
const mutations = {
  SET_TEAM(state, payload) {
    state.team_list = payload;
  },
  toggleLeaveTeam: (state) => {
    state.leave = !state.leave;
  },
  toggleInviteTeam: (state) => {
    state.invite = !state.invite;
  },
  toggleNewAdminTeam: (state) => {
    state.new_admin = !state.new_admin;
  },
  setLeaveTeam: (state, payload) => {
    state.leave = payload
  },
  setInviteTeam: (state, payload) => {
    state.invite = payload
  },
  setNewAdminTeam: (state, payload) => {
    state.new_admin = payload
  }
};
const actions = {
    GET_TEAM: async ({ commit }) => {
      const headers = {
        headers: { 'x-authorization': 'Bearer ' + localStorage.getItem('token') }
      };
      const response = await axios.get(process.env.VUE_APP_API + '/Team/getAll', headers);
      if (!response.data.error) {
        console.log(response.data.data);
        commit('SET_TEAM', response.data.data.data);
      } else {
        console.log(response);
      }
    },
    DELETE_MEMBER: async ({ commit }, vendor_id) => {
      return new Promise((resolve, reject) => {
        const config = {
          headers: {
            'x-authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
        };
        axios
          .delete(process.env.VUE_APP_API + '/Team/delete?vendor_id=' + vendor_id, config)
          .then(({ data, status }) => {
            console.log(data, status);
            // commit('ADD_CLIENT', data);
            resolve({ data, status });
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    INVITE_MEMBER: async ({ commit }, vendor_email) => {
      return new Promise((resolve, reject) => {
        const config = {
          headers: {
            'x-authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
        };
        const data = {vendor_email: vendor_email};
        axios
            .post(process.env.VUE_APP_API + '/Team/sendInvitation' , data, config)
            .then(({data, status}) => {
              console.log(data, status);
              // commit('ADD_CLIENT', data);
              gtag.event('Vendor', {
                'event_category': 'Invitation',
              });
              resolve({data, status});
            })
            .catch(error => {
              reject(error);
            });
      });
    },
    LEAVE_TEAM: async ({ commit }) => {
      return new Promise((resolve, reject) => {
        const config = {
          headers: {
            'x-authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
        };
        axios
            .post(process.env.VUE_APP_API + '/Team/leave' ,null, config)
            .then(({data, status}) => {
              console.log(data, status);
              // commit('ADD_CLIENT', data);
              gtag.event('TEAM', {
                'event_category': 'Leave',
              });
              this.$store.dispatch('signOut');
              resolve({data, status});
            })
            .catch(error => {
              reject(error);
            });
      });
    },
    INVITE_ADMIN: async ({ commit }, vendor_email) => {
      return new Promise((resolve, reject) => {
        const config = {
          headers: {
            'x-authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          },
        };
        const data = {vendor_email: vendor_email};
        axios
            .post(process.env.VUE_APP_API + '/Team/inviteAdmin' , data, config)
            .then(({data, status}) => {
              console.log(data, status);
              // commit('ADD_CLIENT', data);
              gtag.event('ADMIN', {
                'event_category': 'Invitation',
              });
              resolve({data, status});
            })
            .catch(error => {
              reject(error);
            });
      });
    },

  toggleLeaveTeam( { commit }, data ){
    commit('toggleLeaveTeam', data);
  },
  toggleInviteTeam( { commit }, data ){
    commit('toggleInviteTeam', data);
  },
  toggleNewAdminTeam( { commit }, data ){
    commit('toggleNewAdminTeam', data);
  },
  setLeaveTeam: ({ commit }, data) => {
    commit('setLeaveTeam', data);
  },
  setInviteTeam: ({ commit }, data) => {
    commit('setInviteTeam', data);
  },
  setNewAdminTeam: ({ commit }, data) => {
    commit('setNewAdminTeam', data);
  }
};
export default {
  state,
  getters,
  actions,
  mutations
};
