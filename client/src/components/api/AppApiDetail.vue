<script>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup() {
        const route = useRoute();
        const store = useStore();
        store.dispatch('AppModule/listApp', route.params.id);
        const app = computed(() => store.getters['AppModule/app']);

        return { app };
    }
};
</script>

<template>
    <AppBase v-if="app" :menuItems="['Ana Sayfa', 'Uygulamalar', app.name]">
        <div
            class="alert alert-primary"
            v-if="app.limit == 10 && app.time == 10000"
        >
            <i class="fa fa-info"></i> Uygulamınızın istek sınırlarını
            ayarlamanızı tavsiye ederiz.
        </div>
        <h1 class="mb-3">{{ app.name }}</h1>
        <div class="row">
            <div class="col-md-6">
                <div>
                    <b class="mb-3">Uygulama Ayarları</b>
                    <form>
                        <div class="mb-3">
                            <label for="appName" class="form-label"
                                >Uygulama Adı*</label
                            >
                            <input
                                ref="appName"
                                :value="app.name"
                                required
                                maxlength="50"
                                type="text"
                                id="appName"
                                class="form-control"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="apiKey" class="form-label"
                                >Api Key*</label
                            >
                            <input
                                ref="appApiKey"
                                :value="app.apiKey"
                                required
                                maxlength="200"
                                type="text"
                                id="apiKey"
                                class="form-control"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="appDescription" class="form-label"
                                >Açıklama</label
                            >
                            <textarea
                                ref="appDescription"
                                :value="app.description"
                                maxlength="500"
                                rows="3"
                                id="appDescription"
                                class="form-control"
                            ></textarea>
                        </div>
                        <button class="btn btn-success w-100 mb-3">
                            Güncelle
                        </button>
                    </form>
                </div>
                <div class="mt-5">
                    <b>İstek Logları</b>
                    <table class="table table-striped">
                        <thead>
                            <th>IP Adresi</th>
                            <th>Tarih</th>
                            <th>Ülke</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt-5">
                    <h1>Graphichs</h1>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <b>Uygulama Limitleri</b>
                    <form>
                        <div class="mb-3">
                            <label for="appLimit" class="form-label"
                                >İstek Limiti</label
                            >
                            <input
                                ref="appLimit"
                                :value="app.limit"
                                type="number"
                                id="appLimit"
                                class="form-control"
                            />
                        </div>
                        <div class="mb-3">
                            <label for="appDuration" class="form-label"
                                >Süre</label
                            >
                            <input
                                ref="appTime"
                                :value="app.time"
                                type="number"
                                id="appDuration"
                                class="form-control"
                            />
                        </div>
                        <button class="btn btn-success w-100 mb-3">
                            Güncelle
                        </button>
                    </form>
                </div>
                <div class="mt-5">
                    <b>İzin Verilen Listesi</b>
                    <table class="table table-striped">
                        <thead>
                            <th>IP Adresi</th>
                            <th>İşlem</th>
                        </thead>
                        <tbody v-if="app.allowList.length > 0">
                            <tr v-for="allow in app.allowList" :key="allow">
                                <td>{{ allow }}</td>
                                <td>
                                    <button class="btn btn-danger">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="2">İzin verilen ip adresiniz yok. Uygulamanıza her yerden erişilebilir.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt-2">
                    <b>Yasaklı Listesi</b>
                    <table class="table table-striped">
                        <thead>
                            <th>IP Adresi</th>
                            <th>İşlem</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <button class="btn btn-danger">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AppBase>
</template>

<style lang="scss" scoped></style>
