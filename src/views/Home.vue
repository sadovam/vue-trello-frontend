<template>
  <div class="home">
    <h1><img alt="Vue logo" src="../assets/logo.png"> My Boards</h1>
    <div v-if="boards" class="boards">
    <router-link v-for="board in boards" v-bind:key="board.id" v-bind:to="'/board/' + board.id">
      <BoardTmb v-bind:title="board.title" />
    </router-link>
    <button @click="showModal = true">Add board</button>
    </div>
    <AddBoardModal v-if="showModal" @close="showModal = false"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BoardTmb from '@/components/BoardTmb.vue';
import AddBoardModal from '@/components/AddBoardModal.vue';

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      showModal: false,
    };
  },
  async mounted() {
    await this.$store.dispatch('getBoards');
  },
  components: {
    BoardTmb,
    AddBoardModal,
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },

});
</script>

<style scoped lang="scss">

button {
  padding: 15px;
  margin: 10px;
  height: 7em;
  font-size: 1em;
  border-radius: 15px;
  background-color: #0dbc79;
  color: darkred;
}

h1 {
  font-size: 3em;
  color: #0dbc79;
}

img {
  height: 1em;
}

.boards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 10px;
}

a {
  text-decoration: none;
  color: maroon;
}

</style>
