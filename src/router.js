import Vue from 'vue';
import store from './store';
// import {isMobile} from "mobile-device-detect";
import Router from 'vue-router';
import NProgress from 'nprogress';
import authenticate from './auth/authenticate';

Vue.use(Router);

// create new router

const routes = [
  {
    path: '/',
    component: () => import('./views/app'), //webpackChunkName app
    beforeEnter: authenticate,
    redirect: '/app/calendar/calendar.dashboard.v1',

    children: [
      {
        path: '/app/calendar',
        component: () => import('./views/app/calendar'), //dashboard
        children: [
          {
            path: 'calendar.dashboard.v1',
            component: () => import('./views/app/calendar/calendar.dashboard.v1')
          },
        ]
      },
      {
        path: '/app/reports',
        component: () => import('./views/app/report'),
        children: [
          {
            path: '',
            component: () => import('./views/app/report/report')
          }
        ]
      },
      {
        path: '/app/taskGrid',
        component: () => import('./views/app/taskGrid'),
        children: [
          {
            path: '',
            component: () => import('./views/app/taskGrid/taskGrid')
          }
        ]
      },
      {
        path: '/app/monitor',
        component: () => import('./views/app/monitor'),
        children: [
          {
            path: '',
            component: () => import('./views/app/monitor/monitor')
          }
        ]
      },
      {
        path: '/app/profile',
        component: () => import('./views/app/profile'),
        children: [
          {
            path: '',
            component: () => import('./views/app/profile/profile')
          }
        ]
      },
      {
        path: '/app/team',
        component: () => import('./views/app/team'),
        children: [
          {
            path: '',
            component: () => import('./views/app/team/team')
          }
        ]
      },

    ]
  },
  // sessions
  {
    path: '/app/sessions',
    component: () => import('./views/app/sessions'),
    redirect: '/app/sessions/signIn',
    children: [
      {
        path: 'signIn',
        component: () => import('./views/app/sessions/signIn')
      },
      {
        path: 'signUp',
        component: () => import('./views/app/sessions/signUp')
      },
      {
        path: 'forgot',
        component: () => import('./views/app/sessions/forgot')
      }
    ]
  },

  {
    path: '/vertical-sidebar',
    component: () => import('./containers/layouts/verticalSidebar')
  },
  {
    path: '/plani-vertical-sidebar',
    component: () => import('./containers/layouts/planiVerticalSidebar')
  },
  {
    path: '*',
    component: () => import('./views/app/pages/notFound')
  }
];

const router = new Router({
  mode: 'history',
  linkActiveClass: 'open',
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  // If this isn't an initial page load.
  if (to.path) {
    // Start the route progress bar.

    NProgress.start();
    NProgress.set(0.1);
  }
  next();
});

router.afterEach(() => {
  // Remove initial loading
  const gullPreLoading = document.getElementById('loading_wrap');
  if (gullPreLoading) {
    gullPreLoading.style.display = 'none';
  }
  // Complete the animation of the route progress bar.
  setTimeout(() => NProgress.done(), 500);
  // NProgress.done();
  // if (isMobile) {
  if (window.innerWidth <= 1200) {
    // console.log("mobile");
    store.dispatch('changeSidebarProperties');
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch('changeSecondarySidebarProperties');
    }

    if (store.getters.getCompactSideBarToggleProperties.isSideNavOpen) {
      store.dispatch('changeCompactSidebarProperties');
    }
  } else {
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch('changeSecondarySidebarProperties');
    }

    // store.state.sidebarToggleProperties.isSecondarySideNavOpen = false;
  }
});

export default router;
