<script lang="ts">
import { defineComponent } from "vue";
import { useRecipeBuilder } from "@/stores/useRecipeBuilder";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "RecipeDetailsCard",
  setup() {
    const store = useRecipeBuilder();
    const { meta } = storeToRefs(store);
    return { meta };
  }
});
</script>

<template>
  <v-card class="app-card section-spacing">
    <v-card-title class="card-title">Recipe Details</v-card-title>
    <v-card-text class="card-text">
      <v-text-field v-model="meta.name" label="Recipe name" class="input-field" outlined />
      <v-textarea v-model="meta.instructions" label="Instructions" class="input-field" rows="4" outlined />
      <v-text-field v-model="meta.image" label="https://example.com/image" class="input-field" outlined />
      <v-img v-if="meta.image" :src="meta.image" max-width="200" class="recipe-image my-4" />
    </v-card-text>
  </v-card>

</template>

<style scoped>
.recipe-image {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

</style>
