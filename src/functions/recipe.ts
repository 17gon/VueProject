export type UUID = string

export interface RecipeInput {
    componentId: UUID
    amount: number| null
    unit: 'ml' | 'g' | 'l' | 'kg'
    ratio: number | null // A/B/C/D = numeric weight
}

export interface Recipe {
    id: string
    name: string
    instructions: string
    image: string
    inputs: RecipeInput[]/** 4 entry */
}
