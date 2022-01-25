<template>
  <div id="bucket">
    <h1 class="title has-text-centered">Bucket List</h1>
    <div class="field has-addons">
      <div class="control is-expanded">
        <input
          class="input"
          v-model="description"
          type="text"
          placeholder="add an item ..."
        />
      </div>
      <div class="control">
        <a class="button is-dark" @click="addItem" >Add</a>
      </div>
    </div>
    <div class="box" v-for="(item, i) in items" :key="item._id">
      <div class="columns">
        <input
          class="column input"
          v-if="isSelected(item)"
          v-model="editedDescription"
        />
        <p v-else class="column">
          <span class="tag is-black"> {{ i + 1 }} </span>
          {{ item.description }}
        </p>
        <div class="column is-narrow">
          <span class="icon has-text-dark" @click="isSelected(item) ? unselect() : select(item)">
            <i class="material-icons">{{isSelected(item) ? "close" : "edit"}}</i>
          </span>
          <span class="icon has-text-danger" @click="isSelected(item) ? updateItem(item, i) : deleteItem(item, i)">
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
  
  data() {
    return {
      items: [],
      description: "",
      editedDescription: "",
      selected: {},
    };
  },

  async mounted() {
    const response = await axios.get("http://localhost:4000/api/bucket-list");
    this.items = response.data;
  },

  methods: {
    async addItem() {
      const response = await axios.post("http://localhost:4000/api/bucket-list/", { description: this.description });
      this.items.push(response.data);
      this.description = "";
    },
    async deleteItem(item, i) {
      await axios.delete("http://localhost:4000/api/bucket-list/" + item._id);
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
      let response = await axios.put("http://localhost:4000/api/bucket-list/" + item._id, { description: this.editedDescription });
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
