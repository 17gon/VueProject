<template>
  <v-app-bar
      app
      flat
      height="64"
      class="app-header"
  >
    <router-link to="/" class="app-header__brand">
      DrinkRecipes
    </router-link>

    <v-btn text to="/" class="app-header__nav-item" router> Home </v-btn>
    <v-btn text to="/page1" class="app-header__nav-item" router> Page 1 </v-btn>
    <v-btn text to="/page2" class="app-header__nav-item" router> Page 2 </v-btn>
    <v-spacer />
    <v-text-field
        v-model="searchQuery"
        density="compact"
        variant="outlined"
        hide-details
        clearable
        placeholder="Search recipes"
        class="app-header__search"
        @keyup.enter="onSearch"
    />
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",

  data() {
    return {
      searchQuery: "" as string,
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

/*remove later*/
<style scoped>
.app-header {
  display: flex;
  align-items: center;
}
.app-header__brand {
  font-weight: 600;
  font-size: 1.2rem;
  text-decoration: none;
  color: inherit;
  margin-right: 16px;
}
.app-header__nav-item {
  text-transform: none;
  font-weight: 500;
}
.app-header__search {
  max-width: 260px;
}
</style>