const state = {
  selectedMapView: '',
  selectedComponentView: '',
  showNewTaskModal: false,
  searchText: ''
};

const getters = {
  getSelectedMapView: state => state.selectedMapView,
  getShowNewTaskModal: state => state.showNewTaskModal,
  getSearchText: state => state.searchText,
  getSelectedComponentView: state => state.selectedComponentView
};

const mutations = {
  setSelectedComponentView: (state, data) => {
    state.selectedComponentView = data;
  },
  setSelectedMapView: (state, data) => {
    state.selectedMapView = data;
  },
  setSearchText: (state, data) => {
    state.searchText = data;
  },
  setShowNewTaskModal: (state, data) => {
    state.showNewTaskModal = data;
  }
};

const actions = {
  setSelectedMapView({ commit }, data) {
    commit('setSelectedMapView', data);
  },
  setSearchText({ commit }, data) {
    commit('setSearchText', data);
  },
  setShowNewTaskModal({ commit }, data) {
    console.log('POR AQUI', data);
    commit('setShowNewTaskModal', data);
  },
  setSelectedComponentView({ commit }, data) {
    commit('setSelectedComponentView', data);
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
