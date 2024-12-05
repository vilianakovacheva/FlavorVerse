import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user/user.service';
import { Recipe } from '../../types/recipe';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  isLoading = true;

  constructor(private userService: UserService, private router: Router, private apiService: ApiService) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  ngOnInit(): void {
    this.apiService.getRecentRecipes().subscribe((recipes) => {
      this.recipes = recipes.slice(0, 4);
      this.isLoading = false;
    })
  }
}
