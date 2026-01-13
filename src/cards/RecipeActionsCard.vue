<script lang="ts">
import { defineComponent } from "vue";
import { useRecipeBuilder } from "@/stores/useRecipeBuilder";
import { storeToRefs } from "pinia";
import { useRecipesStore } from "@/stores/useRecipes";
import {exportAsJson} from "@/functions/Utils.ts";

export default defineComponent({
  name: "RecipeActionsCard",
  setup() {
    const store = useRecipeBuilder();
    const recipesStore = useRecipesStore();
    const { canSave } = storeToRefs(store);

    const save = () => {
      if (!canSave.value) return;

      const recipe = store.buildRecipe();
      recipesStore.addRecipe(recipe);
      store.reset();
    };

    const exportJson = () => {
      exportAsJson(recipesStore.recipes, "recipes.json");
      exportAsJson(recipesStore.recipesAbout, "recipe-about.json");
    };

    return { canSave, save, exportJson };
  }
});
</script>

<template>
  <v-card>
    <v-card-actions>
      <v-btn variant="outlined" @click="exportJson">Export JSON</v-btn>
      <v-spacer />
      <v-btn color="primary" :disabled="!canSave" @click="save">Add Recipe</v-btn>
    </v-card-actions>
  </v-card>
</template>
