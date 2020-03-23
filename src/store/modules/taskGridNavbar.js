const state = {
  showFormClient: false,
  isNewClientformClient: false,
  formTitle: ''
};

const getters = {
  getFormClientShow: state => state.showFormClient,
  getFormClientNewClient: state => state.isNewClientformClient,
  getFormTitle: state => state.formTitle,
};
const mutations = {
  setFormTitle: (state, payload) => {
    state.formTitle = payload;
  },
  toggleFormClientShow: state => {
    state.showFormClient = !state.showFormClient;
  },
  setToNewClientForm: state => {
    state.isNewClientformClient = true;
  },
  unsetNewClienteForm: state => {
    state.isNewClientformClient = false;
  },
  setShowFormClientForm: (state, payload) => {
    state.showFormClient = payload;
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
    commit('unsetNewClienteForm');
    commit('setFormTitle', 'Cliente');
    commit('setShowFormClientForm', true);
  },
  hideClientForm({ commit }) {
    console.log('en hide');
    commit('setShowFormClientForm', false);
  }


};



export default {
  state,
  getters,
  actions,
  mutations
};
