<template>
	<div class="mb-20">
		<header>
			<img src="@/assets/images/logo-name.png" style="width: 120px;"/>
			<img src="@/assets/images/logo.png" style="width: 60px;"/>
		</header>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Util from '@/utils';

export default {
  computed: {
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
