<script lang="ts">
import { defineComponent } from "vue";
import type { Ingredient } from "@/functions/Utils";
import type { Recipe, RecipeInput } from "@/functions/Recipe";
import { resetInput } from "@/functions/RecipeInputs";
import { getMixIngredients } from "@/functions/RecipeHelper";
import RecipeInputRow from "@/cards/RecipeInputRow.vue";

export default defineComponent({
  name: "RecipeInputCard",
  components: {RecipeInputRow},
  props: {
    inputs: { type: Array as () => RecipeInput[], required: true },
    ingredients: { type: Array as () => Ingredient[], required: true },
    recipes: { type: Array as () => Recipe[], required: true }
  },
  emits: ["update:inputs"],
  methods: {
    reset(index: number, type: "ingredient" | "recipe") {
      const copy = [...this.inputs];
      resetInput(copy, index, type);
      this.$emit("update:inputs", copy);
    },
    mixIngredients(input: RecipeInput) {
      if (input.componentType !== "recipe") return [];
      return getMixIngredients(input, this.recipes, this.ingredients);
    }
  }
});
</script>

<template>
  <v-card class="mb-4">
    <v-card-title>Ingredients & Mixes</v-card-title>
    <v-card-text>
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
