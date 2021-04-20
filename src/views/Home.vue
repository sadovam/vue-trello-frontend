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
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import BoardTmb from '@/components/BoardTmb.vue';

export default Vue.extend({
  name: 'Home',
  async mounted() {
    await this.$store.dispatch('getBoards');
  },
  // data() {
  //   return {
  //     boards: [
  //       { id: 1, title: 'покупки' },
  //       { id: 2, title: 'подготовка к свадьбе' },
  //       { id: 3, title: 'разработка интернет-магазина' },
  //       { id: 4, title: 'курс по продвижению в соцсетях' },
  //     ],
  //   };
  // },
  components: {
    BoardTmb,
  },
  computed: { // мы не можем сделать это через data потому что оно не будет реактивным
    boards() {
      return this.$store.getters.boards;
    },
  },

});
</script>
