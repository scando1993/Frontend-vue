import BootstrapVue from 'bootstrap-vue';
// import vuePerfectScrollbar from "vue-perfect-scrollbar";
// import SmartTable from "vuejs-smart-table";
import VueTagsInput from '@johmun/vue-tags-input';
import VueTheMask from 'vue-the-mask';
import Vuelidate from 'vuelidate';
import VueFormWizard from 'vue-form-wizard';
import VueLazyload from 'vue-lazyload';
// import VCalendar from "v-calendar";
import VueGoodTablePlugin from 'vue-good-table';
// import VueSlider from "vue-slider-component";
import Meta from 'vue-meta';
import FlagIcon from 'vue-flag-icon';
import '@/assets/styles/sass/theme.scss';
import '@/plugins/echarts';
import '@/plugins/apexChart.js';
import '@/plugins/sweetalert2.js';
import '@/plugins/tour.js';

import vBlur from 'v-blur';
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

const moment = require('moment');
import VueMoment from 'vue-moment';

require('moment/locale/es');
moment.locale('es');

// locale.use(lang);
export default {
  install(Vue) {
    Vue.use(BootstrapVue);
    Vue.use(VueMoment, { moment });
    Vue.use(vBlur);

    Vue.component('ValidationProvider', ValidationProvider);
    Vue.component('ValidationObserver', ValidationObserver);
    extend('required', required);

    Vue.component(
      'large-sidebar',
      // The `import` function returns a Promise.
      () => import('../containers/layouts/largeSidebar')
    );

    Vue.component(
      'compact-sidebar',
      // The `import` function returns a Promise.
      () => import('../containers/layouts/compactSidebar')
    );
    Vue.component(
      'vertical-sidebar',
      // The `import` function returns a Promise.
      () => import('../containers/layouts/verticalSidebar')
    );
    Vue.component(
      'plani-vertical-sidebar',
      // The `import` function returns a Promise.
      () => import('../containers/layouts/planiVerticalSidebar')
    );
    Vue.component(
      'customizer',
      // The `import` function returns a Promise.
      () => import('../components/common/customizer.vue')
    );
    Vue.component('vue-perfect-scrollbar', () =>
      import('vue-perfect-scrollbar')
    );
    // Vue.component(VueCropper);
    Vue.use(Meta, {
      keyName: 'metaInfo',
      attribute: 'data-vue-meta',
      ssrAttribute: 'data-vue-meta-server-rendered',
      tagIDKeyName: 'vmid',
      refreshOnceOnNavigation: true
    });

    Vue.use(FlagIcon);
    // vueslider
    // Vue.component("VueSlider", () => import("vue-slider-component"));
    //vuelidate
    Vue.use(Vuelidate);
    // maskForm
    Vue.use(VueTheMask);
    //form wizard globally

    Vue.use(VueFormWizard);

    // tags input plugin
    Vue.use(VueTagsInput);

    // smart table plugin
    // Vue.use(SmartTable);

    // vue-good-table

    // import the styles

    Vue.use(VueGoodTablePlugin);

    // import VueCropper from "./plugins/imageCropper";


    // Use v-calendar & v-date-picker components
    // Vue.use(VCalendar, {
    //   componentPrefix: "v" // Use <vc-calendar /> instead of <v-calendar />
    //   // ...other defaults
    // });

    Vue.use(VueLazyload, {
      observer: true,
      // optional
      observerOptions: {
        rootMargin: '0px',
        threshold: 0.1
      }
    });
  }
};
