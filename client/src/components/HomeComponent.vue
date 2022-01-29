<template>
  <div id="home">
    <h1 class="title has-text-centered"> Anthony </h1>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-narrow">
          <div class="buttons">
            <button class="button is-black" @click="openLinkedIn"> LinkedIn </button>
            <button class="button is-black" @click="openGitHub"> GitHub </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  created() {
    document.title = "Home";
  },

  methods: {
    openLinkedIn() {
      window.open("https://linkedin.com/in/anthonygarcia40");
    },
    openGitHub() {
      window.open("https://github.com/voltra40");
    }
  }
}
</script>

<style>
#home {
  margin: auto;
  margin-top: 5%;
  max-width: 70%;
}
</style>
