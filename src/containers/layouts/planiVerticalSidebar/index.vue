<template>
    <div class="app-admin-wrap layout-plani-sidebar-vertical clearfix sidebar-full">
        <planiVerticalSidebar />
        <main>
            <div class="main-content-wrap mt-0 bg-off-white box"
                 :class="{  'vertical-sidebar': getPlaniVerticalSidebar.isVerticalSidebar,
                            compact: getPlaniVerticalSidebar.isVerticalCompact }">
<!--                <planiVerticalTopbar />-->
                <transition name="page" mode="out-in">
                    <router-view class="view-content"/>
                </transition>
                <appFooter/>
            </div>
        </main>
    </div>
</template>
<script>
import planiVerticalSidebar from './planiVerticalSidebar';
import planiVerticalTopbar from './planiVerticalTopbar';
import appFooter from '../common/footer';
import { mapGetters } from 'vuex';

export default {
  components: {
    planiVerticalSidebar,
    // eslint-disable-next-line vue/no-unused-components
    planiVerticalTopbar,
    appFooter
  },
  computed: {
    ...mapGetters(['getPlaniVerticalSidebar'])
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss">
	.box {
		display: flex;
		flex-flow: column;
		height: 100%;
	}
	.box .row.header {
		flex: 0 1 auto;
		/* The above is shorthand for:
		flex-grow: 0,
		flex-shrink: 1,
		flex-basis: auto
		*/
	}

	.box .view-content {
		flex: 1 1 auto;
	}

	.box .row.footer {
		flex: 0 1 40px;
	}
</style>
