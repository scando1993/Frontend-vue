// main.js
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import theme from '@/assets/styles/sass/_export.scss';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

const options = {
  confirmButtonColor: theme.success,
  cancelButtonColor: theme.danger
};
 
Vue.use(VueSweetalert2, options);
