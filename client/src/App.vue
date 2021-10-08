<script>
import AppNavbar from '@/components/AppNavbar.vue';
import AppSidebar from '@/components/AppSidebar.vue';

export default {
    components: {
        AppNavbar,
        AppSidebar,
    },
};
</script>

<template>
    <div class="sb-nav-fixed">
        <AppNavbar />
        <div id="layoutSidenav">
            <AppSidebar />
            <!-- <div id="layoutSidenav_content">
                <main></main>
                <footer class="py-4 bg-light mt-auto"></footer>
            </div> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>