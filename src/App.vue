<template>
  <nav class="navbar">
    <div class="navbar-start">
      <a class="navbar-item">
        <router-link to="/">Home</router-link>
      </a>
      <a class="navbar-item">
        <router-link :to="{ name: 'bucket' }">Bucket List</router-link>
      </a>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: "app",
};
</script>
