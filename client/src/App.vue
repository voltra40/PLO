<template>
  <nav class="navbar is-light is-spaced" role="navigation" aria-label="main navigation">
    <!-- <div class="navbar-menu"> -->
      <div class="navbar-start">
        <a class="navbar-item" href="/">Home</a>
        <a class="navbar-item" href="/bucket-list">Bucket List</a>
        <a class="navbar-item" href="/habits">Habits</a>
        <a class="navbar-item" href="/crypto-prices">Crypto</a>
        <a class="navbar-item" href="/sleep-data">Sleep</a>
      </div>
    <!-- </div> -->
  </nav>
  <router-view />
</template>

<script>
export default {
  name: "app",
};
</script>
