<script>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import AppNotExist from '../AppNotExist';

export default {
    components: {
        AppNotExist
    },
    setup() {
        const route = useRoute();
        const store = useStore();
        store.dispatch('AppModule/listApp', route.params.id);
        store.dispatch('AppModule/getAppLogs', route.params.id);
        store.dispatch('AppModule/getAppLogsGroup', route.params.id);
        const app = computed(() => store.getters['AppModule/app']);
        const appLogs = computed(() => store.getters['AppModule/appLogs']);
        const logGroup = computed(() => store.getters['AppModule/logGroup']);
        const user = computed(() => store.getters['AuthModule/user']);

        const appName = ref(null);
        const appDescription = ref(null);
        const appApiKey = ref(null);
        const appLimit = ref(null);
        const appTime = ref(null);
        const blockIpAddress = ref('');
        const allowIpAddress = ref('');

        function formatedDate(date) {
            const dateFormat = new Date(date);
            return dateFormat.toLocaleString('tr-TR');
        }

        async function appDetailUpdate() {
            const result = await store.dispatch('AppModule/updateApp', {
                id: route.params.id,
                body: {
                    name: appName.value.value,
                    apiKey: appApiKey.value.value,
                    description: appDescription.value.value
                }
            });
            store.commit('showAlert', {
                show: true,
                text: result[1],
                alertClass: result[0] ? 'success' : 'danger'
            });
        }

        async function appLimiterUpdate() {
            const result = await store.dispatch('AppModule/updateApp', {
                id: route.params.id,
                body: {
                    time: appTime.value.value,
                    limit: appLimit.value.value
                }
            });
            store.commit('showAlert', {
                show: true,
                text: result[1],
                alertClass: result[0] ? 'success' : 'danger'
            });
        }

        async function updateIpList(type, ipAddress = null) {
            if (type == 'blockList-add') {
                const result = await store.dispatch('AppModule/updateIpList', {
                    path: 'add-to-block-list',
                    id: route.params.id,
                    body: { ipAddress: blockIpAddress.value }
                });
                store.commit('showAlert', {
                    show: true,
                    text: result[1],
                    alertClass: result[0] ? 'success' : 'danger'
                });
            } else if (type == 'allowList-add') {
                const result = await store.dispatch('AppModule/updateIpList', {
                    path: 'add-to-allow-list',
                    id: route.params.id,
                    body: { ipAddress: allowIpAddress.value }
                });
                store.commit('showAlert', {
                    show: true,
                    text: result[1],
                    alertClass: result[0] ? 'success' : 'danger'
                });
            } else if (type == 'blockList-remove') {
                const result = await store.dispatch('AppModule/updateIpList', {
                    path: 'remove-to-block-list',
                    id: route.params.id,
                    body: { ipAddress }
                });
                store.commit('showAlert', {
                    show: true,
                    text: result[1],
                    alertClass: result[0] ? 'success' : 'danger'
                });
            } else if (type == 'allowList-remove') {
                const result = await store.dispatch('AppModule/updateIpList', {
                    path: 'remove-to-allow-list',
                    id: route.params.id,
                    body: { ipAddress }
                });
                store.commit('showAlert', {
                    show: true,
                    text: result[1],
                    alertClass: result[0] ? 'success' : 'danger'
                });
            }
        }

        function deleteApp() {
            store.dispatch('AppModule/deleteApp', route.params.id);
        }

        var chart;

        onMounted(() => {
            chart = bb.generate({
                data: {
                    columns: [],
                    type: 'bar'
                },
                bar: {
                    width: {
                        ratio: 0.5
                    }
                },
                bindto: '#barChart'
            });
        });

        watch(logGroup, (newValue, oldValue) => {
            const chartItems = ['Tarihe göre istekler'];
            newValue.forEach(item => chartItems.push(item.total));
            chart.load({
                columns: [chartItems]
            });
        });

        return {
            user,
            formatedDate,
            appLogs,
            logGroup,
            blockIpAddress,
            allowIpAddress,
            updateIpList,
            appName,
            appDescription,
            appApiKey,
            appTime,
            appLimit,
            appDetailUpdate,
            appLimiterUpdate,
            app,
            deleteApp
        };
    }
};
</script>

