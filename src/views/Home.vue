<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <router-link v-for="board in boards" v-bind:key="board.id" v-bind:to="'/board/' + board.id">
      <BoardTmb v-bind:title="board.title" />
    </router-link>
    <button>Add board</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import BoardTmb from '@/components/BoardTmb.vue';

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      boards: [
        { id: 1, title: 'покупки' },
        { id: 2, title: 'подготовка к свадьбе' },
        { id: 3, title: 'разработка интернет-магазина' },
        { id: 4, title: 'курс по продвижению в соцсетях' },
      ],
    };
  },
  components: {
    BoardTmb,
  },
});
</script>
