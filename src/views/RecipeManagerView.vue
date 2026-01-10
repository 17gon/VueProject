<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue"
import ingredientsSeed from "@/data/ingredients.json"
import recipesSeed from "@/data/recipes.json"

interface BaseInput {
  componentType: "ingredient" | "recipe"
  componentId: string
}

interface IngredientInput extends BaseInput {
  componentType: "ingredient"
  amount: number
  unit: "ml" | "g" | "l" | "kg" | "unit"
}

interface MixInput extends BaseInput {
  componentType: "recipe"
  ratioA: number
  ratioB: number
  ratioC: number
  ratioD: number
}

type RecipeInput = IngredientInput | MixInput

interface Recipe {
  id: string
  name: string
  instructions: string
  image: string
  inputs: RecipeInput[]
}

export default defineComponent({
  name: "RecipeManagerView",
  setup() {
    const ingredients = ingredientsSeed
    const recipes = ref<Recipe[]>(recipesSeed as Recipe[])

    const name = ref("")
    const instructions = ref("")
    const image = ref("")

    const inputs = reactive<RecipeInput[]>(Array.from({ length: 4 }, () => ({
      componentType: "ingredient",
      componentId: "",
      amount: 0,
      unit: "g"
    })))

    const ingredientOptions = computed(() =>
        ingredients.map(i => ({ id: i.id, label: i.name }))
    )

    const recipeOptions = computed(() =>
        recipes.value.map(r => ({ id: r.id, label: r.name }))
    )

    const canSave = computed(() =>
        name.value.trim().length > 2 &&
        instructions.value.trim().length > 2 &&
        inputs.some(i => i.componentId)
    )

    function resetInput(index: number, type: "ingredient" | "recipe") {
      if (type === "ingredient") {
        inputs[index] = { componentType: "ingredient", componentId: "", amount: 0, unit: "g" }
      } else {
        inputs[index] = { componentType: "recipe", componentId: "", ratioA: 0, ratioB: 0, ratioC: 0, ratioD: 0 }
      }
    }

    function convertToMetric(amount: number, unit: string): { value: number; unit: IngredientInput['unit'] } {
      const conversions: Record<string, number> = {
        tsp: 5,    // 1 tsp = 5 ml
        tbsp: 15,  // 1 tbsp = 15 ml
        oz: 28.35, // 1 oz = 28.35 g
        lb: 453.6, // 1 lb = 453.6 g
        cup: 240   // 1 cup = 240 ml
      }
      if (unit === 'unit' || unit === 'g' || unit === 'kg' || unit === 'ml' || unit === 'l') {
        return { value: amount, unit: unit as IngredientInput['unit'] }
      }
      if (unit in conversions) {
        // Decide ml or g based on typical conversion (we'll assume tsp/tbsp/cup = ml, oz/lb = g)
        const metricUnit = ['tsp','tbsp','cup'].includes(unit) ? 'ml' : 'g'
        return { value: amount * conversions[unit]!!, unit: metricUnit as IngredientInput['unit'] }
      }
      return { value: amount, unit: 'unit' }
    }

    function addRecipe() {
      if (!canSave.value) return

      const recipe: Recipe = {
        id: crypto.randomUUID(),
        name: name.value.trim(),
        instructions: instructions.value.trim(),
        image: image.value.trim(),
        inputs: inputs
            .filter(i => i.componentId)
            .map(i => {
              if (i.componentType === 'ingredient') {
                const { value, unit } = convertToMetric(i.amount, i.unit)
                return { componentType: 'ingredient', componentId: i.componentId, amount: value, unit }
              } else {
                return { componentType: 'recipe', componentId: i.componentId, ratioA: i.ratioA!, ratioB: i.ratioB!, ratioC: i.ratioC!, ratioD: i.ratioD! }
              }
            })
      }

      recipes.value.push(recipe)

      // reset
      name.value = ""
      instructions.value = ""
      image.value = ""
      inputs.forEach((_, i) => resetInput(i, 'ingredient'))
    }

    function exportRecipes() {
      // --- Full recipes.json ---
      const recipesBlob = new Blob([JSON.stringify(recipes.value, null, 2)], { type: "application/json" })
      const recipesUrl = URL.createObjectURL(recipesBlob)
      const recipesLink = document.createElement("a")
      recipesLink.href = recipesUrl
      recipesLink.download = "recipes.json"
      recipesLink.click()
      URL.revokeObjectURL(recipesUrl)

      // --- menu.json ---
      const menuData = recipes.value.map(r => ({
        id: r.id,
        name: r.name,
        image: r.image || ""
      }))
      const menuBlob = new Blob([JSON.stringify(menuData, null, 2)], { type: "application/json" })
      const menuUrl = URL.createObjectURL(menuBlob)
      const menuLink = document.createElement("a")
      menuLink.href = menuUrl
      menuLink.download = "recipe-about.json"
      menuLink.click()
      URL.revokeObjectURL(menuUrl)
    }

    function getIngredientName(id: string) {
      const ing = ingredients.find(i => i.id === id)
      return ing ? ing.name : "Unknown"
    }

    function getMixIngredients(mix: MixInput) {
      const recipe = recipes.value.find(r => r.id === mix.componentId)
      if (!recipe) return []

      // Map ratios A-D to ingredients (default 1 if 0)
      const ratios = [mix.ratioA || 1, mix.ratioB || 1, mix.ratioC || 1, mix.ratioD || 1]

      return recipe.inputs
          .filter(i => i.componentType === 'ingredient')
          .map((i, idx) => ({
            name: getIngredientName(i.componentId),
            ratio: ratios[idx],       // editable
            unit: i.unit,
            amount: i.amount
          }))
    }

    return {
      ingredients,
      recipes,
      name,
      instructions,
      image,
      inputs,
      ingredientOptions,
      recipeOptions,
      canSave,
      resetInput,
      addRecipe,
      exportRecipes,
      getMixIngredients,
      getIngredientName
    }
  }
})
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card>
          <v-card-title>Recipe Manager</v-card-title>
          <v-card-text>

            <!-- Recipe name -->
            <v-text-field v-model="name" label="Recipe name" />

            <!-- Instructions -->
            <v-textarea v-model="instructions" label="Instructions" rows="6" />

            <!-- Image URL -->
            <v-text-field v-model="image" label="Image URL" placeholder="https://..." />
            <v-img v-if="image" :src="image" max-width="200" class="my-4" />

            <v-divider class="my-4" />

            <!-- Inputs -->
            <v-row v-for="(input, i) in inputs" :key="i" class="align-center">
              <v-col cols="3">
                <v-select
                    v-model="input.componentType"
                    :items="['ingredient','recipe']"
                    label="Type"
                    @update:modelValue="(val) => resetInput(i,val)"
                />
              </v-col>

              <v-col cols="4">
                <v-select
                    v-if="input.componentType==='ingredient'"
                    :items="ingredientOptions"
                    item-title="label"
                    item-value="id"
                    v-model="input.componentId"
                    label="Ingredient"
                />
                <v-select
                    v-else
                    :items="recipeOptions"
                    item-title="label"
                    item-value="id"
                    v-model="input.componentId"
                    label="Mix (Recipe)"
                />
              </v-col>

              <!-- Ingredient fields -->
              <v-col cols="2" v-if="input.componentType==='ingredient'">
                <v-text-field v-model.number="input.amount" label="Amount" type="number"/>
              </v-col>
              <v-col cols="2" v-if="input.componentType==='ingredient'">
                <v-select
                    v-model="input.unit"
                    :items="['g','kg','ml','l','unit','tsp','tbsp','oz','cup','lb']"
                    label="Unit"
                />
              </v-col>

              <!-- Mix ratios preview -->
              <!-- Mix preview -->
              <v-col cols="12" v-if="input.componentType==='recipe' && input.componentId">
                <v-row
                    :dense="true"
                    :class="{'flex-wrap': true}"
                >
                  <v-col
                      v-for="(mixItem, index) in getMixIngredients(input)"
                      :key="mixItem.name"
                      :cols="inputs.length === 4 ? 6 : 12"
                  >
                    <v-card class="pa-2">
                      <v-row align="center" justify="space-between">
                        <v-col cols="6">
                          <strong>{{ mixItem.name }}</strong>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                              v-model.number="mixItem.amount"
                              type="number"
                              min="0"
                              :placeholder="mixItem.amount.toString() || '1'"
                              dense
                              hide-details
                          />
                          <span class="ml-1">{{ mixItem.unit }}</span>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>


            </v-row>

          </v-card-text>
          <v-card-actions>
            <v-btn variant="outlined" @click="exportRecipes">Export JSON</v-btn>
            <v-spacer />
            <v-btn color="primary" :disabled="!canSave" @click="addRecipe">Add Recipe</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
