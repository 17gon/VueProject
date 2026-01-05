<script lang="ts">
import {defineComponent} from 'vue'
import recipes from "@/data/recipes.json";

export default defineComponent({
  name: "Menu",

  data() {
    return {
      recipes: recipes,
    };
  },

  methods: {
    openRecipe(id: string): void {
      this.$router.push({
        name: "recipe",
        params: { id },
      });
    },
  },
})
</script>

<template>
  <div>
    <h1>Recipes</h1>

    <v-container>
      <v-row>
        <v-col
            v-for="recipe in recipes"
            :key="recipe.id"
            cols="12"
            md="4"
        >
          <v-card
              hover
              @click="openRecipe(recipe.id)"
          >
            <v-img
                :src="recipe.image"
                height="180"
                cover
            />

            <v-card-title>
              {{ recipe.name }}
            </v-card-title>

            <v-card-text>
              {{ recipe.shortDescription }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>