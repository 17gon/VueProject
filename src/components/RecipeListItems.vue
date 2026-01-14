<template>
  <div>
    <v-list-item
        v-for="(item, i) in items"
        :key="i"
        class="py-1"
    >
      <v-list-item-content>
        <span v-if="item.type === 'ingredient'">
          {{ item.name }}: {{ item.amount }} {{ item.unit }}
        </span>

        <span v-else-if="item.type === 'mix'">
          <strong>{{ item.name }}</strong>
          <v-list dense class="ml-4">
            <RecipeListItems :items="item.components" />
          </v-list>
        </span>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue"

export default defineComponent({
  name: "RecipeListItems",
  components: {}, // will be registered automatically by name for recursion
  props: {
    items: {
      type: Array as PropType<any[]>,
      required: true
    }
  }
})
</script>
