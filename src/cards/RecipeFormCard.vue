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
  <v-card class="mb-4">
    <v-card-title>Recipe Details</v-card-title>
    <v-card-text>
      <v-text-field v-model="meta.name" label="Recipe name" />
      <v-textarea v-model="meta.instructions" label="Instruction"/>
      <v-text-field v-model="meta.image" label="https://example.com/image"/>
      <v-img v-if="meta.image" :src="meta.image" max-width="200" class="my-4"/>
    </v-card-text>
  </v-card>
</template>
