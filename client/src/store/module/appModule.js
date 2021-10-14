import axios from 'axios';
import { API } from '../constants';

const state = {};
const getters = {};
const mutations = {};
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
                {
                    headers: {
                        'content-type': 'application/json',
                        userid: localStorage.userId
                    }
                }
            );
            return [true, response.data.message];
        } catch (error) {
            return [false, error.response.data.message];
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
