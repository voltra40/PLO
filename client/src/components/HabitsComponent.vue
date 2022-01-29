<template>
  <div id="habitsContainer" class="container">
    <div class="columns is-centered">
      <div class="column">
        <h1 class="title has-text-centered">Habits</h1>
        <table class="table is-hoverable">
          <thead>
            <tr>
              <th v-for="habit in data[0]" :key="habit._id">{{ habit }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, r) in data.slice(1)" :key="row._id">
              <th>{{ row[0] }}</th>
              <td v-for="(cell, c) in row.slice(1)" :key="cell._id" @click="click(r, c, cell)">
                <span class="icon">
                  <i class="material-icons" v-if="cell == 1">check</i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="field has-addons">
          <div class="control">
            <input class="input"
              type="text"
              placeholder="add a new habit..." 
              v-model="habit"
            />
          </div>
          <div class="control">
            <button class="button is-dark" @click="addHabit">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// convert row and column to A1 notation, for example B2, C5, AA3
const getA1Notation = (row, column) => {
  const a1Notation = [`${row + 1}`];
  const totalAlphabets = "Z".charCodeAt() - "A".charCodeAt() + 1;
  let block = column;
  while (block >= 0) {
    a1Notation.unshift(
      String.fromCharCode((block % totalAlphabets) + "A".charCodeAt())
    );
    block = Math.floor(block / totalAlphabets) - 1;
  }
  return a1Notation.join("");
};

import axios from "axios";
export default {

  created() {
    document.title = "Habits";
  },

  data() {
    return {
      data: [],
      habit: "",
    };
  },

  async mounted() {
    const response = await axios.get("api/habits");
    this.data = response.data.values;
  },
  methods: {
    async addHabit() {
      await axios.post("api/habits/", { habit: this.habit });
      location.reload();
    },

    // adds or deletes completion (check mark) to habit at row r and column c
    async click(r, c, cell) {
      if (cell === '1') {
        await axios.put("api/habits/" + getA1Notation(r+1, c+1), { value: 0});
      } else {
        await axios.put("api/habits/" + getA1Notation(r+1, c+1), { value: 1});
      }
      location.reload();
    },
  }
};
</script>

<style>
#habitsContainer {
  margin: auto;
  margin-top: 5%;
}
</style>
