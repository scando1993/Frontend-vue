const state = {
  calendar: {
    selectedMapView: '',
    selectedComponentView: '',
    showNewTaskModal: false,
    searchText: '',
    rangeText: ''
  },
};

const getters = {
  getSelectedMapView: state => state.calendar.selectedMapView,
  getShowNewTaskModal: state => state.calendar.showNewTaskModal,
  getSearchText: state => state.calendar.searchText,
  getSelectedComponentView: state => state.calendar.selectedComponentView,
  getRangeText: state => state.calendar.rangeText
};

const mutations = {
  setSelectedComponentView: (state, data) => {
    state.calendar.selectedComponentView = data;
  },
  setSelectedMapView: (state, data) => {
    state.calendar.selectedMapView = data;
  },
  setSearchText: (state, data) => {
    state.calendar.searchText = data;
  },
  setShowNewTaskModal: (state, data) => {
    state.calendar.showNewTaskModal = data;
  },
  setRangeText: (state, data) => {
  	state.calendar.rangeText = data;
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
  },
  setRangeText({ commit }, data){
  	commit('setRangeText', data);
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
