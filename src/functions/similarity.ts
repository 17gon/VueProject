import type { Ingredient, SimilarIngredient } from "./ingredients.ts";

export function findSimilarIngredients(
    ingredients: Ingredient[],
    name: string,
    threshold: number
): SimilarIngredient[] {
    const normalized = normalize(name);

    return ingredients
        .map(ingredient => {
            const similarity = diceCoefficient(
                normalized,
                normalize(ingredient.name)
            );

            return {
                id: ingredient.id,
                name: ingredient.name,
                similarity,
            };
        })
        .filter(i => i.similarity >= threshold)
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

    const bigrams = (str: string): string[] => {
        const result: string[] = [];
        for (let i = 0; i < str.length - 1; i++) {
            result.push(str.slice(i, i + 2));
        }
        return result;
    };

    const aBigrams = bigrams(a);
    const bBigrams = bigrams(b);

    const matches = aBigrams.filter(bigram =>
        bBigrams.includes(bigram)
    ).length;

    return (2 * matches) / (aBigrams.length + bBigrams.length);
}