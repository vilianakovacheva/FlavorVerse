import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {
  errorMessage: string | null = null;

  constructor(private apiService: ApiService, private router: Router, private userService: UserService) {}

  addRecipe(form: NgForm) {

    if(form.invalid) {
      return;
    }

    const { name, img, description, prepTime, cookTime, servings, calories, ingredients, steps } = form.value;

    const ingredientsArray = ingredients.split('/').map((ing: string) => ing.trim());
    const stepsArray = steps.split('/').map((step: string) => step.trim());

    this.apiService.addRecipe(
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
      next: () => this.router.navigate(['/recipes']),
      error: (err) => {
        this.errorMessage = 'Failed to add recipe. Please try again!';
        console.error(err);
      }
    });
  }
}
