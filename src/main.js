// import "babel-polyfill";
import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import VueRouter from "vue-router";
import GullKit from './plugins/gull.kit';
// import "babel-polyfill";
// import es6Promise from "es6-promise";
// es6Promise.polyfill();
import store from './store';
import Breadcumb from './components/breadcumb';
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseSettings } from '@/data/config';
import i18n from './lang/lang';
import 'vue-material-design-icons/styles.css';
import VModal from 'vue-js-modal';
import FunctionalCalendar from 'vue-functional-calendar';
import { Icon }  from 'leaflet';
import 'leaflet/dist/leaflet.css';
import VueTimepicker from 'vue2-timepicker';
import 'vue-search-select/dist/VueSearchSelect.css'

import axios from 'axios';
import { Promise } from "es6-promise";


Vue.use(FunctionalCalendar, {
  dayNames: ['L', 'M', 'Mi', 'J', 'V', 'S', 'D']
});

Vue.use(VModal);

//leaflet configuration
// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


import VueDragula  from 'vue-dragula';

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

Vue.component('breadcumb', Breadcumb);
// Vue.use(VueRouter);

Vue.use(GullKit);
Vue.use(VueDragula);
firebase.initializeApp(firebaseSettings);

Vue.config.productionTip = false;


axios.interceptors.response.use( (response) => {
    // Return a successful response back to the calling service
    return response;
  }, (error) => {
    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    // Logout user if token refresh didn't work or user is disabled
    if (error.config.url == process.env.VUE_APP_API + '/Account/refreshToken') {

      store.dispatch('signOut');
      router.push('/app/sessions/signIn');


        return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    // Try request again with new token
    return store.dispatch('refreshToken')
        .then((data) => {
          const { token } = data.data.data;

          // New request with new token
          const config = error.config;
          config.headers['x-authorization'] = `Bearer ${token}`;

          return new Promise((resolve, reject) => {
            axios.request(config).then(response => {
              resolve(response);
            }).catch((error) => {
              reject(error);
            })
          });

        })
        .catch((error) => {
          Promise.reject(error);
        });
  });

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
