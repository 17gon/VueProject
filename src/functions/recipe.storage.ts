import type { Recipe } from "./recipe";

const KEY = "recipes";

export function loadRecipes(seed: Recipe[]): Recipe[] {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed;

    try {
        return JSON.parse(raw) as Recipe[];
    } catch {
        return seed;
    }
}

export function saveRecipes(recipes: Recipe[]): void {
    localStorage.setItem(KEY, JSON.stringify(recipes, null, 2));
}