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
  <v-card class="recipe-details-card mb-4">
    <v-card-title class="card-title">Recipe Details</v-card-title>

    <v-card-text class="card-text">
      <v-text-field
          v-model="meta.name"
          label="Recipe name"
          class="input-field"
          outlined
      />

      <v-textarea
          v-model="meta.instructions"
          label="Instructions"
          class="input-field"
          rows="4"
          outlined
      />

      <v-text-field
          v-model="meta.image"
          label="https://example.com/image"
          class="input-field"
          outlined
      />

      <v-img
          v-if="meta.image"
          :src="meta.image"
          max-width="200"
          class="recipe-image my-4"
      />
    </v-card-text>
  </v-card>
</template>

<style scoped>
/* Card container */
.recipe-details-card {
  background-color: var(--color-surface);
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 1rem;
}

/* Hover lift */
.recipe-details-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.12);
}

/* Card title styling */
.card-title {
  color: var(--color-primary);
  font-weight: 700;
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

/* Card text spacing */
.card-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Input fields */
.input-field {
  background-color: #fff8f2;
  border-radius: 8px;
}

/* Recipe image styling */
.recipe-image {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  object-fit: cover;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-title {
    font-size: 1.4rem;
  }
  .recipe-image {
    max-width: 100%;
    height: auto;
  }
}
</style>
