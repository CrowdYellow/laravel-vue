<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1>Welcome from Bootstrap</h1>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <p><a class="btn btn-primary btn-lg" href="http://www.bootcss.com/" role="button" target="_blank">Learn more <span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span></a></p>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
@import "~bootstrap-sass/assets/stylesheets/_bootstrap";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
