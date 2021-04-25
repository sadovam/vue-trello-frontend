<template>
    <div class="board">
        <h1 @click="switchTitleEditInput">{{board.title}}</h1>
        <Spinner v-if="showSpinner"/>
        <input
          v-if="showTitleEdit"
          v-model.trim="newTitle"
          @keyup.enter="updateTitle"
          @blur="updateTitle"
        />
        <div class="lists">
          <List
            v-for="list in board.lists"
            v-bind:key="list.id"
            v-bind:title="list.title"
            v-bind:cards="list.cards"
            v-bind:id="list.id"
            v-bind:boardId="$route.params.board_id"
          />
          <div class="last">
          <AddList v-if="showAddList"
            :boardId="$route.params.board_id"
            :listPosition="Object.keys(board.lists).length"
            @close="showAddList=false"
          />
          <button v-else @click="showAddList=true">Add list</button>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import List from '@/components/List.vue';
import AddList from '@/components/AddList.vue';
import api from '@/api';
import Spinner from '@/components/Spinner.vue';

export default Vue.extend({
  name: 'Board',

  data() {
    return {
      showTitleEdit: false,
      newTitle: '',
      showAddList: false,
      showSpinner: false,
    };
  },

  async mounted() {
    this.showSpinner = true;
    this.$store.dispatch('getBoard', { id: this.$route.params.board_id })
      .finally(() => {
        this.showSpinner = false;
      })
      .catch((error) => {
        this.$notify({ type: 'error', title: error.message, text: 'We can`t load your lists. Something is wrong. Try later or call administrator.' });
      });
  },

  computed: {
    board() {
      return this.$store.getters.board;
    },
  },

  components: {
    List,
    AddList,
    Spinner,
  },

  methods: {
    switchTitleEditInput() {
      this.showTitleEdit = !this.showTitleEdit;
      this.newTitle = this.board.title;
    },
    updateTitle() {
      // eslint-disable-next-line no-useless-escape
      if (this.newTitle.match(/^[\d\p{L} \.,_-]+$/u) === null) {
        this.$notify({
          type: 'error',
          title: 'Uncorrect board title.',
          text: 'Title can`t be empty. It can use numbers, letters (a, A), spaces, dashes, dots, underscores.',
        });
        return;
      }

      this.showSpinner = true;
      api.put(`/board/${this.$route.params.board_id}`, { title: this.newTitle })
        .finally(() => {
          this.showSpinner = false;
          this.showTitleEdit = false;
        })
        .then(({ data: { result } }) => {
          if (result === 'Updated') {
            this.$store.dispatch('getBoard', { id: this.$route.params.board_id });
          }
        }, (error) => {
          this.$notify({
            type: 'error',
            title: error.message,
            text: 'We can`t change title of your list. Something is wrong. Try later or call administrator.',
          });
        });
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/_main';

h1 {
  margin-top: 50px;
  color: $fg1;
}

input {
  border-radius: 10px;
  padding: 8px 15px;
  margin-bottom: 10px;
}

.board {
  height: 93%;
  margin: 5px 20px;
}

.lists {
  display: flex;
  align-items: flex-start;
}

button {
  min-width: 15em;
  padding: 0.5em;
  margin: 10px;
  font-size: 1.2em;
  border-radius: 15px;
  height: 2.5em;
  font-weight: bold;
  background-color: $bg1;
  color: $fg1;
  text-shadow: 1px 1px 2px $shadow;
  box-shadow: 2px 2px 3px $shadow;
  outline-color: transparent;
  border-color: transparent;
}

.last {
  min-width: 20em;
  padding-right: 20px;
}
</style>
