const moment = require('moment');

const state = {
  reports:{
    generatePDF: false,
    currentDate: moment(new Date().getTime()).format('DD MMMM'),
    startDate: moment(new Date().getTime()),
    endDate: moment(new Date().getTime()),
    sendEmail: false,
    selectedFilter: 'day'
  }
};
const getters = {
  getGeneratePDF: state => state.reports.generatePDF,
  getStartDate: state => state.reports.startDate,
  getEndDate: state => state.reports.endDate,
  getSendEmail: state => state.reports.sendEmail,
  getCurrentDate: state => state.reports.currentDate,
  getSelectedFilter: state => state.reports.selectedFilter
};
const mutations = {
  setGeneratePDF: (state, data) => {
    state.reports.generatePDF = data;
  },
  unsetGeneratePDF: (state, data) => {
    state.reports.generatePDF = data;
  },
  setSendEmail: (state, data) => {
    state.reports.sendEmail = data;
  },
  unsetSendEmail: (state, data) => {
    state.reports.sendEmail = data;
  },
  setStartDate: (state, data) => {
    state.reports.startDate = data;
  },
  setEndDate: (state, data) => {
    state.reports.endDate = data;
  },
  setCurrentDate: (state, data) => {
    state.reports.currentDate = data;
  },
  setSelectedFilter: (state, data) => {
    state.reports.selectedFilter = data;
  },
};
const actions = {
  toggleGeneratePDF({ commit }){
    commit('setGeneratePDF', true);
    commit('unsetGeneratePDF', false);
  },
  toggleSendEmail({ commit }){
    commit('setSendEmail', true);
    commit('unsetSendEmail', false);
  },
  toggleNextCalendar({ commit }){
    let filter = state.reports.selectedFilter;
    switch ( filter ) {
    case 'day': {
      let currentDate = moment(state.reports.currentDate, 'DD MMMM').add(1, 'days');
      commit('setStartDate', currentDate);
      commit('setEndDate', currentDate);
      commit('setCurrentDate', currentDate.format('DD MMMM'));
    }break;
    case 'week': {
      let currentDate = state.reports.currentDate.split(' - ');
      let monday = moment(currentDate[0], 'DD MMMM').add(8, 'days').isoWeekday(1);
      let sunday  = monday.clone().add(7,'days').isoWeekday(0);
      commit('setStartDate', monday);
      commit('setEndDate', sunday);
      commit('setCurrentDate', [monday.format('DD MMMM'), sunday.format('DD MMMM')].join(' - '));
    }break;
    case 'month': {
      let currentDate = moment(state.reports.currentDate, 'MMMM').add(1, 'month');
      commit('setStartDate', currentDate);
      commit('setEndDate', currentDate);
      commit('setCurrentDate', currentDate.format('MMMM'));
    }break;
    default: {
    }
    }
  },
  togglePrevCalendar({ commit, state }){
    switch ( state.reports.selectedFilter ) {
    case 'day': {
      let currentDate = moment(state.reports.currentDate, 'DD MMMM').subtract(1, 'days');
      commit('setStartDate', currentDate);
      commit('setEndDate', currentDate);
      commit('setCurrentDate', currentDate.format('DD MMMM'));
    }break;
    case 'week': {
      let currentDate = state.reports.currentDate.split(' - ');
      let monday = moment(currentDate[0], 'DD MMMM').subtract(6, 'days').isoWeekday(1);
      let sunday  = monday.clone().add(7,'days').isoWeekday(0);
      commit('setStartDate', monday);
      commit('setEndDate', sunday);
      commit('setCurrentDate', [monday.format('DD MMMM'), sunday.format('DD MMMM')].join(' - '));
    }break;
    case 'month': {
      let currentDate = moment(state.reports.currentDate, 'MMMM').subtract(1, 'month');
      commit('setStartDate', currentDate);
      commit('setEndDate', currentDate);
      commit('setCurrentDate', currentDate.format('MMMM'));
    }break;
    default: {
    }
    }
  },
  setSelectedCurrentView({ commit }, data){
    switch ( data ) {
    case 'day': {
      let currentDate = moment();
      commit('setCurrentDate', currentDate.format('DD MMMM'));
      commit('setSelectedFilter', data);
    }break;
    case 'week': {
      let currentDate = moment();
      let monday = currentDate.clone().isoWeekday(1);
      let sunday  = currentDate.clone().add(7,'days').isoWeekday(0);
      commit('setStartDate', monday);
      commit('setEndDate', sunday);
      commit('setCurrentDate', [monday.format('DD MMMM'), sunday.format('DD MMMM')].join(' - '));
      commit('setSelectedFilter', data);
    }break;
    case 'month': {
      let currentDate = moment();
      commit('setCurrentDate', currentDate.format('MMMM'));
      commit('setSelectedFilter', data);
    }break;
    default: {
      commit('setSelectedFilter', data);
    }
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
