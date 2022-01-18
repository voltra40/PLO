<template>
  <div id="habitsContainer">
    <h1 class="subtitle has-text-centered">Habits</h1>
    <table class="table table is-hoverable">
      <thead>
        <tr>
          <th v-for="habit in data[0]" :key="habit._id">{{ habit }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data.slice(1)" :key="row._id">
          <th>{{ row[0] }}</th>
          <td v-for="cell in row.slice(1)" :key="cell._id">{{ cell }}</td>
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
      data: [],
    };
  },

  async mounted() {
    const response = await axios.get("http://localhost:4000/api/habits");
    this.data = response.data.values;
  },
};
</script>

<style>
#habitsContainer {
  margin: auto;
  margin-top: 5%;
  max-width: 70%;
}
</style>
