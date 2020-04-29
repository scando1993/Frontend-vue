const state = {
  planiVerticalSidebar: {
    isVerticalSidebar: true,
    isVerticalCompact: false,
    isMobileCompact: true
  },
  planiVerticalCompact: {
    isSidebarCompact: false,
    isItemName: false
  },
  showNotifications: false
};

const getters = {
  getPlaniVerticalSidebar: state => state.planiVerticalSidebar,
  getPlaniVerticalCompact: state => state.planiVerticalCompact,
  getShowNotifications: state => state.showNotifications
};

const actions = {
  planiSwitchSidebar({ commit }, data) {
    commit('PLANI_SWITCH_SIDEBAR', data);
  },
  planiSidebarCompact({ commit }, data) {
    commit('PLANI_SIDEBAR_COMPACT', data);
  },
  planiRemoveSidebarCompact({ commit }, data) {
    commit('PLANI_REMOVE_SIDEBAR_COMPACT', data);
  },
  planiMobileSidebar({ commit }, data) {
    commit('PLANI_MOBILE_SIDEBAR', data);
  },
  setShowNotifications({ commit }) {
    commit('unsetShowNotifications');
    commit('setShowNotifications');
  }
};

const mutations = {
  // eslint-disable-next-line no-unused-vars
  PLANI_SWITCH_SIDEBAR(state, data) {
    state.planiVerticalSidebar.isVerticalSidebar = !state.planiVerticalSidebar
      .isVerticalSidebar;
    state.planiVerticalSidebar.isVerticalCompact = !state.planiVerticalSidebar
      .isVerticalCompact;
    console.log('plani switch sidebar');
  },
  // eslint-disable-next-line no-unused-vars
  PLANI_SIDEBAR_COMPACT(state, data) {
    if (state.planiVerticalSidebar.isVerticalSidebar === false) {
      state.planiVerticalCompact.isSidebarCompact = !state.planiVerticalCompact
        .isSidebarCompact;
      state.planiVerticalCompact.isItemName = !state.planiVerticalCompact.isItemName;
    }
    console.log('plani sidebar compact');
  },
  // eslint-disable-next-line no-unused-vars
  PLANI_REMOVE_SIDEBAR_COMPACT(state, data) {
    if (state.planiVerticalCompact.isSidebarCompact === true) {
      state.planiVerticalCompact.isSidebarCompact = !state.planiVerticalCompact
        .isSidebarCompact;
      state.planiVerticalCompact.isItemName = !state.planiVerticalCompact.isItemName;
    }
    console.log('plani remove sidebar');
  },
  // eslint-disable-next-line no-unused-vars
  PLANI_MOBILE_SIDEBAR(state, data) {
    state.planiVerticalSidebar.isMobileCompact = !state.planiVerticalSidebar
      .isMobileCompact;
    console.log('plani mobile sidebar');
  },
  setShowNotifications(state) {
    state.showNotifications = true;
  },
  unsetShowNotifications(state) {
    state.showNotifications = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
