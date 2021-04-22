<template>
    <div>
    <h3>Create new list</h3>
    <input
          placeholder="Type here title of new list..."
          v-model.trim="newTitle"
          @keyup.enter="addList"
    />
    <button @click="addList">Create</button>
    <button @click="$emit('close')" >Cancel</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import api from '@/api';

export default Vue.extend({
  name: 'AddList',
  props: ['boardId', 'listPosition'],
  data() {
    return {
      newTitle: '',
    };
  },
  methods: {
    addList() {
      if (this.newTitle === '') return;
      api.post(`/board/${this.boardId}/list`, { title: this.newTitle, position: this.listPosition })
        .then(({ data: { result } }) => {
          if (result === 'Created') {
            this.newTitle = '';
            this.$store.dispatch('getBoard', { id: this.boardId });
          }
        });
      this.$emit('close');
    },
  },
});
</script>

<style scoped lang="scss">
div {
  padding: 20px;
  align-items: center;
  background-color: cadetblue;
  border-radius: 25px;
}

input, h3 {
  margin: 7px;
}

button {
  display: inline-block;
  margin: 5px;
}

</style>