<template>
    <AppBase v-if="app" :menuItems="['Ana Sayfa', 'Uygulamalar', app.name]">
        <AppModal title="Silme İşlemini Onayla">
            <div class="modal-body">
                <p>
                    Bu uygulamayı kaldırmak istediğinizden emin misiniz?
                    Uygulamalarınızda hataya sebep olabilir.
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
                    Evet
                </button>
            </div>
        </AppModal>
        <div
            class="alert alert-primary"
            v-if="app.limit == 10 && app.time == 10000"
        >
            <i class="fa fa-info"></i> Uygulamınızın istek sınırlarını
            ayarlamanızı tavsiye ederiz.
        </div>

        <div class="alert alert-primary">
            <b>Endpoint:</b> http://localhost:3000/api-service/{{ app.slug }}/{{
                user.id
            }}
        </div>

        <AppAlert></AppAlert>

        <h1 class="mb-3">{{ app.name }}</h1>
        <div class="row">
            <div class="col-md-6">
                <div>
                    <b class="mb-3">Uygulama Ayarları</b>
                    <form @submit.prevent="appDetailUpdate">
                        <div class="mb-3">
                            <label for="name" class="form-label"
                                >Uygulama Adı*</label
                            >
                            <input
                                ref="appName"
                                :value="app.name"
                                required
                                maxlength="50"
                                type="text"
                                id="name"
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
                            <label for="description" class="form-label"
                                >Açıklama</label
                            >
                            <textarea
                                ref="appDescription"
                                :value="app.description"
                                maxlength="500"
                                rows="3"
                                id="description"
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
                    <table class="table table-striped" v-if="appLogs">
                        <thead>
                            <th>IP Adresi</th>
                            <th>Tarih</th>
                            <th>Ülke</th>
                        </thead>
                        <tbody v-if="appLogs && appLogs.length > 0">
                            <tr v-for="log in appLogs" :key="log._id">
                                <td>{{ log.ipAdress }}</td>
                                <td>{{ formatedDate(log.date) }}</td>
                                <td>{{ log.ipLocation.country_name }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt-5" v-if="logGroup.length > 0">
                    <h1>Graphichs</h1>
                    <br />
                    <div id="barChart"></div>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <b>Uygulama Limitleri</b>
                    <form @submit.prevent="appLimiterUpdate">
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
                    <form @submit.prevent="updateIpList('allowList-add')">
                        <div class="row">
                            <div class="col-10">
                                <input
                                    required
                                    pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
                                    v-model="allowIpAddress"
                                    type="text"
                                    class="form-control"
                                    placeholder="IP Adresi"
                                />
                            </div>
                            <div class="col-2">
                                <button class="btn btn-warning">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                    <table class="table table-striped">
                        <thead>
                            <th>IP Adresi</th>
                            <th>İşlem</th>
                        </thead>
                        <tbody v-if="app.allowList && app.allowList.length > 0">
                            <tr v-for="allow in app.allowList" :key="allow">
                                <td>{{ allow }}</td>
                                <td>
                                    <form
                                        @submit.prevent="
                                            updateIpList(
                                                'allowList-remove',
                                                allow
                                            )
                                        "
                                    >
                                        <button class="btn btn-danger">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        </tbody>
                        <AppNotExist
                            v-else
                            :title="
                                `<p><i class='fa fa-info-circle'></i> İzin verilen ip adresiniz yok. <b>Uygulamanıza her yerden erişilebilir.</b></p>`
                            "
                        ></AppNotExist>
                    </table>
                </div>
                <div class="mt-2">
                    <b>Yasaklı Listesi</b>
                    <form @submit.prevent="updateIpList('blockList-add')">
                        <div class="row">
                            <div class="col-10">
                                <input
                                    required
                                    pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
                                    v-model="blockIpAddress"
                                    type="text"
                                    class="form-control"
                                    placeholder="IP Adresi"
                                />
                            </div>
                            <div class="col-2">
                                <button class="btn btn-warning">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                    <table class="table table-striped">
                        <thead>
                            <th>IP Adresi</th>
                            <th>İşlem</th>
                        </thead>
                        <tbody v-if="app.blockList && app.blockList.length > 0">
                            <tr v-for="block in app.blockList" :key="block">
                                <td>{{ block }}</td>
                                <td>
                                    <form
                                        @submit.prevent="
                                            updateIpList(
                                                'blockList-remove',
                                                block
                                            )
                                        "
                                    >
                                        <button class="btn btn-danger">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        </tbody>
                        <AppNotExist
                            v-else
                            :title="
                                `<p><i class='fa fa-info-circle'></i> Bloklanan ip adresiniz yok.</p>`
                            "
                        ></AppNotExist>
                    </table>
                </div>
                <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    class="btn btn-danger btn-sm mb-3"
                >
                    Uygulamayı Sil
                </button>
            </div>
        </div>
    </AppBase>
</template>

<style lang="scss" scoped></style>
