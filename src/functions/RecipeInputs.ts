import type { RecipeInput } from "@/functions/Recipe.ts"

export function createIngredientInput(): RecipeInput {
    return {
        componentType: "ingredient",
        componentId: "",
        amount: 0,
        unit: "g"
    }
}

export function createMixInput(): RecipeInput {
    return {
        componentType: "recipe",
        componentId: "",
        ratioA: 1,
        ratioB: 1,
        ratioC: 1,
        ratioD: 1
    }
}