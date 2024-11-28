import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RecipesCatalogComponent } from './components/recipes/recipes-catalog/recipes-catalog.component';
import { RecipeDetailsComponent } from './components/recipes/recipe-details/recipe-details.component';
import { AddRecipeComponent } from './components/recipes/add-recipe/add-recipe.component';
import { SearchRecipeComponent } from './components/recipes/search-recipe/search-recipe.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},

    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},

    {path: 'recipes', children: [
        {path: '', component: RecipesCatalogComponent},
        {path: ':recipeId', component: RecipeDetailsComponent}
    ]},

    {path: 'add-recipe', component: AddRecipeComponent},
    
    {path: 'search', component: SearchRecipeComponent},

    {path: 'about-us', component: AboutUsComponent},

    {path: '404', component: NotFoundComponent},
    {path: '**', redirectTo: '/404'}
];
