<script lang="ts">
import { defineComponent } from "vue";
import type { Ingredient } from "@/functions/Utils";
import type { Recipe, RecipeInput } from "@/functions/Recipe";
import { createIngredientInput, createMixInput } from "@/functions/RecipeInputs";
import RecipeInputRow from "@/cards/RecipeInputRow.vue";

export default defineComponent({
  name: "RecipeInputCard",
  components: { RecipeInputRow },
  props: {
    inputs: { type: Array as () => RecipeInput[], required: true },
    ingredients: { type: Array as () => Ingredient[], required: true },
    recipes: { type: Array as () => Recipe[], required: true }
  },
  emits: ["update:inputs"],
  methods: {
    reset(index: number, type: "ingredient" | "recipe") {
      this.inputs[index] =
          type === "ingredient"
              ? createIngredientInput()
              : createMixInput();
    }
  }
});
</script>

<template>
  <v-card class="recipe-input-card mb-4">
    <v-card-title class="card-title">Ingredients & Mixes</v-card-title>
    <v-card-text class="card-text">
      <RecipeInputRow
          v-for="(input, i) in inputs"
          :key="i"
          :input="input"
          :ingredients="ingredients"
          :recipes="recipes"
          @type-change="val => reset(i, val)"
      />
    </v-card-text>
  </v-card>
</template>

<style scoped>
/* Card container */
.recipe-input-card {
  background-color: var(--color-surface);
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  padding: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Hover effect */
.recipe-input-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.12);
}

/* Card title styling */
.card-title {
  color: var(--color-primary);
  font-weight: 700;
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

/* Card text spacing */
.card-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Optional: spacing for RecipeInputRow elements */
.card-text > * {
  margin-bottom: 0.5rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-title {
    font-size: 1.4rem;
  }
}
</style>
