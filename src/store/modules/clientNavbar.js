const state = {
  clients: {
    showClientForm: false,
    isNewClientForm: false,
    formTitle: '',
    client_id: '',
    searchFilter: '',
    groupBy: '',
    clients_filters: {
      active: true,
      inactive: true,
      not_contact: true
    }
  }
};

const getters = {
  getShowClientForm: state => state.clients.showClientForm,
  getNewClientForm: state => state.clients.isNewClientForm,
  getFormTitle: state => state.clients.formTitle,
  getFormClientId: state => state.clients.client_id,
  getSearchText: state => state.clients.searchFilter,
  getActiveClients: state => state.clients.clients_filters.active,
  getInactiveClients: state => state.clients.clients_filters.inactive,
  getNotContactClients: state => state.clients.clients_filters.not_contact,
  getGroupByFilter: state => state.clients.groupBy
};

const mutations = {
  setFormTitle: (state, payload) => {
    state.clients.formTitle = payload;
  },
  setFormClientId: (state, payload) => {
    state.clients.client_id = payload;
  },
  setShowClientForm: state => {
    state.clients.showClientForm = true;
  },
  setNewClientForm: state => {
    state.clients.isNewClientForm = true;
  },
  unsetShowClientForm: state => {
    state.clients.showClientForm = false;
  },
  unsetNewClientForm: state => {
    state.clients.isNewClientForm = false;
  },
  setSearchText: (state, payload) => {
    state.clients.searchFilter = payload;
  },
  toggleActiveClients: () => {
    state.clients.clients_filters.active = !state.clients.clients_filters.active;
  },
  toggleInactiveClients: () => {
    state.clients.clients_filters.inactive = !state.clients.clients_filters.inactive;
  },
  toggleNotContactClients: () => {
    state.clients.clients_filters.not_contact = !state.clients.clients_filters.not_contact;
  },
  setGroupByFilter: (state, payload) => {
    state.clients.groupBy = payload;
  }
};
const actions = {
  changeShowFormClient({ commit }) {
    commit('toggleFormClientShow');
  },
  showNewClientForm({ commit }) {
    commit('setNewClientForm');
    commit('setFormTitle', 'Agregar Cliente');
    commit('setFormClientId', '');
    commit('setShowClientForm');
  },
  showClientForm({ commit }, data ) {
    commit('unsetNewClientForm');
    commit('unsetShowClientForm');
    commit('setFormTitle', 'Cliente');
    commit('setFormClientId', data);
    commit('setShowClientForm');
  },
  hideClientForm({ commit }) {
    commit('unsetShowClientForm');
    commit('unsetNewClientForm');
  },
  setFormClientId( { commit }, data ){
    commit('setFormClientId', data);
  },
  setSearchText( { commit }, data ){
    console.log(data);
    commit('setSearchText', data);
  },
  toggleActiveClients( { commit }, data ){
    commit('toggleActiveClients', data);
  },
  toggleInactiveClients( { commit }, data ){
    commit('toggleInactiveClients', data);
  },
  toggleNotContactClients( { commit }, data ){
    commit('toggleNotContactClients', data);
  },
  currentGroupByFilter( { commit }, data ){
    commit('setGroupByFilter', data);
  }
};



export default {
  state,
  getters,
  actions,
  mutations
};