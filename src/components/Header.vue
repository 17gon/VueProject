<template>
  <router-link to="/" class="app-header__brand">
    DrinkRecipes
  </router-link>

  <v-btn text to="/" class="app-header__nav-item" router> Home </v-btn>
  <v-btn text to="/page1" class="app-header__nav-item" router> Page 1 </v-btn>
  <v-btn text to="/page2" class="app-header__nav-item" router> Page 2 </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",

  data() {
    return {
      searchQuery: "" as string,
    };
  },

  methods: {
  },
});
</script>

/*remove later*/
<style scoped>
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
</style>