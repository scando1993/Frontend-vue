<template>
    <div>
    <vue-perfect-scrollbar
        class="sidebar-panel   rtl-ps-none ps scroll"
        @mouseleave.native="planiSidebarCompact(); returnSelectedParentMenu()"

        @mouseenter.native="planiRemoveSidebarCompact"
        :class="{
          'vertical-sidebar-compact': getPlaniVerticalCompact.isSidebarCompact,
          'sidebar-full-collapse': getPlaniVerticalSidebar.isMobileCompact
        }"
        :settings="{ suppressScrollX : true ,  wheelPropagation: false}"
    >
        <div>
            <div class="gull-brand text-center d-flex align-items-center pl-2 mb-2 justify-content-between">
                <div>
                    <img src="@/assets/images/logo.png" class="gull-brand-logo"/>
                    <img :class="['logo', {'vertical-logo': getPlaniVerticalCompact.isItemName}]" src="@/assets/images/logo-name.png"/>
<!--                    <img v-if="!getPlaniVerticalCompact.isItemName" style="transition:width .4s ease-in-out; width: 0px; " src="@/assets/images/logo-name.png" />-->
                </div>
                <div class="toggle-sidebar-compact">
                    <label class="switch ul-switch switch-primary ml-auto">
                        <input @click="planiSwitchSidebar" type="checkbox" />
                        <span class="ul-slider o-hidden"></span>
                    </label>
                </div>
            </div>

            <div class="close-mobile-menu" @click="planiMobileSidebar">
                <i class="text-16 text-primary i-Close-Window font-weight-bold"></i>
            </div>

            <div class="mt-4 main-menu">

                <ul class="ul-vertical-sidebar pl-4" id="menu">
                    <!-- <p class="main-menu-title text-muted ml-3 font-weight-700 text-13 mt-4 mb-2">Apps</p> -->
                    <li class="Ul_li--hover">
                        <a class="has-arrow " href="/"  :class="{ active: selectedParentMenu === 'dashboards' }">
                            <i class="i-Bar-Chart text-20 mr-2 "></i>
                            <span
                                    class="text-15"
                                    :class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"
                            >Home</span
                            >
                        </a>
                    </li>

                    <!-- TaskGrid Menu -->
                    <li class="Ul_li--hover">
                        <a class="has-arrow " href="/app/taskGrid" :class="{ active: selectedParentMenu === 'taskGrid' }">
                            <i class="i-Tablet-Secure text-20 mr-2"></i>
                            <span
                                    class="text-15"
                                    :class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"
                            >Clientes</span>
                        </a>
                    </li>

                    <!-- Reports menu  -->
                    <li class="Ul_li--hover">
                        <a class="has-arrow " href="/app/reports" :class="{ active: selectedParentMenu === 'reports' }">
                            <i class="i-Statistic text-20 mr-2"></i>
                            <span
                                    class="text-15"
                                    :class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"
                            >Reports</span>
                        </a>
                    </li>

                    <!-- Alerts menu  -->
                    <li class="Ul_li--hover mb-2">
                        <a class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'alerts' }">
                            <i class="i-Bell text-20 mr-2"></i>
                            <span
                                    class="text-15"
                                    :class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"
                            >Alertas</span>
                        </a>
                    </li>

