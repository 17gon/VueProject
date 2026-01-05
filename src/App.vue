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

    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>
