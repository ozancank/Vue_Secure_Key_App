<script>
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';

export default {
    setup() {
        const store = useStore();
        const logs = ref();
        const filterCount = ref(10);
        store.dispatch('LogModule/logs', 10);
        watch(filterCount, (newVal, oldVal) => {
            store.dispatch('LogModule/logs', newVal);
        });
        logs.value = computed(() => store.getters['LogModule/allLogs']);
        function formatedDate(date) {
            const dateFormat = new Date(date);
            return dateFormat.toLocaleString('tr-TR');
        }
        async function deleteLogs() {
            const result = await store.dispatch('LogModule/removeAllLogs');
            store.commit('showAlert', {
                show: true,
                text: result[1],
                alertClass: result[0] ? 'success' : 'danger'
            });
        }
        function filterLogs(type) {
            if (type == 'auth') {
                logs.value = computed(
                    () => store.getters['LogModule/authLogs']
                );
            } else if (type == 'app') {
                logs.value = computed(() => store.getters['LogModule/appLogs']);
            } else {
                logs.value = computed(() => store.getters['LogModule/allLogs']);
            }
        }
        return {
            logs,
            filterCount,
            formatedDate,
            filterLogs,
            deleteLogs
        };
    }
};
</script>

<template>
    <AppBase :menuItems="['Ana sayfa', 'Hesap Aktiviteleri']">
        <AppModal title="Silme İşlemini Onayla">
            <div class="modal-body">
                <p>
                    Bütün geçmiş kayıtlarınızı <b>silmek</b> istediğinizden emin
                    misiniz?
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
                    @click="deleteLogs"
                    class="btn btn-danger"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                >
                    Kayıtları Sil
                </button>
            </div>
        </AppModal>

        <h1>Hesap Aktiviteleri</h1>
        <button @click="filterLogs('auth')" class="btn btn-primary">
            Giriş Geçmişi
        </button>
        <button @click="filterLogs('app')" class="btn btn-success ms-2">
            Uygulama Geçmişi
        </button>
        <button @click="filterLogs('all')" class="btn btn-info ms-2">
            Hepsini Göster
        </button>
        <button
            class="btn btn-danger float-end"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
        >
            Hepsini Sil
        </button>

        <select v-model="filterCount" class="form-control my-3">
            <option value="10">Son 10 Kayıt</option>
            <option value="20">Son 20 Kayıt</option>
            <option value="all">Hepsini Göster</option>
        </select>

        <AppAlert></AppAlert>

        <table class="table table-striped">
            <thead>
                <th>İşlem</th>
                <th>Tür</th>
                <th>Tarih</th>
            </thead>
            <tbody v-if="logs.value.length">
                <tr v-for="log in logs.value" :key="log.id">
                    <td>{{ log.description }}</td>
                    <td>
                        <button
                            :class="
                                log.type == 'auth'
                                    ? 'btn btn-primary'
                                    : 'btn btn-success'
                            "
                        >
                            {{ log.type }}
                            <i
                                :class="
                                    log.type == 'auth'
                                        ? 'fa fa-lock'
                                        : 'fa fa-server'
                                "
                            ></i>
                        </button>
                    </td>
                    <td>{{ formatedDate(log.createdAt) }}</td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="3">
                        <p class="d-flex">
                            <i class="fa fa-info-circle fa-2x me-3"></i> Geçmiş
                            Kayıtlarınız Burada Görünür
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </AppBase>
</template>

<style lang="scss" scoped></style>
