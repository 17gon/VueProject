<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RecipeView",

  data() {
    return {
      recipe: null as null | {
        id: string;
        name: string;
        description: string;
      },
    };
  },

  created() {
    this.loadRecipe();
  },

  methods: {
    loadRecipe(): void {
      const id = this.$route.params.id as string;

      // Prototype: fake loading
      // Later this becomes API / JSON import
      this.recipe = {
        id,
        name: id.toUpperCase(),
        description: "Full recipe details go here",
      };
    },
  },
});
</script>

<template>
  <div v-if="recipe">
    <h1>{{ recipe.name }}</h1>
    <p>{{ recipe.description }}</p>
  </div>
</template>