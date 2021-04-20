import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: {},
    boards: [],
    user: {},

  },
  mutations: {
    UPDATE_BOARDS(state, boards) {
      state.boards = boards;
    },
    UPDATE_BOARD(state, board) {
      state.board = board;
    },
  },
  actions: {
    async getBoards({ commit }) {
      const { data: { boards } } = await api.get('/board');
      commit('UPDATE_BOARDS', boards);
    },
    async getBoard({ commit }, { id }) {
      const { data } = await api.get(`/board/${id}`);
      commit('UPDATE_BOARD', data);
    },
  },
  getters: {
    boards: (state) => state.boards,
    board: (state) => state.board,
  },
  modules: {
  },
});
