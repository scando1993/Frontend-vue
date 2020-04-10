import Vuex from 'vuex';
import Vue from 'vue';
import largeSidebar from './modules/largeSidebar';
import compactSidebar from './modules/compactSidebar';
import chat from './modules/chat';
import config from './modules/config';
import authData from './modules/authData';
import invoice from './modules/invoice';
import cart from './modules/cart';
import verticalSidebar from './modules/verticalSidebar';
import scrumboard from './modules/scrumboard';
import taskGridNavbar from './modules/taskGridNavbar';
import planiVerticalSidebar from './modules/planiVerticalSidebar';
import calendarNavbar from './modules/calendarNavBar';
import clientData from './modules/clientData'
import teamData from './modules/teamData';
import profileData from './modules/profileData';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    largeSidebar,
    compactSidebar,
    chat,
    config,
    authData,
    invoice,
    cart,
    verticalSidebar,
    scrumboard,
    planiVerticalSidebar,
    calendarNavbar,
    taskGridNavbar,
    clientData,
    teamData
    clientData,
    profileData
  }
});
