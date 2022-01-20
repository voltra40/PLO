<template>
  <div id="transactionsContainer">
    <h1 class="title">Transactions</h1>
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
          <td class="has-text-centered" v-for="cell in row" :key="cell._id">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      columns: [],
      data: [],
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
    this.data = data.slice(2);
  },
};
</script>

<style>
#transactionsContainer {
  margin: auto;
  margin-top: 5%;
  max-width: 70%;
}
</style>
