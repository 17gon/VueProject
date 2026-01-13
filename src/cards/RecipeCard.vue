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
  <v-card hover @click="$emit('open', id)">
    <v-img v-if="image" :src="image" height="160" cover />
    <v-card-title>{{ name }}</v-card-title>
  </v-card>
</template>
