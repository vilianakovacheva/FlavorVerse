import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../types/recipe';
import { UserService } from '../user.service';
import { ApiService } from '../../../api.service';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  recipes: Recipe[] = [];
  email: string = '';
  isLoading = true;

  constructor(private userService: UserService, private apiService: ApiService) {}


  ngOnInit(): void {
    this.userService.getProfile().subscribe((data) => {
      this.email = data.email;

      this.apiService.getRecipesByUser(data._id).subscribe((recipes) => {
        this.recipes = recipes;
        this.isLoading = false;
      });
    })

  }
}

