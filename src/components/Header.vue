<template>
  <v-app-bar app>
    <v-btn variant="text" to="/" router>DrinkRecipes</v-btn>

    <v-btn variant="text" to="/" router>Home</v-btn>
    <v-btn variant="text" to="/menu" router>Menu</v-btn>
    <v-spacer />
    <v-text-field v-model="searchQuery" density="compact" hide-details placeholder="Search" @keyup.enter="onSearch"/>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",

  data() {
    return {
      searchQuery: "",
    };
  },

  methods: {
    onSearch(): void {
      if (!this.searchQuery.trim()) return;

      this.$router.push({
        name: "search",
        query: { q: this.searchQuery },
      });
    },
  },
});
</script>