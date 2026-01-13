<script lang="ts">
import { defineComponent, computed } from "vue";
import type { Ingredient } from "@/functions/Utils";
import type { IngredientInput, MixInput, Recipe, RecipeInput } from "@/functions/Recipe";

export default defineComponent({
  name: "RecipeInputRow",
  props: {
    input: { type: Object as () => RecipeInput, required: true },
    ingredients: { type: Array as () => Ingredient[], required: true },
    recipes: { type: Array as () => Recipe[], required: true }
  },
  emits: ["type-change"],
  setup(props, { emit }) {
    const selectedRecipe = computed(() =>
        props.recipes.find(r => r.id === props.input.componentId)
    );

    const recipeIngredientInputs = computed<IngredientInput[]>(() => {
      const recipe = selectedRecipe.value;
      if (!recipe) return [];
      return recipe.inputs.filter(
          (i): i is IngredientInput => i.componentType === "ingredient"
      );
    });

    function ratioLabel(index: number): string {
      const recipe = selectedRecipe.value;
      if (!recipe) return `× Component ${index + 1}`;
      const ingredientInputs = recipe.inputs.filter(
          (i): i is IngredientInput => i.componentType === "ingredient"
      );
      const input = ingredientInputs[index];
      if (!input) return `× Component ${index + 1}`;
      const ingredient = props.ingredients.find(i => i.id === input.componentId);
      if (!ingredient) return `× Component ${index + 1}`;
      return `${ingredient.name} (${input.amount} ${input.unit}) ×`;
    }

    function getRatioValue(index: number): number {
      const input = props.input as MixInput;
      switch (index) {
        case 0: return input.ratioA;
        case 1: return input.ratioB;
        case 2: return input.ratioC;
        case 3: return input.ratioD;
        default: return 0;
      }
    }

    function setRatioValue(index: number, value: number) {
      const input = props.input as MixInput;
      switch (index) {
        case 0: input.ratioA = value; break;
        case 1: input.ratioB = value; break;
        case 2: input.ratioC = value; break;
        case 3: input.ratioD = value; break;
      }
    }

    return {
      selectedRecipe,
      recipeIngredientInputs,
      ratioLabel,
      getRatioValue,
      setRatioValue,
      emit
    };
  }
});
</script>

<template>
  <v-row class="align-center">
    <v-col cols="3">
      <v-select
          :model-value="input.componentType"
          :items="['ingredient','recipe']"
          label="Type"
          @update:model-value="val => emit('type-change', val)"
      />
    </v-col>

    <v-col cols="4">
      <v-select
          v-if="input.componentType === 'ingredient'"
          v-model="input.componentId"
          :items="ingredients"
          item-title="name"
          item-value="id"
          label="Ingredient"
      />
      <v-select
          v-else
          v-model="input.componentId"
          :items="recipes"
          item-title="name"
          item-value="id"
          label="Mix (Recipe)"
      />
    </v-col>

    <v-col cols="2" v-if="input.componentType === 'ingredient'">
      <v-text-field v-model.number="input.amount" label="Amount" type="number" />
    </v-col>

    <v-col cols="2" v-if="input.componentType === 'ingredient'">
      <v-select
          v-model="input.unit"
          :items="['g','kg','ml','l','unit','tsp','tbsp','oz','cup','lb']"
          label="Unit"
      />
    </v-col>

    <v-col cols="12" v-if="input.componentType === 'recipe' && recipeIngredientInputs.length > 0">
      <v-row>
        <v-col v-for="(ingredient, index) in recipeIngredientInputs" :key="ingredient.componentId" cols="3">
          <v-text-field
              :model-value="getRatioValue(index)"
              @update:model-value="val => setRatioValue(index, Number(val))"
              :label="ratioLabel(index)"
              type="number"
              min="1"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
