<template>
  <div id="sleepContainer">
    <div class="columns is-centered">
      <div class="column is-narrow">
        <h1 class="title">Sleep Data</h1>
        <div v-for="entry in data" :key="entry._id">
          <div class="columns">
            <div class="column is-narrow">
              <span class="tag is-medium">
                {{ new Date(entry.date).toDateString() }}
              </span>
            </div>
            <div
              v-if="isSelected(entry) && type == 'sleep'"
              class="column is-narrow"
            >
              <div class="select">
                <select v-model="editedTime">
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
                <select v-model="editedTime">
                  <option disabled value="">wake</option>
                  <option
                    v-for="wakeTime in possibleWakeTimes"
                    :key="wakeTime._id"
                  >
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
                    @click="
                      isSelected(entry)
                        ? unselect()
                        : select(entry, entry.sleep)
                    "
                  >
                    {{ entry.sleep }}
                  </div>
                </div>
                <div class="tags column has-addons are-medium">
                  <span class="tag is-dark">Wake</span>
                  <div
                    class="tag is-light"
                    @click="
                      isSelected(entry) ? unselect() : select(entry, entry.wake)
                    "
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
                  updateTime(entry, entry.sleep);
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
                  updateTime(entry, entry.wake);
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
      <router-link :to="{ name: 'sleep data full' }">
        <button class="button is-link">View More</button>
      </router-link>
      </div>
      <div class="column is-narrow">
        <h1 class="title">Calculator</h1>
          <div class="columns">
            <div class="column is narrow">
              <div class="notification">
              <h2 class="subtitle">Potential Wake Up Times:</h2>
              <div class="tags are-medium">
                <span
                  v-bind:class="i == 4 ? 'tag is-success' : 'tag is-white'"
                  v-for="(bestWakeTime, i) in bestWakeTimes"
                  :key="bestWakeTime._id"
                >
                {{ bestWakeTime }}
                </span>
              </div>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {

  created() {
    document.title = "Sleep";
  },

  data() {
    return {
      data: [],
      editedTime: "",
      selected: {},
      type: "",
      possibleSleepTimes: [],
      possibleWakeTimes: [],
      newSleepTime: "",

      formalTime: "",
      bestWakeTimes: [],
    };
  },

  async mounted() {
    const response = await axios.get("api/sleep-data");
    // filter only last 7 days
    this.data = response.data.slice(-7);

    // populate sleep times
    for (let hour = 9; hour < 15; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 5) {
        let minutesString = "";
        if (minutes == 0) {
          minutesString = ":00 ";
        } else if (minutes == 5) {
          minutesString = ":05 ";
        } else {
          minutesString = ":" + minutes + " ";
        }
        if (hour < 12) {
          this.possibleSleepTimes.push(hour + minutesString + "pm");
        } else if (hour == 12) {
          this.possibleSleepTimes.push(hour + minutesString + "am");
        } else {
          this.possibleSleepTimes.push(hour - 12 + minutesString + "am");
        }
      }
    }

    // populate wake times
    for (let hour = 5; hour < 11; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 5) {
        let minutesString = "";
        if (minutes == 0) {
          minutesString = ":00 ";
        } else if (minutes == 5) {
          minutesString = ":05 ";
        } else {
          minutesString = ":" + minutes + " ";
        }
        this.possibleWakeTimes.push(hour + minutesString + "am");
      }
    }

    // convert time to 24 hr, ex. 9:30 pm is 21:30; 12:00 am is 00:00
    // this is a mess
    this.newSleepTime = this.data[this.data.length - 1].sleep;
    let formalTime = "";
    let hour = Number(this.newSleepTime.substring(0, this.newSleepTime.indexOf(":")));
    let minutes = this.newSleepTime.substring(this.newSleepTime.indexOf(":"), this.newSleepTime.indexOf(":") + 3);
    if (hour < 12 && this.newSleepTime.substring(this.newSleepTime.length - 2, this.newSleepTime.length) === "pm") {
      formalTime = String(hour + 12) + minutes;
    } else if (hour == 12) {
      formalTime = "00" + minutes;
    } else {
      formalTime = hour + minutes;
    }

    this.formalTime = formalTime;

    // populate best wake times
    let d = new Date();
    d.setHours(formalTime.substring(0, formalTime.indexOf(":")), formalTime.substring(formalTime.indexOf(":") + 1, formalTime.length), 0);
    for (let i = 0; i < 6; i++) {
      // add 15 minutes to fall asleep
      if (i == 0) d.setMinutes(d.getMinutes() + 15);
      // increment by 90 minutes
      let d2 = new Date(d.setHours(d.getHours() + 1, d.getMinutes() + 30));
      this.bestWakeTimes.push(
        d2.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
    }
  },

  methods: {
    async addTime() {
      const today = new Date();
      await axios.post("api/sleep-data/", {
        date: today,
        sleep: this.newSleepTime,
        wake: "?",
      });
      location.reload();
    },

    async deleteEntry(entry) {
      await axios.delete("api/sleep-data/" + entry._id);
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

    async updateTime(entry, type) {
      if (this.editedTime !== "") {
        if (type == entry.sleep) {
          await axios.put("api/sleep-data/" + entry._id, { sleep: this.editedTime });
        } else if (type == entry.wake) {
          await axios.put("api/sleep-data/" + entry._id, { wake: this.editedTime });
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
}
</style>
