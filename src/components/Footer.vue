<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>

<template>
  <v-footer app color="secondary" padless>
    <v-container fluid class="text-center py-4">
      <v-row align="center" justify="space-between">

        <v-col cols="12" md="3" >
          <strong>Author:</strong> <span style="color: var(--color-surface);">Heptadecagon </span>
        </v-col>
        <v-col cols="12" md="3">
          <strong>Contact:</strong>
          <a href="mailto:km4qr5f3rchd@gmail.com" style="color: var(--color-surface);">km4qr5f3rchd@gmail.com</a>
        </v-col>
        <v-col cols="12" md="3">
          <strong>GitHub:</strong>
          <a href="https://github.com/17gon" target="_blank" rel="noopener" style="color: var(--color-surface);"> github.com/17gon</a>
        </v-col>

        <v-col cols="12" md="3" >
          Mix - <span style="color: var(--color-surface);"> shake </span> - repeat
        </v-col>

      </v-row>
    </v-container>
  </v-footer>
</template>