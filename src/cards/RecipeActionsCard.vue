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
  <v-card class="app-card section-spacing">
    <v-card-actions class="actions-row">
      <v-btn
          variant="outlined"
          color="secondary"
          class="action-btn secondary"
          @click="exportJson"
      >
        Export JSON
      </v-btn>

      <v-spacer />

      <v-btn
          color="primary"
          class="action-btn primary"
          :disabled="!canSave"
          @click="save"
      >
        Add Recipe
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.actions-row {
  padding: 1rem;
  gap: 1rem;
}

@media (max-width: 768px) {
  .actions-row {
    flex-direction: column;
  }
}
</style>
