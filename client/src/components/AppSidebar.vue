<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const user = computed(() => store.getters['AuthModule/user']);
        const menus = [
            {
                categoryName: 'Api Yönetimi',
                lists: [
                    {
                        title: 'Apiler',
                        icon: 'fas fa-columns',
                        submenus: [
                            { title: 'Yeni Uygulama Oluştur', to: 'apiCreate' },
                            { title: 'Api Uygulamalarını Yönet', to: 'apiList' }
                        ]
                    }
                ]
            },
            {
                categoryName: 'Hesap',
                lists: [
                    {
                        title: 'Hesap Ayarlarım',
                        icon: 'fas fa-user',
                        to: 'accountSettings'
                    },
                    {
                        title: 'Hesap Aktivitleri',
                        icon: 'fas fa-user',
                        to: 'accountLogs'
                    }
                ]
            }
        ];

        return { user, menus };
    }
};
</script>

<template>
    <div id="layoutSidenav_nav">
        <nav
            class="sb-sidenav accordion sb-sidenav-light"
            id="sidenavAccordion"
        >
            <div class="sb-sidenav-menu">
                <div class="nav">
                    <div class="sb-sidenav-menu-heading">Ana Sayfa</div>
                    <router-link class="nav-link" :to="{ name: 'home' }">
                        <div class="sb-nav-link-icon">
                            <i class="fas fa-tachometer-alt"></i>
                        </div>
                        Ana Sayfa
                    </router-link>
                    <div v-for="menu in menus" :key="menu.categoryName">
                        <div class="sb-sidenav-menu-heading">
                            {{ menu.categoryName }}
                        </div>
                        <div v-for="list in menu.lists" :key="list.title">
                            <div v-if="list.submenus">
                                <a
                                    class="nav-link collapsed"
                                    href="#"
                                    data-bs-toggle="collapse"
                                    :data-bs-target="`#${list.title}`"
                                    aria-expanded="false"
                                    aria-controls="collapseLayouts"
                                >
                                    <div class="sb-nav-link-icon">
                                        <i class="fas fa-columns"></i>
                                    </div>
                                    {{ list.title }}
                                    <div class="sb-sidenav-collapse-arrow">
                                        <i class="fas fa-angle-down"></i>
                                    </div>
                                </a>
                                <div
                                    class="collapse"
                                    :id="list.title"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#sidenavAccordion"
                                >
                                    <nav class="sb-sidenav-menu-nested nav">
                                        <router-link
                                            v-for="submenu in list.submenus"
                                            :key="submenu.title"
                                            class="nav-link"
                                            :to="{ name: submenu.to }"
                                        >
                                            {{ submenu.title }}
                                        </router-link>
                                    </nav>
                                </div>
                            </div>

                            <router-link
                                v-else
                                class="nav-link"
                                :to="{ name: list.to }"
                            >
                                <div class="sb-nav-link-icon">
                                    <i :class="list.icon"></i>
                                </div>
                                {{ list.title }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sb-sidenav-footer">
                <div class="text-center">
                    <img
                        height="50"
                        class="rounded-circle"
                        :src="user.avatar_url"
                        :alt="`${user.name} profil resmi`"
                    />
                </div>
                <div class="small">
                    <b>{{ user.name }}</b>
                    olarak giriş yapıldı.
                </div>
            </div>
        </nav>
    </div>
</template>

<style lang="scss" scoped></style>
