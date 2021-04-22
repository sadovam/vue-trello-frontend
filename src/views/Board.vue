<template>
    <div>
        <h1 @click="switchTitleEditInput">{{board.title}}</h1>
        <input
          v-if="showTitleEdit"
          v-model="newTitle"
          @keyup.enter="updateTitle"
          @blur="updateTitle"
        />
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
import api from '@/api';

export default Vue.extend({
  name: 'Board',

  data() {
    return {
      showTitleEdit: false,
      newTitle: '',
    };
  },

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

  methods: {
    switchTitleEditInput() {
      this.showTitleEdit = !this.showTitleEdit;
      this.newTitle = this.board.title;
    },
    updateTitle() {
      this.newTitle = this.newTitle.trim();
      if (this.newTitle === '') return;
      api.put(`/board/${this.$route.params.board_id}`, { title: this.newTitle })
        .then(({ data: { result } }) => {
          if (result === 'Updated') {
            this.$store.dispatch('getBoard', { id: this.$route.params.board_id });
          }
          this.showTitleEdit = false;
        });
    },
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
