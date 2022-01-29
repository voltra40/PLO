<template>
  <div id="crypto">
    <div class="field is-grouped is-grouped-multiline is-justify-content-center">
      <div class="control">
        <div class="tags are-large has-addons" v-for="crypto in cryptos" :key="crypto.id">
          <span class="tag is-dark"> {{ crypto[0] }} </span>
          <span class="tag">${{ crypto[1] }} </span>
        </div>
        <router-link :to="{ name: 'transactions' }">
          <button class="button is-link">View Transaction History</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cryptos: [],
    };
  },

  async mounted() {
    const response = await axios.get("api/crypto-prices");
    // replace tempData with "response" when deploying
    const data = response.data;
    for (var id in data) {
      // tuple with name and associated price
      this.cryptos.push([
        data[id].name,
        parseFloat(data[id].quote.USD.price.toFixed(2)).toLocaleString("en-US"),
      ]);
    }
  },
};
</script>

<style>
#crypto {
  margin: auto;
  margin-top: 5%;
}
</style>
