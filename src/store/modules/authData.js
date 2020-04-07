import firebase from 'firebase/app';
import 'firebase/auth';
const axios = require('axios');
var jwtDecode = require('jwt-decode');

export default {
  state: {
    loggedInUser:
      localStorage.getItem('userInfo') != null
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    loading: false,
    error: null,
      loggedUserScope: null,
      loggedUserEmail: null
  },
  getters: {
      loggedUserEmail: state => state.loggedUserEmail,
    loggedInUser: state => state.loggedInUser,
    loading: state => state.loading,
    error: state => state.error,
      loggedUserScope: state => state.loggedUserScope
  },
  mutations: {
      setLoggedUserEmail(state, data) {
          state.loggedUserEmail = data;
      },
      setUserScope(state, data) {
          state.loggedUserScope = data;
      },
    setUser(state, data) {
      state.loggedInUser = data;
      state.loading = false;
      state.error = null;
    },
    setLogout(state) {
      state.loggedInUser = null;
      state.loading = false;
      state.error = null;
      // this.$router.go("/");
    },
    setLoading(state, data) {
      state.loading = data;
      state.error = null;
    },
    setError(state, data) {
      state.error = data;
      state.loggedInUser = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    login({ commit }, data) {
      commit('clearError');
      commit('setLoading', true);
      const url = process.env.VUE_APP_API + '/Account/login';
      const body = {
        email: data.email,
        password: data.password
      };

      axios.post(url, body)
        .then(function (response) {
          response = response.data;
          console.log(response);
          const token = response.data.token;
          const refreshToken = response.data.refreshToken;
          const tokenDecoded = jwtDecode(token);
          const userId = tokenDecoded['userId'];
          const scope = response.data.scope;


            const newUser = { uid: userId, scope: scope };


            localStorage.setItem('userInfo', JSON.stringify(newUser));
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          commit('setUserScope', scope);
          commit('setUser', newUser);
          commit('setLoggedUserEmail', data.email);
        })
        .catch(function (error) {
          localStorage.removeItem('userInfo');
          commit('setError', error);
        });

      /*
      if (data.email === 'test@plani.org'){
        const newUser = { uid: 'bUEBs7FOK1bAr6bSVsKdfKiBg2c2', admin: false };
        console.log(newUser);
        localStorage.setItem('userInfo', JSON.stringify(newUser));
        commit('setUser', { uid: 'bUEBs7FOK1bAr6bSVsKdfKiBg2c2' });
        console.log('user');
      }else if(data.email === 'admin@plani.org'){
        const newUser = { uid: 'bUEBs7FOK1bAr6bSVsKdfKiBg2c2', admin: true };
        console.log(newUser);
        localStorage.setItem('userInfo', JSON.stringify(newUser));
        commit('setUser', { uid: 'bUEBs7FOK1bAr6bSVsKdfKiBg2c2' });
        console.log('user');
      }else {
        localStorage.removeItem('userInfo');
        commit('setError', { code: 1, message: '' });
      }
      *//*
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(user => {
          const newUser = {uid: user.user.uid};
          localStorage.setItem("userInfo", JSON.stringify(newUser));
          commit("setUser", {uid: user.user.uid});
          console.log("user");
        })
        .catch(function(error) {
          // Handle Errors here.
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // console.log(error);
          localStorage.removeItem("userInfo");
          commit("setError", error);
          // ...
        });
        */
    },

    signUserUp({ commit }, data) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(user => {
          commit('setLoading', false);

          const newUser = {
            uid: user.user.uid
          };
          console.log(newUser);
          localStorage.setItem('userInfo', JSON.stringify(newUser));
          commit('setUser', newUser);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          localStorage.removeItem('userInfo');
          console.log(error);
        });
    },
    signOut({ commit }) {
      // localStorage.removeItem('userInfo');
      // commit('setLogout');
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            localStorage.removeItem('userInfo');
            commit('setLogout');
          },
          _error => {
            console.log(_error);
          }
        );
    }
  }
};
