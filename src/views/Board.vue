<template>
    <div>
        <h1>Board: | {{$route.params.board_id}}</h1>
        <List
        v-for="list in board.lists"
        v-bind:key="list.id"
        v-bind:title="list.title"
        v-bind:cards="list.cards"
        />
        <button>Add list</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import List from '@/components/List.vue';

export default Vue.extend({
  name: 'Board',
  // data() {
  //   return {
  //     title: 'Моя тестовая доска',
  //     lists: [
  //       {
  //         id: 1,
  //         title: 'Планы',
  //         cards: [
  //           { id: 1, title: 'помыть кота' },
  //           { id: 2, title: 'приготовить суп' },
  //           { id: 3, title: 'сходить в магазин' },
  //         ],
  //       },
  //       {
  //         id: 2,
  //         title: 'В процессе',
  //         cards: [
  //           { id: 4, title: 'посмотреть сериал' },
  //         ],
  //       },
  //       {
  //         id: 3,
  //         title: 'Сделано',
  //         cards: [
  //           { id: 5, title: 'сделать домашку' },
  //           { id: 6, title: 'погулять с собакой' },
  //         ],
  //       },
  //     ],
  //   };
  // },
  async mounted() {
    await this.$store.dispatch('getBoard', { id: this.$route.params.board_id });
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
  components: {
    List,
  },
});
</script>

<style scoped lang="scss">

</style>
