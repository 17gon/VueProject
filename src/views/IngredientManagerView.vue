<script lang="ts">
import { defineComponent } from "vue"
import { storeToRefs } from "pinia"
import { useRecipesStore } from "@/stores/useRecipes"
import { findSimilarIngredients } from "@/functions/Utils"
import type { Ingredient, SimilarIngredient } from "@/functions/Utils"

export default defineComponent({
  name: "IngredientManagerView",

  setup() {
    const recipesStore = useRecipesStore()
    const { ingredients } = storeToRefs(recipesStore)

    return {
      recipesStore,
      ingredients,
    }
  },

  data() {
    return {
      searchQuery: "",
      description: "",
      similarIngredients: [] as SimilarIngredient[],
    }
  },

  computed: {
    canAdd(): boolean {
      return (
          this.searchQuery.trim().length > 1 &&
          this.similarIngredients.length === 0
      )
    },
  },

  methods: {
    onSearch(): void {
      this.similarIngredients = findSimilarIngredients(
          this.ingredients,
          this.searchQuery,
          0.7
      )
    },

    addIngredient(): void {
      const newIngredient: Ingredient = {
        id: crypto.randomUUID(),
        name: this.searchQuery.trim(),
        description: this.description.trim(),
      }

      this.recipesStore.addIngredient(newIngredient)

      this.searchQuery = ""
      this.description = ""
      this.similarIngredients = []
    },

    exportIngredients(): void {
      this.recipesStore.exportIngredients()
    },
  },
})
</script>

<template>
  <v-container class="ingredient-manager-container">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="app-card">
          <v-card-title class="card-title">Add Ingredient</v-card-title>
          <v-card-text class="card-text">
            <v-text-field v-model="searchQuery" label="Ingredient name" variant="outlined" clearable @input="onSearch" class="input-field"/>
            <v-textarea v-model="description" label="Description" variant="outlined" rows="3" class="input-field"/>
            <v-alert v-if="similarIngredients.length" type="warning" variant="tonal" class="mt-4 similar-alert">
              <strong>Similar ingredients found (≥ 70%):</strong>
              <v-list density="compact">
                <v-list-item v-for="item in similarIngredients" :key="item.id" class="similar-item">
                  <v-list-item-title>
                    {{ item.name }} — {{ Math.round(item.similarity * 100) }}%
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-alert>
          </v-card-text>

          <v-card-actions class="card-actions">
            <v-btn color="secondary" variant="outlined" class="action-btn" @click="exportIngredients">Export JSON</v-btn>
            <v-spacer />
            <v-btn color="primary" :disabled="!canAdd" class="action-btn" @click="addIngredient">Add Ingredient</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.ingredient-manager-container {
  background: linear-gradient(135deg, #fff8f2 0%, #ffe1c9 100%);
  min-height: 100vh;
}
</style>

