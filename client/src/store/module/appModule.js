import axios from 'axios';
import { API, HEADERS } from '../constants';
import router from '../../router';

const state = {
    apps: [],
    appLogs: [],
    logGroup: [],
    app: null
};
const getters = {
    apps: state => state.apps,
    app: state => state.app,
    logGroup: state => state.logGroup,
    appLogs: state => state.appLogs
};
const mutations = {
    setApps: (state, apps) => (state.apps = apps),
    setApp: (state, app) => (state.app = app),
    setAppLogs: (state, logs) => (state.appLogs = logs),
    setLogGroup: (state, logGroup) => (state.logGroup = logGroup)
};
const actions = {
    async createApp(vuexContext, { appName, appDescription, appApiKey }) {
        try {
            const response = await axios.post(
                `${API}/app/`,
                JSON.stringify({
                    name: appName,
                    apiKey: appApiKey,
                    description: appDescription
                }),
                { headers: HEADERS }
            );
            return [true, response.data.message];
        } catch (error) {
            return [false, error.response.data.message];
        }
    },

    async listApps(vuexContext) {
        try {
            const response = await axios.get(`${API}/app/`, {
                headers: HEADERS
            });
            vuexContext.commit('setApps', response.data);
        } catch (error) {
            console.log(error.response);
            router.push({ name: 'error' });
        }
    },

    async listApp(vuexContext, id) {
        try {
            const response = await axios.get(`${API}/app/${id}`, {
                headers: HEADERS
            });
            vuexContext.commit('setApp', response.data);
        } catch (error) {
            console.log(error.response);
            router.push({ name: 'error' });
        }
    },

    async updateApp(vuexContext, payload) {
        try {
            const response = await axios.put(
                `${API}/app/${payload.id}`,
                JSON.stringify(payload.body),
                { headers: HEADERS }
            );
            return [true, response.data.message];
        } catch (error) {
            return [false, error.response.data.message];
        }
    },

    async updateIpList(vuexContext, payload) {
        try {
            const response = await axios.post(
                `${API}/app/${payload.path}/${payload.id}`,
                JSON.stringify(payload.body),
                { headers: HEADERS }
            );
            if (payload.path == 'add-to-block-list') {
                vuexContext.state.app.blockList.push(payload.body.ipAddress);
            } else if (payload.path == 'add-to-allow-list') {
                vuexContext.state.app.allowList.push(payload.body.ipAddress);
            } else if (payload.path == 'remove-to-block-list') {
                const index = vuexContext.state.app.blockList.indexOf(
                    payload.body.ipAddress
                );
                vuexContext.state.app.blockList.splice(index, 1);
            } else if (payload.path == 'remove-to-allow-list') {
                const index = vuexContext.state.app.allowList.indexOf(
                    payload.body.ipAddress
                );
                vuexContext.state.app.allowList.splice(index, 1);
            }
            return [true, response.data.message];
        } catch (error) {
            return [false, error.response.data.message];
        }
    },

    async getAppLogs(vuexContext, id) {
        const response = await axios.get(`${API}/app/app-logs/${id}`);
        vuexContext.commit('setAppLogs', response.data);
    },

    async getAppLogsGroup(vuexContext, id) {
        const response = await axios.get(`${API}/app/app-logs-date/${id}`);
        vuexContext.commit('setLogGroup', response.data);
    },

    async deleteApp(vuexContext, id) {
        const response = await axios.delete(`${API}/${id}`);
        if (response.status == 200) {
            vuexContext.dispatch('listApps');
            router.push({ name: 'apiList' });
        }
    }
};
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
