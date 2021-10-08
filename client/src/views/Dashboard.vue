<script>
import AppNavbar from '@/components/AppNavbar.vue';
import AppSidebar from '@/components/AppSidebar.vue';

export default {
    components: {
        AppNavbar,
        AppSidebar,
    }
};
</script>

<template>
    <div class="sb-nav-fixed">
        <AppNavbar />
        <div id="layoutSidenav">
            <AppSidebar />
            <router-view></router-view>
            <!-- <footer class="py-4 bg-light mt-auto"></footer> -->
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
