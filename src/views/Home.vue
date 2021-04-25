<template>
  <div class="home">
    <div class="title">
      <h1>My Boards</h1>
      <button @click="showModal = true">+</button>
    </div>
    <Spinner v-if="showSpinner"/>
    <div v-if="boards" class="boards">
    <router-link v-for="board in boards" v-bind:key="board.id" v-bind:to="'/board/' + board.id">
      <BoardTmb
      v-bind:title="board.title.length <= 15 ? board.title : board.title.slice(0, 20) + '...'"
      />
    </router-link>
    </div>
    <AddBoardModal v-if="showModal" @close="showModal = false"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BoardTmb from '@/components/BoardTmb.vue';
import AddBoardModal from '@/components/AddBoardModal.vue';
import Spinner from '@/components/Spinner.vue';

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      showModal: false,
      showSpinner: false,
    };
  },
  async mounted() {
    this.showSpinner = true;
    this.$store.dispatch('getBoards')
      .finally(() => {
        this.showSpinner = false;
      })
      .catch((error): void => {
        this.$notify({
          type: 'error',
          title: error.message,
          text: 'We can`t load your boards. Something is wrong. Try later or call administrator.',
        });
      });
  },
  components: {
    BoardTmb,
    AddBoardModal,
    Spinner,
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },

});
</script>

<style scoped lang="scss">
@import '@/assets/scss/_main';
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  margin: 50px 20px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

button {
  width: 1.7em;
  height: 1.7em;
  font-size: 2em;
  font-weight: bold;
  border-radius: 1em;
  background-color: $bg1;
  color: $fg1;
  text-shadow: 1px 1px 2px $shadow;
  box-shadow: 2px 2px 3px $shadow;
  outline-color: transparent;
  border-color: transparent;
}

h1 {
  font-size: 2em;
  color: $fg1;
  text-shadow: 2px 2px 4px $shadow;
}

.boards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px;
}

a {
  text-decoration: none;
  color: $fg2;
  text-shadow: 1px 1px 2px $shadow;
}

</style>
