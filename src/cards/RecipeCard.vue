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
  <v-card class="app-card recipe-card" hover @click="$emit('open', id)">
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
.recipe-card {
  cursor: pointer;
  overflow: hidden;
}

.recipe-image {
  border-bottom: 2px solid #ffd699;
}

.recipe-title {
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
}

</style>
