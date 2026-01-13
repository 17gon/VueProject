<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue"
import { storeToRefs } from "pinia"
import { useRecipeBuilder } from "@/stores/useRecipeBuilder"
import { useRecipesStore } from "@/stores/useRecipes"

export default defineComponent({
  name: "RecipeManagerView",
  components: {
    RecipeFormCard: defineAsyncComponent(() => import("@/cards/RecipeFormCard.vue")),
    RecipeInputCard: defineAsyncComponent(() => import("@/cards/RecipeInputCard.vue")),
    RecipeActionsCard: defineAsyncComponent(() => import("@/cards/RecipeActionsCard.vue")),
  },

  setup() {
    const builderStore = useRecipeBuilder()
    const recipesStore = useRecipesStore()

    const { inputs } = storeToRefs(builderStore)
    const { recipes, ingredients } = storeToRefs(recipesStore)

    function updateInputs(val: typeof inputs.value) {
      inputs.value = val
    }

    return {
      inputs,
      recipes,
      ingredients,
      updateInputs
    }
  }
})
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <RecipeFormCard />

        <RecipeInputCard
            :inputs="inputs"
            :ingredients="ingredients"
            :recipes="recipes"
            @update:inputs="updateInputs"
        />

        <!-- Step 3: Actions -->
        <RecipeActionsCard />
      </v-col>
    </v-row>
  </v-container>
</template>
