<script lang="ts">
import { defineComponent } from 'vue'
import menu from "@/data/recipe-about.json"

export default defineComponent({
  name: "MenuView",
  data() {
    return { recipes: menu }
  },
  methods: {
    openRecipe(id: string) {
      this.$router.push({ name: "recipe", params: { id } })
    }
  }
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="recipe in recipes" :key="recipe.id" cols="12" md="4">
        <v-card hover @click="openRecipe(recipe.id)">
          <v-img :src="recipe.image || ''" height="180" cover />
          <v-card-title>{{ recipe.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
