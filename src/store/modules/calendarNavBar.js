const state = {
  calendar: {
    selectedMapView: '',
    selectedComponentView: '',
    showNewTaskModal: false,
    searchText: '',
    rangeText: '',
    expired: true,
    now: true,
    soon: true,
    early: true,
    pending: true
  },
};

const getters = {
  getSelectedMapView: state => state.calendar.selectedMapView,
  getShowNewTaskModal: state => state.calendar.showNewTaskModal,
  getSearchText: state => state.calendar.searchText,
  getSelectedComponentView: state => state.calendar.selectedComponentView,
  getRangeText: state => state.calendar.rangeText,
  getExpiredTasks: state => state.calendar.expired,
  getNowTasks: state => state.calendar.now,
  getSoonTasks: state => state.calendar.soon,
  getEarlyTasks: state => state.calendar.early,
  getPendingTasks: state => state.calendar.pending,
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
  },
  toggleExpiredTasks: (state) => {
    state.calendar.expired = !state.calendar.expired;
  },
  toggleNowTasks: (state) => {
    state.calendar.now = !state.calendar.now;
  },
  toggleSoonTasks: (state) => {
    state.calendar.soon = !state.calendar.soon;
  },
  toggleEarlyTasks: (state) => {
    state.calendar.early = !state.calendar.early;
  },
  togglePendingTasks: (state) => {
    state.calendar.pending = !state.calendar.pending;
  },
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
  toggleRangeText({ commit }, data){
    commit('setRangeText', data);
  },
  toggleExpiredTasks({ commit }){
    commit('toggleExpiredTasks');
  },
  toggleNowTasks({ commit }){
    commit('toggleNowTasks');
  },
  toggleSoonTasks({ commit }){
    commit('toggleSoonTasks');
  },
  toggleEarlyTasks({ commit }){
    commit('toggleEarlyTasks');
  },
  togglePendingTasks({ commit }){
    commit('togglePendingTasks');
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
