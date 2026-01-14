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
  <v-card class="recipe-actions-card">
    <v-card-actions class="actions-row">
      <v-btn
          variant="outlined"
          color="secondary"
          class="action-btn"
          @click="exportJson"
      >
        Export JSON
      </v-btn>

      <v-spacer />

      <v-btn
          color="primary"
          class="action-btn"
          :disabled="!canSave"
          @click="save"
      >
        Add Recipe
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
/* Card styling */
.recipe-actions-card {
  background-color: var(--color-surface);
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  margin: 1rem 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Hover effect for card */
.recipe-actions-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.12);
}

/* Actions row spacing */
.actions-row {
  padding: 1rem;
  gap: 1rem;
}

/* Buttons styling */
.action-btn {
  font-weight: 600;
  font-size: 1rem;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

/* Primary button hover */
.action-btn.primary:hover {
  background-color: var(--color-accent);
}

/* Secondary button hover */
.action-btn.secondary:hover {
  background-color: #ffc187;
}

/* Disabled button style */
.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .actions-row {
    flex-direction: column;
    align-items: stretch;
  }
  .action-btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>
