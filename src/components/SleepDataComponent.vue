<template>
  <div id="sleepContainer">
      <h1 class="title has-text-centered">Sleep Data</h1>
    <div class="tabs is-toggle">
      <ul>
        <li class="is-active">
          <a>
            <span> Sleep Now </span>
          </a>
        </li>
        <li>
          <a>
            <span> Wake Up </span>
          </a>
        </li>
      </ul>
    </div>
    <div v-for="entry in data" :key="entry._id">
      <div class="columns are-narrow">
        <div class="column is-narrow">
          <span class="tag is-medium"> {{ entry.date }} </span>
        </div>
        <div v-if="isSelected(entry, entry.sleep) && (type == 'sleep')" class="column is-narrow">
          <div class="column is-narrow">
              <div class="columns">
                <input class="input column is-narrow" type="text" placeholder="sleep" v-model="newTime">
                <span class="icon column is-narrow" @click="unselect(); editTime(entry, entry.sleep)">
                    <i class="material-icons">save</i>
                </span>
              </div>
          </div>
        </div>
        <div v-else-if="isSelected(entry, entry.wake) && (type == 'wake')" class="column is-narrow">
          <div class="column is-narrow">
            <div class="columns">
                <input class="input column is-narrow" type="text" placeholder="wake" v-model="newTime">
                <span class="icon column is-narrow" @click="unselect(); editTime(entry, entry.wake)">
                    <i class="material-icons">save</i>
                </span>
            </div>
          </div>
        </div>
        <div v-else class="column is-narrow">
          <div class="columns">
            <div class="tags column is-narrow has-addons are-medium">
                <span class="tag is-dark">Sleep</span>
                <div class="tag is-light" @click="isSelected(entry, entry.sleep) ? unselect() : select(entry, entry.sleep)"> {{ entry.sleep }} </div>
            </div>
            <div class="tags column has-addons are-medium">
                <span class="tag is-dark">Wake</span>
                <div class="tag is-light" @click="isSelected(entry, entry.wake) ? unselect() : select(entry, entry.wake)"> {{ entry.wake }} </div>
            </div>
          </div>
        </div>
        <div class="column is-narrow">
          <span class="icon is-medium" @click="deleteEntry(entry)">
            <i class="material-icons">delete</i>
          </span>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-narrow">
        <button class="button is-link" @click="addTime">Add</button>
      </div>
      <div class="column is-narrow">
        <input class="input is-hoverable" type="text" placeholder="Input Sleep Time" v-model="sleepTime">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      data: [],
      sleepTime: "",
      newTime: "",
      selected: {},
      type: "",
    };
  },

  async mounted() {
    const response = await axios.get('http://localhost:4000/api/sleep-data');
    // parse data
    for(var i = 0; i < response.data.length; i ++) {
        this.data.push(response.data[i]);
    }
  },

  methods: {
    async addTime() {
      const today = new Date().toDateString();
      await axios.post("http://localhost:4000/api/sleep-data/", { date: today, sleep: this.sleepTime, wake: "----" });
      location.reload();
    },

    async deleteEntry(entry) {
      await axios.delete("http://localhost:4000/api/sleep-data/" + entry._id);
      location.reload();
    },

    select(entry, type) {
      if(type == entry.sleep) {
        this.selected = entry;
        this.type = "sleep";
      }
      if(type == entry.wake) {
        this.selected = entry;
        this.type = "wake";
      }
    },

    isSelected(entry, type) {
      if(type == entry.sleep) {
        return entry.sleep == this.selected.sleep;
      }
      if(type == entry.wake) {
        return entry.wake == this.selected.wake;
      }
    },

    unselect() {
      this.selected = {};
    },

    async editTime(entry, type) {
      if(type == entry.sleep) {
        await axios.put("http://localhost:4000/api/sleep-data/" + entry._id, {sleep: this.newTime})
      } else if (type == entry.wake) {
        await axios.put("http://localhost:4000/api/sleep-data/" + entry._id, {wake: this.newTime})
      }
      location.reload();
    }
  },
};
</script>

<style>
#sleepContainer {
  margin: auto;
  margin-top: 5%;
  max-width: 70%;
}
</style>
