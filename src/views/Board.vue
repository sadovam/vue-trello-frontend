<template>
    <div>
        <h1 @click="switchTitleEditInput">{{board.title}}</h1>
        <Loader v-if="showLoader"/>
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
        <AddList v-if="showAddList"
          :boardId="$route.params.board_id"
          :listPosition="Object.keys(board.lists).length"
          @close="showAddList=false"
        />
        <button v-else @click="showAddList=true">Add list</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import List from '@/components/List.vue';
import AddList from '@/components/AddList.vue';
import api from '@/api';
import Loader from '@/components/Loader.vue';

export default Vue.extend({
  name: 'Board',

  data() {
    return {
      showTitleEdit: false,
      newTitle: '',
      showAddList: false,
      showLoader: false,
    };
  },

  async mounted() {
    this.showLoader = true;
    this.$store.dispatch('getBoard', { id: this.$route.params.board_id })
      .finally(() => {
        this.showLoader = false;
      })
      .catch((error) => {
        console.log('Error', error.response.data);
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
    Loader,
  },

  methods: {
    switchTitleEditInput() {
      this.showTitleEdit = !this.showTitleEdit;
      this.newTitle = this.board.title;
    },
    updateTitle() {
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
