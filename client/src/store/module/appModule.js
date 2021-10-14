import axios from 'axios';
import { API, HEADERS } from '../constants';

const state = {
    apps: [],
    app: {}
};
const getters = {
    apps: state => state.apps,
    app: state => state.app
};
const mutations = {
    setApps: (state, apps) => (state.apps = apps),
    setApp: (state, app) => (state.app = app)
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