<!--                    <li class="Ul_li&#45;&#45;hover">-->
<!--                        &lt;!&ndash; Notification &ndash;&gt;-->
<!--                        <b-dropdown-->
<!--                            id="dropdown-1"-->
<!--                            dropright-->
<!--                            toggle-class="text-decoration-none"-->
<!--                            no-caret-->
<!--                            variant="link"-->
<!--                            class=""-->
<!--                        >-->
<!--                            <template slot="button-content">-->
<!--                                <a class="" href="#" :class="{ active: selectedParentMenu == 'alerts' }">-->
<!--                                    <i class="i-Bell text-20 mr-2"></i>-->
<!--                                    <span-->
<!--                                        class="text-15"-->
<!--                                        :class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"-->
<!--                                    >Alertas</span>-->
<!--                                </a>-->
<!--                            </template>-->
<!--                            &lt;!&ndash; Notification dropdown &ndash;&gt;-->
<!--                            <vue-perfect-scrollbar-->
<!--                                    :settings="{ suppressScrollX: true, wheelPropagation: false }"-->
<!--                                    ref="myData"-->
<!--                                    class="notification-popup ps scroll"-->
<!--                            >-->
<!--&lt;!&ndash;                                class="dropdown-menu-right rtl-ps-none notification-dropdown  ps scroll"&ndash;&gt;-->
<!--                                &lt;!&ndash; <div class="dropdown-menu-right rtl-ps-none notification-dropdown"> &ndash;&gt;-->
<!--                                <div class="dropdown-item d-flex">-->
<!--                                    <div class="notification-icon">-->
<!--                                        <i class="i-Speach-Bubble-6 text-primary mr-1"></i>-->
<!--                                    </div>-->
<!--                                    <div class="notification-details flex-grow-1">-->
<!--                                        <p class="m-0 d-flex align-items-center">-->
<!--                                            <span>New message</span>-->
<!--                                            &lt;!&ndash; <span class="badge badge-pill badge-primary ml-1 mr-1">new</span> &ndash;&gt;-->
<!--                                            <span class="flex-grow-1"></span>-->
<!--                                            <span class="text-small text-muted ml-auto">10 sec ago</span>-->
<!--                                        </p>-->
<!--                                        <p class="text-small text-muted m-0">-->
<!--                                            James: Hey! are you busy?-->
<!--                                        </p>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                <div class="dropdown-item d-flex">-->
<!--                                    <div class="notification-icon">-->
<!--                                        <i class="i-Receipt-3 text-success mr-1"></i>-->
<!--                                    </div>-->
<!--                                    <div class="notification-details flex-grow-1">-->
<!--                                        <p class="m-0 d-flex align-items-center">-->
<!--                                            <span>New order received</span>-->
<!--                                            &lt;!&ndash; <span class="badge badge-pill badge-success ml-1 mr-1">new</span> &ndash;&gt;-->
<!--                                            <span class="flex-grow-1"></span>-->
<!--                                            <span class="text-small text-muted ml-auto">2 hours ago</span>-->
<!--                                        </p>-->
<!--                                        <p class="text-small text-muted m-0">1 Headphone, 3 iPhone x</p>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                <div class="dropdown-item d-flex">-->
<!--                                    <div class="notification-icon">-->
<!--                                        <i class="i-Empty-Box text-danger mr-1"></i>-->
<!--                                    </div>-->
<!--                                    <div class="notification-details flex-grow-1">-->
<!--                                        <p class="m-0 d-flex align-items-center">-->
<!--                                            <span>Product out of stock</span>-->
<!--                                            &lt;!&ndash; <span class="badge badge-pill badge-danger ml-1 mr-1">3</span> &ndash;&gt;-->
<!--                                            <span class="flex-grow-1"></span>-->
<!--                                            <span class="text-small text-muted ml-auto"-->
<!--                                            >10 hours ago</span-->
<!--                                            >-->
<!--                                        </p>-->
<!--                                        <p class="text-small text-muted m-0">-->
<!--                                            Headphone E67, R98, XL90, Q77-->
<!--                                        </p>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                <div class="dropdown-item d-flex">-->
<!--                                    <div class="notification-icon">-->
<!--                                        <i class="i-Data-Power text-success mr-1"></i>-->
<!--                                    </div>-->
<!--                                    <div class="notification-details flex-grow-1">-->
<!--                                        <p class="m-0 d-flex align-items-center">-->
<!--                                            <span>Server Up!</span>-->
<!--                                            &lt;!&ndash; <span class="badge badge-pill badge-success ml-1 mr-1">3</span> &ndash;&gt;-->
<!--                                            <span class="flex-grow-1"></span>-->
<!--                                            <span class="text-small text-muted ml-auto"-->
<!--                                            >14 hours ago</span-->
<!--                                            >-->
<!--                                        </p>-->
<!--                                        <p class="text-small text-muted m-0">-->
<!--                                            Server rebooted successfully-->
<!--                                        </p>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                &lt;!&ndash; </div> &ndash;&gt;-->
<!--                            </vue-perfect-scrollbar>-->
<!--                        </b-dropdown>-->
<!--                        &lt;!&ndash; Notification End &ndash;&gt;-->
<!--                    </li>-->
                    <!-- Profile menu> -->
                    <li class="Ul_li--hover">
                        <a class="has-arrow " href="/app/profile" :class="{ active: selectedParentMenu === 'profile' }">
                            <i class="i-People-on-Cloud text-20 mr-2"></i>
                            <span
                                class="text-15"
                                :class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"
                            >Perfil</span>
                        </a>
                    </li>

                    <!-- Team menu> -->
                    <li class="Ul_li--hover">
                        <a class="has-arrow " href="/app/team" :class="{ active: selectedParentMenu ==='team' }">
                            <i class="i-Handshake text-20 mr-2"></i>
                            <span
                                class="text-15"
                                :class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"
                            >Equipo</span>
                        </a>
                    </li>

                    <!-- Monitor menu> -->
                    <li class="Ul_li--hover">
                        <a class="has-arrow " href="/app/monitor" :class="{ active: selectedParentMenu === 'monitor' }">
                            <i class="i-Map text-20 mr-2"></i>
                            <span
                                class="text-15"
                                :class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"
                            >Monitoreo</span>
                        </a>
                    </li>
                </ul>

            </div>
        </div>

    </vue-perfect-scrollbar>

    </div>
</template>
<script>
    import { mapGetters, mapActions } from "vuex";
    import arrowIcon from "@/components/arrow/arrowIcon";
    export default {
        components: {
        },
        computed: {
            ...mapGetters(["getPlaniVerticalCompact", "getPlaniVerticalSidebar"])
        },
        data() {
            return {
                selectedParentMenu: "",
                showAlerts: true
            };
        },
        mounted() {
            this.toggleSelectedParentMenu();
            document.addEventListener("click", this.returnSelectedParentMenu);
        },
        beforeDestroy() {
            document.removeEventListener("click", this.returnSelectedParentMenu);

        },
        methods: {
            ...mapActions([
                "planiSwitchSidebar",
                "planiSidebarCompact",
                "planiRemoveSidebarCompact",
                "planiMobileSidebar"
            ]),

            toggleSelectedParentMenu() {
                const currentParentUrl = this.$route.path
                    .split("/")
                    .filter(x => x !== "")[1];

                if (currentParentUrl !== undefined || currentParentUrl !== null) {
                    this.selectedParentMenu = currentParentUrl.toLowerCase();
                    console.log(currentParentUrl)
                } else {
                    this.selectedParentMenu = "dashboards";
                }
            },
            returnSelectedParentMenu() {
                this.toggleSelectedParentMenu();
            },

        }
    };
</script>
<style>
    .overrideCard {
        margin-left: 100px !important;

    }
    .notification-popup{
        position: absolute;
        width: 600px;
        height: 400px;
    }
</style>
