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
