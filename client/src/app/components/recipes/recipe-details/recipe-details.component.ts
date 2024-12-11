import { Component, OnInit, afterNextRender } from '@angular/core';
import { Recipe } from '../../../types/recipe';
import { Comment } from '../../../types/comment';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../api.service';
import { UserService } from '../../user/user.service';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { Like } from '../../../types/likes';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [RouterLink, FormsModule, LoaderComponent],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {
  recipe = {} as Recipe;
  comments: Comment[] = [];
  newComment: string = '';
  currentUserId: string = '';
  showModal:boolean = false;
  recipeId: string = '';
  email: string = '';
  isLoading = true;
  areRecipeDetailsLoading = true;
  likesCount = 0;
  hasLiked = false;

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
    this.apiService.deleteRecipe(this.recipeId).subscribe(() => {
      this.router.navigate(['/recipes']);
    })
  }
 
  ngOnInit(): void {
    this.userService.getProfile().subscribe((data) => {
      this.currentUserId = data._id;
      this.email = data.email;
    })
    const id = this.route.snapshot.params['recipeId'];
    this.recipeId = id;

    this.apiService.getRecipeDetails(id).subscribe((recipe) => {
      this.recipe = recipe;
      this.areRecipeDetailsLoading = false;
    })

    this.loadLikes();
    this.loadComments();
  }

  loadComments(): void {
    this.apiService.getRecipeComments(this.recipeId).subscribe((comments) => {
      this.comments = comments;
      this.isLoading = false;
    })
  }

  loadLikes():void {
    this.apiService.getRecipeLikes(this.recipeId).subscribe((likes: Like[]) => {
      this.likesCount = likes.length;
      this.hasLiked = likes.some(like => like._ownerId === this.currentUserId);
    });
  }

  addComment(): void {
    if (!this.newComment.trim()) return;

    const comment = {
      author: this.email,
      content: this.newComment,
      recipeId: this.recipeId
    }

    this.apiService.postRecipeComment(comment).subscribe(() => {
      this.newComment = '';
      this.loadComments();
    })
  }

  likeRecipe(): void {

    this.apiService.likeRecipe({ recipeId: this.recipeId }).subscribe(() => {
      this.likesCount++;
      this.hasLiked = true;
    });
  }

  dislikeRecipe(): void {
    this.apiService
      .getRecipeLikes(this.recipeId)
      .subscribe((likes: Like[]) => {
        const userLike = likes.find(like => like._ownerId === this.currentUserId);
        if (userLike) {
          this.apiService.deleteLike(userLike._id).subscribe(() => {
            this.likesCount--;
            this.hasLiked = false;
          });
        }
      });

}

}
