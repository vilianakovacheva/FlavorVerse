import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../types/recipe';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {
  recipe = {} as Recipe;
  currentUserId: string = '';
  isAuthor: boolean = false;
  showModal:boolean = false;
  recipeId: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService, private userService: UserService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  openModal():void {
    this.showModal = true;
  }

  cancelDelete():void {
    this.showModal = false;
  }

  confirmDelete(): void {
    this.apiService.deleteRecipe(this.recipeId).subscribe(
      ()=> {
        this.router.navigate(['/recipes']);
      },
      (error) => {
        console.error('Error deleting recipe:', error);
      }
    )
  }
 
  ngOnInit(): void {
    this.userService.getProfile().subscribe((data) => {
      this.currentUserId = data._id;
    })
    const id = this.route.snapshot.params['recipeId'];
    this.recipeId = id;

    this.apiService.getRecipeDetails(id).subscribe((recipe) => {
      this.recipe = recipe;
      this.isAuthor = this.recipe._ownerId === this.currentUserId;
    })
  }

}
