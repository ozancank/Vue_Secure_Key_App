<script>
import AppNavbar from '@/components/AppNavbar.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import AppBase from '@/components/AppBase.vue';

export default {
    components: {
        AppNavbar,
        AppSidebar,
        AppBase
    }
};
</script>

<template>
    <div class="sb-nav-fixed">
        <AppNavbar />
        <div id="layoutSidenav">
            <AppSidebar />
            <AppBase>
                <h1>Main Content</h1>
            </AppBase>
            <!-- <footer class="py-4 bg-light mt-auto"></footer> -->
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
