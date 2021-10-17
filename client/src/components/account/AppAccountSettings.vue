<script>
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        async function deleteApp() {
            const result = await store.dispatch('AppModule/deleteAllApps');
            store.commit('showAlert', {
                show: true,
                text: 'Uygulamalarınız Kaldırıldı.',
                alertClass: 'success'
            });
        }

        return { deleteApp };
    }
};
</script>

<template>
    <AppBase :menuItems="['Ana sayfa', 'Hesap Ayarları']">
        <AppModal title="Silme İşlemini Onayla">
            <div class="modal-body">
                <p>
                    Bütün uygulamalarınızı <b>silmek</b> üzeresiniz. Bu işlem
                    geri alınamaz ve uygulamalarınızda hataya sebep olabilir.
                </p>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    Kapat
                </button>
                <button
                    type="button"
                    @click="deleteApp"
                    class="btn btn-danger"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                >
                    Tüm uygulamaları sil
                </button>
            </div>
        </AppModal>
        <h1 class="mb-3">Hesap Ayarları</h1>
        <AppAlert></AppAlert>
        <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            class="btn btn-danger mb-3 "
        >
            <i class="fa fa-trash"></i> Tüm Uygulamayı Sil
        </button>
    </AppBase>
</template>

<style lang="scss" scoped></style>
