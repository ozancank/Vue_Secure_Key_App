<script>
import AppBreadcrumb from '@/components/AppBreadcrumb.vue';

export default {
    components: {
        AppBreadcrumb
    }
};
</script>

<template>
    <div id="layoutSidenav_content">
        <main>
            <AppBreadcrumb :items="['Anasayfa']" />
            <div class="container-fluid">
                <slot></slot>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped></style>
