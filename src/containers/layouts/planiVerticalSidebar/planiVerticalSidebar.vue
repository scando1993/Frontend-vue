<template>
	<div>
		<vue-perfect-scrollbar
			class="sidebar-panel   rtl-ps-none ps scroll"
			@mouseleave.native="mouseLeaveNative"

			@mouseenter.native="planiRemoveSidebarCompact"
			:class="{
          'vertical-sidebar-compact': getPlaniVerticalCompact.isSidebarCompact,
          'sidebar-full-collapse': getPlaniVerticalSidebar.isMobileCompact
        }"
			:settings="{ suppressScrollX : true ,  wheelPropagation: false}"
		>
			<div>
				<div class="gull-brand text-center d-flex align-items-center pl-2 mb-2 justify-content-between">
					<!--                <div>-->
					<!--                    <img src="@/assets/images/logo.png" class="gull-brand-logo"/>-->
					<!--                    <img :class="['logo', {'vertical-logo': getPlaniVerticalCompact.isItemName}]" src="@/assets/images/logo-name.png"/>-->
					<!--&lt;!&ndash;                    <img v-if="!getPlaniVerticalCompact.isItemName" style="transition:width .4s ease-in-out; width: 0px; " src="@/assets/images/logo-name.png" />&ndash;&gt;-->
					<!--                </div>-->
					<div class="toggle-sidebar-compact">
						<label class="switch ul-switch switch-primary ml-auto">
							<input @click="planiSwitchSidebar" type="checkbox"/>
							<span class="ul-slider o-hidden"></span>
						</label>
					</div>
				</div>

				<div class="close-mobile-menu" @click="planiMobileSidebar">
					<i class="text-16 text-primary i-Close-Window font-weight-bold"/>
				</div>

				<div class="mt-4 main-menu">

					<ul class="ul-vertical-sidebar pl-4" id="menu">
						<!-- <p class="main-menu-title text-muted ml-3 font-weight-700 text-13 mt-4 mb-2">Apps</p> -->
						<li class="Ul_li--hover">
							<div>
								<a class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'calendar' }">
									<router-link tag="div" to="/">
<!--										<i class="i-Bar-Chart text-20 mr-2 "/>-->
                    <img src="@/assets/images/svg/home.svg" class="text-20 mr-2 icon-sidebar"/>
										<span
											class="text-15"
											:class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"
										>Home</span
										>

									</router-link>
								</a>
							</div>
						</li>

						<!-- TaskGrid Menu -->
						<li class="Ul_li--hover">
							<div>
								<a class="has-arrow" href="#" :class="{ active: selectedParentMenu === 'taskGrid' }">
									<router-link tag="div" to="/app/taskGrid">
<!--										<i class="i-Tablet-Secure text-20 mr-2"/>-->
                    <img src="@/assets/images/svg/clientes.svg" class="text-20 mr-2 icon-sidebar"/>
										<span
											class="text-15"
											:class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"
										>Clientes</span>
									</router-link>
								</a>
							</div>
						</li>

						<!-- Reports menu  -->
						<li class="Ul_li--hover">
							<div>
								<a tag="a" class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'reports' }">
									<router-link tag="div" to="/app/reports">
