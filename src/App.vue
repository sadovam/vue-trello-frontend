<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <h1><img alt="Vue logo" src="@/assets/logo.png"> Vue-Trello-Frontend</h1>
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <notifications position="top right"/>
  </div>
</template>

<style lang="scss">
@import '/assets/scss/_main';
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  height: 100%;
  background-color: #102423;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#app {
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 0 10px;
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $bg2;

  a {
    font-weight: bold;
    color: $fg2;
    text-decoration: none;
    display: block;
    padding: 5px;
    text-shadow: 1px 1px 2px $shadow;

    &.router-link-exact-active {
      background-color: $fg1;
      color: $bg1;
      text-shadow: 1px 1px 2px $shadow2;
    }
  }

  h1 {
    font-size: 1em;
    color: $fg1;
    margin: 5px;
    text-shadow: 1px 1px 2px $shadow;
  }

  img {
    height: 1em;
    filter: drop-shadow(1px 1px 2px $shadow);
  }

}
</style>
