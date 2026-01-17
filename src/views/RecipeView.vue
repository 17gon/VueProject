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
            <RecipeListItems :items="resolvedInputs" />
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

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useRoute } from "vue-router"
import { useRecipesStore } from "@/stores/useRecipes"
import RecipeListItems from "@/components/RecipeListItems.vue"

export default defineComponent({
  name: "RecipeView",
  components: { RecipeListItems },
  setup() {
    const route = useRoute()
    const store = useRecipesStore()
    const recipeId = route.params.id as string
    const recipe = computed(() => store.getRecipeById(recipeId))

    const resolveComponent = (
        componentId: string,
        depth = 0,
        maxDepth = 16
    ): any[] => {
      if (depth > maxDepth) return []

      const mixRecipe = store.getRecipeById(componentId)
      if (!mixRecipe) return []

      return mixRecipe.inputs.map(i => {
        if (i.componentType === "ingredient") {
          return {
            type: "ingredient",
            name: store.getIngredientName(i.componentId),
            amount: i.amount ?? 1,
            unit: i.unit ?? "unit"
          }
        } else if (i.componentType === "recipe") {
          return {
            type: "mix",
            name: store.getRecipeById(i.componentId)?.name || `Mix: ${i.componentId}`,
            components: resolveComponent(i.componentId, depth + 1, maxDepth)
          }
        }
        return null
      }).filter(Boolean)
    }

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
        } else if (i.componentType === "recipe") {
          return {
            type: "mix",
            name: store.getRecipeById(i.componentId)?.name || `Mix: ${i.componentId}`,
            components: resolveComponent(i.componentId, 1, 16)
          }
        }
        return null
      }).filter(Boolean)
    })

    return { recipe, resolvedInputs }
  }
})
</script>
<style scoped>
v-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
v-row {
  gap: 2rem;
}
v-img {
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  object-fit: cover;
}
h1 {
  color: var(--color-primary);
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}
h3 {
  color: var(--color-secondary);
  font-size: 1.4rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
p {
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

v-divider {
  border-color: #ffd699;
}

v-list {
  background-color: var(--color-surface);
  border-radius: 12px;
  padding: 0.5rem 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

v-list-item {
  color: var(--color-text);
  font-size: 1rem;
  padding: 0.3rem 0;
}

div p {
  text-align: center;
  color: var(--color-primary);
  font-size: 1.2rem;
  margin-top: 3rem;
}

@media (max-width: 768px) {
  v-img {
    height: 200px;
  }
  h1 {
    font-size: 1.8rem;
  }
  h3 {
    font-size: 1.2rem;
  }
}
</style>
