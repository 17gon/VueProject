<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "CreatorView",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const goToIngredient = () => {
      router.push({ name: "create-ingredient" });
    };

    const goToRecipe = () => {
      router.push({ path: "/creator/recipe" });
    };

    // Show buttons only on the main /creator page
    const showButtons = computed(() => route.path === "/creator");

    return {
      goToIngredient,
      goToRecipe,
      showButtons,
    };
  },
});
</script>

<template>
  <v-container class="fill-height" fluid>
    <!-- Buttons: only show if we're on /creator exactly -->
    <v-row
        align="center"
        justify="center"
        class="text-center"
        style="height: 50vh"
        v-if="showButtons"
    >
      <v-col cols="12" md="4">
        <v-btn large color="primary" class="ma-4" @click="goToIngredient">
          Create Ingredient
        </v-btn>
      </v-col>

      <v-col cols="12" md="4">
        <v-btn large color="secondary" class="ma-4" @click="goToRecipe">
          Create Recipe
        </v-btn>
      </v-col>
    </v-row>

    <!-- Child pages render here -->
    <router-view />
  </v-container>
</template>

<style scoped>
.v-btn {
  height: 120px;
  font-size: 1.5rem;
}
</style>