<!--										<i class="i-Statistic text-20 mr-2"/>-->
                    <img src="@/assets/images/svg/reportes.svg" class="text-20 mr-2 icon-sidebar"/>
										<span
											class="text-15"
											:class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"
										>Reports</span>
									</router-link>
								</a>
							</div>
						</li>

						<!-- Alerts menu  -->
						<li class="Ul_li--hover mb-2">
							<div>
								<a class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'alerts' }">
                  <router-link tag="div" to="#">
                    <!--									<i class="i-Bell text-20 mr-2"></i>-->
                    <img src="@/assets/images/svg/notificaciones.svg" class="text-20 mr-2 icon-sidebar"/>
                    <span
                      class="text-15"
                      :class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"
                    >Alertas</span>
                  </router-link>
								</a>
							</div>
						</li>


            <!-- Monitor menu> -->
            <li class="Ul_li--hover">
              <div>
                <a class="has-arrow " href="/app/monitor" :class="{ active: selectedParentMenu === 'monitor' }">
                  <router-link tag="div" to="/app/monitor">
                    <i class="i-Monitor-Analytics icons-text mr-2"/>
                    <span
                      class="text-15"
                      :class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"
                    >Monitoreo</span>
                  </router-link>
                </a>
              </div>
            </li>

            <!--						Profile menu-->
						<li class="Ul_li--hover">
							<div>
								<a class="has-arrow " href="#" :class="{ active: selectedParentMenu === 'profile' }">
									<router-link tag="div" to="/app/profile">
<!--										<i class="i-People-on-Cloud text-20 mr-2"/>-->
                    <img src="@/assets/images/svg/settings.svg" class="text-20 mr-2 icon-sidebar"/>
										<span
											class="text-15"
											:class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"
										>Perfil</span>
									</router-link>

							</a>
							</div>
						</li>

						<!-- Team menu> -->
						<li v-if="loggedInUser.admin"  class="Ul_li--hover">
							<a class="has-arrow " href="#" :class="{ active: selectedParentMenu ==='team' }">
								<router-link tag="div" to="/app/team">
									<i class="i-Handshake text-20 mr-2"/>
									<span
										class="text-15"
										:class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"
									>Equipo</span>
								</router-link>
							</a>
						</li>

						<!-- Sign-out menu> -->
						<li class="Ul_li--hover">
							<div>
								<a class="has-arrow " href="#" @click.prevent="logoutUser">
									<i class="i-Power-2 text-20 mr-2"></i>
									<span
										class="text-15"
										:class="{ 'vertical-item-name': getPlaniVerticalCompact.isItemName }"
									>Sign Out</span>
								</a>
							</div>
						</li>
					</ul>

				</div>
			</div>

		</vue-perfect-scrollbar>

	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {},
  computed: {
    ...mapGetters(['getPlaniVerticalCompact', 'getPlaniVerticalSidebar', 'loggedInUser'])
  },
  data() {
    return {
      selectedParentMenu: '',
      showAlerts: true
    };
  },
  mounted() {
    this.toggleSelectedParentMenu();
    document.addEventListener('click', this.returnSelectedParentMenu);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.returnSelectedParentMenu);

  },
  methods: {
    ...mapActions([
      'planiSwitchSidebar',
      'planiSidebarCompact',
      'planiRemoveSidebarCompact',
      'planiMobileSidebar',
      'signOut',
      'setShowNotifications'
    ]),

    logoutUser() {
      this.signOut();

      this.$router.push('/app/sessions/signIn');
    },

    toggleSelectedParentMenu() {
      const currentParentUrl = this.$route.path
        .split('/')
        .filter(x => x !== '')[1];

      if (currentParentUrl !== undefined) {
        this.selectedParentMenu = currentParentUrl.toLowerCase();
        console.log(currentParentUrl);
      } else {
        this.selectedParentMenu = 'dashboards';
      }
    },

    returnSelectedParentMenu() {
      this.toggleSelectedParentMenu();
    },

    mouseLeaveNative() {
      this.planiSidebarCompact();
      this.returnSelectedParentMenu();
    }
  }
};
</script>
<style scoped lang="scss">
	.overrideCard {
		margin-left: 100px !important;

	}

	.notification-popup {
		position: absolute;
		width: 600px;
		height: 400px;
	}

  .icon-sidebar {
    width: 20px;
    height: 20px;
    filter: invert(100%) sepia(100%) saturate(100%) hue-rotate(0deg) brightness(100%) contrast(100%);
  }

  .icons-text {
    font-size: 1.5em;
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    line-height: 1.15;
  }
</style>
