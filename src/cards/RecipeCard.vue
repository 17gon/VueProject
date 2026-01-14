<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RecipeCard",
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String }
  },
  emits: ["open"]
});
</script>

<template>
  <v-card
      class="recipe-card"
      hover
      @click="$emit('open', id)"
  >
    <v-img
        v-if="image"
        :src="image"
        height="160"
        cover
        class="recipe-image"
    />
    <v-card-title class="recipe-title">{{ name }}</v-card-title>
  </v-card>
</template>

<style scoped>
/* Card container */
.recipe-card {
  background-color: var(--color-surface);
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

/* Hover effect */
.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.12);
}

/* Image styling */
.recipe-image {
  border-bottom: 2px solid #ffd699; /* subtle warm accent divider */
}

/* Title styling */
.recipe-title {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
  padding: 0.5rem 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .recipe-card {
    width: 100%;
  }
  .recipe-title {
    font-size: 1rem;
  }
  .recipe-image {
    height: 140px;
  }
}
</style>
