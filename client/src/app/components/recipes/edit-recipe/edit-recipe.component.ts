import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { Recipe } from '../../../types/recipe';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent implements OnInit {
  errorMessage: string | null = null;
  recipe = {} as Recipe;
  ingredientsString: string = '';
  stepsString: string = '';
  id: string = '';
  currentUserId: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['recipeId'];
    this.id = id;
    this.userService.getProfile().subscribe((data) => {
      this.currentUserId = data._id;
    })

    this.apiService.getRecipeDetails(id).subscribe((recipe) => {
      this.recipe = recipe;
      if(this.currentUserId !== this.recipe._ownerId) {
        this.router.navigate(['/']);
      }
      this.ingredientsString = recipe.ingredients.join(' | ');
      this.stepsString = recipe.steps.join(' | ');
    })
  }

  editRecipe(form: NgForm) {

    if (form.invalid) {
      return;
    }

    const { name, img, description, prepTime, cookTime, servings, calories, ingredients, steps } = form.value;

    const ingredientsArray = ingredients.split('|').map((ing: string) => ing.trim());
    const stepsArray = steps.split('|').map((step: string) => step.trim());

    this.apiService.editRecipe(this.id,
      name,
      img,
      description,
      Number(prepTime),
      Number(cookTime),
      Number(servings),
      Number(calories),
      ingredientsArray,
      stepsArray,
    ).subscribe({
      next: () => this.router.navigate([`/recipes/${this.id}`]),
      error: (err) => {
        this.errorMessage = 'Failed to add recipe. Please try again!';
        console.error(err);
      }
    });
  }
}
