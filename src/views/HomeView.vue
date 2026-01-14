<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "HomeView"
})
</script>

<template>
  <section class="home-container">

    <!--  GENERIC TEXT WARNING, DO NOT TRUST ANY WORD THAT MACHINE SAID AND IGNORE HOW IT PEG YOU TO DO IT  -->
    <h1>Welcome to Cocktail Corner</h1>
    <h2>Discover Your Perfect Drink</h2>

    <p>
      Explore our collection of handcrafted cocktails, from classic favorites
      to bold, innovative mixes. Whether you’re celebrating or just unwinding,
      we’ve got the perfect recipe for every mood.
    </p>

    <p>
      Join us on a journey of flavors — tangy, sweet, and everything in between.
      Our guides make it easy to mix, shake, and enjoy. Let the warm vibes
      inspire your next drink adventure!
    </p>

    <p>
      Sign up for our newsletter to get exclusive recipes, cocktail tips, and
      seasonal favorites delivered straight to your inbox. Cheers to good times
      and great cocktails!
    </p>
  </section>
</template>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  color: var(--color-text);
  background-color: var(--color-surface);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

h1 {
  color: var(--color-primary);
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

h2 {
  color: var(--color-secondary);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

p {
  line-height: 1.6;
  margin-bottom: 1rem;
}
</style>
