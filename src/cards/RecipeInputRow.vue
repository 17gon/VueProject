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

    // ONLY direct ingredient inputs (mixes are ignored here intentionally)
    const recipeIngredientInputs = computed<RecipeInput[]>(() => {
      const recipe = selectedRecipe.value;
      if (!recipe) return [];
      return recipe.inputs;
    });

    function ratioLabel(input: RecipeInput, index: number): string {
      if (input.componentType === "ingredient") {
        const ingredient = props.ingredients.find(
            i => i.id === input.componentId
        );

        if (!ingredient) return `× Ingredient ${index + 1}`;
        return `${ingredient.name} (${input.amount} ${input.unit}) ×`;
      }

      // MIX CASE
      const recipe = props.recipes.find(r => r.id === input.componentId);
      return recipe
          ? `Mix: ${recipe.name} ×`
          : `× Mix ${index + 1}`;
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
  <v-row class="align-center recipe-input-row">
    <!-- TYPE -->
    <v-col cols="3">
      <v-select
          class="input-field"
          :model-value="input.componentType"
          :items="['ingredient', 'recipe']"
          label="Type"
          @update:model-value="val => emit('type-change', val)"
          dense
      />
    </v-col>

    <!-- INGREDIENT / MIX SELECT -->
    <v-col cols="4">
      <v-select
          v-if="input.componentType === 'ingredient'"
          class="input-field"
          v-model="input.componentId"
          :items="ingredients"
          item-title="name"
          item-value="id"
          label="Ingredient"
          dense
      />
      <v-select
          v-else
          class="input-field"
          v-model="input.componentId"
          :items="recipes"
          item-title="name"
          item-value="id"
          label="Mix (Recipe)"
          dense
      />
    </v-col>

    <!-- INGREDIENT AMOUNT -->
    <v-col cols="2" v-if="input.componentType === 'ingredient'">
      <v-text-field
          class="input-field"
          v-model.number="input.amount"
          label="Amount"
          type="number"
          dense
          min="0"
      />
    </v-col>

    <!-- INGREDIENT UNIT -->
    <v-col cols="2" v-if="input.componentType === 'ingredient'">
      <v-select
          class="input-field"
          v-model="input.unit"
          :items="['g','kg','ml','l','unit','tsp','tbsp','oz','cup','lb']"
          label="Unit"
          dense
      />
    </v-col>

    <!-- MIX RATIOS (INGREDIENTS ONLY, NO NESTED MIXES) -->
    <v-col cols="12" v-if="input.componentType === 'recipe' && recipeIngredientInputs.length > 0">
      <v-row>
        <v-col
            v-for="(child, index) in recipeIngredientInputs"
            :key="child.componentId"
            cols="3"
        >
          <v-text-field
              class="input-field"
              :model-value="getRatioValue(index)"
              @update:model-value="val => setRatioValue(index, Number(val))"
              :label="ratioLabel(child, index)"
              type="number"
              dense
              min="1"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped>
.recipe-input-row {
  background-color: #fff8f2;
  border-radius: 12px;
  padding: 0.8rem 1rem;
  margin-bottom: 0.8rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.recipe-input-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.input-field {
  background-color: #fff;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.input-field .v-input__control:focus-within {
  border-color: var(--color-primary);
}

.input-field label {
  color: var(--color-primary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .recipe-input-row {
    flex-direction: column;
  }

  .recipe-input-row > .v-col {
    width: 100% !important;
    margin-bottom: 0.5rem;
  }
}
</style>
