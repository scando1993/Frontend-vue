export default {
    state: {
        loading: false,
        loadingStack: [],
        errorMessage: false,
        showTutorial: [],
        fullLoaded: true,
    },
    getters: {
        LOADING: state => state.loading,
        LOADINGSTACK: state => state.loadingStack,
        SHOW_TUTOTAL: state => state.showTutorial,
        FULL_LOADED: state => state.fullLoaded
    },
    mutations: {
        SET_LOADING(state, data) {
            state.loading = data;
        },
        SET_LOADING_STACK(state, data) {
            state.loadingStack = data;
        },
        SET_SHOW_TUTORIAL(state, data) {
            state.loadingStack = data;
        },
        SET_FULL_LOADED(state, data) {
            state.fullLoaded = data;
        },
        ADD_LOADING(state, id) {
            state.loadingStack.push(id);
        },
        REMOVE_LOADING(state, id) {
            const index = state.loadingStack.indexOf(id);
            if(index >= 0) {
                state.loadingStack.splice(id, 1);
            }
        },
        CHECK_FULL_LOADED(state) {
            if(state.loadingStack.length > 0) {
                state.fullLoaded = false;
            }
            else {
                state.fullLoaded = true;
            }
        }
    },
    actions: {
        ADD_LOADING_ACTION: ({commit}, id) => {
            commit('ADD_LOADING', id);
            commit('SET_FULL_LOADED', false);
        },
        REMOVE_LOADING_ACTION: ({commit}, id) => {
            commit('REMOVE_LOADING', id);
            commit('CHECK_FULL_LOADED')
        },
        SET_LOADING_ACTION: ({commit}, value) => {
            commit('SET_LOADING', value)
        }
    }
}
