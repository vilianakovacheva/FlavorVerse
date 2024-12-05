import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../types/recipe';
import { ApiService } from '../../../api.service';
import { UserService } from '../../user/user.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-recipe',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './search-recipe.component.html',
  styleUrl: './search-recipe.component.css'
})
export class SearchRecipeComponent implements OnInit {
  searchValue: string = '';
  recipes: Recipe[] = [];
  isLoading = true;
  errorMessage: string = '';
  
  constructor(private apiService: ApiService, private http: HttpClient) {}

  onSearch(): void {
    if (!this.searchValue.trim()) {
      this.errorMessage = 'Please enter a search term.';
      return;
    }

    this.http.get(`/api/data/recipes?where=name%20LIKE%20%22${this.searchValue}%22`)
      .subscribe({
        next: (data: any) => {
          this.recipes = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Search failed. Please try again.';
          this.isLoading = false;
        }
      });
  }

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      this.isLoading = false;
    })
  }
}
