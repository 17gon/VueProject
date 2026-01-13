<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useRecipesStore } from "@/stores/useRecipes";
import { useRouter } from "vue-router";
import RecipeCard from "@/cards/RecipeCard.vue";

export default defineComponent({
  components: { RecipeCard },
  setup() {
    const store = useRecipesStore();
    const { recipesAbout } = storeToRefs(store);

    const router = useRouter();

    function openRecipe(id: string) {
      router.push({ name: "recipe", params: { id } });
    }

    return { recipesAbout, openRecipe };
  }
});
</script>

<template>
  <v-row>
    <v-col
        v-for="recipe in recipesAbout"
        :key="recipe.id"
        cols="12"
        sm="6"
        md="4"
    >
      <RecipeCard
          :id="recipe.id"
          :name="recipe.name"
          :image="recipe.image"
          @open="openRecipe"
      />
    </v-col>
  </v-row>
</template>
