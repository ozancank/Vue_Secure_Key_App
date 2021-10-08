<script>
export default {
    setup() {
        const dropdownItems = [
            { title: 'Hesap Ayarları', to: 'a' },
            { title: 'Hesap Aktiviteleri', to: 'b' },
        ];
        return { dropdownItems };
    },
};
</script>

<template>
    <nav class="sb-topnav navbar navbar-expand navbar-light bg-light">
        <a class="navbar-brand ps-3" href="index.html">Secure Key</a>
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
                        <a class="dropdown-item" :href="dropdownItem.to">{{
                            dropdownItem.title
                        }}</a>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="#!">Çıkış</a></li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
</style>