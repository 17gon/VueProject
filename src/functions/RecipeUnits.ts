import type { IngredientInput, Unit } from "@/functions/Recipe"

const CONVERSIONS: Record<string, number> = {
    tsp: 5,
    tbsp: 15,
    cup: 240,
    oz: 28.35,
    lb: 453.6
}

export function convertToMetric(
    amount: number,
    unit: Unit
): { value: number; unit: IngredientInput["unit"] } {

    if (["g", "kg", "ml", "l", "unit"].includes(unit)) {
        return { value: amount, unit }
    }

    const metricUnit: IngredientInput["unit"] =
        ["tsp", "tbsp", "cup", "oz"].includes(unit) ? "ml" : "g"

    return {
        value: amount * (CONVERSIONS[unit] ?? 1),
        unit: metricUnit
    }
}
