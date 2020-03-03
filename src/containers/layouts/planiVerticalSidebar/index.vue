<template>
    <div class="app-admin-wrap layout-sidebar-vertical clearfix sidebar-full">
        <planiVerticalSidebar />
        <main>
            <div class="main-content-wrap mt-0 bg-off-white"
                 :class="{  'vertical-sidebar': getPlaniVerticalSidebar.isVerticalSidebar,
                            compact: getPlaniVerticalSidebar.isVerticalCompact }">
<!--                <planiVerticalTopbar />-->
                <transition name="page" mode="out-in">
                    <router-view />
                </transition>
                <appFooter />
            </div>
        </main>
    </div>
</template>
<script>
    import planiVerticalSidebar from "./planiVerticalSidebar";
    import planiVerticalTopbar from "./planiVerticalTopbar";
    import appFooter from "../common/footer";
    import { mapGetters } from "vuex";

    export default {
        components: {
            planiVerticalSidebar,
            planiVerticalTopbar,
            appFooter
        },
        computed: {
            ...mapGetters(["getPlaniVerticalSidebar"])
        },
        data() {
            return {};
        },
        methods: {}
    };
</script>
