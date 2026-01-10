export type UUID = string;

export interface Ingredient {
    id: UUID;
    name: string;
    description: string;
}

export interface SimilarIngredient {
    id: UUID;
    name: string;
    similarity: number;
}
