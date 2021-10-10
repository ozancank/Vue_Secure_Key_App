<script>
import { removeToken } from '../utils';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const dropdownItems = [
            { title: 'Hesap Ayarları', to: 'accountSettings' },
            { title: 'Hesap Aktiviteleri', to: 'accountLogs' }
        ];

        function logout() {
            removeToken();
            window.location.href = 'http://localhost:8080';
        }

        return { logout, dropdownItems };
    }
};
</script>

<template>
    <nav class="sb-topnav navbar navbar-expand navbar-light bg-light">
        <router-link class="navbar-brand ps-3" :to="{ name: 'home' }"
            >Secure Key</router-link
        >
        <button
            class="ms-auto btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            href="#!"
        >
            <i class="fas fa-bars"></i>
        </button>
        <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li class="nav-item dropdown">
                <a
                    class="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    ><i class="fas fa-user fa-fw"></i
                ></a>
                <ul
                    class="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                >
                    <li
                        v-for="dropdownItem in dropdownItems"
                        :key="dropdownItem.title"
                    >
                        <router-link
                            class="dropdown-item"
                            :to="{ name: dropdownItem.to }"
                            >{{ dropdownItem.title }}</router-link
                        >
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                        <a class="dropdown-item" href="#" @click="logout">
                            Çıkış Yap
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped></style>
