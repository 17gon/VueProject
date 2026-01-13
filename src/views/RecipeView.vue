<script lang="ts">
import { defineComponent, computed } from "vue"
import { useRoute } from "vue-router"
import { useRecipesStore } from "@/stores/useRecipes"

export default defineComponent({
  name: "RecipeView",
  setup() {
    const route = useRoute()
    const store = useRecipesStore()
    const recipeId = route.params.id as string
    const recipe = computed(() => store.getRecipeById(recipeId))

    const resolvedInputs = computed(() => {
      if (!recipe.value) return []

      return recipe.value.inputs.map(i => {
        if (i.componentType === "ingredient") {
          return {
            type: "ingredient",
            name: store.getIngredientName(i.componentId),
            amount: i.amount ?? 1,
            unit: i.unit ?? "unit"
          }
        }

        return {
          type: "mix",
          name: `Mix: ${i.componentId}`
        }
      })
    })

    return {
      recipe,
      resolvedInputs
    }
  }
})
</script>
<template>
  <div v-if="recipe">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-img :src="recipe.image || ''" height="250" />
        </v-col>
        <v-col cols="12" md="6">
          <h1>{{ recipe.name }}</h1>

          <v-divider class="my-2" />

          <h3>Ingredients / Mixes</h3>
          <v-list dense>
            <v-list-item v-for="(input, i) in resolvedInputs" :key="i">
              <v-list-item-content>
                <span v-if="input.type === 'ingredient'">
                  {{ input.name }}: {{ input.amount }} {{ input.unit }}
                </span>
                <span v-else>
                  {{ input.name }}
                </span>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider class="my-2" />

          <h3>Instructions</h3>
          <p>{{ recipe.instructions }}</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else>
    <p>Recipe not found.</p>
  </div>
</template>
