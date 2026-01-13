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
        ratioA: 0,
        ratioB: 0,
        ratioC: 0,
        ratioD: 0
    }
}

export function resetInput(
    inputs: RecipeInput[],
    index: number,
    type: "ingredient" | "recipe"
) {
    inputs[index] =
        type === "ingredient"
            ? createIngredientInput()
            : createMixInput()
}
