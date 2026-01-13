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