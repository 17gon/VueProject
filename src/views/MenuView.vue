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
    <v-col v-for="recipe in recipesAbout" :key="recipe.id" cols="12" sm="6" md="4">
      <RecipeCard :id="recipe.id" :name="recipe.name" :image="recipe.image" @open="openRecipe"/>
    </v-col>
  </v-row>
</template>

<style scoped>
/* Main recipe grid spacing */
.v-row {
  gap: 2rem; /* spacing between columns */
  margin-top: 2rem;
  margin-bottom: 2rem;
}

/* Each column card wrapper */
.v-col {
  display: flex;
  justify-content: center;
}

/* RecipeCard styling override (assuming it has a card root) */
.recipe-card {
  background-color: var(--color-surface);
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
  width: 100%;
  max-width: 320px;
}

/* Hover effect for a warm lift */
.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
}

/* Image styling inside RecipeCard */
.recipe-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ffe1c9; /* subtle warm divider */
}

/* Recipe name styling */
.recipe-card h3 {
  color: var(--color-primary);
  font-size: 1.4rem;
  margin: 1rem;
  font-weight: 600;
  text-align: center;
}

/* Optional description inside card */
.recipe-card p {
  color: var(--color-text);
  font-size: 1rem;
  margin: 0 1rem 1rem 1rem;
  text-align: center;
  line-height: 1.4;
}

/* Button inside card */
.recipe-card button {
  background-color: var(--color-primary);
  color: var(--color-surface);
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin: 0 0 1rem 0;
  cursor: pointer;
  transition: background 0.3s;
}

.recipe-card button:hover {
  background-color: var(--color-accent);
}
</style>