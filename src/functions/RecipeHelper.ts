import type { MixInput, Recipe } from "@/functions/Recipe.ts"
import type { Ingredient } from "@/functions/Utils.ts"

export function getIngredientName(
    ingredients: Ingredient[],
    id: string
): string {
    return ingredients.find(i => i.id === id)?.name ?? "Unknown"
}

export function getMixIngredients(
    mix: MixInput,
    recipes: Recipe[],
    ingredients: Ingredient[]
) {
    const recipe = recipes.find(r => r.id === mix.componentId)
    if (!recipe) return []

    const ratios = [
        mix.ratioA || 1,
        mix.ratioB || 1,
        mix.ratioC || 1,
        mix.ratioD || 1
    ]

    return recipe.inputs
        .filter(i => i.componentType === "ingredient")
        .map((i, idx) => ({
            name: getIngredientName(ingredients, i.componentId),
            ratio: ratios[idx],
            unit: i.unit,
            amount: i.amount
        }))
}
