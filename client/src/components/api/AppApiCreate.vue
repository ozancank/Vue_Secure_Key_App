<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const appName = ref('');
        const appApiKey = ref('');
        const appDescription = ref('');

        async function onSubmit() {
            const result = await store.dispatch('AppModule/createApp', {
                appName: appName.value,
                appApiKey: appApiKey.value,
                appDescription: appDescription.value
            });
            store.commit('showAlert', {
                show: true,
                text: result[1],
                alertClass: result[0] ? 'success' : 'danger'
            });
        }

        return {
            appName,
            appApiKey,
            appDescription,
            onSubmit
        };
    }
};
</script>

<template>
    <AppBase :menuItems="['Ana sayfa', 'Uygulama Oluştur']">
        <h1 class="mb-3">Yeni Uygulama Oluştur</h1>
        <AppAlert></AppAlert>
        <form @submit.prevent="onSubmit">
            <div class="mb-3">
                <label for="appName" class="form-label">Uygulama Adı*</label>
                <input
                    v-model="appName"
                    required
                    maxlength="50"
                    type="text"
                    id="appName"
                    class="form-control"
                />
            </div>
            <div class="mb-3">
                <label for="apiKey" class="form-label">Api Key*</label>
                <input
                    v-model="appApiKey"
                    required
                    maxlength="200"
                    type="text"
                    id="apiKey"
                    class="form-control"
                />
            </div>
            <div class="mb-3">
                <label for="appDescription" class="form-label">Açıklama</label>
                <textarea
                    v-model="appDescription"
                    maxlength="500"
                    rows="3"
                    id="appDescription"
                    class="form-control"
                ></textarea>
            </div>
            <button
                :disabled="
                    appName.trim().length < 1 || appApiKey.trim().length < 1
                "
                class="btn btn-success w-100"
            >
                Uygulama Oluştur
            </button>
        </form>
    </AppBase>
</template>

<style lang="scss" scoped></style>
