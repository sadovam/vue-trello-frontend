<template>
    <div>
        <h1>Board: | {{$route.params.board_id}}</h1>
        <div class="lists">
          <List
          v-for="list in board.lists"
          v-bind:key="list.id"
          v-bind:title="list.title"
          v-bind:cards="list.cards"
          />
        <button>Add list</button>
        </div>
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
h1 {
  color: darkgreen;
}

.lists {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px;
}

button {
  padding: 15px;
  margin: 10px;
  font-size: 1em;
  border-radius: 15px;
  background-color: rgb(62, 218, 210);
  color: darkred;
  height: 7em;
}

</style>
