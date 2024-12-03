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
import { ErrorMsgComponent } from './components/core/error-msg/error-msg.component';
import { UserGuard } from './guards/userGuard';
import { GuestGuard } from './guards/guestGuard';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},

    {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [UserGuard]},

    {path: 'recipes', children: [
        {path: '', component: RecipesCatalogComponent},
        {path: ':recipeId', component: RecipeDetailsComponent}
    ]},

    {path: 'add-recipe', component: AddRecipeComponent, canActivate: [UserGuard]},
    
    {path: 'search', component: SearchRecipeComponent},

    {path: 'about-us', component: AboutUsComponent},

    {path: 'error', component: ErrorMsgComponent},
    {path: '404', component: NotFoundComponent},
    {path: '**', redirectTo: '/404'}
];
