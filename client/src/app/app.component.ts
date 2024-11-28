import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/core/header/header.component";
import { FooterComponent } from "./components/core/footer/footer.component";
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { LoginComponent } from "./components/user/login/login.component";
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AddRecipeComponent } from './components/recipes/add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './components/recipes/recipe-details/recipe-details.component';
import { RecipesCatalogComponent } from './components/recipes/recipes-catalog/recipes-catalog.component';
import { SearchRecipeComponent } from './components/recipes/search-recipe/search-recipe.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HomeComponent, AboutUsComponent, LoginComponent, RegisterComponent, ProfileComponent, AddRecipeComponent, RecipeDetailsComponent, RecipesCatalogComponent, SearchRecipeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
