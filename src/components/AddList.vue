<template>
    <div class="list">
    <h3>Create new list</h3>
    <input
          placeholder="Type here title of new list..."
          v-model.trim="newTitle"
          @keyup.enter="addList"
    />
    <Spinner v-if="showSpinner"/>
    <button @click="addList">Create</button>
    <button @click="$emit('close')" >Cancel</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import api from '@/api';
import Spinner from '@/components/Spinner.vue';

export default Vue.extend({
  name: 'AddList',
  props: ['boardId', 'listPosition'],
  data() {
    return {
      newTitle: '',
      showSpinner: false,
    };
  },
  components: {
    Spinner,
  },
  methods: {
    addList() {
      // eslint-disable-next-line no-useless-escape
      if (this.newTitle.match(/^[\d\p{L} \.,_-]+$/u) === null) {
        this.$notify({
          type: 'error',
          title: 'Uncorrect list title.',
          text: 'Title can`t be empty. It can use numbers, letters (a, A), spaces, dashes, dots, underscores.',
        });
        return;
      }
      api.post(`/board/${this.boardId}/list`, { title: this.newTitle, position: this.listPosition })
        .finally(() => {
          this.showSpinner = false;
          this.$emit('close');
        })
        .then(({ data: { result } }) => {
          if (result === 'Created') {
            this.newTitle = '';
            this.$store.dispatch('getBoard', { id: this.boardId });
          }
        }, (error) => {
          this.$notify({
            type: 'error',
            title: error.message,
            text: 'We can`t create your new list. Something is wrong. Try later or call administrator.',
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
  padding: 15px;
  font-size: 1em;
  border-radius: 15px;
  background-color: $bg1;
  color: $fg1;
}

input {
  display: block;
  border-radius: 10px;
  padding: 8px 15px;
  margin-bottom: 10px;
}

input, h3 {
  margin: 15px;
}

button {
  display: inline-block;
  padding: 5px 15px;
  margin: 10px;
  border-radius: 5px;
  background-color: $bg2;
  color: $fg1;
  text-shadow: 1px 1px 2px $shadow;
  box-shadow: 2px 2px 3px $shadow;
  outline-color: transparent;
  border-color: transparent;
  font-size: 1em;
  font-weight: bold;
}

.list:hover {
  background-color: $bg2;
}

</style>
