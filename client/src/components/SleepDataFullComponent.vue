<template>
  <div id="sleepDataContainer">
    <h1 class="title has-text-centered">Sleep Data</h1>
    <div class="columns is-centered">
      <div class="column is-narrow">
        <table class="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Sleep</th>
              <th>Wake</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="day in data" :key="day._id">
              <th>{{ new Date(day.date).toDateString() }}</th>
              <td>{{ day.sleep }}</td>
              <td>{{ day.wake }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {

  created() {
    document.title = "Sleep Data";
  },

  data() {
    return {
      data: [],
    };
  },

  async mounted() {
    const response = await axios.get("/api/sleep-data");
    this.data = response.data;
  },
};
</script>

<style>
#sleepDataContainer {
  margin: auto;
  margin-top: 5%;
}
</style>
