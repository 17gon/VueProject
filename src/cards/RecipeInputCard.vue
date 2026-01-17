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
  <v-card class="app-card section-spacing">
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
