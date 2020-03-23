<template>
    <div class="mb-30">
        <header class="main-header vertical-header bg-white d-flex justify-content-between">
            <div class="menu-toggle vertical-toggle" @click="planiMobileSidebar">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="header-toggle">
                <i
                        class="i-Add-UserStar mr-3 text-20 cursor-pointer"
                        v-b-tooltip.hover
                        title="User"
                ></i>
                <i
                        class="i-Speach-Bubble-3 mr-3 text-20 cursor-pointer"
                        v-b-tooltip.hover
                        title="Chat"
                ></i>
                <i
                        class="i-Email mr-3 text-20 cursor-pointer"
                        v-b-tooltip.hover
                        title="Inbox"
                ></i>
                <i
                        class="i-Calendar-4 mr-3 text-20 cursor-pointer"
                        v-b-tooltip.hover
                        title="Calendar"
                ></i>
                <i
                        class="i-Checkout-Basket mr-3 text-20 cursor-pointer"
                        v-b-tooltip.hover
                        title="Cart"
                ></i>
            </div>
            <div class="dropdown">
                <b-dropdown
                        id="dropdownMenu-calendarType"
                        left
                        text="Right align"
                        class="m-md-2"
                        data-toggle="dropdown"
                        toggle-class="text-decoration-none"
                        lazy
                        variant="outline-"
                >
                    <template slot="button-content">
                        <i id="calendarTypeIcon" class="bx bx-calendar-alt"></i>
                        <span id="calendarTypeName">Dropdown</span>
                    </template>
                    <!-- Event dropdown -->
                    <vue-perfect-scrollbar
                            :settings="{ suppressScrollX: true, wheelPropagation: false }"
                            :class="{ open: getSideBarToggleProperties.isSideNavOpen }"
                            ref="myData"
                            class="dropdown-menu-left rtl-ps-none ps scroll"
                    >
                        <b-dropdown-item>
                            <a class="dropdown-menu-title dropdown-item" role="menuitem" data-action="toggle-daily">
                                <i class="bx bx-calendar-alt mr-50"></i>
                                <span>Daily</span>
                            </a>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <a class="dropdown-menu-title dropdown-item" role="menuitem" data-action="toggle-weekly">
                                <i class='bx bx-calendar-event mr-50'></i>
                                <span>Weekly</span>
                            </a>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <a class="dropdown-menu-title dropdown-item" role="menuitem" data-action="toggle-monthly">
                                <i class="bx bx-calendar mr-50"></i>
                                <span>Month</span>
                            </a>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <a class="dropdown-menu-title dropdown-item" role="menuitem" data-action="toggle-weeks2">
                                <i class='bx bx-calendar-check mr-50'></i>
                                <span>2 weeks</span>
                            </a>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <a class="dropdown-menu-title dropdown-item" role="menuitem" data-action="toggle-weeks3">
                                <i class='bx bx-calendar-check mr-50'></i>
                                <span>3 weeks</span>
                            </a>
                        </b-dropdown-item>
                        <b-dropdown-divider/>
                        <b-dropdown-item>
                            <div role="menuitem" data-action="toggle-workweek" class="dropdown-item">
                                <input type="checkbox" class="tui-full-calendar-checkbox-square" value="toggle-workweek" checked>
                                <span class="checkbox-title bg-primary"></span>
                                <span>Show weekends</span>
                            </div>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <div role="menuitem" data-action="toggle-start-day-1" class="dropdown-item">
                                <input type="checkbox" class="tui-full-calendar-checkbox-square" value="toggle-start-day-1">
                                <span class="checkbox-title"></span>
                                <span>Start Week on Monday</span>
                            </div>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <div role="menuitem" data-action="toggle-narrow-weekend" class="dropdown-item">
                                <input type="checkbox" class="tui-full-calendar-checkbox-square" value="toggle-narrow-weekend">
                                <span class="checkbox-title"></span>
                                <span>Narrower than weekdays</span>
                            </div>
                        </b-dropdown-item>
                        <!-- <div class="dropdown-menu-right rtl-ps-none notification-dropdown"> -->
                        <!-- </div> -->
                    </vue-perfect-scrollbar>
                </b-dropdown>
            </div>
            <div style="margin: auto"></div>

            <div class="header-part-right">
                <!-- Full screen toggle -->
                <i
                        class="i-Full-Screen header-icon d-none d-sm-inline-block"
                        @click="handleFullScreen"
                ></i>
                <!-- <i class="i-Full-Screen header-icon d-none d-sm-inline-block" data-fullscreen></i> -->
                <button id="btn-new-schedule" class="mr-1 btn btn-outline-warning m-md-2 navbar-new-schedule-btn" style="font-size: 0.85em; white-space: nowrap">Nueva Tarea</button>
                <input class="form-control input m-md-2" type="text" placeholder="Explore Frest..." tabindex="0" data-search="template-list" style="font-size: 0.85em;">
            </div>
        </header>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Util from '@/utils';

export default {
  name: 'CalendarVerticalTopbar',
  computed:{
    ...mapGetters(['getPlaniVerticalCompact', 'getPlaniVerticalSidebar', 'getSideBarToggleProperties'])
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(['planiSwitchSidebar', 'planSidebarCompact', 'planiRemoveSidebarCompact', 'planiMobileSidebar']),

    handleFullScreen() {
      Util.toggleFullScreen();
    },
  }
};
</script>
