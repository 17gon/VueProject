<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Footer
  },
});
</script>

<template>
  <v-app>
    <Header/>

    <v-main class="main-content">
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>

<style scoped>
.main-content {
  padding: 4rem;
  background: var(--color-background);
  min-height: calc(100vh - 160px);
}
</style>