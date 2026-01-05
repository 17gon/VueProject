<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "SearchBarView"
})
</script>

<template>
  <div>
    <h1>Search</h1>
    <p>Query: {{ $route.query.q }}</p>
  </div>
</template>