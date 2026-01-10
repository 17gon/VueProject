import type { Recipe } from "./recipe";

export interface SimilarRecipe {
    id: string;
    name: string;
    similarity: number;
}

export function findSimilarRecipes(
    recipes: Recipe[],
    name: string,
    inputIds: string[],
    threshold: number
): SimilarRecipe[] {
    const normalizedName = normalize(name);

    return recipes
        .map(recipe => {
            const nameScore = diceCoefficient(
                normalizedName,
                normalize(recipe.name)
            );

            const recipeInputs = recipe.inputs
                .filter(Boolean)
                .map(i => i!.componentId);

            const intersection = recipeInputs.filter(id =>
                inputIds.includes(id)
            ).length;

            const ingredientScore =
                recipeInputs.length === 0
                    ? 0
                    : intersection / recipeInputs.length;

            const similarity = 0.6 * ingredientScore + 0.4 * nameScore;

            return {
                id: recipe.id,
                name: recipe.name,
                similarity,
            };
        })
        .filter(r => r.similarity >= threshold)
        .sort((a, b) => b.similarity - a.similarity);
}

function normalize(value: string): string {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

function diceCoefficient(a: string, b: string): number {
    if (!a || !b) return 0;
    if (a === b) return 1;

    const bigrams = (str: string) =>
        Array.from({ length: str.length - 1 }, (_, i) =>
            str.slice(i, i + 2)
        );

    const aB = bigrams(a);
    const bB = bigrams(b);

    const matches = aB.filter(x => bB.includes(x)).length;
    return (2 * matches) / (aB.length + bB.length);
}
