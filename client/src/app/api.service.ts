import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './types/recipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getRecipes() {
    return this.http.get<Recipe[]>('/api/data/recipes');
  }

  getRecentRecipes() {
    return this.http.get<Recipe[]>('/api/data/recipes?sortBy=_createdOn%20desc');
  }

  getRecipeDetails(id: string) {
    return this.http.get<Recipe>(`/api/data/recipes/${id}`);
  }

  addRecipe(name: string, img: string, description: string, prepTime: number, cookTime: number, servings: number, calories: number, ingredients: string[], steps: string[]) {
    const payload = {name, img, description, prepTime, cookTime, servings, calories, ingredients, steps};
    return this.http.post<Recipe>('/api/data/recipes', payload);
  }

  getRecipesByUser(userId: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`/api/data/recipes?where=_ownerId%3D"${userId}"`);
  }

  editRecipe(recipeId: string, name: string, img: string, description: string, prepTime: number, cookTime: number, servings: number, calories: number, ingredients: string[], steps: string[]) {
    const payload = {name, img, description, prepTime, cookTime, servings, calories, ingredients, steps};
    return this.http.put<Recipe>(`/api/data/recipes/${recipeId}`, payload);
  }

  deleteRecipe(recipeId: string) {
    return this.http.delete<Recipe>(`/api/data/recipes/${recipeId}`);
  }
}
