<template>
  <div id="crypto">
    {{ prices }}
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      prices: [],
    };
  },

  async mounted() {
    const response = await axios.get("http://localhost:4000/api/crypto-prices");
    this.prices = response.data;
  },
};
</script>

<style>
#crypto {
  margin: auto;
  margin-top: 5%;
  max-width: 70%;
}
</style>
