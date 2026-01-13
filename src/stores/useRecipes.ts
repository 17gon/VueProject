import { defineStore } from "pinia"
import { ref, computed } from "vue"

import ingredientsRaw from "@/data/ingredients.json"
import recipesRaw from "@/data/recipes.json"
import recipeAboutRaw from "@/data/recipe-about.json"

import type {Recipe, RecipeAbout} from "@/functions/Recipe"
import {exportAsJson, type Ingredient} from "@/functions/Utils.ts";

const ingredients = ingredientsRaw as Ingredient[]
const recipes = recipesRaw as Recipe[]
const recipesAbout = recipeAboutRaw as RecipeAbout[]

export const useRecipesStore = defineStore("recipes", () => {
    /* -------------------- state -------------------- */

    const ingredientsState = ref<Ingredient[]>(ingredients)
    const recipesState = ref<Recipe[]>(recipes)
    const recipesAboutState = ref<RecipeAbout[]>(recipesAbout)

    /* -------------------- getters -------------------- */

    function getRecipeById(id: string): Recipe | null {
        return recipesState.value.find(r => r.id === id) ?? null
    }

    function getRecipeAboutById(id: string): RecipeAbout | null {
        return recipesAboutState.value.find(r => r.id === id) ?? null
    }

    function getIngredientById(id: string): Ingredient | null {
        return ingredientsState.value.find(i => i.id === id) ?? null
    }

    function getIngredientName(id: string): string {
        return getIngredientById(id)?.name ?? id
    }

    /* -------------------- derived -------------------- */

    const recipeIndex = computed(() =>
        Object.fromEntries(
            recipesState.value.map(r => [r.id, r])
        ) as Record<string, Recipe>
    )

    /* -------------------- mutations / actions -------------------- */

    function addRecipe(recipe: Recipe) {
        recipesState.value.push(recipe)
        recipesAboutState.value.push({
            id: recipe.id,
            name: recipe.name,
            image: recipe.image
        })
    }


    function addIngredient(ingredient: Ingredient) {
        ingredientsState.value.push(ingredient)
    }

    function exportIngredients() {
        exportAsJson(ingredientsState.value, "ingredients.json")
    }
    /* -------------------- expose -------------------- */

    return {
        // state
        ingredients: ingredientsState,
        recipes: recipesState,
        recipesAbout: recipesAboutState,

        // getters
        getRecipeById,
        getRecipeAboutById,
        getIngredientById,
        getIngredientName,

        // actions
        addRecipe,
        addIngredient,
        exportIngredients
    }
})
