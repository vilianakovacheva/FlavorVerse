import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './types/recipe';
import { Comment } from './types/comment';
import { Observable } from 'rxjs';
import { Like } from './types/likes';

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

  getRecipeComments(recipeId: string) {
    return this.http.get<Comment[]>(`/api/data/comments?where=recipeId%3D"${recipeId}"`);
  }

  postRecipeComment(comment: {author: string, content: string, recipeId: string}) {
    return this.http.post<Comment>('/api/data/comments', comment);
  }

  getRecipeLikes(recipeId: string): Observable<Like[]> {
    return this.http.get<Like[]>(`/api/data/likes?where=recipeId%3D"${recipeId}"`);
  }

  likeRecipe(data: { recipeId: string }) {
    return this.http.post('/api/data/likes', data);
  }

  deleteLike(likeId: string) {
    return this.http.delete(`/api/data/likes/${likeId}`);
  }
}
