<template>
    <div class="modal" @click="$emit('close')">
    <form @submit.prevent="addBoard" @click.stop>
      <label>New Board Name: {{name}}</label>
      <input v-model="name" placeholder="Type here name of new board...">
      <input type="submit">
    </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import api from '@/api';

export default Vue.extend({
  name: 'AddBoardModal',
  data() {
    return {
      name: '',
    };
  },
  methods: {
    addBoard() {
      this.name = this.name.trim();
      if (this.name === '') return;
      api.post('/board', { title: this.name })
        .then(({ data: { result } }) => {
          if (result === 'Created') {
            this.name = '';
            this.$store.dispatch('getBoards');
          }
          this.$emit('close');
        });
    },
  },
});
</script>

<style scoped lang="scss">
form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: cadetblue;
  border-radius: 25px;
}

input {
  margin-top: 20px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.55);
}
</style>
