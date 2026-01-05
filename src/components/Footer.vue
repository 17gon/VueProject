<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>

<template>
  <v-footer app>
    <v-container fluid>
      <v-row align="center" justify="space-between">

        <v-col cols="12" md="3">
          <strong>Author:</strong> Heptadecagon
        </v-col>
        <v-col cols="12" md="3">
          <strong>Contact:</strong>
          <a href="mailto:km4qr5f3rchd@gmail.com">km4qr5f3rchd@gmail.com</a>
        </v-col>
        <v-col cols="12" md="3">
          <strong>GitHub:</strong>
          <a href="https://github.com/17gon" target="_blank" rel="noopener"> github.com/17gon</a>
        </v-col>

        <v-col cols="12" md="3">
          Mix - swing - repeat
        </v-col>

      </v-row>
    </v-container>
  </v-footer>
</template>