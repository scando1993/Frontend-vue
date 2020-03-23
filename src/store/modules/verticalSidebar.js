const state = {
  verticalSidebar: {
    isVerticalSidebar: true,
    isVerticalCompact: false,
    isMobileCompact: true
  },
  verticalCompact: {
    isSidebarCompact: false,
    isItemName: false
  }
};

const getters = {
  getVerticalSidebar: state => state.verticalSidebar,
  getVerticalCompact: state => state.verticalCompact
};

const actions = {
  switchSidebar({ commit }, data) {
    commit('SWITCH_SIDEBAR', data);
  },
  sidebarCompact({ commit }, data) {
    commit('SIDEBAR_COMPACT', data);
  },
  removeSidebarCompact({ commit }, data) {
    commit('REMOVE_SIDEBAR_COMPACT', data);
  },
  mobileSidebar({ commit }, data) {
    commit('MOBILE_SIDEBAR', data);
  }
};

const mutations = {
  // eslint-disable-next-line no-unused-vars
  SWITCH_SIDEBAR(state, data) {
    state.verticalSidebar.isVerticalSidebar = !state.verticalSidebar
      .isVerticalSidebar;
    state.verticalSidebar.isVerticalCompact = !state.verticalSidebar
      .isVerticalCompact;
    console.log('test');
  },
  // eslint-disable-next-line no-unused-vars
  SIDEBAR_COMPACT(state, data) {
    if (state.verticalSidebar.isVerticalSidebar === false) {
      state.verticalCompact.isSidebarCompact = !state.verticalCompact
        .isSidebarCompact;
      state.verticalCompact.isItemName = !state.verticalCompact.isItemName;
    }
    console.log('test');
  },
  // eslint-disable-next-line no-unused-vars
  REMOVE_SIDEBAR_COMPACT(state, data) {
    if (state.verticalCompact.isSidebarCompact === true) {
      state.verticalCompact.isSidebarCompact = !state.verticalCompact
        .isSidebarCompact;
      state.verticalCompact.isItemName = !state.verticalCompact.isItemName;
    }
  },
  // eslint-disable-next-line no-unused-vars
  MOBILE_SIDEBAR(state, data) {
    state.verticalSidebar.isMobileCompact = !state.verticalSidebar
      .isMobileCompact;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
