import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../types/recipe';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ApiService } from '../../../api.service';
import { UserService } from '../../user/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes-catalog',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './recipes-catalog.component.html',
  styleUrl: './recipes-catalog.component.css'
})
export class RecipesCatalogComponent implements OnInit {
  recipes: Recipe[] = [];
  isLoading = true;
  
  constructor(private apiService: ApiService, private userService: UserService) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.apiService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      this.isLoading = false;
    })
  }

}
