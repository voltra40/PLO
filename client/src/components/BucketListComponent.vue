<template>
  <div id="bucket">
    <h1 class="title has-text-centered">Bucket List</h1>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input
          class="input"
          v-model="description"
          type="text"
          placeholder="add a new item..."
        />
      </div>
      <div class="control">
        <a class="button is-dark" @click="addItem" >Add</a>
      </div>
    </div>
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <div class="columns">
        <div class="column is-narrow">
          <span class="tag is-black is-medium"> {{ i + 1 }} </span>
        </div>
        <div class="column" v-if="isSelected(item)">
          <input
            class="input"
            v-model="editedDescription"
          />
        </div>
        <div v-else class="column">
          <h1 class="subtitle">{{ item.description }}</h1>
        </div>
        <div class="column is-narrow">
          <span class="icon is-medium" @click="isSelected(item) ? unselect() : select(item)">
            <i class="material-icons">{{isSelected(item) ? "close" : "edit"}}</i>
          </span>
          <span class="icon is-medium" @click="isSelected(item) ? updateItem(item, i) : deleteItem(item, i)">
            <i class="material-icons">{{isSelected(item) ? "save" : "delete"}}</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {

  created() {
    document.title = "Bucket List";
  },

  data() {
    return {
      items: [],
      description: "",
      editedDescription: "",
      selected: {},
    };
  },

  async mounted() {
    const response = await axios.get("api/bucket-list");
    this.items = response.data;
  },

  methods: {
    async addItem() {
      const response = await axios.post("api/bucket-list/", { description: this.description });
      this.items.push(response.data);
      this.description = "";
    },
    async deleteItem(item, i) {
      await axios.delete("api/bucket-list/" + item._id);
      this.items.splice(i, 1);
    },
    select(item) {
      this.selected = item;
      this.editedDescription = item.description;
    },
    isSelected(item) {
      return (item._id === this.selected._id);
    },
    unselect() {
      this.selected = {};
      this.editedDescription = "";
    },
    async updateItem(item, i) {
      let response = await axios.put("api/bucket-list/" + item._id, { description: this.editedDescription });
      this.items[i] = response.data;
      this.unselect();
    },
  },
};
</script>

<style>
#bucket {
  margin: auto;
  margin-top: 5%;
  max-width: 70%;
}
.icon {
  cursor: pointer;
}
</style>
