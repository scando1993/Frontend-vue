const state = {
  clients: {
    showFormClient: false,
    isNewClientFormClient: false,
    formTitle: '',
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
  getFormClientShow: state => state.clients.showFormClient,
  getFormClientNewClient: state => state.clients.isNewClientFormClient,
  getFormTitle: state => state.clients.formTitle,
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
  toggleFormClientShow: state => {
    state.clients.showFormClient = !state.clients.showFormClient;
  },
  setToNewClientForm: state => {
    state.clients.isNewClientFormClient = true;
  },
  unsetNewClientForm: state => {
    state.clients.isNewClientFormClient = false;
  },
  setShowFormClientForm: (state, payload) => {
    state.clients.showFormClient = payload;
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
    commit('setToNewClientForm');
    commit('setFormTitle', 'Agregar Cliente');
    commit('setShowFormClientForm', true);
  },
  showClientForm({ commit }) {
    commit('unsetNewClientForm');
    commit('setFormTitle', 'Cliente');
    commit('setShowFormClientForm', true);
  },
  hideClientForm({ commit }) {
    console.log('en hide');
    commit('setShowFormClientForm', false);
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
