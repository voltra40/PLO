<template>
  <div id="sleepContainer">
    <h1 class="title has-text-centered">Sleep Data</h1>
    <div v-for="entry in data" :key="entry._id">
      <div class="columns">
        <div class="column is-narrow">
          <span class="tag is-medium"> {{ entry.date }} </span>
        </div>
        <div
          v-if="isSelected(entry) && type == 'sleep'"
          class="column is-narrow"
        >
          <div class="select">
            <select v-model="newTime">
              <option disabled value="">sleep</option>
              <option
                v-for="sleepTime in possibleSleepTimes"
                :key="sleepTime._id"
              >
                {{ sleepTime }}
              </option>
            </select>
          </div>
        </div>
        <div
          v-else-if="isSelected(entry) && type == 'wake'"
          class="column is-narrow"
        >
          <div class="select">
            <select v-model="newTime">
              <option disabled value="">wake</option>
              <option v-for="wakeTime in possibleWakeTimes" :key="wakeTime._id">
                {{ wakeTime }}
              </option>
            </select>
          </div>
        </div>
        <div v-else class="column is-narrow">
          <div class="columns">
            <div class="tags column is-narrow has-addons are-medium">
              <span class="tag is-dark">Sleep</span>
              <div
                class="tag is-light"
                @click="isSelected(entry) ? unselect() : select(entry, entry.sleep)"
              >
                {{ entry.sleep }}
              </div>
            </div>
            <div class="tags column has-addons are-medium">
              <span class="tag is-dark">Wake</span>
              <div
                class="tag is-light"
                @click="isSelected(entry) ? unselect() : select(entry, entry.wake)"
              >
                {{ entry.wake }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="isSelected(entry) && type == 'sleep'"
          class="column is-narrow"
        >
          <span
            class="icon is-medium"
            @click="
              unselect();
              editTime(entry, entry.sleep);
            "
          >
            <i class="material-icons">save</i>
          </span>
          <span class="icon is-medium" @click="deleteEntry(entry)">
            <i class="material-icons">delete</i>
          </span>
        </div>
        <div
          v-else-if="isSelected(entry) && type == 'wake'"
          class="column is-narrow"
        >
          <span
            class="icon is-medium"
            @click="
              unselect();
              editTime(entry, entry.wake);
            "
          >
            <i class="material-icons">save</i>
          </span>
          <span class="icon is-medium" @click="deleteEntry(entry)">
            <i class="material-icons">delete</i>
          </span>
        </div>
        <div v-else class="column is-narrow">
          <span class="icon is-medium" @click="deleteEntry(entry)">
            <i class="material-icons">delete</i>
          </span>
        </div>
      </div>
    </div>
    <div class="columns" v-if="Object.keys(selected).length === 0">
      <div class="column is-narrow">
        <button class="button is-link" @click="addTime">Sleep</button>
      </div>
      <div class="column">
        <div class="select">
            <select v-model="newSleepTime">
            <option disabled value="">sleep</option>
                <option
                v-for="sleepTime in possibleSleepTimes"
                :key="sleepTime._id"
                >
                {{ sleepTime }}
            </option>
            </select>
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
      data: [],
      sleepTime: "",
      newTime: "",
      selected: {},
      type: "",
      possibleSleepTimes: [],
      possibleWakeTimes: [],
      newSleepTime: "",
    };
  },

  async mounted() {
    const response = await axios.get("http://localhost:4000/api/sleep-data");
    // parse data
    for (var i = 0; i < response.data.length; i++) {
      this.data.push(response.data[i]);
    }

    // populate sleep times
    for (let i = 9; i < 15; i++) {
      for (let minutes = 0; minutes < 60; minutes += 5) {
        let minutesString = "";
        if (minutes == 0) {
          minutesString = ":00 ";
        } else if (minutes == 5) {
          minutesString = ":05 ";
        } else {
          minutesString = ":" + minutes + " ";
        }
        if (i < 12) {
          this.possibleSleepTimes.push(i + minutesString + "pm");
        } else if (i == 12) {
          this.possibleSleepTimes.push(i + minutesString + "am");
        } else {
          this.possibleSleepTimes.push(i - 12 + minutesString + "am");
        }
      }
    }
    // populate wake times
    for (let i = 5; i < 11; i++) {
      for (let minutes = 0; minutes < 60; minutes += 5) {
        let minutesString = "";
        if (minutes == 0) {
          minutesString = ":00 ";
        } else if (minutes == 5) {
          minutesString = ":05 ";
        } else {
          minutesString = ":" + minutes + " ";
        }
        this.possibleWakeTimes.push(i + minutesString + "am");
      }
    }
  },

  methods: {
    async addTime() {
      const today = new Date().toDateString();
      await axios.post("http://localhost:4000/api/sleep-data/", {
        date: today,
        sleep: this.newSleepTime,
        wake: "?",
      });
      location.reload();
    },

    async deleteEntry(entry) {
      await axios.delete("http://localhost:4000/api/sleep-data/" + entry._id);
      location.reload();
    },

    select(entry, type) {
      if (type == entry.sleep) {
        this.type = "sleep";
      } else {
        this.type = "wake";
      }
      this.selected = entry;
    },

    isSelected(entry) {
      return entry._id === this.selected._id;
    },

    unselect() {
      this.selected = {};
    },

    async editTime(entry, type) {
      if (this.newTime !== "") {
        if (type == entry.sleep) {
          await axios.put("http://localhost:4000/api/sleep-data/" + entry._id, { sleep: this.newTime });
        } else if (type == entry.wake) {
          await axios.put("http://localhost:4000/api/sleep-data/" + entry._id, { wake: this.newTime });
        }
      }
      location.reload();
    },
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
