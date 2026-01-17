import { defineStore } from "pinia"
import { reactive, computed } from "vue"
import { exportAsJson } from "@/functions/Utils.ts"
import { createIngredientInput } from "@/functions/RecipeInputs.ts"
import { convertToMetric } from "@/functions/RecipeUnits.ts"
import type { Recipe, RecipeInput } from "@/functions/Recipe.ts"

export const useRecipeBuilder = defineStore("recipeBuilder", () => {
    const meta = reactive({
        name: "",
        instructions: "",
        image: ""
    })

    const inputs = reactive<RecipeInput[]>(
        Array.from({ length: 4 }, createIngredientInput)
    )

    const recipes = reactive<Recipe[]>([])

    const canSave = computed(() =>
        meta.name.trim().length > 2 &&
        meta.instructions.trim().length > 2 &&
        inputs.some(i => i.componentId)
    )

    function buildRecipe(): Recipe {
        console.table(inputs)
        return {
            id: crypto.randomUUID(),
            name: meta.name.trim(),
            instructions: meta.instructions.trim(),
            image: meta.image.trim(),
            inputs: inputs
                .filter(i => !!i.componentId)
                .map(i =>
                    i.componentType === "ingredient"
                        ? (() => {
                            const { value, unit } = convertToMetric(i.amount, i.unit)
                            return { ...i, amount: value, unit }
                        })()
                        : i
                )
        }
    }

    function saveRecipe() {
        recipes.push(buildRecipe())
        reset()
    }

    function exportAllRecipes() {
        exportAsJson(recipes, "recipes.json")

        exportAsJson(
            recipes.map(r => ({
                id: r.id,
                name: r.name,
                image: r.image
            })),
            "recipe-about.json"
        )
    }

    function reset() {
        meta.name = ""
        meta.instructions = ""
        meta.image = ""
        inputs.splice(0, inputs.length, ...Array.from({ length: 4 }, createIngredientInput))
    }

    function ensureCleanState() {
        if (!meta.name && !inputs.some(i => i.componentId)) {
            reset()
        }
    }
    return {
        meta,
        inputs,
        recipes,
        canSave,
        saveRecipe,
        buildRecipe,
        exportAllRecipes,
        reset,
        ensureCleanState
    }

})
