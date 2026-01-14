import type {Ingredient} from "@/functions/Utils.ts";

export type UUID = string

export type Unit =
    | "g" | "kg"
    | "ml" | "l"
    | "unit"
    | "tsp" | "tbsp"
    | "oz" | "cup" | "lb"

export interface BaseInput {
    componentType: "ingredient" | "recipe"
    componentId: UUID
}

export interface IngredientInput extends BaseInput {
    componentType: "ingredient"
    amount: number
    unit: Unit
}

export interface MixInput extends BaseInput {
    componentType: "recipe"
    ratioA: number
    ratioB: number
    ratioC: number
    ratioD: number
}

export type RecipeInput = IngredientInput | MixInput

export interface Recipe {
    id: UUID
    name: string
    instructions: string
    image: string
    inputs: RecipeInput[]
}

export interface RecipeAbout {
    id: UUID;
    name: string;
    image: string;
}

export function resolveRecipeInputs(
    recipe: Recipe,
    recipes: Recipe[],
    ingredients: Ingredient[],
    depth = 0,
    maxDepth = 16
): any[] {
    if (depth > maxDepth) return []

    return recipe.inputs.map(i => {
        if (i.componentType === "ingredient") {
            const ingredient = ingredients.find(ing => ing.id === i.componentId)
            return { type: "ingredient", name: ingredient?.name ?? i.componentId, amount: i.amount, unit: i.unit }
        } else if (i.componentType === "recipe") {
            const subRecipe = recipes.find(r => r.id === i.componentId)
            return {
                type: "mix",
                name: `Mix: ${i.componentId}`,
                components: subRecipe ? resolveRecipeInputs(subRecipe, recipes, ingredients, depth + 1, maxDepth) : []
            }
        }
    })
}
