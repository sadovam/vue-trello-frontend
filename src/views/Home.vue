<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-if="boards">
    <router-link v-for="board in boards" v-bind:key="board.id" v-bind:to="'/board/' + board.id">
      <BoardTmb v-bind:title="board.title" />
    </router-link>
    </div>
    <button>Add board</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BoardTmb from '@/components/BoardTmb.vue';

export default Vue.extend({
  name: 'Home',
  async mounted() {
    await this.$store.dispatch('getBoards');
  },
  components: {
    BoardTmb,
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },

});
</script>
