export interface Recipe {
    _ownerId: string,
    name: string,
    img: string,
    description: string,
    prepTime: number,
    cookTime: number,
    servings: number,
    calories: number,
    ingredients: string[],
    steps: string[],
    _createdOn: number,
    _id: string
}