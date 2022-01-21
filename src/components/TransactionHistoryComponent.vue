<template>
  <div id="transactions">
    <h1 class="title has-text-centered">Transactions</h1>
    <div class="columns">
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
                <td class="has-text-centered" v-for="cell in row" :key="cell._id">{{ cell }}</td>
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
                <span class="tag is-dark"> Total </span>
                <span class="tag">${{ total }} </span>
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
      averagePrice: '',
      total: '',
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

    let tempAverage = 0.0;
    let total = 0.0;
    for (let i = 0; i < this.data.length; i++) {
        total += parseFloat(this.data[i][3]);
        tempAverage += (parseFloat(this.data[i][2]).toFixed(2) * parseFloat(this.data[i][3]).toFixed(2));
    }
    this.averagePrice = (tempAverage / total).toFixed(2);
    this.total = total;
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
