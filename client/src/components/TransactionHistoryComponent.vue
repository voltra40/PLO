<template>
  <div id="transactions">
    <h1 class="title has-text-centered">Transactions</h1>
    <div class="columns is-centered">
      <div class="column">
        <table class="table is-hoverable is-fullWidth is-striped">
          <thead>
            <tr>
              <th v-for="column in columns" :key="column._id">
                {{ column }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in data" :key="row._id">
              <td class="has-text-centered" v-for="cell in row" :key="cell._id">
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="column is-narrow">
        <div class="tags are-large has-addons">
          <span class="tag is-dark"> Average Price </span>
          <span class="tag">${{ averagePrice }} </span>
        </div>
        <div class="tags are-large has-addons">
          <span class="tag is-dark"> Total Invested </span>
          <span class="tag">${{ total }} USD</span>
        </div>
        <div class="tags are-large has-addons">
          <span class="tag is-dark"> Total Ethereum </span>
          <span class="tag">{{ totalETH }} ETH</span>
        </div>
        <div class="tags are-large has-addons">
          <span class="tag is-dark"> Profit/Loss </span>
          <span v-bind:class="change >= 0 ? 'tag is-success' : 'tag is-danger'"> {{ change.slice(0, 1) + '$' + change.slice(1) }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      columns: [],
      data: [],
      averagePrice: "",
      total: "",
      totalETH: "",
      currentPrice: "",
      change: "",
    };
  },

  async mounted() {
    const response = await axios.get("http://localhost:4000/api/transaction-history");
    let data = response.data.values;

    // removes uncessary elements from data
    for (let i = 0; i < data[0].length - 1; i++) {
      if (i == 0 || i == 3 || i == 4 || i == 5) {
        this.columns.push(data[0][i]);
      }
    }

    // removes uncessary elements from data
    for (let i = 0; i < data.length; i++) {
      for (let j = data[i].length - 1; j >= 0; j--) {
        if (j == 1 || j == 2 || j == 6) {
          data[i].splice(j, 1);
        }
      }
    }
    // create table
    this.data = data.slice(2);

    // populate data for tabs: average buy price, total invested, total ethereum
    let tempAverage = 0.0;
    let total = 0.0;
    let totalEthereum = 0.0;

    for (let i = 0; i < this.data.length; i++) {
      total += parseFloat(this.data[i][3]);
      tempAverage += parseFloat(this.data[i][2]).toFixed(2) * parseFloat(this.data[i][3]).toFixed(2);
      totalEthereum += parseFloat(this.data[i][1]);
    }

    this.averagePrice = (tempAverage / total).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2});
    this.total = total.toLocaleString("en-US", {minimumFractionDigits: 0, maximumFractionDigits: 2});
    this.totalETH = totalEthereum.toLocaleString("en-US" , {minimumFractionDigits: 2, maximumFractionDigits: 2});

    // retrieve current price
    let currentPrice = await axios.get("http://localhost:4000/api/crypto-prices");
    this.currentPrice = parseFloat(currentPrice.data["1027"].quote.USD.price.toFixed(2)).toLocaleString("en-US");

    this.change = parseFloat((currentPrice.data["1027"].quote.USD.price.toFixed(2)) - total).toLocaleString("en-US");
  },
};
</script>

<style>
#transactions {
  margin: auto;
  margin-top: 5%;
  max-width: 40%;
}
</style>
