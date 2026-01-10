<script lang="ts">
import { defineComponent } from "vue";
import ingredientsData from "@/data/ingredients.json";

import type { Ingredient } from "@/functions/ingredients.ts";
import { findSimilarIngredients } from "@/functions/similarity";
import {exportAsJson} from "@/functions/json-export.ts";

export default defineComponent({
  name: "IngredientManagerView",

  data() {
    return {
      ingredients: ingredientsData as Ingredient[],
      searchQuery: "",
      description: "",
      similarIngredients: [] as {
        id: string;
        name: string;
        similarity: number;
      }[],
    };
  },

  computed: {
    canAdd(): boolean {
      return (
          this.searchQuery.trim().length > 1 &&
          this.similarIngredients.length === 0
      );
    },
  },

  methods: {
    onSearch(): void {
      this.similarIngredients = findSimilarIngredients(
          this.ingredients,
          this.searchQuery,
          0.7
      );
    },

    addIngredient(): void {
      const newIngredient: Ingredient = {
        id: crypto.randomUUID(),
        name: this.searchQuery.trim(),
        description: this.description.trim(),
      };

      this.ingredients.push(newIngredient);

      this.searchQuery = "";
      this.description = "";
      this.similarIngredients = [];

      console.log("Ingredient added:", newIngredient);
    },
    exportIngredients(): void {
      exportAsJson(this.ingredients, "ingredients.json");
    },
  },
});
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">

        <v-card>
          <v-card-title>
            Add Ingredient
          </v-card-title>

          <v-card-text>
            <!-- Ingredient name -->
            <v-text-field
                v-model="searchQuery"
                label="Ingredient name"
                variant="outlined"
                clearable
                @input="onSearch"
            />

            <!-- Description -->
            <v-textarea
                v-model="description"
                label="Description"
                variant="outlined"
                rows="3"
            />

            <!-- Similar ingredients warning -->
            <v-alert
                v-if="similarIngredients.length"
                type="warning"
                variant="tonal"
                class="mt-4"
            >
              <strong>Similar ingredients found (≥ 70%):</strong>

              <v-list density="compact">
                <v-list-item
                    v-for="item in similarIngredients"
                    :key="item.id"
                >
                  <v-list-item-title>
                    {{ item.name }} —
                    {{ Math.round(item.similarity * 100) }}%
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-alert>
          </v-card-text>

          <v-card-actions>
            <v-btn color="secondary" variant="outlined" @click="exportIngredients">Export JSON</v-btn>
            <v-spacer />

            <v-btn
                color="primary"
                :disabled="!canAdd"
                @click="addIngredient"
            >
              Add Ingredient
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>
