<template>
  <nav class="navbar is-light is-spaced" role="navigation" aria-label="main navigation">
    <!-- <div class="navbar-menu"> -->
      <div class="navbar-start">
        <a class="navbar-item" href="http://localhost:8080/">Home
        </a>
        <a class="navbar-item" href="http://localhost:8080/api/bucket-list">Bucket List
        </a>
        <a class="navbar-item" href="http://localhost:8080/api/habits">Habits
        </a>
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
