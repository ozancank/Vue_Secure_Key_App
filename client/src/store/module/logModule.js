import axios from 'axios';
import { API } from '../constants';

const state = {
    logs: []
};
const getters = {
    allLogs: state => state.logs,
    appLogs: state => state.logs.filter(log => log.type == 'app'),
    authLogs: state => state.logs.filter(log => log.type == 'auth')
};
const mutations = {
    setLogs: (state, log) => (state.logs = log)
};
const actions = {
    async logs(vuexContext, limit) {
        const response = await axios.get(`${API}/log?limit=${limit}`, {
            headers: {
                userid: localStorage.userId
            }
        });
        vuexContext.commit('setLogs', response.data);
    },
    async removeAllLogs(vuexContext) {
        const response = await axios.delete(`${API}/log`, {
            headers: {
                userid: localStorage.userId
            }
        });
        if (response.data.status) {
            vuexContext.commit('setLogs', []);
            return [true, response.data.message];
        } else {
            return [false, response.data.message];
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
