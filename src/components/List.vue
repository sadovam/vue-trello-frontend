<template>
    <div class="list">
      <h4 @click="showTitleEdit=!showTitleEdit; newTitle=title">{{title}}</h4>
      <input
        v-if="showTitleEdit"
        v-model.trim="newTitle"
        @blur="changeTitle"
        @keyup.enter="changeTitle"
      />
      <Spinner v-if="showSpinner"/>
      <Card v-for="card in cards" v-bind:key="card.id" v-bind:title="card.title"/>
      <AddCard
        v-if="showAddCard"
        :boardId="boardId"
        :listId="id"
        :cardPosition="Object.keys(cards).length"
        @close="showAddCard=false"
      />
      <button v-else @click="showAddCard=true">Add card</button>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ICard } from '@/common/interfaces/card';
import Card from '@/components/Card.vue';
import AddCard from '@/components/AddCard.vue';
import api from '@/api';
import Spinner from '@/components/Spinner.vue';

export default Vue.extend({
  name: 'List',
  props: {
    title: String,
    id: Number,
    boardId: String,
    cards: Object as PropType<ICard[]>,
  },
  data() {
    return {
      showTitleEdit: false,
      newTitle: '',
      showAddCard: false,
      showSpinner: false,
    };
  },
  components: {
    Card,
    AddCard,
    Spinner,
  },
  methods: {
    changeTitle() {
      // eslint-disable-next-line no-useless-escape
      if (this.newTitle.match(/^[\d\p{L} \.,_-]+$/u) === null) {
        this.$notify({
          type: 'error',
          title: 'Uncorrect list title.',
          text: 'Title can`t be empty. It can use numbers, letters (a, A), spaces, dashes, dots, underscores.',
        });
        return;
      }

      this.showSpinner = true;
      api.put(`/board/${this.boardId}/list/${this.id}`, { title: this.newTitle })
        .finally(() => {
          this.showSpinner = false;
          this.showTitleEdit = false;
        })
        .then(({ data: { result } }) => {
          if (result === 'Updated') {
            this.$store.dispatch('getBoard', { id: this.boardId });
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

.list {
  min-width: 18em;
  margin: 10px;
  padding: 5px;
  font-size: 1em;
  border-radius: 15px;
  background-color: $bg1;
  color: $fg1;
}

h4 {
  margin: 10px;
  padding: 15px;
  font-size: 1.2em;
  border-radius: 15px;
  background-color: $bg1;
}

input {
  border-radius: 10px;
  padding: 8px 15px;
  margin-bottom: 10px;
}

button {
  outline: transparent;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1em;
  margin: 10px;
  padding: 15px;
  background-color: $bg1;
  color: $fg1;
}

.list:hover {
  background-color: $bg2;
}

</style>
