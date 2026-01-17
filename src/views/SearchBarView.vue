<script lang="ts">
import { defineComponent, computed } from "vue"
import { useRecipesStore } from "@/stores/useRecipes.ts"

export default defineComponent({
  name: "SearchBarView",

  setup(_, { expose }) {
    const recipesStore = useRecipesStore()

    const query = computed(() => {
      return (String(window.location.search)
          ? new URLSearchParams(window.location.search).get("q") ?? ""
          : "")
          .trim()
          .toLowerCase()
    })

    const results = computed(() => {
      if (!query.value) return []

      return recipesStore.recipesAbout.filter(recipe =>
          recipe.name.toLowerCase().includes(query.value)
      )
    })

    return {
      query,
      results,
    }
  },
})
</script>

<template>
  <div class="pa-4">
    <h1>Search</h1>
    <p v-if="query">Results for: <b>{{ query }}</b></p>

    <v-row v-if="results.length">
      <v-col
          v-for="recipe in results"
          :key="recipe.id"
          cols="12"
          sm="6"
          md="4"
      >
        <v-card
            class="hover-card"
            @click="$router.push({ name: 'recipe', params: { id: recipe.id } })"
        >
          <v-img
              :src="recipe.image"
              height="180"
              cover
          />
          <v-card-title>
            {{ recipe.name }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <p v-else class="text-grey">
      No recipes found.
    </p>
  </div>
</template>

<style scoped>
.hover-card {
  cursor: pointer;
}
</style>
